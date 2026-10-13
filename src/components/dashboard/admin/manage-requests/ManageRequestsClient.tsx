"use client";

import { useCallback, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type {
  AdminRequest,
  RequestStatusFilter,
  AdminRequestsSortOption,
} from "@/interface/dashboard/request";
import { RequestsToolbar } from "./RequestsToolbar";
import { RequestsTable } from "./RequestsTable";
import { RequestMobileCard } from "./RequestMobileCard";
import { RequestsEmptyState } from "./RequestsEmptyState";
import { UsersPagination } from "../manage-users/UsersPagination";

interface ManageRequestsClientProps {
  requests: AdminRequest[];
  total: number;
  totalPages: number;
  currentPage: number;
  search: string;
  statusFilter: RequestStatusFilter;
  sortOption: AdminRequestsSortOption;
}

export function ManageRequestsClient({
  requests,
  total,
  totalPages,
  currentPage,
  search,
  statusFilter,
  sortOption,
}: ManageRequestsClientProps) {
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

  function handleStatusFilterChange(value: RequestStatusFilter) {
    pushParams({ status: value, page: "1" });
  }

  function handleSortChange(value: AdminRequestsSortOption) {
    pushParams({ sort: value, page: "1" });
  }

  function handlePageChange(page: number) {
    pushParams({ page: String(page) });
  }

  return (
    <div className="flex flex-col gap-6">
      <RequestsToolbar
        search={search}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        sortOption={sortOption}
        onSortChange={handleSortChange}
        resultCount={total}
      />

      {requests.length === 0 ? (
        <RequestsEmptyState />
      ) : (
        <>
          <div className="hidden md:block">
            <RequestsTable requests={requests} />
          </div>

          <div className="flex flex-col gap-3 md:hidden">
            {requests.map((request) => (
              <RequestMobileCard
                key={request._id?.toString() ?? `${request.postId}-${request.requesterId}`}
                request={request}
              />
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
