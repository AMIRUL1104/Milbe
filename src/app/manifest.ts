import type { MetadataRoute } from "next";
import { marketConfig } from "@/config/market";

/**
 * PWA manifest — public/manifest.json ও public/site.webmanifest-এর
 * কনফিগ-ড্রাইভেন প্রতিস্থাপন (দুটোই মুছে ফেলা হয়েছে)।
 *
 * Next.js এই ফাইলটিকে /manifest.webmanifest রুটে সার্ভ করে এবং রুট
 * layout-এর metadata.manifest ফিল্ড <link rel="manifest"> অটো-ইনজেক্ট করে।
 */
export default function manifest(): MetadataRoute.Manifest {
  const { seo } = marketConfig;

  return {
    name: seo.defaultTitle,
    short_name: seo.siteName,
    description: seo.description,
    lang: "bn",
    dir: "ltr",
    id: "/",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#35858E",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
