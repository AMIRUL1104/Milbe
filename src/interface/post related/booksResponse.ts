import { ApiResponse, PaginatedMeta } from "@/interface/apiResponse";

export interface BooksResponse<T> extends ApiResponse<T[]> {
  meta?: PaginatedMeta;
}

export interface FeaturedPostsResponse<T> extends ApiResponse<T[]> {
  meta?: never;
}