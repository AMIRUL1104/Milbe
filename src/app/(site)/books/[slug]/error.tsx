"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function BookDetailsError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen w-full bg-[#F5F7F8] flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <AlertCircle className="h-10 w-10 text-danger" />
        <h1 className="text-xl font-bold text-text-primary">
          বইটি লোড করা যায়নি
        </h1>
        <p className="text-sm text-text-muted">
          আবার চেষ্টা করুন অথবা কিছুক্ষণ পর ফিরে আসুন।
        </p>
        <button
          type="button"
          onClick={unstable_retry}
          className="mt-2 inline-flex items-center gap-2 rounded-btn bg-primary px-5 py-2.5 text-sm font-bold text-text-inverse transition-colors hover:bg-primary-hover"
        >
          <RefreshCw className="h-4 w-4" />
          আবার চেষ্টা করুন
        </button>
      </div>
    </main>
  );
}
