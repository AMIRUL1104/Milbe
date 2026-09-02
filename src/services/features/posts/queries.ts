import {
  serverFetch,
  protectedFetch,
  unwrapResponse,
} from "@/services/core/serverFetch";
import { GetPostsParams } from "@/interface/post related/getPostsParams";
import { BookItem } from "@/interface/post related/postDetails";
import { BooksResponse } from "@/interface/post related/booksResponse";
import { PostResponse } from "@/interface/post related/postResponse";
import { ApiResponse } from "@/interface/apiResponse";

export async function getPosts(
  params: GetPostsParams = {},
): Promise<BooksResponse<BookItem>> {
  const {
    search = "",
    category = "",
    condition = "",
    type = "",
    district = "",
    area = "",
    academicLevel = "",
    sort = "newest",
    page = 1,
    limit = 6,
  } = params;

  const queryParams = new URLSearchParams();

  if (search) queryParams.set("search", search);
  if (category) queryParams.set("category", category);
  if (condition) queryParams.set("condition", condition);
  if (type) queryParams.set("type", type);
  if (district) queryParams.set("district", district);
  if (area) queryParams.set("area", area);
  if (academicLevel) queryParams.set("academicLevel", academicLevel);
  if (sort) queryParams.set("sort", sort);

  queryParams.set("page", String(page));
  queryParams.set("limit", String(limit));

  return (await serverFetch<BookItem[]>(
    `/api/posts?${queryParams.toString()}`,
  )) as BooksResponse<BookItem>;
}

export async function getPostById(id: string): Promise<PostResponse> {
  return unwrapResponse<PostResponse>(
    await serverFetch<PostResponse>(`/api/posts/${id}`),
  );
}

export async function getFeaturedPosts(): Promise<BookItem[]> {
  return unwrapResponse<BookItem[]>(
    await serverFetch<BookItem[]>("/api/posts/featured"),
  );
}

export interface MyPostsResponse extends ApiResponse<{ books: BookItem[] }> {}

export async function getMyPosts(): Promise<MyPostsResponse> {
  return protectedFetch<{ books: BookItem[] }>("/api/posts/my");
}
