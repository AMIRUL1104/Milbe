import Link from "next/link";
import { FileQuestion, Inbox, PlusCircle } from "lucide-react";

export function NoPostsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary-light">
        <PlusCircle className="h-7 w-7 text-secondary" />
      </div>
      <h3 className="text-lg font-bold text-text-primary">
        You haven&apos;t posted any books yet
      </h3>
      <p className="max-w-sm text-sm text-text-muted">
        Create your first post to start receiving requests from other
        students.
      </p>
      <Link
        href="/posts/add"
        className="mt-2 rounded-btn bg-primary px-5 py-2.5 text-sm font-bold text-text-inverse shadow-md transition-colors hover:bg-primary-hover"
      >
        Create a Post
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
      <h3 className="text-lg font-bold text-text-primary">No requests yet</h3>
      <p className="max-w-sm text-sm text-text-muted">
        This post hasn&apos;t received any requests yet. Check back later!
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
      <h3 className="text-lg font-bold text-text-primary">No matching requests</h3>
      <p className="max-w-sm text-sm text-text-muted">
        Try adjusting your search or filter to find what you&apos;re looking
        for.
      </p>
    </div>
  );
}