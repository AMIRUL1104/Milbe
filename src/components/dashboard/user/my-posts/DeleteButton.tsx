"use client";

import { useState } from "react";
import { Trash2, Loader2, TriangleAlert, X } from "lucide-react";
import { toast } from "react-toastify";
import { deletePost } from "@/services/features/posts";

interface DeleteButtonProps {
  postId: string;
  postTitle: string;
  onDeleted: (postId: string) => void;
}

export default function DeleteButton({
  postId,
  postTitle,
  onDeleted,
}: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleConfirmDelete() {
    setIsDeleting(true);
    try {
      const response = await deletePost(postId);

      if (response?.success) {
        toast.success("Post deleted successfully.");
        setIsOpen(false);
        onDeleted(postId);
      } else {
        toast.error(response?.message ?? "Failed to delete post.");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
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
        aria-label={`Delete ${postTitle}`}
        className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-surface/90 backdrop-blur text-danger shadow-md opacity-0 group-hover:opacity-100 transition-base duration-200 hover:bg-danger hover:text-text-inverse cursor-pointer"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {isOpen && (
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
                Delete this post?
              </h3>
            </div>

            <div className="mt-2">
              <p className="text-sm text-text-muted leading-relaxed">
                Are you sure you want to delete this post? This
                action cannot be undone.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-text-secondary bg-background hover:bg-background/80 rounded-btn transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
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
                  "Delete"
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}