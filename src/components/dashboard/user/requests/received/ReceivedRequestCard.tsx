"use client";

import Image from "next/image";
import { Calendar, MapPin, MessageSquare, Phone } from "lucide-react";
import type { ReceivedRequest } from "@/interface/dashboard/request";
import { ContactActions } from "../ContactActions";
import { StatusBadge } from "../StatusBadge";
import ReceiveRequestActions from "./ReceiveRequestActions";

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface ReceivedRequestCardProps {
  request: ReceivedRequest;
}

export function ReceivedRequestCard({ request }: ReceivedRequestCardProps) {
  const isAccepted = request.status === "accepted";
  const phone = request.requesterContact?.phone;

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

      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="font-bold text-text-primary">{request.requesterName}</p>
            <span className="flex items-center gap-1 text-xs text-text-muted">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(request.requestDate)}
            </span>
            {(request.requesterArea || request.requesterDistrict) && (
              <span className="mt-0.5 flex items-center gap-1 text-xs text-text-muted">
                <MapPin className="h-3.5 w-3.5" />
                {[request.requesterArea, request.requesterDistrict]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            )}
          </div>
          <StatusBadge status={request.status} />
        </div>

        {request.message && (
          <p className="flex items-start gap-1.5 rounded-lg bg-background p-2.5 text-xs text-text-secondary">
            <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-text-muted" />
            <span>{request.message}</span>
          </p>
        )}

        {/* Accepted অবস্থায় রিকোয়েস্টারের কন্টাক্ট ইনফো ডিসপ্লে */}
        {isAccepted && phone && (
          <div className="flex items-center justify-between gap-2 rounded-lg border border-primary/20 bg-primary-light/40 p-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Phone className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase text-text-muted">Requester Contact</p>
                <p className="truncate text-xs font-bold text-text-primary">{phone}</p>
              </div>
            </div>

            <ContactActions phone={phone} />
          </div>
        )}

        <ReceiveRequestActions status={request.status} id={request.id} />
      </div>
    </div>
  );
}