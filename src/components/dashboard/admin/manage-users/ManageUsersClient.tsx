"use client";

import { useCallback, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { UserProfile } from "@/interface/user/userProfile";
import type { RoleFilter, StatusFilter } from "@/interface/dashboard/manageUsers";
import { UsersToolbar } from "./UsersToolbar";
import { UsersTable } from "./UsersTable";
import { UserMobileCard } from "./UserMobileCard";
import { UsersEmptyState } from "./UsersEmptyState";
import { UsersPagination } from "./UsersPagination";
import type { GetUsersParams } from "@/services/features/admin";
type SortOption = NonNullable<GetUsersParams["sort"]>;

interface ManageUsersClientProps {
  users: UserProfile[];
  total: number;
  totalPages: number;
  currentPage: number;
  search: string;
  roleFilter: RoleFilter;
  statusFilter: StatusFilter;
  sortOption: SortOption
}

export function ManageUsersClient({
  users,
  total,
  totalPages,
  currentPage,
  search,
  roleFilter,
  statusFilter,
  sortOption,
}: ManageUsersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const pushParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        // Remove param if empty or "all" (except sort and page which always have a value)
        if (!value || value === "all") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      startTransition(() => {
        router.push(`?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  function handleSearchChange(value: string) {
    pushParams({ search: value, page: "1" });
  }

  function handleRoleFilterChange(value: RoleFilter) {
    pushParams({ role: value, page: "1" });
  }

  function handleStatusFilterChange(value: StatusFilter) {
    pushParams({ status: value, page: "1" });
  }

  function handleSortChange(value: SortOption) {
    pushParams({ sort: value, page: "1" });
  }

  function handlePageChange(page: number) {
    pushParams({ page: String(page) });
  }

  return (
    <div className="flex flex-col gap-6">
      <UsersToolbar
        search={search}
        onSearchChange={handleSearchChange}
        roleFilter={roleFilter}
        onRoleFilterChange={handleRoleFilterChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        sortOption={sortOption}
        onSortChange={handleSortChange}
        resultCount={total}
      />

      {users.length === 0 ? (
        <UsersEmptyState />
      ) : (
        <>
          <div className="hidden md:block">
            <UsersTable users={users} />
          </div>

          <div className="flex flex-col gap-3 md:hidden">
            {users.map((user) => (
              <UserMobileCard key={user._id} user={user} />
            ))}
          </div>

          <UsersPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}