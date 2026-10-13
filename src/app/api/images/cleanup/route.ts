import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getUserToken } from "@/services/core/session";

export const runtime = "nodejs";

const requestSchema = z.object({
  assetIds: z.array(z.string().regex(/^[a-f\d]{24}$/i)).min(1).max(10),
});

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return NextResponse.json(
      { message: "JSON content is required." },
      { status: 415 },
    );
  }
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 2048) {
    return NextResponse.json({ message: "Cleanup request is too large." }, { status: 413 });
  }

  const token = await getUserToken();
  if (!token) {
    return NextResponse.json({ message: "Authentication required." }, { status: 401 });
  }
  if (!apiBaseUrl) {
    return NextResponse.json(
      { message: "Image service is not configured." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid cleanup request." }, { status: 400 });
  }
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid cleanup request." }, { status: 400 });
  }

  const results = await Promise.all(
    [...new Set(parsed.data.assetIds)].map(async (assetId) => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/api/images/${encodeURIComponent(assetId)}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
          },
        );
        if (!response.ok) {
          console.warn("[image-cleanup] Backend rejected unload cleanup.", {
            assetId,
            status: response.status,
          });
        }
        return response.ok;
      } catch (error) {
        console.error("[image-cleanup] Unload cleanup request failed.", {
          assetId,
          error,
        });
        return false;
      }
    }),
  );

  if (results.some((success) => !success)) {
    return NextResponse.json(
      { message: "One or more image cleanups could not be confirmed." },
      { status: 502 },
    );
  }
  return NextResponse.json({ success: true });
}
