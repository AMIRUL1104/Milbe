"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "react-toastify";

interface ContactActionsProps {
  /** Unlocked phone number — only rendered after the request is accepted */
  phone: string;
}

/**
 * Call + Copy action cluster for an unlocked contact number.
 * Shared by ReceivedRequestCard and SentRequestCard so the copy
 * interaction logic lives in exactly one place.
 */
export function ContactActions({ phone }: ContactActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopied(true);
    toast.success("Phone number copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-1 shrink-0">
      <a
        href={`tel:${phone}`}
        className="inline-flex items-center justify-center rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-text-inverse shadow-xs transition-colors hover:bg-primary-hover"
      >
        Call
      </a>
      <button
        type="button"
        onClick={handleCopyPhone}
        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-text-muted transition-colors hover:bg-background hover:text-text-primary"
        title="Copy phone number"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}
