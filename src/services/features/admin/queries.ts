import { protectedFetch } from "@/services/core/serverFetch";
import { GetUsersResponse } from "@/interface/dashboard/manageUsers";
import { BookRequestResponse } from "@/interface/bookRequest/bookRequest";
import { AdminDashboardResponse } from "@/interface/dashboard/dashboard";
import { FeaturedPostsResponse } from "@/interface/post related/booksResponse";
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

  return protectedFetch<GetUsersResponse>(`/api/users/admin?${params.toString()}`);
}

export async function getAllBookRequests(): Promise<BookRequestResponse> {
  return protectedFetch<BookRequestResponse>("/api/admin/book-requests");
}

export async function getAdminDashboard(): Promise<AdminDashboardResponse> {
  return protectedFetch<AdminDashboardResponse>("/api/dashboard/admin");
}

export async function getAllPosts(): Promise<FeaturedPostsResponse<BookItem>> {
  return protectedFetch<FeaturedPostsResponse<BookItem>>("/api/posts/admin");
}