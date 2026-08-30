// src/app/page.tsx
import { Metadata } from "next";
import { getPosts } from "@/services/server/api";
import { BookItem } from "@/interface/post related/postDetails";
import HeroSection from "@/components/home/HeroSection";
import SearchAndLocation from "@/components/home/SearchAndLocation";
import CategoriesFilter from "@/components/home/CategoriesFilter";
import NearbyBooks from "@/components/home/NearbyBooks";
import RecentlyListedBooks from "@/components/home/RecentlyListedBooks";
import BooksDiscovery from "@/components/home/BooksDiscovery";

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
  console.log(userLocation);
  console.log(books);

  const normalizedUserLocation = userLocation.toLowerCase().trim();
  console.log(normalizedUserLocation);

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
console.log(sortByLocationMatch);

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    location?: string;
    category?: string;
    listingType?: "sell" | "donate";
    condition?: string;
  }>;
}) {
  const { search, location, category, listingType, condition } = await searchParams;

  const filteredBooks = await getPosts<BookItem>({
    search,
    category,
    listingType: listingType as "sell" | "donate" | "",
    condition,
    sort: "newest",
    limit: 20,
  });
  console.log(filteredBooks);

  const recentBooks = await getPosts<BookItem>({
    sort: "newest",
    limit: 8,
  });

  const allBooks = await getPosts<BookItem>({ limit: 50 });
  const nearbyBooks = sortByLocationMatch(allBooks.books, location);

  return (
    <div className="w-full min-h-screen bg-[#F5F7F8] font-sans antialiased overflow-x-hidden">
      <main>
        <HeroSection />
        <SearchAndLocation initialSearch={search} initialLocation={location} />
        <CategoriesFilter initialCategory={category} />
        <NearbyBooks books={nearbyBooks} userLocation={location} />
        <RecentlyListedBooks books={recentBooks.books} />
        <BooksDiscovery
          initialListingType={listingType}
          allBooks={filteredBooks.books}
          nearbyBooks={nearbyBooks}
          recentBooks={recentBooks.books}
        />
      </main>
    </div>
  );
}