import { protectedFetch } from "@/services/core/serverFetch";
import { UserDashboardResponse, AdminDashboardResponse } from "@/interface/dashboard/dashboard";

export async function getUserDashboard(): Promise<UserDashboardResponse> {
  return protectedFetch<UserDashboardResponse>("/api/dashboard/user");
}

export async function getAdminDashboard(): Promise<AdminDashboardResponse> {
  return protectedFetch<AdminDashboardResponse>("/api/dashboard/admin");
}