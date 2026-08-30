"use client";

export function MobileHeaderSearch() {
  return (
    <div className="px-4 pb-4">
      <div className="relative">
        <label htmlFor="mobile-search" className="sr-only">
          Search books
        </label>
        <input
          id="mobile-search"
          type="search"
          placeholder="Search books, authors, ISBN..."
          className="w-full px-4 py-3 pl-10 text-base text-text-primary bg-surface border border-border rounded-btn focus:outline-none focus:ring-2 focus:ring-primary-focus focus:border-transparent placeholder:text-text-placeholder transition-base"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <svg className="w-5 h-5 text-text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="text-sm text-text-muted">Current Location</span>
      </div>
    </div>
  );
}