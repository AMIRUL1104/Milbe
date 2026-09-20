"use client";

/**
 * Route-level error boundary for the home page.
 *
 * The home page already isolates its own API failures (nearby/all-books
 * sections catch independently), so this boundary only fires for
 * unexpected render/session-layer throws — keeping the homepage from
 * ever presenting a blank/broken screen (spec §18).
 */

export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full min-h-[60vh] bg-[#F5F7F8] font-sans flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center rounded-card border border-danger/30 bg-surface px-6 py-10">
        <p className="text-2xl font-bold text-text-primary">
          কিছু একটা ভুল হয়েছে
        </p>
        <p className="mt-3 text-sm text-text-muted">
          দুঃখিত! Homepage লোড করতে সমস্যা হচ্ছে। আবার চেষ্টা করুন।
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-btn bg-primary px-4 py-2.5 text-sm font-semibold text-text-inverse hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-primary-focus"
        >
          আবার চেষ্টা করুন
        </button>
        {error.digest && (
          <p className="mt-4 text-xs text-text-muted">Ref: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
