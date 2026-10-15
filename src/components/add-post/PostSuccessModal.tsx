"use client";

import { useEffect, useRef } from "react";
import { X, Share2, Plus, FileText, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface PostSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  imageUrl: string | null;
  sharePath: string | null;
  notice?: string;
}

export default function PostSuccessModal({
  isOpen,
  onClose,
  mode,
  imageUrl,
  sharePath,
  notice,
}: PostSuccessModalProps) {
  const router = useRouter();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Safe window access for SSR/hydration
  const shareUrl = typeof window !== "undefined" && sharePath ? `${window.location.origin}${sharePath}` : "";

  useEffect(() => {
    if (!isOpen) return;
    closeBtnRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const handleShare = async () => {
    if (!shareUrl) return;

    const title = mode === "create" ? "নতুন বই পোস্ট" : "আপডেট করা বই";

    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
        return;
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("লিংক কপি হয়েছে!");
    } catch {
      toast.error("লিংক কপি করা যায়নি। ম্যানুয়ালি কপি করুন।");
    }
  };

  const handlePostAnother = () => {
    onClose();
    if (mode === "create") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/add-post");
    }
  };

  const handleMyPosts = () => {
    onClose();
    router.push("/dashboard/user/posts");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* ব্যাকড্রপ ব্লার */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      {/* মেইন কন্টেইনার - ১০০% রেসপন্সিভ */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md my-auto max-h-[90vh] flex flex-col bg-surface border border-border-light rounded-2xl sm:rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">

        {/* ক্লোজ বাটন */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="বন্ধ করুন"
          className="absolute right-3.5 top-3.5 z-20 p-2 rounded-full bg-background/80 hover:bg-surface-hover text-text-muted hover:text-text-primary transition-colors cursor-pointer shadow-sm"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* স্ক্রিনেবল বডি */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">

          {/* সাকসেস আইকন ও হেডিং */}
          <div className="text-center pt-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-success-light text-success mx-auto mb-3 flex items-center justify-center shadow-inner">
              <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <h2
              id="success-modal-title"
              className="text-base sm:text-lg font-bold text-text-primary px-2 leading-snug"
            >
              {mode === "create"
                ? "বইটি সফলভাবে প্রকাশিত হয়েছে!"
                : "বইটি সফলভাবে আপডেট হয়েছে!"}
            </h2>
          </div>

          {/* বইয়ের ইমেজ প্রিভিউ */}
          <div className="relative aspect-[4/3] w-full max-w-[260px] sm:max-w-xs mx-auto rounded-xl border border-border-light overflow-hidden bg-background shadow-sm">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="প্রকাশিত বই"
                fill
                unoptimized
                sizes="(max-width: 640px) 80vw, 300px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-muted">
                <svg
                  className="w-12 h-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            )}
          </div>

          {/* নোটিশ (যদি থাকে) */}
          {notice && (
            <p className="text-xs sm:text-sm text-text-muted text-center px-2 bg-background/50 py-2 rounded-lg border border-border-light">
              {notice}
            </p>
          )}

          {/* অ্যাকশন বাটনসমূহ */}
          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={handleShare}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-text-inverse font-semibold text-sm sm:text-base py-3 px-5 rounded-xl hover:bg-primary-hover transition-all shadow-md active:scale-[0.98] cursor-pointer focus-visible:outline-2 focus-visible:outline-primary-focus"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              বইটি শেয়ার করুন
            </button>

            <button
              type="button"
              onClick={handlePostAnother}
              className="w-full inline-flex items-center justify-center gap-2 bg-surface border border-border text-primary hover:bg-surface-hover hover:border-primary font-semibold text-sm sm:text-base py-3 px-5 rounded-xl transition-all active:scale-[0.98] cursor-pointer focus-visible:outline-2 focus-visible:outline-primary-focus"
            >
              <Plus className="main-icon w-4 h-4 sm:w-5 sm:h-5" />
              আরেকটি বই পোস্ট করুন
            </button>

            <button
              type="button"
              onClick={handleMyPosts}
              className="w-full inline-flex items-center justify-center gap-2 bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover font-medium text-sm sm:text-base py-2.5 px-5 rounded-xl transition-all active:scale-[0.98] cursor-pointer focus-visible:outline-2 focus-visible:outline-primary-focus"
            >
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              আমার পোস্ট
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}