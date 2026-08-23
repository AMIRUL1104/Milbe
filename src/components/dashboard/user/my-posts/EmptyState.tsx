import Link from "next/link";
import { BookOpen, PlusCircle } from "lucide-react";

interface EmptyStateProps {
  hasActiveFilters?: boolean;
}

export default function EmptyState({
  hasActiveFilters = false,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-surface rounded-card border border-border-light shadow-sm py-16 px-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-light text-primary mb-5">
        <BookOpen className="w-8 h-8" />
      </div>
      <h2 className="text-lg font-bold text-text-primary">
        {hasActiveFilters ? "No posts match your search" : "No posts yet"}
      </h2>
      <p className="text-sm text-text-muted mt-1.5 max-w-sm">
        {hasActiveFilters
          ? "Try adjusting your search, filter, or sort options."
          : "Start sharing your academic books with students who need them — sell or donate in just a few steps."}
      </p>
      {!hasActiveFilters && (
        <Link
          href="/books/add"
          className="inline-flex items-center gap-2 mt-6 bg-primary hover:bg-primary-hover text-text-inverse font-bold text-sm py-2.5 px-5 rounded-btn transition-base shadow-md"
        >
          <PlusCircle className="w-4 h-4" />
          Create Your First Post
        </Link>
      )}
    </div>
  );
}