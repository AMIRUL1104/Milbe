"use client";

import { useCallback, useEffect, useState } from "react";
import { HandHelping, Loader2, LogIn, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { checkBookRequest } from "@/services/features/bookRequests";
import RequestBookModal from "./RequestBookModal";

type ButtonStatus =
  | "checking"
  | "can-request"
  | "already-requested"
  | "own-post"
  | "not-logged-in"
  | "error";

interface RequestBookButtonProps {
  postId: string;
  requesterId?: string;
  postTitle: string;
  sellerName: string;
  requesterPhone?: string;
}

export default function RequestBookButton({
  postId,
  requesterId,
  postTitle,
  sellerName,
  requesterPhone,
}: RequestBookButtonProps) {
  const [status, setStatus] = useState<ButtonStatus>("checking");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refreshStatus = useCallback(async () => {
    // 1. User login na thakle direct 'not-logged-in' set hobe
    if (!requesterId) {
      setStatus("not-logged-in");
      return;
    }

    // 2. Post ID na thakle error
    if (!postId) {
      setStatus("error");
      return;
    }

    setStatus("checking");

    try {
      const result = await checkBookRequest(postId);

      if (!result?.data) {
        setStatus("error");
        return;
      }

      if (result.data.reason === "own_post") {
        setStatus("own-post");
        return;
      }

      if (result.data.reason === "already_requested") {
        setStatus("already-requested");
        return;
      }

      setStatus(result.data.canRequest ? "can-request" : "already-requested");
    } catch {
      setStatus("error");
    }
  }, [postId, requesterId]);

  const handleRequestSuccess = () => {
    setStatus("already-requested");
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Cascading render error rodhe queueMicrotask ba async scheduler bebohar kora hoyeche
    let isMounted = true;

    queueMicrotask(() => {
      if (isMounted) {
        void refreshStatus();
      }
    });

    return () => {
      isMounted = false;
    };
  }, [refreshStatus]);

  if (status === "not-logged-in") {
    return (
      <Link
        href={`/auth/signin?callbackUrl=/books/${postId}`}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#35858E] px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#2c6e76]"
      >
        <LogIn className="h-4 w-4" />
        <span>রিকোয়েস্ট করতে লগইন করুন</span>
      </Link>
    );
  }

  if (status === "checking") {
    return (
      <button
        type="button"
        disabled
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-400"
      >
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>যাচাই করা হচ্ছে...</span>
      </button>
    );
  }

  if (status === "own-post") {
    return (
      <div className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-center text-xs font-semibold text-slate-600">
        এটি আপনার নিজের তৈরি করা পোস্ট
      </div>
    );
  }

  if (status === "already-requested") {
    return (
      <button
        type="button"
        disabled
        className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-bold text-slate-500"
      >
        <span>রিকোয়েস্ট পাঠানো হয়েছে ✓</span>
      </button>
    );
  }

  if (status === "error") {
    return (
      <button
        type="button"
        onClick={() => void refreshStatus()}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition-colors hover:bg-red-100"
      >
        <RefreshCcw className="h-4 w-4" />
        <span>আবার চেষ্টা করুন</span>
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#35858E] px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#2c6e76]"
      >
        <HandHelping className="h-4 w-4" />
        <span>রিকোয়েস্ট পাঠান</span>
      </button>

      <RequestBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postId={postId}
        requesterId={requesterId}
        postTitle={postTitle}
        sellerName={sellerName}
        defaultRequesterPhone={requesterPhone}
        onSuccess={handleRequestSuccess}
      />
    </>
  );
}