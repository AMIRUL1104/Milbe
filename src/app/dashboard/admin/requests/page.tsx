import type { RequestStatusFilter } from "@/interface/dashboard/request";
import type { AdminRequestsSortOption } from "@/interface/dashboard/request";
import { ManageRequestsClient } from "@/components/dashboard/admin/manage-requests/ManageRequestsClient";
import { RequestsErrorFallback } from "@/components/dashboard/admin/manage-requests/RequestsErrorFallback";
import { RequestsStatsCards } from "@/components/dashboard/admin/manage-requests/RequestsStatsCards";
import { getAllAdminRequests } from "@/services/features/admin";

interface ManageRequestsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function ManageRequestsPage({
  searchParams,
}: ManageRequestsPageProps) {
  const params = await searchParams;

  const search = params.search ?? "";
  const status = (params.status ?? "all") as RequestStatusFilter;
  const sort = (params.sort === "oldest" ? "oldest" : "newest") as AdminRequestsSortOption;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));

  const response = await getAllAdminRequests({ search, status, sort, page, limit: 10 }).catch(
    () => null,
  );

  const pageHeader = (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Manage Requests</h1>
      <p className="text-sm text-gray-500">
        View all book requests from users across the platform.
      </p>
    </div>
  );

  if (!response || !response.success || !response.data) {
    return (
      <div className="flex flex-col gap-6">
        {pageHeader}
        <RequestsErrorFallback />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {pageHeader}

      <RequestsStatsCards total={response.meta?.total ?? 0} />

      <ManageRequestsClient
        requests={response.data}
        total={response.meta?.total ?? 0}
        totalPages={response.meta?.totalPages ?? 1}
        currentPage={response.meta?.currentPage ?? 1}
        search={search}
        statusFilter={status}
        sortOption={sort}
      />
    </div>
  );
}
