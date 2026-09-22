"use client";

import { useState } from "react";
import { Search, Filter, ArrowUpDown, X } from "lucide-react";
import type { SortOption, StatusFilter } from "@/interface/dashboard/request";

interface ReceivedRequestsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (value: StatusFilter) => void;
  sortOption: SortOption;
  onSortChange: (value: SortOption) => void;
  resultCount: number;
}

export function ReceivedRequestsToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortOption,
  onSortChange,
  resultCount,
}: ReceivedRequestsToolbarProps) {
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

  const statusOptions: { label: string; value: StatusFilter }[] = [
    { label: "All Status", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Accepted", value: "accepted" },
    { label: "Rejected", value: "rejected" },
    { label: "Cancelled", value: "cancelled" },
  ];

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: "Newest First", value: "newest" },
    { label: "Oldest First", value: "oldest" },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* ---------------------------------------------------- */}
      {/* ১. মোবাইল ডিভাইস: কাউন্ট টেক্সট (উপরে স্থানান্তর করা হয়েছে) */}
      {/* ---------------------------------------------------- */}
      <div className="block sm:hidden">
        <p className="px-1 text-xs font-medium text-text-muted">
          {resultCount}টি রিকোয়েস্ট পাওয়া গেছে
        </p>
      </div>

      {/* ---------------------------------------------------- */}
      {/* ২. মোবাইল ডিভাইস: সিঙ্গেল রো টুলবার (Search + Filter + Sort) */}
      {/* ---------------------------------------------------- */}
      <div className="flex items-center gap-2 sm:hidden">
        {/* সার্চ ইনপুট */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by requester name or message..."
            className="w-full text-text-secondary rounded-input border border-border py-2.5 pl-9 pr-3 text-sm focus:border-border-focus focus:outline-none"
          />
        </div>

        {/* ফিল্টার টগল বাটন */}
        <button
          type="button"
          onClick={toggleFilter}
          className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-input border transition-colors ${showMobileFilter || statusFilter !== "all"
            ? "border-border-focus bg-surface text-text-primary"
            : "border-border bg-surface text-text-secondary hover:bg-background"
            }`}
          aria-label="Toggle Filter"
        >
          <Filter className="h-4 w-4" />
          {statusFilter !== "all" && (
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-border-focus" />
          )}
        </button>

        {/* সর্ট টগল বাটন */}
        <button
          type="button"
          onClick={toggleSort}
          className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-input border transition-colors ${showMobileSort
            ? "border-border-focus bg-surface text-text-primary"
            : "border-border bg-surface text-text-secondary hover:bg-background"
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
        <div className="flex flex-col gap-2 rounded-input border border-border bg-surface p-3 sm:hidden">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <span className="text-xs font-semibold text-text-secondary">Filter by Status</span>
            <button type="button" onClick={() => setShowMobileFilter(false)}>
              <X className="h-4 w-4 text-text-muted" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onStatusFilterChange(option.value);
                  setShowMobileFilter(false);
                }}
                className={`rounded-input px-3 py-1.5 text-xs font-medium transition-colors ${statusFilter === option.value
                  ? "bg-text-secondary text-surface"
                  : "border border-border bg-background text-text-secondary"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {showMobileSort && (
        <div className="flex flex-col gap-2 rounded-input border border-border bg-surface p-3 sm:hidden">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <span className="text-xs font-semibold text-text-secondary">Sort Options</span>
            <button type="button" onClick={() => setShowMobileSort(false)}>
              <X className="h-4 w-4 text-text-muted" />
            </button>
          </div>
          <div className="flex gap-2 pt-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onSortChange(option.value);
                  setShowMobileSort(false);
                }}
                className={`flex-1 rounded-input py-1.5 text-xs font-medium transition-colors ${sortOption === option.value
                  ? "bg-text-secondary text-surface"
                  : "border border-border bg-background text-text-secondary"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* ৪. ডেক্সটপ ডিভাইস: আগের অরিজিনাল লেআউট (অপরিবর্তিত) */}
      {/* ---------------------------------------------------- */}
      <div className="hidden sm:flex sm:flex-col sm:gap-3">
        <div className="flex flex-row gap-3">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by requester name or message..."
              className="w-full text-text-secondary rounded-input border border-border py-2.5 pl-10 pr-4 text-sm focus:border-border-focus focus:outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              onStatusFilterChange(event.target.value as StatusFilter)
            }
            className="rounded-input border border-border px-3.5 py-2.5 text-sm text-text-secondary focus:border-border-focus focus:outline-none w-40 bg-surface"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={sortOption}
            onChange={(event) =>
              onSortChange(event.target.value as SortOption)
            }
            className="rounded-input border border-border px-3.5 py-2.5 text-sm text-text-secondary focus:border-border-focus focus:outline-none w-40 bg-surface"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <p className="px-1 text-xs font-medium text-text-muted">
          {resultCount}টি রিকোয়েস্ট পাওয়া গেছে
        </p>
      </div>
    </div>
  );
}