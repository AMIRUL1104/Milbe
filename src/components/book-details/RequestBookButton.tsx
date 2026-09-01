"use client";

import { useEffect, useState } from "react";
import { HandHelping, Loader2 } from "lucide-react";
import { checkBookRequest } from "@/services/features/bookRequests";
import RequestBookModal from "./RequestBookModal";

type ButtonStatus =
  | "checking"
  | "can-request"
  | "already-requested"
  | "own-post";

interface RequestBookButtonProps {
  postId: string;
  sellerId: string;
  requesterId?: string;
  postTitle: string;
  sellerName: string;
  bookCoverUrl: string;
  sellerPhone: string;
  sellerMessenger?: string;
  requesterName?: string;
  requesterPhone?: string;
  requesterAvatarUrl?: string | null;
}

export default function RequestBookButton({
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
}: RequestBookButtonProps) {
  const [status, setStatus] = useState<ButtonStatus>("checking");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const runCheck = async () => {
      const result = await checkBookRequest(postId, sellerId, requesterId as string);
      if (!isMounted) return;

      if (!result.success || !result.data) {
        setStatus("already-requested");
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
    };

    runCheck();

    return () => {
      isMounted = false;
    };
  }, [postId, sellerId, requesterId]);

  const handleRequestSuccess = () => {
    setIsModalOpen(false);
    setStatus("already-requested");
  };

  if (status === "checking") {
    return (
      <button
        type="button"
        disabled
        className="w-full inline-flex items-center justify-center gap-2 font-bold py-2.5 px-4 rounded-btn bg-background text-text-muted border border-border cursor-not-allowed"
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Checking...</span>
      </button>
    );
  }

  if (!requesterId) {
    return (
      <button
        type="button"
        disabled
        className="w-full inline-flex items-center justify-center gap-2 font-bold py-2.5 px-4 rounded-btn bg-background text-text-muted border border-border cursor-not-allowed"
      >
        <span>Login to Request</span>
      </button>
    );
  }

  if (status === "own-post") {
    return (
      <button
        type="button"
        disabled
        className="w-full inline-flex items-center justify-center gap-2 font-bold py-2.5 px-4 rounded-btn bg-background text-text-muted border border-border cursor-not-allowed"
      >
        <span>Your Post</span>
      </button>
    );
  }

  if (status === "already-requested") {
    return (
      <button
        type="button"
        disabled
        className="w-full inline-flex items-center justify-center gap-2 font-bold py-2.5 px-4 rounded-btn bg-background text-text-muted border border-border cursor-not-allowed"
      >
        <span>Requested ✓</span>
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="w-full inline-flex items-center justify-center gap-2 font-bold py-2.5 px-4 rounded-btn transition-base shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-primary-focus bg-primary hover:bg-primary-hover text-text-inverse"
      >
        <HandHelping className="w-4 h-4" />
        <span>Request This Book</span>
      </button>

      <RequestBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postId={postId}
        sellerId={sellerId}
        requesterId={requesterId ?? ""}
        postTitle={postTitle}
        sellerName={sellerName}
        bookCoverUrl={bookCoverUrl}
        sellerPhone={sellerPhone}
        sellerMessenger={sellerMessenger}
        requesterName={requesterName}
        requesterPhone={requesterPhone}
        requesterAvatarUrl={requesterAvatarUrl}
        onSuccess={handleRequestSuccess}
      />
    </>
  );
}