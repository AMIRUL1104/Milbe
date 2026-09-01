import { protectedFetch, unwrapResponse } from "@/services/core/serverFetch";
import { UserDashboardResponse, AdminDashboardResponse } from "@/interface/dashboard/dashboard";

export async function getUserDashboard(): Promise<UserDashboardResponse> {
  return unwrapResponse<UserDashboardResponse>(
    await protectedFetch<UserDashboardResponse>("/api/dashboard/user")
  );
}