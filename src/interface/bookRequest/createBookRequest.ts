export interface CreateBookRequestPayload {
  postId: string;
  postTitle: string;
  bookCoverUrl: string;
  sellerId: string;
  sellerName: string;
  sellerContact?: { phone?: string; messenger?: string };
  requesterId: string;
  requesterName: string;
  requesterAvatarUrl?: string;
  requesterContact?: { phone?: string };
  message?: string;
}
