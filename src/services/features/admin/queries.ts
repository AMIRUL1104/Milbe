import { protectedFetch, unwrapResponse } from "@/services/core/serverFetch";

import { BookRequestResponse } from "@/interface/bookRequest/bookRequest";
import { AdminDashboardResponse } from "@/interface/dashboard/dashboard";
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
}: GetUsersParams = {}): Promise<BookItem[]> {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (role && role !== "all") params.set("role", role);
  if (status && status !== "all") params.set("status", status);
  params.set("sort", sort);
  params.set("page", String(page));
  params.set("limit", String(limit));

  return unwrapResponse<BookItem[]>(
    await protectedFetch<BookItem[]>(`/api/users/admin?${params.toString()}`),
  );
}

export async function getAllBookRequests(): Promise<BookRequestResponse> {
  return unwrapResponse<BookRequestResponse>(
    await protectedFetch<BookRequestResponse>("/api/admin/book-requests"),
  );
}

export async function getAdminDashboard(): Promise<AdminDashboardResponse> {
  return unwrapResponse<AdminDashboardResponse>(
    await protectedFetch<AdminDashboardResponse>("/api/dashboard/admin"),
  );
}

export async function getAllPosts(): Promise<BookItem[]> {
  return unwrapResponse<BookItem[]>(
    await protectedFetch<BookItem[]>("/api/posts/admin"),
  );
}
