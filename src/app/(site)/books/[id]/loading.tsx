// src/app/books/[id]/loading.tsx

/**
 * Skeleton Loading Component for Book Details Page
 * Displays a responsive loading state that mirrors the structure of books/[id]/page.tsx
 * Includes: Back button, BookHero, BookInformation, BookMetaCard and SellerCard skeletons
 */

/**
 * BackButtonSkeleton
 * Mimics the "হোমে ফিরে যান" back link at the top of the page
 */
function BackButtonSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-xs">
        <div className="h-4 w-4 rounded bg-slate-200" />
        <div className="h-3.5 w-24 rounded bg-slate-200" />
      </div>
    </div>
  );
}

/**
 * BookHeroSkeleton
 * Mimics the BookHero component structure
 * Layout: card with book cover image (with type tag) beside category, title and price box
 */
function BookHeroSkeleton() {
  return (
    <div className="animate-pulse bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-xs overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        {/* Image Container */}
        <div className="relative w-full md:w-60 h-72 sm:h-80 shrink-0 rounded-xl overflow-hidden bg-slate-200/60 border border-slate-200/80">
          {/* Type Tag */}
          <div className="absolute top-3 left-3 z-10">
            <div className="h-6 w-16 rounded-full bg-slate-200/90" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4 text-left w-full">
          {/* Category & Title */}
          <div className="space-y-2">
            <div className="h-6 w-28 rounded-md bg-slate-200" />
            <div className="h-7 w-11/12 rounded-md bg-slate-200" />
            <div className="h-7 w-2/3 rounded-md bg-slate-200" />
          </div>

          {/* Price Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 inline-block w-full sm:w-auto min-w-[200px]">
            <div className="h-3 w-20 rounded bg-slate-200 mb-0.5" />
            <div className="h-8 w-28 rounded bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
/**
 * BookInformationSkeleton
 * Mimics the BookInformation component structure
 * Layout: section header + desktop books table (md+) / mobile book cards (<md) + description block
 */
function BookInformationSkeleton() {
  return (
    <div className="animate-pulse bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
      {/* Title Header */}
      <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
        <div className="w-5 h-5 rounded bg-slate-200" />
        <div className="h-5 w-56 rounded-md bg-slate-200" />
      </div>

      {/* 1. Desktop View Table (hidden on mobile) */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200">
        <div className="w-full text-left text-sm">
          {/* Table head */}
          <div className="flex bg-slate-50 border-b border-slate-200">
            <div className="flex-[2] py-3 px-4">
              <div className="h-3 w-20 rounded bg-slate-200" />
            </div>
            <div className="flex-1 py-3 px-4">
              <div className="h-3 w-12 rounded bg-slate-200" />
            </div>
            <div className="flex-1 py-3 px-4">
              <div className="h-3 w-16 rounded bg-slate-200" />
            </div>
            <div className="flex-1 py-3 px-4">
              <div className="h-3 w-16 rounded bg-slate-200" />
            </div>
            <div className="flex-1 py-3 px-4">
              <div className="h-3 w-12 rounded bg-slate-200 ml-auto" />
            </div>
          </div>

          {/* Table rows */}
          <div className="divide-y divide-slate-100">
            {[1, 2].map((row) => (
              <div key={row} className="flex items-center">
                <div className="flex-[2] py-3.5 px-4">
                  <div className="h-3.5 w-32 rounded bg-slate-200" />
                </div>
                <div className="flex-1 py-3.5 px-4">
                  <div className="h-3.5 w-16 rounded bg-slate-200" />
                </div>
                <div className="flex-1 py-3.5 px-4">
                  <div className="h-3.5 w-20 rounded bg-slate-200" />
                </div>
                <div className="flex-1 py-3.5 px-4">
                  <div className="h-5 w-14 rounded-full bg-slate-200" />
                </div>
                <div className="flex-1 py-3.5 px-4">
                  <div className="h-3.5 w-12 rounded bg-slate-200 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Mobile View Cards (visible only on small screens) */}
      <div className="block md:hidden space-y-3">
        {[1, 2].map((card) => (
          <div
            key={card}
            className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 space-y-3 shadow-2xs"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="h-5 w-12 rounded-full bg-slate-200 shrink-0" />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/60">
              <div className="space-y-1">
                <div className="h-3 w-10 rounded bg-slate-200/70" />
                <div className="h-3.5 w-20 rounded bg-slate-200" />
              </div>
              <div className="space-y-1">
                <div className="h-3 w-14 rounded bg-slate-200/70" />
                <div className="h-3.5 w-24 rounded bg-slate-200" />
              </div>
              <div className="col-span-2 pt-1">
                <div className="h-5 w-24 rounded border border-slate-200 bg-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* General Description Section */}
      <div className="pt-2 border-t border-slate-100 space-y-2">
        <div className="h-3 w-24 rounded bg-slate-100" />
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
          <div className="h-3.5 w-full rounded bg-slate-200" />
          <div className="h-3.5 w-11/12 rounded bg-slate-200" />
          <div className="h-3.5 w-2/3 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
/**
 * BookMetaCardSkeleton
 * Mimics the BookMetaCard component structure
 * Layout: bundle price + status row, totals strip and request button
 */
function BookMetaCardSkeleton() {
  return (
    <div className="animate-pulse bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
      <div className="space-y-4 w-full">
        {/* Bundle price & status row */}
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-1.5">
            <div className="h-3 w-28 rounded bg-slate-100" />
            <div className="h-7 w-24 rounded bg-slate-200" />
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <div className="h-3 w-14 rounded bg-slate-100" />
            <div className="h-6 w-20 rounded-md bg-slate-200" />
          </div>
        </div>

        {/* Totals strip */}
        <div className="border-t border-b border-slate-100 py-3 flex justify-between w-full">
          <div className="h-3 w-20 rounded bg-slate-100" />
          <div className="h-3 w-16 rounded bg-slate-100" />
        </div>
      </div>

      {/* Request Button */}
      <div className="w-full pt-1">
        <div
          className="w-full h-11 rounded-xl"
          style={{ backgroundColor: "#35858E", opacity: 0.25 }}
        />
      </div>
    </div>
  );
}

/**
 * SellerCardSkeleton
 * Mimics the SellerCard component structure
 * Layout: section title, seller avatar + name, location info and seller note
 */
function SellerCardSkeleton() {
  return (
    <div className="animate-pulse bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
      {/* Section Title */}
      <div className="border-b border-slate-100 pb-2">
        <div className="h-3 w-24 rounded bg-slate-100" />
      </div>

      {/* Seller Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-200 shrink-0" />
        <div className="flex flex-col gap-1.5">
          <div className="h-4 w-28 rounded bg-slate-200" />
          <div className="h-3 w-20 rounded bg-slate-100" />
        </div>
      </div>

      {/* Location Info */}
      <div className="flex flex-col gap-2.5 border-t border-slate-100 pt-3">
        <div className="flex items-start gap-2">
          <div className="w-4 h-4 rounded bg-slate-200 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <div className="h-3 w-12 rounded bg-slate-100" />
            <div className="h-3.5 w-32 rounded bg-slate-200" />
          </div>
        </div>
      </div>

      {/* Note From Seller Section */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1.5">
        <div className="h-3 w-20 rounded bg-slate-200" />
        <div className="h-3 w-full rounded bg-slate-200" />
        <div className="h-3 w-3/4 rounded bg-slate-200" />
      </div>
    </div>
  );
}

/**
 * Main Loading Component
 * Combines all skeleton components to create a complete loading page
 * Structure matches books/[id]/page.tsx: back button + 12-column grid
 * (Hero & Information | Meta & Seller cards)
 */
export default function BookDetailsLoading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 sm:py-10 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Back Button Section */}
        <BackButtonSkeleton />

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Hero & Book Information */}
          <div className="lg:col-span-8 space-y-6">
            <BookHeroSkeleton />
            <BookInformationSkeleton />
          </div>

          {/* Right Column: Meta Card & Seller Card */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
            <BookMetaCardSkeleton />
            <SellerCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}