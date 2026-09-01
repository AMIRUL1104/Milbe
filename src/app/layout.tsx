import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/navbar/Header";
import Footer from "@/components/layout/Footer/Footer";
import { ToastContainer } from "react-toastify";
import { getUserSession } from "@/services/core/session";
import { BottomNav } from "@/components/navbar/BottomNav";
import { UserSession } from "@/interface/user/userSession";

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

export const metadata: Metadata = {
  title: "milbe",
  description: "Share and discover books in your community",
  metadataBase: new URL("https://milbe.shop"),
  alternates: {
    canonical: "https://milbe.shop",
  },
  openGraph: {
    title: "milbe",
    description: "Share and discover books in your community",
    url: "https://milbe.shop",
    siteName: "milbe",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "milbe",
    description: "Share and discover books in your community",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "milbe",
  url: "https://milbe.shop",
  description: "Share and discover books in your community",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://milbe.shop?search={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserSession() as UserSession;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <BottomNav />
        <Footer />

        <ToastContainer />
      </body>
    </html>
  );
}