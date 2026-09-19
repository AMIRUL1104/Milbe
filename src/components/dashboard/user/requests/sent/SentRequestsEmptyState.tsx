import Link from "next/link";
import { SendHorizontal } from "lucide-react";

export function SentRequestsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
        <SendHorizontal className="h-7 w-7 text-primary" />
      </div>
      <h3 className="text-lg font-bold text-text-primary">
        এখনো কোনো রিকোয়েস্ট পাঠানো হয়নি
      </h3>
      <p className="max-w-sm text-sm text-text-muted">
        উপলভ্য বই খুঁজুন এবং পছন্দের বইটিতে রিকোয়েস্ট পাঠান। পাঠানো
        রিকোয়েস্টগুলো এখানে দেখা যাবে।
      </p>
      <Link
        href="/"
        className="mt-2 rounded-btn bg-primary px-5 py-2.5 text-sm font-bold text-text-inverse shadow-md transition-colors hover:bg-primary-hover"
      >
        বই খুঁজুন
      </Link>
    </div>
  );
}
