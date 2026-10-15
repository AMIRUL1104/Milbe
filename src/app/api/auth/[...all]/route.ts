import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";

const handler = toNextJsHandler(auth);

const NO_STORE_HEADERS: Record<string, string> = {
  "Cache-Control": "no-store, no-cache, must-revalidate, private",
  Pragma: "no-cache",
  Expires: "0",
};

function applySecurityHeaders(res: Response): Response {
  try {
    Object.entries(NO_STORE_HEADERS).forEach(([key, value]) => {
      res.headers.set(key, value);
    });
    return res;
  } catch {
    const newHeaders = new Headers(res.headers);
    Object.entries(NO_STORE_HEADERS).forEach(([key, value]) => {
      newHeaders.set(key, value);
    });
    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: newHeaders,
    });
  }
}

export async function GET(req: NextRequest) {
  const res = await handler.GET(req);
  return applySecurityHeaders(res);
}

export async function POST(req: NextRequest) {
  const res = await handler.POST(req);
  return applySecurityHeaders(res);
}