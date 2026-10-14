"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";
import { FilterBottomSheet } from "@/components/home/FilterBottomSheet";
import { CATEGORY_OPTIONS, normalizeCategory } from "@/lib/constant/categories";
import SearchableDropdown from "@/components/shared/SearchableDropdown";

// Category filter options (value = stable English DB value, label = Bangla UI).
const CATEGORY_FILTER_OPTIONS = [
  { value: "", label: "সব ক্যাটাগরি" },
  ...CATEGORY_OPTIONS.map((c) => ({ value: c.value, label: c.labelBn })),
];

const CONDITION_FILTER_OPTIONS = [
  { value: "", label: "অবস্থা" },
  { value: "like_new", label: "নতুনের মতো" },
  { value: "good", label: "ভালো" },
  { value: "fair", label: "গ্রহণযোগ্য" },
];

interface HeaderFiltersProps {
  activeType: string;
  category?: string;
  condition?: string;
  search?: string;
}

export default function HeaderFilters({
  activeType,
  category,
  condition,
  search,
}: HeaderFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filters arrive as URL params — old data may use legacy/English values,
  // so normalize to the stable enum value before matching selected option.
  const categoryValue = category ? normalizeCategory(category) : "";
  const conditionValue = condition || "";

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const buildHref = (type: string) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    const location = searchParams.get("location");
    if (location) params.set("location", location);
    if (category) params.set("category", category);
    if (condition) params.set("condition", condition);
    if (type) params.set("type", type);
    params.set("page", "1");
    return `/?${params.toString()}`;
  };

  const tabs = [
    { type: "", label: "All" },
    { type: "sell", label: "Sale" },
    { type: "donate", label: "Donate" },
  ];

  const Tabs = (
    <div className="flex gap-1 bg-background rounded-btn p-1 ">
      {tabs.map((tab) => {
        const isActive = activeType === tab.type;
        return (
          <Link
            key={tab.type}
            href={buildHref(tab.type)}
            aria-current={isActive ? "page" : undefined}
            className={`px-4 py-2 rounded-btn text-sm font-medium transition-base focus-visible:outline-2 focus-visible:outline-primary-focus ${isActive
              ? "text-primary border-b-2 border-primary"
              : "text-text-primary hover:text-text-primary"
              }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );

  return (
    <div id="filter-controls" className="w-full  backdrop-blur border-b border-border px-3 bg-surface">
      <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8 bg-surface">
        <div className="hidden lg:flex items-center gap-3  rounded-btn px-2 py-1.5  ">
          <SearchableDropdown
            id="home-category-filter"
            options={CATEGORY_FILTER_OPTIONS}
            value={categoryValue ?? ""}
            onChange={(val) => updateQueryParams("category", val)}
            placeholder="ক্যাটাগরি"
            allowClear={true}
            className="w-48"
          />

          <SearchableDropdown
            id="home-condition-filter"
            options={CONDITION_FILTER_OPTIONS}
            value={conditionValue}
            onChange={(val) => updateQueryParams("condition", val)}
            placeholder="অবস্থা"
            allowClear={true}
            className="w-40"
          />

          <div className="ml-auto">{Tabs}</div>

        </div>

        <div className="lg:hidden flex items-center justify-between gap-2 ">
          <div className="flex-1 min-w-0 overflow-x-auto">
            <div className="inline-flex">{Tabs}</div>
          </div>
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            aria-expanded={isFilterOpen}
            className="inline-flex shrink-0 items-center gap-1.5 px-2 py-1 rounded-btn bg-surface border border-border text-sm font-medium text-text-secondary hover:bg-primary hover:text-text-inverse transition-base focus-visible:outline-2 focus-visible:outline-primary-focus"
          >
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <FilterBottomSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
}
