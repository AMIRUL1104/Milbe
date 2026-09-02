import Link from "next/link";
import { FileQuestion, Inbox, PlusCircle } from "lucide-react";

export function NoPostsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary-light">
        <PlusCircle className="h-7 w-7 text-secondary" />
      </div>
      <h3 className="text-lg font-bold text-text-primary">
        আপনি এখনো কোনো বই পোস্ট করেননি
      </h3>
      <p className="max-w-sm text-sm text-text-muted">
        অন্য শিক্ষার্থীদের কাছ থেকে রিকোয়েস্ট পেতে আপনার প্রথম পোস্ট তৈরি করুন।
      </p>
      <Link
        href="/posts/add"
        className="mt-2 rounded-btn bg-primary px-5 py-2.5 text-sm font-bold text-text-inverse shadow-md transition-colors hover:bg-primary-hover"
      >
        পোস্ট তৈরি করুন
      </Link>
    </div>
  );
}

export function NoRequestsForPostEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light">
        <Inbox className="h-7 w-7 text-primary" />
      </div>
      <h3 className="text-lg font-bold text-text-primary">এখনো কোনো রিকোয়েস্ট নেই</h3>
      <p className="max-w-sm text-sm text-text-muted">
        এই পোস্টে এখনো কোনো রিকোয়েস্ট আসেনি। পরে আবার চেক করুন!
      </p>
    </div>
  );
}

export function NoMatchingRequestsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background">
        <FileQuestion className="h-7 w-7 text-text-muted" />
      </div>
      <h3 className="text-lg font-bold text-text-primary">কোনো মিল রিকোয়েস্ট নেই</h3>
      <p className="max-w-sm text-sm text-text-muted">
        সার্চ বা ফিল্টার পরিবর্তন করে চেষ্টা করুন।
      </p>
    </div>
  );
}