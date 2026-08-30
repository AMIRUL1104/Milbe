"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { cancelBookRequest } from "@/services/features/bookRequests";

interface SentRequestActionsProps {
  status: string;
  id: string;
}

export default function SentRequestActions({ status, id }: SentRequestActionsProps) {
  const router = useRouter();

  const handleCancelBookRequest = async () => {
    const res = await cancelBookRequest(id);
    if (res.success) {
      toast.success("Request Cancelled!");
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div>
      {(status === "accepted" || status === "pending") && (
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={handleCancelBookRequest}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-btn border border-border px-3.5 py-1.5 text-xs font-bold text-text-muted transition-colors hover:border-danger hover:bg-danger-light hover:text-danger"
          >
            <X className="h-3.5 w-3.5" />
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}