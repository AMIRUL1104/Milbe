"use client";

import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { AddPostFormValues } from "@/lib/validations/add-post-schema";
import { ImgBBUploadError, uploadImageToImgBB } from "../../../lib/utils/imgbb";
import Image from "next/image";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB = 5;

interface ImageUploadProps {
  onUploadingChange: (isUploading: boolean) => void;
}

export default function ImageUpload({ onUploadingChange }: ImageUploadProps) {
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
  const [isDragOver, setIsDragOver] = useState(false);

  const uploadedUrl = watch("image");

  async function handleFileChange(file: File | undefined) {
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Only JPG, PNG, or WEBP images are allowed.");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`Image must be smaller than ${MAX_SIZE_MB}MB.`);
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setIsUploading(true);
    onUploadingChange(true);
    clearErrors("image");

    try {
      const result = await uploadImageToImgBB(file);
      setValue("image", result.url, { shouldValidate: true });
    } catch (error) {
      const message =
        error instanceof ImgBBUploadError
          ? error.message
          : "Image upload failed. Please try again.";
      toast.error(message);
      setError("image", { type: "manual", message });
      setPreviewUrl(null);
      setValue("image", "", { shouldValidate: true });
    } finally {
      setIsUploading(false);
      onUploadingChange(false);
    }
  }

  function handleRemove() {
    setPreviewUrl(null);
    setValue("image", "", { shouldValidate: true });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const displayUrl = previewUrl ?? (uploadedUrl || null);

  return (

    <>
      <div className="mb-3.5">
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          পোস্টের ছবি <span className="text-danger font-semibold">*</span>
        </label>
        <p className="text-xs text-text-muted -mt-0.5 mb-2">
          পুরো পোস্টের জন্য একটি ছবি — JPG, PNG বা WEBP
        </p>

        {displayUrl ? (
          <div className="relative rounded-card overflow-hidden border border-border-light">
            <Image width={300} height={220} src={displayUrl} alt="Preview" className="w-full block max-h-[220px] object-cover" />
            <div className="absolute top-2 right-2 flex gap-1.5">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                aria-label="পরিবর্তন করুন"
                className="w-8 h-8 rounded-full bg-black/55 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/75 transition-base"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleRemove}
                aria-label="মুছে ফেলুন"
                className="w-8 h-8 rounded-full bg-black/55 text-white flex items-center justify-center backdrop-blur-sm hover:bg-black/75 transition-base"
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
                handleFileChange(e.dataTransfer.files[0]);
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
      </div>
    </>
  );
}
