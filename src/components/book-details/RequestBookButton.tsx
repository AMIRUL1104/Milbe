"use client";

import { useEffect, useState } from "react";
import { HandHelping, Loader2, RefreshCw } from "lucide-react";
import { checkBookRequest } from "@/services/features/bookRequests";
import RequestBookModal from "./RequestBookModal";

type ButtonStatus =
  | "checking"
  | "can-request"
  | "already-requested"
  | "own-post"
  | "error";

interface RequestBookButtonProps {
  postId: string;
  requesterId?: string;
  postTitle: string;
  sellerName: string;
  requesterName?: string;
  requesterPhone?: string;
}

export default function RequestBookButton({
  postId,
  requesterId,
  postTitle,
  sellerName,
  requesterName,
  requesterPhone,
}: RequestBookButtonProps) {
  const [status, setStatus] = useState<ButtonStatus>("checking");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkAttempt, setCheckAttempt] = useState(0);

  useEffect(() => {
    if (!requesterId || !postId) {
      return;
    }

    let isMounted = true;

    const runCheck = async () => {
      try {
        // console.log("Checking book request status...");
        // console.log("postId:", postId);
        const result = await checkBookRequest(postId);
        // console.log("checkBookRequest result", result);
        if (!isMounted) return;

        if (!result.data) {
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
        if (isMounted) {
          setStatus("error");
        }
      }
    };

    void runCheck();

    return () => {
      isMounted = false;
    };
  }, [postId, requesterId, checkAttempt]);

  const handleRequestSuccess = () => {
    setIsModalOpen(false);
    setStatus("already-requested");
  };

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

  if (status === "error") {
    return (
      <button
        type="button"
        onClick={() => setCheckAttempt((current) => current + 1)}
        className="w-full inline-flex items-center justify-center gap-2 font-bold py-2.5 px-4 rounded-btn bg-danger-light text-danger border border-danger-border cursor-pointer hover:bg-danger hover:text-text-inverse"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Unable to check request status</span>
        <span>Retry</span>
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
        requesterId={requesterId}
        postTitle={postTitle}
        sellerName={sellerName}
        defaultRequesterName={requesterName}
        defaultRequesterPhone={requesterPhone}
        onSuccess={handleRequestSuccess}
      />
    </>
  );
}
