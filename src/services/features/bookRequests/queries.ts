import { serverFetch, protectedFetch } from "@/services/core/serverFetch";
import { CheckBookRequestResponse, BookRequest } from "@/interface/bookRequest/checkRequest";
import { ApiResponse } from "@/interface/apiResponse";

export async function checkBookRequest(
  postId: string,
  sellerId: string,
  requesterId: string,
): Promise<CheckBookRequestResponse> {
  return serverFetch<NonNullable<CheckBookRequestResponse["data"]>>(
    `/api/book-requests/check?postId=${postId}&sellerId=${sellerId}&requesterId=${requesterId}`
  );
}

export async function getSentRequests(
  userId: string,
): Promise<ApiResponse<{ requests: BookRequest[] }>> {
  return protectedFetch<{ requests: BookRequest[] }>(
    `/api/book-requests/sent?requesterId=${userId}`,
  );
}

export async function getReceivedRequests(
  userId: string,
): Promise<ApiResponse<{ requests: BookRequest[] }>> {
  return protectedFetch<{ requests: BookRequest[] }>(
    `/api/book-requests/received?sellerId=${userId}`,
  );
}