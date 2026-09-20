"use client";

import { useState } from "react";
import { PostItem } from "@/interface/post/types";
import BookCard from "../shared/BookCard";

interface LoadMoreBooksProps {
  district?: string;
  initialPage?: number;
  totalPages: number;
}

export default function LoadMoreBooks({
  district,
  initialPage = 1,
  totalPages,
}: LoadMoreBooksProps) {
  const [books, setBooks] = useState<PostItem[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const loadMore = async () => {
    if (isLoadingMore || currentPage >= totalPages) return;

    setIsLoadingMore(true);
    setLoadError(false);

    try {
      const params = new URLSearchParams({
        page: String(currentPage + 1),
        limit: "10",
      });
      if (district) params.set("district", district);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts?${params.toString()}`
      );

      if (!response.ok) throw new Error("Load more failed");

      const result = (await response.json()) as {
        data?: PostItem[];
        meta?: { currentPage?: number };
      };

      const nextBooks = result.data || [];
      setBooks((prev) => [...prev, ...nextBooks]);
      setCurrentPage(result.meta?.currentPage || currentPage + 1);
    } catch {
      setLoadError(true);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <>
      {/* অতিরিক্ত ফেচ হওয়া বইগুলোর গ্রিড */}
      {books.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 mt-3 sm:mt-6 lg:mt-8">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      {/* এরর মেসেজ */}
      {loadError && (
        <p className="mt-4 text-center text-xs sm:text-sm font-medium text-danger">
          পরবর্তী বইগুলো লোড করা সম্ভব হয়নি। আবার চেষ্টা করুন।
        </p>
      )}

      {/* লোড মোর বাটন */}
      {currentPage < totalPages && (
        <div className="mt-8 sm:mt-10 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={isLoadingMore}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs sm:text-sm font-semibold text-text-inverse shadow-sm transition-all hover:bg-primary-hover focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoadingMore ? (
              <>
                <svg className="h-4 w-4 animate-spin text-current" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>লোড হচ্ছে...</span>
              </>
            ) : (
              "আরো বই দেখুন"
            )}
          </button>
        </div>
      )}
    </>
  );
}