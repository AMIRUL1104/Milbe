"use client";

import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { AddPostFormValues } from "@/lib/validaions/add-post-schema";
import { ImgBBUploadError, uploadImageToImgBB } from "./imgbb";

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

  const uploadedUrl = watch("image");

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
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
    <section className="space-y-3">
      <h2 className="text-base font-semibold text-text-secondary">Post Image</h2>
      <p className="text-sm text-text-muted">
        One image is allowed for the whole post (JPG, PNG, or WEBP).
      </p>

      {displayUrl ? (
        <div className="relative w-full max-w-xs">
          <img
            src={displayUrl}
            alt="Post image preview"
            className="w-full h-48 object-cover rounded-xl border border-border"
          />

          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-overlay-dark rounded-xl">
              <Loader2 className="w-6 h-6 text-text-inverse animate-spin" />
            </div>
          )}

          {!isUploading && (
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove image"
              className="absolute top-2 right-2 p-1.5 bg-danger hover:bg-danger-hover text-text-inverse rounded-full transition-base cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 border border-border hover:border-primary text-sm font-semibold text-text-secondary rounded-xl px-4 py-2.5 transition-base cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          Upload Image
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="hidden"
        onChange={handleFileChange}
      />

      {errors.image && (
        <p className="text-xs font-medium text-danger">
          {errors.image.message}
        </p>
      )}
    </section>
  );
}