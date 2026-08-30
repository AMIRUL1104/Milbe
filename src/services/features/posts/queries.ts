import { serverFetch, protectedFetch } from "@/services/core/serverFetch";
import { GetPostsParams } from "@/interface/post related/getPostsParams";
import { BookItem } from "@/interface/post related/postDetails";
import { BooksResponse, FeaturedPostsResponse, PostResponse } from "@/interface/post related/booksResponse";

export async function getPosts(
  params: GetPostsParams = {}
): Promise<BooksResponse<BookItem>> {
  const {
    search = "",
    category = "",
    condition = "",
    listingType = "",
    sort = "newest",
    page = 1,
    limit = 6,
  } = params;

  const queryParams = new URLSearchParams();

  if (search) queryParams.set("search", search);
  if (category) queryParams.set("category", category);
  if (condition) queryParams.set("condition", condition);
  if (listingType) queryParams.set("listingType", listingType);
  if (sort) queryParams.set("sort", sort);

  queryParams.set("page", String(page));
  queryParams.set("limit", String(limit));

  return serverFetch<BooksResponse<BookItem>>(`/api/posts?${queryParams.toString()}`);
}

export async function getPostById(id: string): Promise<PostResponse> {
  return serverFetch<PostResponse>(`/api/posts/${id}`);
}

export async function getFeaturedPosts(): Promise<FeaturedPostsResponse<BookItem>> {
  return serverFetch<FeaturedPostsResponse<BookItem>>("/api/posts/featured");
}

export async function getMyPosts(): Promise<BooksResponse<BookItem>> {
  return protectedFetch<BooksResponse<BookItem>>("/api/posts/my");
}