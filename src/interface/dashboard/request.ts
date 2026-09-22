export type RequestStatus = "pending" | "accepted" | "rejected" | "cancelled";

export interface SentRequest {
  id: string;
  postId: string;
  postTitle: string;
  bookCoverUrl: string;
  sellerName: string;
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
