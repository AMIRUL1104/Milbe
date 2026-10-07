import type { Metadata } from "next";
import { Inter, Geist_Mono, Hind_Siliguri, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { marketConfig } from "@/config/market";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-bn-serif",
  subsets: ["bengali"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const { seo, region } = marketConfig;

export const metadata: Metadata = {
  title: {
    default: seo.defaultTitle,
    template: seo.titleTemplate,
  },
  description: seo.description,
  metadataBase: new URL(seo.canonicalBaseUrl),
  alternates: {
    canonical: seo.canonicalBaseUrl,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: seo.defaultTitle,
    description: seo.description,
    url: seo.canonicalBaseUrl,
    siteName: seo.siteName,
    locale: seo.ogLocale,
    type: "website",
    images: [{ url: seo.ogImage, alt: seo.defaultTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.defaultTitle,
    description: seo.description,
    images: [seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * JSON-LD structured data — সব মান marketConfig থেকে ডেরাইভ।
 * @graph: WebSite (SearchAction সহ) + Organization (Sylhet, Bangladesh)।
 * Organization ব্যবহার (LocalBusiness নয়) কারণ মিলবে একটি অনলাইন প্ল্যাটফর্ম।
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Milbe",
      alternateName: "মিলবে",
      url: seo.canonicalBaseUrl,
      description: seo.description,
      inLanguage: "bn",
      potentialAction: {
        "@type": "SearchAction",
        target: `${seo.canonicalBaseUrl}?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      name: "Milbe",
      alternateName: "মিলবে",
      url: seo.canonicalBaseUrl,
      logo: `${seo.canonicalBaseUrl}${seo.ogImage}`,
      description: seo.description,
      address: {
        "@type": "PostalAddress",
        addressLocality: region.nameEn,
        addressRegion: region.nameEn,
        addressCountry: "BD",
      },
      areaServed: {
        "@type": "City",
        name: region.nameEn,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="bn"
      className={`${inter.variable} ${geistMono.variable} ${hindSiliguri.variable} ${notoSerifBengali.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col font-sans"
        style={{ fontFamily: "var(--font-hind-siliguri), var(--font-inter), sans-serif" }}
      >
        {children}
        <ToastContainer />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}