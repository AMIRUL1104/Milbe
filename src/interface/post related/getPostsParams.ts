export interface GetPostsParams {
  search?: string;
  category?: string;
  condition?: string;
  type?: "sell" | "donate" | "";
  district?: string;
  area?: string;
  academicLevel?: string;
  sort?: "newest" | "oldest" | "title-asc" | "title-desc";
  page?: number;
  limit?: number;
}
