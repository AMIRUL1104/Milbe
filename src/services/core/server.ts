"use server";

import { authHeader } from "./serverFetch";
import { ApiResponse, ApiError } from "@/interface/apiResponse";

const baseUrl = process.env.NEXT_PUBLIC_API_URL!;

async function handleMutationResponse<T>(res: Response): Promise<ApiResponse<T>> {
  const responseData = (await res.json()) as ApiResponse<T>;

  if (!res.ok) {
    throw new ApiError(responseData, res.status);
  }

  return responseData;
}

export const serverMutation = async <TData, TResponse = unknown>(
  path: string,
  data: TData,
  method: "POST" | "PATCH" | "DELETE" = "POST",
  options?: { unwrap?: boolean },
): Promise<ApiResponse<TResponse> | TResponse> => {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(await authHeader()),
      },
      body: method !== "DELETE" ? JSON.stringify(data) : undefined,
    });

    const responseData = await handleMutationResponse<TResponse>(response);

    if (options?.unwrap) {
      return responseData.data as TResponse;
    }

    return responseData;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error(error);

    throw new ApiError(
      {
        success: false,
        statusCode: 0,
        message: "Something went wrong!",
      },
      0,
    );
  }
};
