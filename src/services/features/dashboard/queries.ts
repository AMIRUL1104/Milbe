import { protectedFetch } from "@/services/core/serverFetch";
import { UserDashboardResponse, AdminDashboardData, UserDashboardData } from "@/interface/dashboard/dashboard";

export async function getUserDashboard(): Promise<UserDashboardResponse> {
  return protectedFetch<UserDashboardData>("/api/dashboard/user");
}