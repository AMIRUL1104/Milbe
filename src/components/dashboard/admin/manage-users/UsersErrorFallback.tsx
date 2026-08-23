"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export function UsersErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-card border border-danger-border bg-surface px-6 py-16 text-center shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger-light">
        <AlertTriangle className="h-7 w-7 text-danger" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-text-primary">
          Failed to load users
        </h3>
        <p className="mt-1 text-sm text-text-muted">
          Something went wrong while fetching users.
        </p>
      </div>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="inline-flex items-center gap-2 rounded-btn bg-primary px-5 py-2.5 text-sm font-bold text-text-inverse shadow-md transition-colors hover:bg-primary-hover"
      >
        <RefreshCw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
}