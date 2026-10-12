"use server";

import { ApiError, ApiResponse } from "@/interface/apiResponse";
import { authHeader } from "@/services/core/serverFetch";

export interface UploadedImage {
  assetId: string;
  secureUrl: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

async function readApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const result = (await response.json()) as ApiResponse<T>;
  if (!response.ok) {
    throw new ApiError(result, response.status);
  }
  return result;
}

export async function uploadImageAction(
  input: FormData,
  purpose: "post" | "profile",
): Promise<UploadedImage> {
  if (!baseUrl) {
    throw new Error("Image service is not configured.");
  }
  const file = input.get("image");
  if (!(file instanceof File)) {
    throw new Error("Select an image file to upload.");
  }

  const formData = new FormData();
  formData.append("image", file, file.name);
  formData.append("purpose", purpose);

  const response = await fetch(`${baseUrl}/api/images`, {
    method: "POST",
    headers: await authHeader(),
    body: formData,
    cache: "no-store",
  });
  const result = await readApiResponse<UploadedImage>(response);
  if (!result.data?.assetId || !result.data.secureUrl) {
    throw new Error("Image service returned an incomplete upload result.");
  }
  return result.data;
}

export async function deletePendingImageAction(assetId: string): Promise<void> {
  if (!baseUrl) {
    throw new Error("Image service is not configured.");
  }
  const response = await fetch(
    `${baseUrl}/api/images/${encodeURIComponent(assetId)}`,
    {
      method: "DELETE",
      headers: {
        ...(await authHeader()),
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );
  await readApiResponse<unknown>(response);
}
