"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface UsersPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function UsersPagination({
  currentPage,
  totalPages,
  onPageChange,
}: UsersPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1.5">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex h-9 items-center gap-1 rounded-xl border border-border bg-surface px-3 text-sm font-semibold text-text-secondary transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-bold transition-colors ${
            page === currentPage
              ? "border-primary bg-primary text-text-inverse"
              : "border-border bg-surface text-text-secondary hover:border-primary hover:text-primary"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex h-9 items-center gap-1 rounded-xl border border-border bg-surface px-3 text-sm font-semibold text-text-secondary transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}