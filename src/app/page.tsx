// src/app/page.tsx
import { Metadata } from "next";
import { getPosts } from "@/services/features/posts";
import { getUserSession } from "@/services/core/session";
import { getUserProfile } from "@/services/features/userProfile";
import { BookItem } from "@/interface/post related/postDetails";
import type { NearbyBooksState } from "@/components/home/NearbyBooks";
import NearbyBooks from "@/components/home/NearbyBooks";
import BooksGrid from "@/components/home/BooksGrid";
import HeaderFilters from "@/components/home/HeaderFilters";
import BooksPagination from "@/components/shared/BooksPagination";

export const metadata: Metadata = {
  title: "milbe.shop | Bangladesh's Student Book Hub",
  description:
    "milbe is a trusted marketplace for students to buy, sell, and donate used academic books across Bangladesh. Discover affordable textbooks or share books with others.",

  keywords: [
    "milbe",
    "milbe.shop",
    "academic books",
    "used books",
    "buy books",
    "sell books",
    "donate books",
    "textbooks",
    "student marketplace",
    "Bangladesh",
  ],

  alternates: {
    canonical: "https://milbe.shop",
  },

  openGraph: {
    title: "milbe.shop | Bangladesh's Student Book Hub",
    description:
      "Buy, sell, and donate used academic books with students across Bangladesh.",
    url: "https://milbe.shop",
    siteName: "milbe.shop",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://milbe.shop/og-image.png",
        width: 1200,
        height: 630,
        alt: "milbe.shop",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "milbe.shop | Bangladesh's Student Book Hub",
    description:
      "A student marketplace for buying, selling, and donating academic books.",
    images: ["https://milbe.shop/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    location?: string;
    category?: string;
    type?: "sell" | "donate";
    condition?: string;
    page?: string;
  }>;
}) {
  const { search, location, category, type, condition, page } = await searchParams;

  // --- Nearby Books: user-centric logic ---
  const session = await getUserSession();

  let nearbyState: NearbyBooksState = "needs-login";
  let nearbyBooks: BookItem[] = [];
  let nearbyDistrict: string | undefined;

  if (location) {
    const nearbyResponse = await getPosts({ district: location, limit: 50 });
    nearbyBooks = nearbyResponse.data || [];
    nearbyDistrict = location;
    nearbyState = nearbyBooks.length > 0 ? "loaded" : "empty";
  } else if (session) {
    const profile = await getUserProfile();
    const profileDistrict = profile?.district?.trim();
    if (profileDistrict) {
      const nearbyResponse = await getPosts({
        district: profileDistrict,
        limit: 50,
      });
      nearbyBooks = nearbyResponse.data || [];
      nearbyDistrict = profileDistrict;
      nearbyState = nearbyBooks.length > 0 ? "loaded" : "empty";
    } else {
      nearbyState = "needs-profile";
    }
  }

  // Filtered books for All Books section (with pagination metadata)
  const paginatedResponse = await getPosts({
    search,
    category,
    type: (type || "") as "sell" | "donate" | "",
    condition,
    sort: "newest",
    page: Number(page) || 1,
    limit: 20,
  });

  const books = paginatedResponse.data || [];
  const totalPages = paginatedResponse.meta?.totalPages || 1;

  return (
    <div className="w-full min-h-screen bg-[#F5F7F8] font-sans antialiased overflow-x-hidden">
      <main>
        <HeaderFilters
          activeType={type || ""}
          category={category}
          condition={condition}
          search={search}
        />
        <NearbyBooks state={nearbyState} books={nearbyBooks} district={nearbyDistrict} />


        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <BooksGrid books={books} />
          <div className="flex justify-center mt-6">
            <BooksPagination totalPages={totalPages} />
          </div>
        </div>
      </main>
    </div>
  );
}
