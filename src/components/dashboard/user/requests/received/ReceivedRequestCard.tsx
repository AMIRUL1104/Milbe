import Image from "next/image";
import { Calendar, MessageSquare } from "lucide-react";
import type { ReceivedRequest } from "@/interface/dashboard/request";
import { StatusBadge } from "../StatusBadge";
import ReceiveRequestActions from "./ReceiveRequestActions";

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ReceivedRequestCard({ request }: ReceivedRequestCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-border-light bg-surface p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-start sm:gap-4">
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-secondary-light">
        {request.requesterAvatarUrl ? (
          <Image
            src={request.requesterAvatarUrl}
            alt={request.requesterName}
            fill
            sizes="44px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-bold text-success-text">
            {request.requesterName.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="font-bold text-text-primary">{request.requesterName}</p>
            <span className="flex items-center gap-1 text-xs text-text-muted">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(request.requestDate)}
            </span>
          </div>
          <StatusBadge status={request.status} />
        </div>

        {request.message && (
          <p className="flex items-start gap-1.5 rounded-lg bg-background p-2.5 text-xs text-text-secondary">
            <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-text-muted" />
            <span>{request.message}</span>
          </p>
        )}

        <ReceiveRequestActions status={request.status} id={request.id} />

      </div>
    </div>
  );
}

interface ReceivedRequestCardProps {
  request: ReceivedRequest;
}