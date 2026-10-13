"use client";

import { useRef, useState, memo, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { AddPostFormValues } from "@/lib/validations/add-post-schema";
import Image from "next/image";
import {
  deletePendingImageAction,
  uploadImageAction,
} from "@/services/features/images/actions";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB = 4;

interface ImageUploadProps {
  onUploadingChange: (isUploading: boolean) => void;
  initialImageAssetId: string | null;
}

function ImageUpload({
  onUploadingChange,
  initialImageAssetId,
}: ImageUploadProps) {
  const {
    setValue,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext<AddPostFormValues>();

  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const uploadedUrl = watch("image");
  const uploadedAssetId = watch("imageAssetId");

  useEffect(
    () => () => {
      if (previewUrl?.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    },
    [previewUrl],
  );

  async function handleFileChange(file: File | undefined) {
    if (!file || isUploading || isDeleting) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Only JPG, PNG, or WEBP images are allowed.");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`Image must be smaller than ${MAX_SIZE_MB}MB.`);
      return;
    }

    const localPreview = URL.createObjectURL(file);
    const previousUrl = uploadedUrl || "";
    const previousAssetId = uploadedAssetId ?? null;
    setPreviewUrl(localPreview);
    setIsUploading(true);
    setUploadProgress(30); // আপলোড শুরু হওয়া বোঝাতে 30% সিমুলেট করা হলো
    onUploadingChange(true);
    clearErrors("image");

    try {
      setUploadProgress(65); // API-তে রিকোয়েস্ট পৌঁছানো বোঝাতে 65%

      const formData = new FormData();
      formData.append("image", file, file.name);
      const result = await uploadImageAction(formData, "post");
      if (
        previousAssetId &&
        previousAssetId !== initialImageAssetId &&
        previousAssetId !== result.assetId
      ) {
        try {
          await deletePendingImageAction(previousAssetId);
        } catch (error) {
          try {
            await deletePendingImageAction(result.assetId);
          } catch (cleanupError) {
            console.error(
              "New image cleanup failed after replacing a pending image:",
              cleanupError,
            );
          }
          throw error;
        }
      }

      setValue("image", result.secureUrl, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("imageAssetId", result.assetId, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setPreviewUrl(result.secureUrl);
      setUploadProgress(100); // সফল আপলোডে 100%
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Image upload failed. Please try again.";
      toast.error(message);
      setError("image", { type: "manual", message });
      setPreviewUrl(previousUrl || null);
      setUploadProgress(0);
    } finally {
      URL.revokeObjectURL(localPreview);
      setIsUploading(false);
      onUploadingChange(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleRemove() {
    if (isUploading || isDeleting) return;
    const assetId = uploadedAssetId ?? null;
    if (assetId && assetId !== initialImageAssetId) {
      setIsDeleting(true);
      onUploadingChange(true);
      try {
        await deletePendingImageAction(assetId);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "ছবিটি মুছে ফেলা যায়নি। আবার চেষ্টা করুন।",
        );
        return;
      } finally {
        setIsDeleting(false);
        onUploadingChange(false);
      }
    }

    setPreviewUrl(null);
    setUploadProgress(0);
    setValue("image", "", { shouldValidate: true, shouldDirty: true });
    setValue("imageAssetId", null, { shouldValidate: true, shouldDirty: true });
    clearErrors("image");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const displayUrl = previewUrl ?? (uploadedUrl || null);

  return (
    <div className="mb-3.5">
      <label className="block text-sm font-medium text-text-primary mb-1.5">
        পোস্টের ছবি <span className="text-danger font-semibold">*</span>
      </label>
      <p className="text-xs text-text-muted -mt-0.5 mb-2">
        পুরো পোস্টের জন্য একটি ছবি — JPG, PNG বা WEBP
      </p>

      {displayUrl ? (
        <div className="relative rounded-card overflow-hidden border border-border-light">
          <Image
            width={300}
            height={220}
            src={displayUrl}
            alt="Preview"
            className="w-full block max-h-[220px] object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-1.5">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isUploading || isDeleting}
              aria-label="পরিবর্তন করুন"
              className="w-8 h-8 rounded-full bg-black/55 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/75 transition-base cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={isUploading || isDeleting}
              aria-label="মুছে ফেলুন"
              className="w-8 h-8 rounded-full bg-black/55 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/75 transition-base cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <label
          className={`block border-2 border-dashed border-border rounded-card p-6 text-center cursor-pointer bg-surface-hover transition-base ${isDragOver ? "border-primary bg-primary-light" : ""
            }`}
          htmlFor="imgInput"
        >
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              if (e.dataTransfer.files?.[0]) {
                handleFileChange(e.dataTransfer.files[0]);
              }
            }}
          >
            <div className="w-11 h-11 rounded-full bg-primary-light text-primary flex items-center justify-center mx-auto mb-2.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
            </div>
            <strong className="block text-sm mb-0.5">ছবি আপলোড করুন</strong>
            <span className="text-xs text-text-muted">ট্যাপ করুন অথবা টেনে আনুন</span>
          </div>
        </label>
      )}

      <input
        ref={inputRef}
        type="file"
        id="imgInput"
        accept={ACCEPTED_TYPES.join(",")}
        className="hidden"
        onChange={(e) => handleFileChange(e.target.files?.[0])}
      />

      {errors.image && (
        <p className="text-xs font-medium text-danger mt-1.5">
          {errors.image.message}
        </p>
      )}

      {/* Upload Progress Indicator */}
      {isUploading && uploadProgress > 0 && uploadProgress < 100 && (
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 bg-border-light rounded-full h-2 rounded overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <span className="text-xs font-en text-text-muted whitespace-nowrap">
            {uploadProgress}%
          </span>
        </div>
      )}

      {/* Success State */}
      {uploadProgress === 100 && !isUploading && displayUrl && (
        <div className="mt-2 flex items-center gap-1.5 text-success">
          <span className="text-xs font-semibold">✓ আপলোড সম্পন্ন</span>
        </div>
      )}
    </div>
  );
}

export default memo(ImageUpload);