"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { generatePagination } from "./genaratePagination";

interface CustomPaginationProps {
  totalPages: number;
}

export default function CustomPagination({ totalPages }: CustomPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number | string) => {
    if (typeof page === "number") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(page));
      router.push(`?${params.toString()}`, { scroll: false });
    }
  };

  if (totalPages <= 1) return null;

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-1.5 bg-surface border border-border p-1.5 rounded-xl shadow-xs w-fit mx-auto mt-8">

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center text-text-secondary rounded-lg hover:bg-background disabled:opacity-40 disabled:hover:bg-transparent transition-base cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {allPages.map((page, index) => {
        const isCurrent = page === currentPage;
        const isDots = page === "...";

        return (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            disabled={isDots}
            className={`w-9 h-9 flex items-center justify-center text-xs sm:text-sm font-bold rounded-lg transition-base 
              ${isCurrent 
                ? "bg-primary text-text-inverse shadow-xs" 
                : isDots 
                  ? "text-text-muted cursor-default" 
                  : "text-text-secondary hover:bg-background cursor-pointer"
              }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center text-text-secondary rounded-lg hover:bg-background disabled:opacity-40 disabled:hover:bg-transparent transition-base cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

    </div>
  );
}