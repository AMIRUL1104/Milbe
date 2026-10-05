import type { MetadataRoute } from "next";
import { marketConfig } from "@/config/market";
import { db } from "@/lib/auth";
import { getPosts } from "@/services/features/posts";

/**
 * Sitemap for Milbe.
 *
 * - Static public pages are listed with honest metadata (no fake lastModified).
 * - Book detail URLs (`/books/[slug]`) come straight from MongoDB with a lean
 *   projection (slug + timestamps only — never a full document), using the
 *   exact filter the public browse endpoint applies (`status: "available"`,
 *   not soft-deleted, has a slug). The unique `post_slug_unique` index
 *   guarantees no duplicate book URLs.
 * - If the direct DB query fails, it falls back to the posts API pagination;
 *   if that also fails, the static entries are still served.
 *
 * Rebuilt (ISR) at most once per hour; crawlers get the cached XML in between.
 */
export const revalidate = 3600;

/**
 * Canonical site origin. `NEXT_PUBLIC_SITE_URL` (if set, e.g. to the upcoming
 * custom domain) wins over the production default.
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? marketConfig.seo.canonicalBaseUrl;

/** Slugs are generated server-side as [a-z0-9-]+ — anything else is legacy/test junk. */
const SLUG_PATTERN = /^[a-z0-9-]+$/;

/** Only the fields the sitemap needs from the `posts` collection. */
interface SitemapPostDoc {
  slug?: string;
  status?: string;
  isDeleted?: boolean;
  updatedAt?: Date;
  publishedAt?: Date;
}

type SitemapEntry = MetadataRoute.Sitemap[number];

const STATIC_ENTRIES: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1 },
  { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/faq`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_URL}/how-it-works`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
];

/** Builds a book detail entry; `lastModified` is omitted when unknown. */
function toBookEntry(slug: string, lastModified?: Date | string): SitemapEntry {
  return {
    url: `${SITE_URL}/books/${encodeURIComponent(slug)}`,
    changeFrequency: "weekly",
    priority: 0.7,
    ...(lastModified ? { lastModified } : {}),
  };
}

/** Same predicate for both data paths: valid, URL-safe slug only. */
const isValidSlug = (slug: unknown): slug is string =>
  typeof slug === "string" && SLUG_PATTERN.test(slug);

/**
 * Primary source: one lean MongoDB query over the shared connection pool
 * (`@/lib/auth`) — projection only, so no full documents are loaded.
 */
async function collectBookEntriesFromDb(): Promise<MetadataRoute.Sitemap> {
  const docs = await db
    .collection<SitemapPostDoc>("posts")
    .find(
      {
        status: "available",
        isDeleted: { $ne: true },
        slug: { $type: "string", $ne: "" },
      },
      { projection: { slug: 1, updatedAt: 1, publishedAt: 1, _id: 0 } },
    )
    .toArray();

  const entries: MetadataRoute.Sitemap = [];
  for (const doc of docs) {
    const slug = doc.slug;
    if (!isValidSlug(slug)) continue;
    entries.push(toBookEntry(slug, doc.updatedAt ?? doc.publishedAt));
  }
  return entries;
}

/** Fallback source: the public posts API (limit 50 — the server's max). */
async function collectBookEntriesFromApi(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  let page = 1;
  let totalPages = 1;

  do {
    const response = await getPosts({ page, limit: 50 });
    for (const post of response.data ?? []) {
      const slug = post.slug;
      if (!isValidSlug(slug)) continue;
      entries.push(toBookEntry(slug, post.updatedAt || post.publishedAt));
    }
    totalPages = response.meta?.totalPages ?? page;
    page += 1;
  } while (page <= totalPages);

  return entries;
}

/** DB first, API as a resilience fallback. */
async function collectBookEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    return await collectBookEntriesFromDb();
  } catch (error) {
    console.error(
      "[sitemap] Direct MongoDB query failed — falling back to the posts API.",
      error,
    );
    return collectBookEntriesFromApi();
  }
}

/** Belt-and-braces dedupe (slugs are index-unique, but never trust blindly). */
function dedupeByUrl(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  const result: MetadataRoute.Sitemap = [];
  for (const entry of entries) {
    if (seen.has(entry.url)) continue;
    seen.add(entry.url);
    result.push(entry);
  }
  return result;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [...STATIC_ENTRIES];

  try {
    entries.push(...(await collectBookEntries()));
  } catch {
    // Both sources failed — serve the static pages only (previous behavior).
  }

  return dedupeByUrl(entries);
}
