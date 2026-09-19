export interface CreateBookRequestPayload {
  postId: string;
  requesterContact?: { phone?: string };
  message?: string;
}
