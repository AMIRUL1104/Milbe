import { serverMutation } from "@/services/core/server";
import type {
  NewPostPayload,
  PostItem,
  UpdatePostPayload,
} from "@/interface/post/types";
import { ApiResponse } from "@/interface/apiResponse";

export async function addNewPost(data: NewPostPayload): Promise<ApiResponse<{ insertedId: string; createdAt: string }>> {
  return (await serverMutation<NewPostPayload, { insertedId: string; createdAt: string }>("/api/posts", data, "POST")) as ApiResponse<{ insertedId: string; createdAt: string }>;
}

export async function updatePost(
  postId: string,
  data: UpdatePostPayload,
): Promise<ApiResponse<PostItem>> {
  return (await serverMutation<UpdatePostPayload, PostItem>(
    `/api/posts/${postId}`,
    data,
    "PATCH",
  )) as ApiResponse<PostItem>;
}

export async function deletePost(postId: string): Promise<ApiResponse<null>> {
  return (await serverMutation<Record<string, never>, null>(`/api/posts/${postId}`, {}, "DELETE")) as ApiResponse<null>;
}