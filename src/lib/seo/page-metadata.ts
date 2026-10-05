import type { Metadata } from "next";
import { marketConfig } from "@/config/market";

/**
 * buildPageMetadata — স্ট্যাটিক পেজের জন্য পূর্ণ Metadata অবজেক্ট তৈরি করে।
 *
 * সব মান marketConfig.seo থেকে ডেরাইভ হয় — এই হেল্পার নিজে কোনো কপি
 * ধারণ করে না (single source of truth = src/config/market.ts)।
 *
 * কেন প্রতিটি পেজে পূর্ণ OG/Twitter ব্লক দরকার: Next.js-এ চাইল্ড পেজে
 * openGraph/twitter দিলে প্যারেন্টের পুরো ব্লক replace হয় (merge হয় না)।
 */
export function buildPageMetadata(pageKey: string): Metadata {
  const { seo } = marketConfig;
  const page = seo.pages[pageKey];

  if (!page) {
    throw new Error(
      `[seo] marketConfig.seo.pages-এ "${pageKey}" কী নেই — আগে config-এ যোগ করুন`,
    );
  }

  const canonical = `${seo.canonicalBaseUrl}${page.path}`;

  return {
    // absoluteTitle: true হলে titleTemplate ("%s | Milbe") প্রয়োগ হবে না
    title: page.absoluteTitle ? { absolute: page.title } : page.title,
    description: page.description,
    keywords: [...seo.keywords],
    alternates: {
      canonical,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: seo.siteName,
      locale: seo.ogLocale,
      type: "website",
      images: [{ url: seo.ogImage, alt: seo.defaultTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [seo.ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
