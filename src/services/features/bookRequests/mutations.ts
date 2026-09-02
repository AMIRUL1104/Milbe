import { serverMutation } from "@/services/core/server";
import { BookRequest } from "@/interface/bookRequest/checkRequest";
import { BookRequestUpdateResponse } from "@/interface/bookRequest/bookRequest";
import { ApiResponse } from "@/interface/apiResponse";

export async function createBookRequest(
  data: BookRequest,
): Promise<ApiResponse<{ insertedId: string; createdAt: string }>> {
  return (await serverMutation<BookRequest, { insertedId: string; createdAt: string }>(
    "/api/book-requests",
    data,
    "POST",
  )) as ApiResponse<{ insertedId: string; createdAt: string }>;
}

export async function acceptBookRequest(
  id: string,
): Promise<BookRequestUpdateResponse> {
  return (await serverMutation<Record<string, never>, null>(
    `/api/book-requests/${id}/accept`,
    {},
    "PATCH",
  )) as BookRequestUpdateResponse;
}

export async function rejectBookRequest(
  id: string,
): Promise<BookRequestUpdateResponse> {
  return (await serverMutation<Record<string, never>, null>(
    `/api/book-requests/${id}/reject`,
    {},
    "PATCH",
  )) as BookRequestUpdateResponse;
}

export async function cancelBookRequest(
  id: string,
): Promise<BookRequestUpdateResponse> {
  return (await serverMutation<Record<string, never>, null>(
    `/api/book-requests/${id}/cancel`,
    {},
    "PATCH",
  )) as BookRequestUpdateResponse;
}
