export interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
}

export interface PaginatedMeta {
  total: number;
  totalPages: number;
  currentPage: number;
}

export class ApiError extends Error {
  public readonly response: ApiResponse<unknown>;
  public readonly statusCode: number;

  constructor(response: ApiResponse<unknown>, statusCode: number) {
    super(response.message || "API request failed");
    this.name = "ApiError";
    this.response = response;
    this.statusCode = statusCode;
  }
}