import { serverMutation } from "@/services/core/server";
import { BookRequest } from "@/interface/bookRequest/checkRequest";
import { BookRequestUpdateResponse } from "@/interface/bookRequest/bookRequest";
import { ApiResponse } from "@/interface/apiResponse";

export async function createBookRequest(
  data: BookRequest,
): Promise<ApiResponse<{ insertedId: string; createdAt: string }>> {
  return serverMutation<BookRequest, { insertedId: string; createdAt: string }>(
    "/api/book-requests",
    data,
    "POST",
  );
}

export async function acceptBookRequest(
  id: string,
): Promise<BookRequestUpdateResponse> {
  return serverMutation<Record<string, never>, null>(
    `/api/book-requests/${id}/accept`,
    {},
    "PATCH",
  );
}

export async function rejectBookRequest(
  id: string,
): Promise<BookRequestUpdateResponse> {
  return serverMutation<Record<string, never>, null>(
    `/api/book-requests/${id}/reject`,
    {},
    "PATCH",
  );
}

export async function cancelBookRequest(
  id: string,
): Promise<BookRequestUpdateResponse> {
  return serverMutation<Record<string, never>, null>(
    `/api/book-requests/${id}/cancel`,
    {},
    "PATCH",
  );
}
