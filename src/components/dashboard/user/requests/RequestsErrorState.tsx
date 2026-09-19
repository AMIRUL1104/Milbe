"use client";

import { useRouter } from "next/navigation";
import { AlertCircle, RefreshCw } from "lucide-react";

export function RequestsErrorState() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-border bg-surface px-6 py-16 text-center">
      <AlertCircle className="h-10 w-10 text-danger" />
      <h3 className="text-lg font-bold text-text-primary">
        রিকোয়েস্ট লোড করা যায়নি
      </h3>
      <p className="max-w-sm text-sm text-text-muted">
        আবার চেষ্টা করুন অথবা কিছুক্ষণ পর ফিরে আসুন।
      </p>
      <button
        type="button"
        onClick={() => router.refresh()}
        className="mt-2 inline-flex items-center gap-2 rounded-btn bg-primary px-5 py-2.5 text-sm font-bold text-text-inverse shadow-md transition-colors hover:bg-primary-hover"
      >
        <RefreshCw className="h-4 w-4" />
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
