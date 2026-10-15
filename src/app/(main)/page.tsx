import dynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { getPosts } from "@/services/features/posts";
import { getUserSession } from "@/services/core/session";
import { PostItem } from "@/interface/post/types";
import type { NearbyBooksState } from "@/components/home/NearbyBooks";
import NearbyBooks from "@/components/home/NearbyBooks";
import BooksGrid from "@/components/home/BooksGrid";
import HeaderFilters from "@/components/home/HeaderFilters";
import BooksPagination from "@/components/shared/BooksPagination";
import Hero from "@/components/home/Hero";

// Dynamic imports for below-the-fold static sections to reduce initial bundle size & TTI
const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"), {
  loading: () => (
    <div className="h-64 animate-pulse bg-surface/40 rounded-2xl mx-auto max-w-7xl my-8" />
  ),
});
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs"), {
  loading: () => (
    <div className="h-64 animate-pulse bg-surface/40 rounded-2xl mx-auto max-w-7xl my-8" />
  ),
});
const CTA = dynamic(() => import("@/components/home/CTA"), {
  loading: () => (
    <div className="h-48 animate-pulse bg-surface/40 rounded-2xl mx-auto max-w-7xl my-8" />
  ),
});

export const metadata = buildPageMetadata("home");

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

  const isSearchActive = Boolean(search?.trim());

  // Location scopes Nearby Books by default and constrains results when content filters are active.
  const hasActiveContentFilters = Boolean(
    isSearchActive ||
    category?.trim() ||
    condition?.trim() ||
    type === "sell" ||
    type === "donate"
  );

  const requestedDistrict = location?.trim();

  // If a district is explicitly in searchParams, we can fire nearby books immediately in parallel.
  const immediateNearbyPromise =
    !hasActiveContentFilters && requestedDistrict
      ? getPosts({ district: requestedDistrict, page: 1, limit: 10 })
      : null;

  // Decouple session & all-books fetches — fire concurrently to eliminate SSR waterfall.
  const [sessionResult, allBooksResult, initialNearbyResult] = await Promise.allSettled([
    getUserSession(),
    getPosts({
      search,
      category,
      type: (type || "") as "sell" | "donate" | "",
      condition,
      district: hasActiveContentFilters ? requestedDistrict : undefined,
      sort: "newest",
      page: currentPage,
      limit: 20,
    }),
    immediateNearbyPromise ? immediateNearbyPromise : Promise.resolve(null),
  ]);

  const session = sessionResult.status === "fulfilled" ? sessionResult.value : null;
  const profileDistrict = requestedDistrict
    ? undefined
    : session?.district?.trim() || undefined;
  const selectedDistrict = requestedDistrict || profileDistrict;

  let nearbyState: NearbyBooksState = "needs-login";
  let nearbyBooks: PostItem[] = [];
  let nearbyDistrict: string | undefined;
  let nearbyTotalPages = 1;
  let nearbyTotal = 0;

  // Location-only pages keep All Books global; active filtered results may be district-scoped.
  let books: PostItem[] = [];
  let totalPages = 1;
  let allBooksTotal = 0;
  let allBooksError = false;

  // 1. Process All Books result
  if (allBooksResult.status === "fulfilled") {
    const paginatedResponse = allBooksResult.value;
    books = paginatedResponse.data || [];
    totalPages = paginatedResponse.meta?.totalPages || 1;
    allBooksTotal = paginatedResponse.meta?.total ?? books.length;
  } else {
    allBooksError = true;
  }

  // 2. Process Nearby Books result
  if (!hasActiveContentFilters) {
    if (requestedDistrict) {
      if (initialNearbyResult.status === "fulfilled" && initialNearbyResult.value) {
        const nearbyResponse = initialNearbyResult.value;
        nearbyBooks = nearbyResponse.data || [];
        nearbyTotalPages = nearbyResponse.meta?.totalPages || 1;
        nearbyTotal = nearbyResponse.meta?.total ?? nearbyBooks.length;
        nearbyDistrict = selectedDistrict;
        nearbyState = nearbyBooks.length > 0 ? "loaded" : "empty";
      } else if (initialNearbyResult.status === "rejected") {
        nearbyDistrict = selectedDistrict;
        nearbyState = "error";
      }
    } else if (profileDistrict) {
      try {
        const nearbyResponse = await getPosts({
          district: profileDistrict,
          page: 1,
          limit: 10,
        });
        nearbyBooks = nearbyResponse.data || [];
        nearbyTotalPages = nearbyResponse.meta?.totalPages || 1;
        nearbyTotal = nearbyResponse.meta?.total ?? nearbyBooks.length;
        nearbyDistrict = profileDistrict;
        nearbyState = nearbyBooks.length > 0 ? "loaded" : "empty";
      } catch {
        nearbyDistrict = profileDistrict;
        nearbyState = "error";
      }
    } else if (session && !selectedDistrict) {
      nearbyState = "needs-profile";
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#F5F7F8] font-sans antialiased overflow-x-hidden">
      <main>
        {/* ১. ফিল্টার ও সার্চ বার (সর্বদা উপরে থাকবে) */}
        <HeaderFilters
          activeType={type || ""}
          category={category}
          condition={condition}
          search={search}
        />

        {/* ২. হিরো সেকশন (শুধুমাত্র কনটেন্ট ফিল্টার না থাকলে দেখাবে) */}
        {!isSearchActive && !hasActiveContentFilters && <Hero />}

        {/* ৩. নিয়ারবাই বুকস সেকশন (শুধুমাত্র কনটেন্ট ফিল্টার না থাকলে দেখাবে) */}
        {!isSearchActive && !hasActiveContentFilters && (
          <NearbyBooks
            key={nearbyDistrict || nearbyState}
            state={nearbyState}
            books={nearbyBooks}
            district={nearbyDistrict}
            totalPages={nearbyTotalPages}
            total={nearbyTotal}
          />
        )}

        {/* ৪. বইয়ের গ্রিড ও প্যাজিনেশন (সকল ফিল্টার্ড/ডিফল্ট রেজাল্ট দেখাবে) */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <BooksGrid
            books={books}
            error={allBooksError}
            isFiltered={hasActiveContentFilters}
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

        {/* ৫, ৬, ৭. অতিরিক্ত ইনফরমেশন সেকশনসমূহ — dynamic import সহ */}
        {!hasActiveContentFilters && (
          <>
            <HowItWorks />
            <WhyChooseUs />
            <CTA />
          </>
        )}
      </main>
    </div>
  );
}