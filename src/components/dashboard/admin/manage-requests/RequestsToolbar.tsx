"use client";

import { Search } from "lucide-react";
import type {
  RequestStatusFilter,
  AdminRequestsSortOption,
} from "@/interface/dashboard/request";

interface RequestsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: RequestStatusFilter;
  onStatusFilterChange: (value: RequestStatusFilter) => void;
  sortOption: AdminRequestsSortOption;
  onSortChange: (value: AdminRequestsSortOption) => void;
  resultCount: number;
}

export function RequestsToolbar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortOption,
  onSortChange,
  resultCount,
}: RequestsToolbarProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="বই, ক্রেতা বা বিক্রেতা দিয়ে খুঁজুন..."
            className="w-full rounded-input border border-border py-2.5 pl-10 pr-4 text-sm text-text-primary outline-none transition-base focus:border-border-focus placeholder:text-text-placeholder"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as RequestStatusFilter)}
          className="rounded-input border border-border px-3.5 py-2.5 text-sm text-text-secondary outline-none transition-base focus:border-border-focus sm:w-36 bg-surface"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as AdminRequestsSortOption)}
          className="rounded-input border border-border px-3.5 py-2.5 text-sm text-text-secondary outline-none transition-base focus:border-border-focus sm:w-36 bg-surface"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <p className="px-0.5 text-xs font-medium text-text-muted">
        {resultCount} {resultCount === 1 ? "request" : "requests"} found
      </p>
    </div>
  );
}
