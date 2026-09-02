"use server";
"use server";
import { getUserToken } from "./session";
import { ApiResponse, ApiError, PaginatedMeta } from "@/interface/apiResponse";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const authHeader = async (): Promise<HeadersInit> => {
  const token = await getUserToken();

  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
};

async function handleResponse<T>(res: Response): Promise<ApiResponse<T>> {
  const responseData = (await res.json()) as ApiResponse<T>;

  if (!res.ok) {
    throw new ApiError(responseData, res.status);
  }

  return responseData;
}

export async function serverFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
      cache: "no-store",
    });

    return handleResponse<T>(res);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error("Fetch error:", error);
    throw new ApiError(
      {
        success: false,
        statusCode: 0,
        message: error instanceof Error ? error.message : "Network error",
      },
      0,
    );
  }
}

export async function protectedFetch<T>(path: string): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(await authHeader()),
      },
      cache: "no-store",
    });

    return handleResponse<T>(res);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error("Fetch error:", error);
    throw new ApiError(
      {
        success: false,
        statusCode: 0,
        message: error instanceof Error ? error.message : "Network error",
      },
      0,
    );
  }
}

export async function unwrapResponse<T>(response: ApiResponse<T>): Promise<T> {
  if (!response.success) {
    throw new ApiError(response, response.statusCode || 0);
  }
  return response.data as T;
}

export async function serverFetchInternal<T>(
  path: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  return serverFetch<T>(path, options);
}
