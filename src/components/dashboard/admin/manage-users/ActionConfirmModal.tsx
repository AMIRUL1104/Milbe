"use client";

import { Loader2, X } from "lucide-react";

interface ActionConfirmModalProps {
  title: string;
  description: React.ReactNode;
  confirmLabel: string;
  tone: "warning" | "danger";
  isPending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ActionConfirmModal({
  title,
  description,
  confirmLabel,
  tone,
  isPending,
  onConfirm,
  onCancel,
}: ActionConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="action-confirm-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={!isPending ? onCancel : undefined}
      />

      <div className="relative z-10 mx-4 w-full max-w-md rounded-2xl border border-border-light bg-surface p-6 shadow-xl">
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="absolute right-4 top-4 cursor-pointer text-text-muted transition-colors hover:text-text-secondary disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <h2
          id="action-confirm-title"
          className="mb-1 pr-6 text-lg font-bold text-text-primary"
        >
          {title}
        </h2>
        <p className="mb-6 text-sm text-text-muted">{description}</p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="flex-1 cursor-pointer rounded-xl bg-background px-4 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:bg-background/80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
              tone === "danger"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-amber-500 hover:bg-amber-600"
            }`}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                অপেক্ষা করুন…
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}