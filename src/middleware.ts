import { NextRequest, NextResponse } from "next/server";

/**
 * Next.js Middleware — BFCache & back-button security.
 *
 * Problem:
 *   After a user logs out, pressing the browser Back button can restore
 *   a BFCache (Back/Forward Cache) snapshot of the private dashboard/profile
 *   page — showing sensitive data without re-authenticating.
 *
 * Fix:
 *   Attach `Cache-Control: no-store, private` to every response for
 *   authenticated routes. Modern browsers (Chrome 96+, Firefox 126+) will NOT
 *   store a `no-store` page in BFCache.
 *
 *   NOTE: Only apply this to genuinely private routes.  Public routes (/, /books,
 *   etc.) must NOT get `no-store` — that would kill ISR and CDN caching.
 */

const PRIVATE_ROUTE_PREFIXES = [
  "/dashboard",
  "/profile",
  "/add-post",
];

const PRIVATE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, private",
  Pragma: "no-cache",
  Expires: "0",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivate = PRIVATE_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!isPrivate) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  // Apply strict no-store headers to prevent BFCache & CDN caching of
  // authenticated page snapshots.
  Object.entries(PRIVATE_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/add-post/:path*",
  ],
};
