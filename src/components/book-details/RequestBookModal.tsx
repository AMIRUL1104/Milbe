"use client";

import { useEffect } from "react";
import { X, BookOpen, User, Sparkles } from "lucide-react";
import RequestBookForm from "./RequestBookForm";

interface RequestBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  requesterId?: string;
  postTitle: string;
  sellerName: string;
  defaultRequesterName?: string;
  defaultRequesterPhone?: string;
  defaultRequesterDistrict?: string;
  defaultRequesterArea?: string;
  onSuccess: () => void;
}

export default function RequestBookModal({
  isOpen,
  onClose,
  postId,
  requesterId,
  postTitle,
  sellerName,
  defaultRequesterName,
  defaultRequesterPhone,
  defaultRequesterDistrict,
  defaultRequesterArea,
  onSuccess,
}: RequestBookModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    // Body scroll lock
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // ESC Key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm transition-all animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      {/* Responsive Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] sm:max-h-[80vh] animate-in zoom-in-95 duration-200">

        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#35858E]/10 text-[#35858E] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#35858E]">
                রিকোয়েস্ট পাঠানোর কনফার্মেশন ফর্ম
              </p>
              <h2
                id="modal-title"
                className="text-base sm:text-lg font-bold text-slate-900 leading-snug"
              >
                বইটির জন্য রিকোয়েস্ট পাঠান
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            aria-label="মডাল বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content Container */}
        <div className="overflow-y-auto flex-1 divide-y divide-slate-100">

          {/* Post Summary Section */}
          <div className="px-5 py-4 sm:px-6 sm:py-5 bg-slate-50/70 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Book Info */}
              <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-200/70 shadow-2xs">
                <BookOpen className="w-4 h-4 text-[#35858E] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    বইয়ের শিরোনাম
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-1 mt-0.5">
                    {postTitle}
                  </p>
                </div>
              </div>

              {/* Seller Info */}
              <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-200/70 shadow-2xs">
                <User className="w-4 h-4 text-[#35858E] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    বিক্রেতার নাম
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-1 mt-0.5">
                    {sellerName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <div className="p-5 sm:p-6 bg-white">
            <RequestBookForm
              postId={postId}
              requesterId={requesterId}
              defaultRequesterPhone={defaultRequesterPhone}
              defaultRequesterDistrict={defaultRequesterDistrict}
              defaultRequesterArea={defaultRequesterArea}
              onCancel={onClose}
              onSuccess={onSuccess}
            />
          </div>

        </div>

      </div>
    </div>
  );
}