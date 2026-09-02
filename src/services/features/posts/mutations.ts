import { serverMutation } from "@/services/core/server";
import { BookItem } from "@/interface/post related/postDetails";
import { ApiResponse } from "@/interface/apiResponse";

export async function addNewPost(data: BookItem): Promise<ApiResponse<{ insertedId: string; createdAt: string }>> {
  return (await serverMutation<BookItem, { insertedId: string; createdAt: string }>("/api/posts", data, "POST")) as ApiResponse<{ insertedId: string; createdAt: string }>;
}

export async function deletePost(postId: string): Promise<ApiResponse<null>> {
  return (await serverMutation<Record<string, never>, null>(`/api/posts/${postId}`, {}, "DELETE")) as ApiResponse<null>;
}