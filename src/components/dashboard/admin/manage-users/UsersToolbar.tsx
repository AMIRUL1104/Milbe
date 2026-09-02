"use client";

import { Search } from "lucide-react";
import type { RoleFilter, StatusFilter } from "@/interface/dashboard/manageUsers";
import type { GetUsersParams } from "@/services/features/admin";
type SortOption = NonNullable<GetUsersParams["sort"]>;

interface UsersToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  roleFilter: RoleFilter;
  onRoleFilterChange: (value: RoleFilter) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (value: StatusFilter) => void;
  sortOption: SortOption;
  onSortChange: (value: SortOption) => void;
  resultCount: number;
}

export function UsersToolbar({
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
  sortOption,
  onSortChange,
  resultCount,
}: UsersToolbarProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search users by name or email..."
            className="w-full rounded-input border border-border py-2.5 pl-10 pr-4 text-sm text-text-primary outline-none transition-base focus:border-border-focus placeholder:text-text-placeholder"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => onRoleFilterChange(e.target.value as RoleFilter)}
          className="rounded-input border border-border px-3.5 py-2.5 text-sm text-text-secondary outline-none transition-base focus:border-border-focus sm:w-36 bg-surface"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as StatusFilter)}
          className="rounded-input border border-border px-3.5 py-2.5 text-sm text-text-secondary outline-none transition-base focus:border-border-focus sm:w-36 bg-surface"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>

        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="rounded-input border border-border px-3.5 py-2.5 text-sm text-text-secondary outline-none transition-base focus:border-border-focus sm:w-36 bg-surface"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <p className="px-0.5 text-xs font-medium text-text-muted">
        {resultCount} {resultCount === 1 ? "user" : "users"} found
      </p>
    </div>
  );
}