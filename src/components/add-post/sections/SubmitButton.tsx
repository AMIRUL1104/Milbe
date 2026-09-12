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
  const isLoading = isSubmitting || isUploading;
  const disabled = isLoading;

  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-text-inverse font-bold py-2.5 px-6 rounded-btn transition-base shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-primary-focus"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>বই পোস্ট হচ্ছে...</span>
        </>
      ) : (
        <>
          পোস্ট প্রকাশ করুন
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </>
      )}
    </button>
  );
}