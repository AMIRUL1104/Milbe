import type { BookRequest } from "@/interface/bookRequest/checkRequest";
import { ApiResponse, PaginatedMeta } from "@/interface/apiResponse";

export type { BookRequest };

export type RequestStatus = "pending" | "accepted" | "rejected" | "cancelled";

export type AdminRequest = BookRequest;

export type RequestStatusFilter = "all" | RequestStatus;

export type AdminRequestsSortOption = "newest" | "oldest";

export interface GetAdminRequestsParams {
  search?: string;
  status?: string;
  sort?: AdminRequestsSortOption;
  page?: number;
  limit?: number;
}

export interface GetAdminRequestsResponse
  extends Omit<ApiResponse<AdminRequest[]>, "meta"> {
  meta?: PaginatedMeta;
}

export interface SentRequest {
  id: string;
  postId: string;
  postSlug?: string;
  postTitle: string;
  bookCoverUrl: string;
  sellerName: string;
  sellerDistrict?: string;
  sellerArea?: string;
  requestDate: string; // ISO date string
  status: RequestStatus;
  message?: string;
  sellerContact?: {
    phone: string;
    messenger?: string;
  };
}

export interface ReceivedRequest {
  id: string;
  postId: string;
  requesterName: string;
  requesterAvatarUrl?: string;
  requesterDistrict?: string;
  requesterArea?: string;
  requestDate: string; // ISO date string
  status: RequestStatus;
  message?: string;
  requesterContact?: {
    phone?: string;
  };
}

export interface PostSummary {
  id: string;
  title: string;
  bookCoverUrl: string;
  pendingCount: number;
}

export type StatusFilter = "all" | RequestStatus;
export type SortOption = "newest" | "oldest";
