"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import type { MyPostsFilter, MyPostsSort } from "@/interface/post/responses";
import { toBengaliNumber } from "@/lib/utils/toBengaliNumber";

interface MyPostsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  filter: MyPostsFilter;
  onFilterChange: (value: MyPostsFilter) => void;
  sort: MyPostsSort;
  onSortChange: (value: MyPostsSort) => void;
  resultCount: number;
}

const FILTER_OPTIONS: { label: string; value: MyPostsFilter }[] = [
  { label: "All Posts", value: "all" },
  { label: "Sell", value: "sell" },
  { label: "Donate", value: "donate" },
  { label: "Available", value: "available" },
  { label: "Donated", value: "donated" },
  { label: "Sold", value: "sold" },
];

const SORT_OPTIONS: { label: string; value: MyPostsSort }[] = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Title (A–Z)", value: "title-asc" },
  { label: "Title (Z–A)", value: "title-desc" },
];

const controlBase =
  "w-full appearance-none bg-surface border border-border focus:border-border-focus rounded-input pl-10 pr-4 py-2.5 text-sm text-text-primary outline-none transition-base cursor-pointer";

export default function MyPostsToolbar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  sort,
  onSortChange,
  resultCount,
}: MyPostsToolbarProps) {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showMobileSort, setShowMobileSort] = useState(false);

  const toggleFilter = () => {
    setShowMobileFilter((prev) => !prev);
    if (showMobileSort) setShowMobileSort(false);
  };

  const toggleSort = () => {
    setShowMobileSort((prev) => !prev);
    if (showMobileFilter) setShowMobileFilter(false);
  };

  return (
    <div className="bg-surface rounded-card border border-border-light shadow-sm p-4 space-y-3">
      {/* ---------------------------------------------------- */}
      {/* ১. মোবাইল ডিভাইস: কাউন্ট টেক্সট (উপরে স্থানান্তর করা হয়েছে) */}
      {/* ---------------------------------------------------- */}
      <div className="block lg:hidden">
        <p className="text-xs text-text-muted">
          {resultCount === 0
            ? "কোনো পোস্ট পাওয়া যায়নি"
            : `মোট ${toBengaliNumber(resultCount)}টি পোস্ট পাওয়া গেছে`}
        </p>
      </div>

      {/* ---------------------------------------------------- */}
      {/* ২. মোবাইল ডিভাইস: সিঙ্গেল রো টুলবার (Search + Filter + Sort) */}
      {/* ---------------------------------------------------- */}
      <div className="flex items-center gap-2 lg:hidden">
        {/* সার্চ ইনপুট */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="শিরোনাম, ক্যাটাগরি বা বইয়ের নাম দিয়ে খুঁজুন..."
            className="w-full bg-surface border border-border focus:border-border-focus rounded-input pl-10 pr-3 py-2.5 text-sm text-text-primary placeholder:text-text-placeholder outline-none transition-base"
          />
        </div>

        {/* ফিল্টার টগল বাটন */}
        <button
          type="button"
          onClick={toggleFilter}
          className={`relative flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-input border transition-base ${showMobileFilter || filter !== "all"
              ? "border-border-focus bg-surface text-text-primary"
              : "border-border bg-surface text-text-muted hover:text-text-primary"
            }`}
          aria-label="Toggle Filter"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {filter !== "all" && (
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-border-focus" />
          )}
        </button>

        {/* সর্ট টগল বাটন */}
        <button
          type="button"
          onClick={toggleSort}
          className={`relative flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-input border transition-base ${showMobileSort
              ? "border-border-focus bg-surface text-text-primary"
              : "border-border bg-surface text-text-muted hover:text-text-primary"
            }`}
          aria-label="Toggle Sort"
        >
          <ArrowUpDown className="h-4 w-4" />
        </button>
      </div>

      {/* ---------------------------------------------------- */}
      {/* ৩. মোবাইল ডিভাইস: ফিল্টার এবং সর্ট প্যানেল (Expandable) */}
      {/* ---------------------------------------------------- */}
      {showMobileFilter && (
        <div className="flex flex-col gap-2 rounded-input border border-border bg-surface p-3 lg:hidden">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <span className="text-xs font-semibold text-text-primary">Filter Posts</span>
            <button type="button" onClick={() => setShowMobileFilter(false)}>
              <X className="h-4 w-4 text-text-muted" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onFilterChange(option.value);
                  setShowMobileFilter(false);
                }}
                className={`rounded-input px-3 py-1.5 text-xs font-medium transition-base ${filter === option.value
                    ? "bg-text-primary text-surface"
                    : "border border-border bg-surface text-text-primary"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {showMobileSort && (
        <div className="flex flex-col gap-2 rounded-input border border-border bg-surface p-3 lg:hidden">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <span className="text-xs font-semibold text-text-primary">Sort Options</span>
            <button type="button" onClick={() => setShowMobileSort(false)}>
              <X className="h-4 w-4 text-text-muted" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onSortChange(option.value);
                  setShowMobileSort(false);
                }}
                className={`rounded-input px-2 py-1.5 text-xs font-medium transition-base text-center ${sort === option.value
                    ? "bg-text-primary text-surface"
                    : "border border-border bg-surface text-text-primary"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* ৪. ডেক্সটপ ডিভাইস (lg+): অরিজিনাল লেআউট (অপরিবর্তিত) */}
      {/* ---------------------------------------------------- */}
      <div className="hidden lg:flex lg:flex-col lg:space-y-3">
        <div className="flex flex-row items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="শিরোনাম, ক্যাটাগরি বা বইয়ের নাম দিয়ে খুঁজুন..."
              className="w-full bg-surface border border-border focus:border-border-focus rounded-input pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-placeholder outline-none transition-base"
            />
          </div>

          <div className="flex flex-row items-center gap-3">
            <div className="relative w-48">
              <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <select
                value={filter}
                onChange={(event) =>
                  onFilterChange(event.target.value as MyPostsFilter)
                }
                className={controlBase}
              >
                {FILTER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative w-48">
              <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <select
                value={sort}
                onChange={(event) =>
                  onSortChange(event.target.value as MyPostsSort)
                }
                className={controlBase}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <p className="text-xs text-text-muted">
          {resultCount === 0
            ? "কোনো পোস্ট পাওয়া যায়নি"
            : `মোট ${toBengaliNumber(resultCount)}টি পোস্ট পাওয়া গেছে`}
        </p>
      </div>
    </div>
  );
}