"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import RequestBookForm from "./RequestBookForm";

interface RequestBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  sellerId: string;
  requesterId: string;
  postTitle: string;
  sellerName: string;
  bookCoverUrl: string;
  sellerPhone: string;
  sellerMessenger?: string;
  requesterName?: string;
  requesterPhone?: string;
  requesterAvatarUrl?: string | null;
  onSuccess: () => void;
}

export default function RequestBookModal({
  isOpen,
  onClose,
  postId,
  sellerId,
  requesterId,
  postTitle,
  sellerName,
  bookCoverUrl,
  sellerPhone,
  sellerMessenger,
  requesterName,
  requesterPhone,
  requesterAvatarUrl,
  onSuccess,
}: RequestBookModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 my-3.5 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-overlay-dark backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative my-4 w-full max-w-md bg-surface rounded-card shadow-lg border border-border-light max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light">
          <h2 className="text-base font-bold text-text-primary">
            Request This Book
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-text-muted hover:text-text-secondary hover:bg-background transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pt-4 pb-3 space-y-3 border-b border-border-light">
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">
              Post Title
            </p>
            <p className="text-sm text-text-primary mt-0.5">{postTitle}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">
              Seller Name
            </p>
            <p className="text-sm text-text-primary mt-0.5">{sellerName}</p>
          </div>
        </div>

        <RequestBookForm
          postId={postId}
          sellerId={sellerId}
          requesterId={requesterId}
          postTitle={postTitle}
          sellerName={sellerName}
          bookCoverUrl={bookCoverUrl}
          sellerPhone={sellerPhone}
          sellerMessenger={sellerMessenger}
          defaultRequesterName={requesterName}
          defaultRequesterPhone={requesterPhone}
          requesterAvatarUrl={requesterAvatarUrl}
          onCancel={onClose}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
}