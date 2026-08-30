import type { RoleFilter, StatusFilter } from "@/interface/dashboard/manageUsers";
import { ManageUsersClient } from "@/components/dashboard/admin/manage-users/ManageUsersClient";
import { UsersStatsCards } from "@/components/dashboard/admin/manage-users/UsersStatsCards";
import { UsersErrorFallback } from "@/components/dashboard/admin/manage-users/UsersErrorFallback";
import { getAllUsers, GetUsersParams } from "@/services/features/admin";

interface ManageUsersPageProps {
  searchParams: Promise<{
    search?: string;
    role?: string;
    status?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function ManageUsersPage({
  searchParams,
}: ManageUsersPageProps) {
  const params = await searchParams;

  const search = params.search ?? "";
  const role = (params.role ?? "all") as RoleFilter;
  const status = (params.status ?? "all") as StatusFilter;
  const sort = (params.sort === "oldest" ? "oldest" : "newest") as SortOption;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));

  const response = await getAllUsers({ search, role, status, sort, page, limit: 10 });

  const pageHeader = (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
      <p className="text-sm text-gray-500">
        View and manage all registered users.
      </p>
    </div>
  );

  if (!response.success || !response.data) {
    return (
      <div className="flex flex-col gap-6">
        {pageHeader}
        <UsersErrorFallback />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {pageHeader}

      <UsersStatsCards total={response.meta?.total ?? 0} />

      <ManageUsersClient
        users={response.data}
        total={response.meta?.total ?? 0}
        totalPages={response.meta?.totalPages ?? 1}
        currentPage={response.meta?.currentPage ?? 1}
        search={search}
        roleFilter={role}
        statusFilter={status}
        sortOption={sort}
      />
    </div>
  );
}