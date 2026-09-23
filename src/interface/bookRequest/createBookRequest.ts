export interface CreateBookRequestPayload {
  postId: string;
  requesterContact?: { phone?: string };
  requesterDistrict?: string;
  requesterArea?: string;
  message?: string;
}
