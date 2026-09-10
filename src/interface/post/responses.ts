import { ApiResponse, PaginatedMeta } from "@/interface/apiResponse";
import type { PostItem } from "./types";

export type PostResponse = ApiResponse<PostItem>;

export interface BooksResponse<T> extends Omit<ApiResponse<T[]>, "meta"> {
  meta?: PaginatedMeta;
}

export interface FeaturedPostsResponse<T> extends ApiResponse<T[]> {
  meta?: never;
}

export interface GetMyPostsResponse {
  success: boolean;
  data: { books: PostItem[] };
  message?: string;
}

export type MyPostsFilter = "all" | "sell" | "donate" | "available" | "sold" | "donated";
export type MyPostsSort = "newest" | "oldest" | "title-asc" | "title-desc";
