"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Trash2, Loader2, TriangleAlert, X } from "lucide-react";
import { toast } from "react-toastify";
import { deletePost } from "@/services/features/posts";

interface DeleteButtonProps {
  postId: string;
  postTitle: string;
  onDeleted: (postId: string) => void;
  /** Optional custom trigger node rendered inside the open-modal button. */
  trigger?: React.ReactNode;
  /** Classes for the trigger button (used when placed inside the Action Group). */
  triggerClassName?: string;
}

export default function DeleteButton({
  postId,
  postTitle,
  onDeleted,
  trigger,
  triggerClassName,
}: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleConfirmDelete() {
    setIsDeleting(true);
    try {
      const response = await deletePost(postId);

      if (response?.success) {
        toast.success("পোস্টটি সফলভাবে ডিলিট করে ফেলা হয়েছে।");
        setIsOpen(false);
        onDeleted(postId);
      } else {
        toast.error(response?.message ?? "পোস্টটি ডিলিট করা যায়নি। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`${postTitle} — ডিলিট করুন`}
        className={
          triggerClassName ??
          "absolute top-3 right-3 z-10 p-2 rounded-xl bg-surface/90 backdrop-blur text-danger shadow-md transition-base duration-200 hover:bg-danger hover:text-text-inverse cursor-pointer"
        }
      >
        {trigger ?? <Trash2 className="w-4 h-4" />}
      </button>

      {/* Confirmation modal is rendered through a portal on <body> so it is
          never clipped or width-constrained by any ancestor with
          backdrop-blur / transform / filter (which create a containing
          block for fixed-position elements). */}
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-overlay-dark backdrop-blur-sm transition-opacity"
              onClick={() => !isDeleting && setIsOpen(false)}
            />

            <div className="relative w-full max-w-[360px] transform overflow-hidden rounded-card bg-surface p-6 text-left align-middle shadow-xl transition-all z-10 animate-in fade-in zoom-in-95 duration-200">

              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-text-muted hover:text-text-secondary transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger-light text-danger">
                  <TriangleAlert className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold leading-6 text-text-primary">
                  পোস্টটি ডিলিট করে ফেলবেন?
                </h3>
              </div>

              <div className="mt-2">
                <p className="text-sm text-text-muted leading-relaxed">
                  আপনি কি নিশ্চিত? পোস্টটি ডিলিট করে ফেললে এটি আর ফিরিয়ে আনা যাবে না।
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-text-secondary bg-background hover:bg-background/80 rounded-btn transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  থাকুক
                </button>

                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleConfirmDelete}
                  className="flex-1 px-4 py-2 text-sm font-medium text-text-inverse bg-danger hover:bg-danger-hover rounded-btn transition-colors flex items-center justify-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "ডিলিট করুন"
                  )}
                </button>
              </div>

            </div>
          </div>,
          document.body
        )}
    </>
  );
}