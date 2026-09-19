"use client";

import { useState } from "react";
import { Check, Loader2, X } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { acceptBookRequest, cancelBookRequest, rejectBookRequest } from "@/services/features/bookRequests";
import { getFriendlyApiError } from "@/lib/apiErrorMap";
import type { RequestStatus } from "@/interface/dashboard/request";

interface ReceiveRequestActionsProps {
  status: RequestStatus;
  id: string;
}

type PendingAction = "accept" | "reject" | "cancel";

export default function ReceiveRequestActions({
  status,
  id,
}: ReceiveRequestActionsProps) {
  const router = useRouter();
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null);
  const isPending = pendingAction !== null;

  const handleAcceptBookRequest = async () => {
    if (pendingAction || status !== "pending") {
      return;
    }

    setPendingAction("accept");
    try {
      await acceptBookRequest(id);
      toast.success("Request Accepted!");
      router.refresh();
    } catch (error) {
      toast.error(getFriendlyApiError(error));
    } finally {
      setPendingAction(null);
    }
  };

  const handleRejectBookRequest = async () => {
    if (pendingAction || status !== "pending") {
      return;
    }

    setPendingAction("reject");
    try {
      await rejectBookRequest(id);
      toast.success("Request Rejected!");
      router.refresh();
    } catch (error) {
      toast.error(getFriendlyApiError(error));
    } finally {
      setPendingAction(null);
    }
  };

  const handleCancelBookRequest = async () => {
    if (pendingAction || status !== "accepted") {
      return;
    }

    setPendingAction("cancel");
    try {
      await cancelBookRequest(id);
      toast.success("Request Cancelled!");
      router.refresh();
    } catch (error) {
      toast.error(getFriendlyApiError(error));
    } finally {
      setPendingAction(null);
    }
  };

  return (
    <div>
      {status === "pending" && (
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={handleAcceptBookRequest}
            disabled={isPending}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-btn bg-primary px-3.5 py-1.5 text-xs font-bold text-text-inverse shadow-sm transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pendingAction === "accept" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Check className="h-3.5 w-3.5" />
            )}
            <span>{pendingAction === "accept" ? "Updating..." : "Accept"}</span>
          </button>
          <button
            type="button"
            onClick={handleRejectBookRequest}
            disabled={isPending}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-btn border border-border px-3.5 py-1.5 text-xs font-bold text-text-muted transition-colors hover:border-danger hover:bg-danger-light hover:text-danger disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pendingAction === "reject" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <X className="h-3.5 w-3.5" />
            )}
            <span>{pendingAction === "reject" ? "Updating..." : "Reject"}</span>
          </button>
        </div>
      )}

      {status === "accepted" && (
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={handleCancelBookRequest}
            disabled={isPending}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-btn border border-border px-3.5 py-1.5 text-xs font-bold text-text-muted transition-colors hover:border-danger hover:bg-danger-light hover:text-danger disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pendingAction === "cancel" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <X className="h-3.5 w-3.5" />
            )}
            <span>{pendingAction === "cancel" ? "Updating..." : "Cancel"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
