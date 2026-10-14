import { protectedFetch } from "@/services/core/serverFetch";
import { UserDashboardResponse, UserDashboardData } from "@/interface/dashboard/dashboard";

export async function getUserDashboard(): Promise<UserDashboardResponse> {
  return protectedFetch<UserDashboardData>("/api/dashboard/user");
}