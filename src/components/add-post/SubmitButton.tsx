"use client";

import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  isSubmitting: boolean;
  isUploading?: boolean;
}

export default function SubmitButton({
  isSubmitting,
  isUploading,
}: SubmitButtonProps) {
  const disabled = isSubmitting || isUploading;

  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-text-inverse font-bold py-2.5 px-6 rounded-btn transition-base shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-primary-focus"
    >
      {isSubmitting ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <span>{isUploading ? "Waiting for image upload..." : "Publish Post"}</span>
      )}
    </button>
  );
}