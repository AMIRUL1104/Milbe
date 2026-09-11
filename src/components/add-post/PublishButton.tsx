"use client";

import { Loader2 } from "lucide-react";

interface PublishButtonProps {
  isSubmitting: boolean;
  isUploading: boolean;
}

export default function PublishButton({
  isSubmitting,
  isUploading,
}: PublishButtonProps) {
  const disabled = isSubmitting || isUploading;

  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full inline-flex items-center justify-center gap-2 bg-accent text-accent-text font-bold py-3.5 px-5 rounded-btn hover:bg-accent-hover transition-base shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isSubmitting ? (
        <Loader2 className="w-5 h-5 animate-spin" />
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
