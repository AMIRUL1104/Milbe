import { protectedFetch } from "@/services/core/serverFetch";
import {
  CheckBookRequestResponse,
  BookRequest,
} from "@/interface/bookRequest/checkRequest";
import { ApiResponse } from "@/interface/apiResponse";

export async function checkBookRequest(
  postId: string,
): Promise<CheckBookRequestResponse> {
  // console.log(encodeURIComponent(postId));
  return protectedFetch<NonNullable<CheckBookRequestResponse["data"]>>(
    `/api/book-requests/check?postId=${postId}`,
  );
}

export async function getSentRequests(
  userId: string,
): Promise<ApiResponse<BookRequest[]>> {
  return protectedFetch<BookRequest[]>(
    `/api/book-requests/sent?requesterId=${userId}`,
  );
}

export async function getReceivedRequests(
  userId: string,
): Promise<ApiResponse<BookRequest[]>> {
  return protectedFetch<BookRequest[]>(
    `/api/book-requests/received?sellerId=${userId}`,
  );
}
