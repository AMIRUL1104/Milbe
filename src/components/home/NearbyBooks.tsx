"use client";

import { PostItem } from "@/interface/post/types";
import { useState } from "react";
import SectionHeading from "../shared/SectionHeading";
import BookCard from "../shared/BookCard";
import LocationWarning from "./LocationWarning";

export type NearbyBooksState =
  | "loaded"
  | "empty"
  | "error"
  | "needs-login"
  | "needs-profile";

interface NearbyBooksProps {
  state: NearbyBooksState;
  books: PostItem[];
  district?: string;
  totalPages?: number;
}

export default function NearbyBooks({
  state,
  books: initialBooks,
  district,
  totalPages = 1,
}: NearbyBooksProps) {
  const [books, setBooks] = useState(initialBooks);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const loadMore = async () => {
    if (!district || isLoadingMore || currentPage >= totalPages) return;

    setIsLoadingMore(true);
    setLoadError(false);
    try {
      const params = new URLSearchParams({
        district,
        page: String(currentPage + 1),
        limit: "10",
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts?${params.toString()}`,
      );
      if (!response.ok) throw new Error("Location books request failed");

      const result = (await response.json()) as {
        data?: PostItem[];
        meta?: { currentPage?: number; totalPages?: number };
      };
      const nextBooks = result.data || [];
      setBooks((previousBooks) => {
        const existingIds = new Set(previousBooks.map((book) => book._id));
        return [...previousBooks, ...nextBooks.filter((book) => !existingIds.has(book._id))];
      });
      setCurrentPage(result.meta?.currentPage || currentPage + 1);
    } catch {
      setLoadError(true);
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (state === "needs-login") {
    return (
      <section className="bg-background py-4 lg:py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <LocationWarning
            title="⚠️ আপনার লোকেশন নির্বাচন করুন"
            actionLabel="এলাকা নির্বাচন করুন"
          />
        </div>
      </section>
    );
  }

  if (state === "needs-profile") {
    return (
      <section className="bg-background py-4 lg:py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <LocationWarning
            title="⚠️ আপনার প্রোফাইলে এলাকা যোগ করুন"
            actionLabel="এলাকা যোগ করুন"
            actionHref="/profile"
          />
        </div>
      </section>
    );
  }

  if (state === "empty") {
    return (
      <section className="bg-background py-4 lg:py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-btn border border-border bg-surface px-4 py-3">
            <p className="text-sm text-text-muted">
              📍 {district} এলাকায় এখনো কোনো বই পাওয়া যায়নি।
            </p>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-location-selector"))}
              className="text-sm font-semibold text-primary hover:underline"
            >
              এলাকা পরিবর্তন করুন
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (state === "error") {
    return (
      <section className="bg-background py-4 lg:py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-btn border border-danger/30 bg-surface px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-text-primary">Location Books</p>
              <p className="text-sm text-text-muted">Unable to load books right now.</p>
            </div>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-btn border border-border px-3 py-2 text-sm font-semibold text-primary hover:bg-background"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 lg:py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="আপনার কাছাকাছি বই"
          subtitle={
            district ? `${district} এলাকায় পাওয়া বই` : undefined
          }
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
        {loadError && (
          <p className="mt-4 text-center text-sm text-danger">
            Unable to load books right now.
          </p>
        )}
        {currentPage < totalPages && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={loadMore}
              disabled={isLoadingMore}
              className="rounded-btn bg-primary px-4 py-2.5 text-sm font-semibold text-text-inverse hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoadingMore ? "লোড হচ্ছে..." : "আরো ১০টি বই দেখুন"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
