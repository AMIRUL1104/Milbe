import { Calendar } from "lucide-react";
import type { AdminRequest } from "@/interface/dashboard/request";
import { RequestStatusBadge } from "./RequestStatusBadge";

function formatDate(value: Date | string | undefined): string {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface RequestMobileCardProps {
  request: AdminRequest;
}

export function RequestMobileCard({ request }: RequestMobileCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-card border border-border-light bg-surface p-4 shadow-sm">
      {request.bookCoverUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={request.bookCoverUrl}
          alt={request.postTitle}
          className="h-14 w-10 shrink-0 rounded object-cover"
        />
      ) : (
        <div className="flex h-14 w-10 shrink-0 items-center justify-center rounded bg-background text-xs font-bold text-text-muted">
          —
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="truncate font-bold text-text-primary">
          {request.postTitle}
        </p>
        <p className="truncate text-xs text-text-muted">
          Buyer: {request.requesterName} · Seller: {request.sellerName}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <RequestStatusBadge status={request.status} />
        </div>

        <span className="flex items-center gap-1 text-xs text-text-muted">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(request.createdAt ?? request.requestDate)}
        </span>
      </div>
    </div>
  );
}
