import Link from "next/link";
import { SendHorizonal } from "lucide-react";

export function SentRequestsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
        <SendHorizonal className="h-7 w-7 text-primary" />
      </div>
      <h3 className="text-lg font-bold text-text-primary">No requests sent yet</h3>
      <p className="max-w-sm text-sm text-text-muted">
        Browse available books and send a request to the seller when you find
        one you like. Your requests will show up here.
      </p>
      <Link
        href="/browse"
        className="mt-2 rounded-btn bg-primary px-5 py-2.5 text-sm font-bold text-text-inverse shadow-md transition-colors hover:bg-primary-hover"
      >
        Browse Books
      </Link>
    </div>
  );
}