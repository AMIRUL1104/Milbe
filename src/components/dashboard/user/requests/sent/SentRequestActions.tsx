"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, X } from "lucide-react";
import { toast } from "react-toastify";
import { cancelBookRequest } from "@/services/features/bookRequests";
import { getFriendlyApiError } from "@/lib/apiErrorMap";
import type { RequestStatus } from "@/interface/dashboard/request";

interface SentRequestActionsProps {
  status: RequestStatus;
  id: string;
}

export default function SentRequestActions({ status, id }: SentRequestActionsProps) {
  const router = useRouter();
  const [pendingAction, setPendingAction] = useState<"cancel" | null>(null);

  const handleCancelBookRequest = async () => {
    if (pendingAction || (status !== "pending" && status !== "accepted")) {
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

  const isPending = pendingAction !== null;

  return (
    <div>
      {(status === "accepted" || status === "pending") && (
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={handleCancelBookRequest}
            disabled={isPending}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-btn border border-border px-3.5 py-1.5 text-xs font-bold text-text-muted transition-colors hover:border-danger hover:bg-danger-light hover:text-danger max-sm:text-danger max-sm:bg-danger-light max-sm:border-danger  disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <X className="h-3.5 w-3.5" />
            )}
            <span>{isPending ? "Updating..." : "Cancel"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
