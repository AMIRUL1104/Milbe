"use client";

// src/components/dashboard/admin/ManagePostsTable.tsx

import { useState } from "react";
import Image from "next/image";
import { Trash2, X, BookOpen } from "lucide-react";
import { BookItem } from "@/interface/post related/postDetails";
import { deletePost } from "@/services/features/posts";


// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    available: "bg-[#7DA78C]/15 text-[#3E6B4F]",
    sold: "bg-[#FCDE70]/25 text-[#8A6D1D]",
    donated: "bg-blue-50 text-blue-600",
  };
  const cls = map[status] ?? "bg-gray-100 text-gray-500";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${cls}`}
    >
      {status}
    </span>
  );
}

function conditionBadge(condition: string) {
  const map: Record<string, string> = {
    excellent: "bg-[#35858E]/10 text-[#35858E]",
    good: "bg-blue-50 text-blue-600",
    fair: "bg-orange-50 text-orange-500",
    poor: "bg-red-50 text-red-400",
  };
  const cls = map[condition.toLowerCase()] ?? "bg-gray-100 text-gray-500";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium capitalize ${cls}`}
    >
      {condition}
    </span>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

interface ToastState {
  message: string;
  type: "success" | "error";
}

function Toast({
  toast,
  onClose,
}: {
  toast: ToastState;
  onClose: () => void;
}) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold border transition-all duration-300 ${toast.type === "success"
        ? "bg-white border-[#7DA78C]/40 text-[#3E6B4F]"
        : "bg-white border-red-200 text-red-600"
        }`}
    >
      <span>{toast.message}</span>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Delete Modal ─────────────────────────────────────────────────────────────

interface DeleteModalProps {
  postTitle: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteModal({
  postTitle,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={!isDeleting ? onCancel : undefined}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-2xl shadow-xl border border-[#EDF1F2] p-6">
        <button
          onClick={onCancel}
          disabled={isDeleting}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-red-500 mb-4">
          <Trash2 className="w-6 h-6" />
        </div>

        <h2
          id="modal-title"
          className="text-lg font-bold text-gray-800 mb-1"
        >
          Delete Post?
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          <span className="font-medium text-gray-700">{postTitle} </span> will
          be permanently deleted. This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Deleting…
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#35858E]/10 text-[#35858E] mb-4">
        <BookOpen className="w-7 h-7" />
      </div>
      <p className="text-base font-semibold text-gray-700">No posts yet</p>
      <p className="text-sm text-gray-400 mt-1">
        Posts listed by users will appear here.
      </p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface ManagePostsTableProps {
  initialPosts: BookItem[];
}

export default function ManagePostsTable({
  initialPosts,
}: ManagePostsTableProps) {
  const [posts, setPosts] = useState<BookItem[]>(initialPosts);
  const [targetPost, setTargetPost] = useState<BookItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  function showToast(message: string, type: ToastState["type"]) {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleConfirmDelete() {
    if (!targetPost) return;
    setIsDeleting(true);
    try {
      const res = await deletePost(targetPost._id);
      if (res.success) {
        setPosts((prev) => prev.filter((p) => p._id !== targetPost._id));
        showToast("Post deleted successfully.", "success");
      } else {
        showToast(res.message, "error");
      }
    } catch {
      showToast("Failed to delete post. Please try again.", "error");
    } finally {
      setIsDeleting(false);
      setTargetPost(null);
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#EDF1F2] shadow-sm overflow-hidden">
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#EDF1F2] bg-[#F5F7F8]">
                  {[
                    "Book",
                    "Publisher",
                    "Price",
                    "Condition",
                    "Status",
                    "Seller",
                    "Listed On",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDF1F2]">
                {posts.map((post) => {
                  const book = post.books[0];
                  return (
                    <tr
                      key={post._id}
                      className="hover:bg-[#F5F7F8] transition-colors duration-150"
                    >
                      {/* Book image + title */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3 min-w-[200px]">
                          <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-[#EDF1F2] shrink-0">
                            {post.image ? (
                              <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <BookOpen className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-800 leading-tight line-clamp-2 max-w-[200px]">
                              {post.title}
                            </p>
                            {book?.bookName && (
                              <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[200px]">
                                {book.bookName}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Publisher */}
                      <td className="px-5 py-4 text-gray-600 whitespace-nowrap max-w-[140px] truncate">
                        {book?.publisherName || (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>

                      {/* Price */}
                      <td className="px-5 py-4 font-semibold text-gray-800 whitespace-nowrap">
                        {book?.price != null ? (
                          <>৳{book.price.toLocaleString()}</>
                        ) : (
                          <span className="text-gray-300 font-normal">—</span>
                        )}
                      </td>

                      {/* Condition */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        {book?.condition ? (
                          conditionBadge(book.condition)
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        {statusBadge(post.status)}
                      </td>

                      {/* Seller */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <p className="font-medium text-gray-700">
                          {post.sellerName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {post.sellerEmail}
                        </p>
                      </td>

                      {/* Listed On */}
                      <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                        {formatDate(post.publishedAt)}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <button
                          onClick={() => setTargetPost(post)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                          aria-label={`Delete ${post.title}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Row count footer */}
            <div className="px-5 py-3 border-t border-[#EDF1F2] bg-[#F5F7F8]">
              <p className="text-xs text-gray-400">
                {posts.length} post{posts.length !== 1 ? "s" : ""} total
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {targetPost && (
        <DeleteModal
          postTitle={targetPost.title}
          isDeleting={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => !isDeleting && setTargetPost(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast toast={toast} onClose={() => setToast(null)} />
      )}
    </>
  );
}
