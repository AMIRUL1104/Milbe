import type { MetadataRoute } from "next";
import { marketConfig } from "@/config/market";

/**
 * Canonical site origin. `NEXT_PUBLIC_SITE_URL` (if set) wins over the
 * market-config default (`seo.canonicalBaseUrl`).
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? marketConfig.seo.canonicalBaseUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private / zero crawl-value areas. robots.txt uses prefix matching, so
      // each entry also blocks every sub-path (e.g. "/auth" covers
      // /auth/signin, /auth/reset-password, /auth/verify-email, ...).
      disallow: [
        "/dashboard", // session-protected user/admin area
        "/auth", // sign-in / sign-up / password & email verification flows
        "/api/auth", // Better Auth session & OAuth endpoints
        "/profile", // user-private profile page
        "/add-post", // auth-gated listing form
        "/unauthorized", // utility page
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
