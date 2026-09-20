// src/app/page.tsx
import { Metadata } from "next";
import { getPosts } from "@/services/features/posts";
import { getUserSession } from "@/services/core/session";
import { PostItem } from "@/interface/post/types";
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
  },

  twitter: {
    card: "summary_large_image",
    title: "milbe.shop | Bangladesh's Student Book Hub",
    description:
      "A student marketplace for buying, selling, and donating academic books.",
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
  const currentPage = Number(page) || 1;
  const hasActiveFilters = Boolean(
    search?.trim() ||
    category?.trim() ||
    condition?.trim() ||
    type === "sell" ||
    type === "donate",
  );

  // --- Nearby Books: user-centric logic ---
  const session = await getUserSession();
  let profileDistrict: string | undefined;
  if (session && !location) {
    profileDistrict = session.district?.trim() || undefined;
  }
  const selectedDistrict = location || profileDistrict;

  let nearbyState: NearbyBooksState = "needs-login";
  let nearbyBooks: PostItem[] = [];
  let nearbyDistrict: string | undefined;
  let nearbyTotalPages = 1;
  let nearbyTotal = 0;

  // Global books remain unscoped by location and power both default and unified views.
  let books: PostItem[] = [];
  let totalPages = 1;
  let allBooksTotal = 0;
  let allBooksError = false;

  // Both requests are independent — run them in parallel to halve SSR wait time.
  // Each result keeps its own isolated error state so one failing section
  // never breaks the other (spec §18: homepage must never fully break).
  const [nearbyResult, allBooksResult] = await Promise.allSettled([
    // 1) Nearby books (only meaningful when a district is known and no filters active)
    (async () => {
      if (!hasActiveFilters && selectedDistrict) {
        return getPosts({
          district: selectedDistrict,
          page: 1,
          limit: 10,
        });
      }
      return null;
    })(),
    // 2) All books / unified filtered results
    getPosts({
      search,
      category,
      district: hasActiveFilters ? selectedDistrict : undefined,
      type: (type || "") as "sell" | "donate" | "",
      condition,
      sort: "newest",
      page: currentPage,
      limit: 20,
    }),
  ]);

  if (nearbyResult.status === "fulfilled" && nearbyResult.value) {
    const nearbyResponse = nearbyResult.value;
    nearbyBooks = nearbyResponse.data || [];
    nearbyTotalPages = nearbyResponse.meta?.totalPages || 1;
    nearbyTotal = nearbyResponse.meta?.total ?? nearbyBooks.length;
    nearbyDistrict = selectedDistrict;
    nearbyState = nearbyBooks.length > 0 ? "loaded" : "empty";
  } else if (nearbyResult.status === "rejected") {
    nearbyDistrict = selectedDistrict;
    nearbyState = "error";
  } else if (!hasActiveFilters && session && !selectedDistrict) {
    // Nearby request intentionally skipped: logged-in user without a district.
    nearbyState = "needs-profile";
  }

  if (allBooksResult.status === "fulfilled") {
    const paginatedResponse = allBooksResult.value;
    books = paginatedResponse.data || [];
    totalPages = paginatedResponse.meta?.totalPages || 1;
    allBooksTotal = paginatedResponse.meta?.total ?? books.length;
  } else {
    allBooksError = true;
  }

  return (
    <div className="w-full min-h-screen bg-[#F5F7F8] font-sans antialiased overflow-x-hidden">
      <main>
        <HeaderFilters
          activeType={type || ""}
          category={category}
          condition={condition}
          search={search}
        />
        {!hasActiveFilters && (
          <NearbyBooks
            key={nearbyDistrict || nearbyState}
            state={nearbyState}
            books={nearbyBooks}
            district={nearbyDistrict}
            totalPages={nearbyTotalPages}
            total={nearbyTotal}
          />
        )}


        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <BooksGrid
            books={books}
            error={allBooksError}
            isFiltered={hasActiveFilters}
            search={search}
            category={category}
            condition={condition}
            type={type || ""}
            total={allBooksTotal}
          />
          <div className="flex justify-center mt-6">
            <BooksPagination totalPages={totalPages} />
          </div>
        </div>
      </main>
    </div>
  );
}
