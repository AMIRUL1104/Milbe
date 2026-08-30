"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BOOK_CATEGORIES } from "@/components/add-post/post";

interface CategoriesFilterProps {
  initialCategory?: string;
}

export default function CategoriesFilter({ initialCategory = "" }: CategoriesFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === initialCategory) {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="py-4 lg:py-6 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex overflow-x-auto gap-2 pb-2 -mx-6 px-6 lg:mx-0 lg:px-0 lg:pb-0">
          {BOOK_CATEGORIES.map((category) => {
            const isActive = initialCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`whitespace-nowrap shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-base focus:outline-2 focus:outline-primary-focus ${
                  isActive
                    ? "bg-primary text-text-inverse shadow-md"
                    : "bg-surface border border-border text-text-primary hover:border-primary hover:text-primary"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}