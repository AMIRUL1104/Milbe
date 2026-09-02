import { protectedFetch } from "@/services/core/serverFetch";

import { BookRequestResponse } from "@/interface/bookRequest/bookRequest";
import { BookRequest } from "@/interface/bookRequest/checkRequest";
import { ApiResponse } from "@/interface/apiResponse";
import { AdminDashboardResponse, AdminDashboardData } from "@/interface/dashboard/dashboard";
import { GetUsersResponse, ManagedUser } from "@/interface/dashboard/manageUsers";
import { BookItem } from "@/interface/post related/postDetails";

export interface GetUsersParams {
  search?: string;
  role?: string;
  status?: string;
  sort?: "newest" | "oldest";
  page?: number;
  limit?: number;
}

export async function getAllUsers({
  search = "",
  role = "",
  status = "",
  sort = "newest",
  page = 1,
  limit = 10,
}: GetUsersParams = {}): Promise<GetUsersResponse> {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (role && role !== "all") params.set("role", role);
  if (status && status !== "all") params.set("status", status);
  params.set("sort", sort);
  params.set("page", String(page));
  params.set("limit", String(limit));

  const res = await protectedFetch<ManagedUser[]>(
    `/api/users/admin?${params.toString()}`,
  );
  return res as GetUsersResponse;
}

export async function getAllBookRequests(): Promise<BookRequestResponse> {
  return protectedFetch<BookRequest[]>("/api/admin/book-requests");
}

export async function getAdminDashboard(): Promise<AdminDashboardResponse> {
  return protectedFetch<AdminDashboardData>("/api/dashboard/admin");
}

export type GetAllPostsResponse = ApiResponse<{ data: BookItem[] }>;

export async function getAllPosts(): Promise<GetAllPostsResponse> {
  return protectedFetch<{ data: BookItem[] }>("/api/posts/admin");
}
