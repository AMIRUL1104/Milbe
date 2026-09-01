import { serverFetch, protectedFetch, unwrapResponse } from "@/services/core/serverFetch";
import { CheckBookRequestResponse } from "@/interface/bookRequest/checkRequest";
import { BookRequestResponse } from "@/interface/bookRequest/bookRequest";

export async function checkBookRequest(
  postId: string,
  sellerId: string,
  requesterId: string,
): Promise<CheckBookRequestResponse> {
  return unwrapResponse<CheckBookRequestResponse>(
    await serverFetch<CheckBookRequestResponse>(
      `/api/book-requests/check?postId=${postId}&sellerId=${sellerId}&requesterId=${requesterId}`
    )
  );
}

export async function getSentRequests(userId: string): Promise<BookRequestResponse> {
  return unwrapResponse<BookRequestResponse>(
    await protectedFetch<BookRequestResponse>(`/api/book-requests/sent?requesterId=${userId}`)
  );
}

export async function getReceivedRequests(userId: string): Promise<BookRequestResponse> {
  return unwrapResponse<BookRequestResponse>(
    await protectedFetch<BookRequestResponse>(`/api/book-requests/received?sellerId=${userId}`)
  );
}