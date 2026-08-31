"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BookItem } from "@/interface/post related/postDetails";
import SectionHeading from "../shared/SectionHeading";
import BookCard from "../shared/BookCard";

interface BooksDiscoveryProps {
  initialListingType?: "sell" | "donate" | "";
  allBooks: BookItem[];
  nearbyBooks: BookItem[];
  recentBooks: BookItem[];
}

const TABS = [
  { id: "", label: "All Books" },
  { id: "sell", label: "For Sale" },
  { id: "donate", label: "Free Donations" },
] as const;

export default function BooksDiscovery({
  initialListingType = "",
  allBooks,
  nearbyBooks,
  recentBooks,
}: BooksDiscoveryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTab = initialListingType || "";

  const filteredBooks = useMemo(() => {
    if (activeTab === "sell") {
      return allBooks.filter((book) => book.type === "sell");
    }
    if (activeTab === "donate") {
      return allBooks.filter((book) => book.type === "donate");
    }
    return allBooks;
  }, [activeTab, allBooks]);

  const handleTabClick = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type) {
      params.set("type", type);
    } else {
      params.delete("type");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const getTabLabel = (type: string) => {
    const tab = TABS.find((t) => t.id === type);
    return tab?.label || "All Books";
  };

  if (!filteredBooks) {
    return (
      <section className="py-8 lg:py-12 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            title={getTabLabel(activeTab)}
            subtitle="No books found for this filter"
          />
          <div className="text-center py-12 bg-surface border border-border rounded-card">
            <p className="text-text-muted">No books match your current filters</p>
            <p className="text-sm text-text-muted mt-1">Try adjusting your search or category</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 lg:py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <SectionHeading title={getTabLabel(activeTab)} center={false} />
          <div className="flex gap-1 bg-surface p-1 rounded-btn border border-border">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`px-4 py-2 rounded-btn text-sm font-medium transition-base focus:outline-2 focus:outline-primary-focus ${isActive
                      ? "text-primary border-b-2 border-primary"
                      : "text-text-muted hover:text-text-primary"
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}