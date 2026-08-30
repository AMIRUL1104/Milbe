import { serverMutation } from "@/services/core/server";
import { BookItem } from "@/interface/post related/postDetails";
import { ApiResponse } from "@/interface/apiResponse";

export async function addNewPost(data: BookItem): Promise<ApiResponse<{ insertedId: string; createdAt: string }>> {
  return serverMutation<BookItem, { insertedId: string; createdAt: string }>("/api/posts", data, "POST");
}

export async function deletePost(postId: string): Promise<ApiResponse<null>> {
  return serverMutation<Record<string, never>, null>(`/api/posts/${postId}`, {}, "DELETE");
}