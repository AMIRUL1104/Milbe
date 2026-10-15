"use server";
import { getUserToken } from "./session";
import { ApiResponse, ApiError } from "@/interface/apiResponse";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const authHeader = async (): Promise<HeadersInit> => {
  const token = await getUserToken();
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

async function handleResponse<T>(res: Response): Promise<ApiResponse<T>> {
  const responseData = (await res.json()) as ApiResponse<T>;
  if (!res.ok) {
    throw new ApiError(responseData, res.status);
  }
  return responseData;
}

/**
 * Public data fetch — cached for 60 seconds at the Next.js Data Cache layer,
 * tagged "posts" so post-mutation Server Actions can invalidate it via
 * `revalidateTag("posts")` without waiting for the timer.
 *
 * DO NOT use for authenticated / user-specific endpoints — use protectedFetch.
 */
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
      // 60-second ISR-style caching; tag lets mutations revalidate instantly.
      next: { revalidate: 60, tags: ["posts"] },
    });

    return handleResponse<T>(res);
  } catch (error) {
    if (error instanceof ApiError) throw error;
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

/**
 * Authenticated / private fetch — always bypasses the cache.
 * Use for any endpoint that returns user-specific data or mutates state.
 */
export async function protectedFetch<T>(path: string): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(await authHeader()),
      },
      cache: "no-store", // Always fresh — never serve stale private data
    });

    const responseData = (await res.json()) as ApiResponse<T>;
    if (!res.ok) {
      throw new ApiError(responseData, res.status);
    }
    return responseData;
  } catch (error) {
    if (error instanceof ApiError) throw error;
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

/**
 * Alias kept for backward compatibility.
 * Prefer serverFetch directly for new call-sites.
 */
export async function serverFetchInternal<T>(
  path: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  return serverFetch<T>(path, options);
}
