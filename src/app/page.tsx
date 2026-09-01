// src/app/page.tsx
import { Metadata } from "next";
import { getPosts } from "@/services/features/posts";
import { BookItem } from "@/interface/post related/postDetails";
import NearbyBooks from "@/components/home/NearbyBooks";
import BooksGrid from "@/components/home/BooksGrid";
import BooksTabs from "@/components/home/BooksTabs";
import BooksPagination from "@/components/shared/BooksPagination";
import FilterSection from "@/components/home/FilterSection";

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

function sortByLocationMatch(books: BookItem[], userLocation?: string): BookItem[] {
  if (!userLocation) return books;

  const normalizedUserLocation = userLocation.toLowerCase().trim();

  return [...books].sort((a, b) => {
    const aDistrict = a.district?.toLowerCase().trim() || "";
    const bDistrict = b.district?.toLowerCase().trim() || "";

    const aMatches = aDistrict === normalizedUserLocation;
    const bMatches = bDistrict === normalizedUserLocation;

    if (aMatches && !bMatches) return -1;
    if (!aMatches && bMatches) return 1;
    return 0;
  });
}

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

  // All books for Nearby Books (no type/category filter — preserves current behavior)
  const allBooksResponse = await getPosts({ limit: 50 });
  const nearbyBooks = sortByLocationMatch(allBooksResponse.data || [], location);

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
        <FilterSection />

        <NearbyBooks books={nearbyBooks} userLocation={location} />

        <BooksTabs
          activeType={type || ""}
          category={category}
          condition={condition}
          search={search}
        />

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
