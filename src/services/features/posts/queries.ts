import {
  serverFetch,
  protectedFetch,
  unwrapResponse,
} from "@/services/core/serverFetch";
import { GetPostsParams } from "@/interface/post/queries";
import { PostItem } from "@/interface/post/types";
import { BooksResponse, PostResponse } from "@/interface/post/responses";
import { ApiResponse } from "@/interface/apiResponse";

export async function getPosts(
  params: GetPostsParams = {},
): Promise<BooksResponse<PostItem>> {
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

  return (await serverFetch<PostItem[]>(
    `/api/posts?${queryParams.toString()}`,
  )) as BooksResponse<PostItem>;
}

export async function getPostById(id: string): Promise<PostResponse> {
  return serverFetch<PostItem>(`/api/posts/${id}`);
}

export async function getFeaturedPosts(): Promise<PostItem[]> {
  return unwrapResponse<PostItem[]>(
    await serverFetch<PostItem[]>("/api/posts/featured"),
  );
}

export type MyPostsResponse = ApiResponse<{ books: PostItem[] }>;

export async function getMyPosts(): Promise<MyPostsResponse> {
  return protectedFetch<{ books: PostItem[] }>("/api/posts/my");
}
