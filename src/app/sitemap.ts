import type { MetadataRoute } from "next";
import { getPosts } from "@/services/features/posts";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    {
      url: "https://milbe.shop",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://milbe.shop/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://milbe.shop/faq",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://milbe.shop/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://milbe.shop/terms",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  try {
    let page = 1;
    let totalPages = 1;

    do {
      const response = await getPosts({ page, limit: 50 });
      for (const post of response.data ?? []) {
        if (!post.slug) continue;
        entries.push({
          url: `https://milbe.shop/books/${post.slug}`,
          lastModified: post.updatedAt || post.publishedAt,
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }

      totalPages = response.meta?.totalPages ?? page;
      page += 1;
    } while (page <= totalPages);
  } catch {
    return entries;
  }

  return entries;
}
