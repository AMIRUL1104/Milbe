"use client";

export function HeaderSearch() {
  return (
    <div className="flex-1 max-w-xl mx-4 hidden md:flex items-center gap-2">
      <div className="relative flex-1">
        <label htmlFor="header-search" className="sr-only">
          Search books
        </label>
        <input
          id="header-search"
          type="search"
          placeholder="Search books, authors, ISBN..."
          className="w-full px-4 py-2 pl-10 text-sm text-text-primary bg-surface border border-border rounded-btn focus:outline-none focus:ring-2 focus:ring-primary-focus focus:border-transparent placeholder:text-text-placeholder transition-base"
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

      <button
        type="button"
        className="px-3 py-2 text-sm font-medium text-text-secondary bg-surface border border-border rounded-btn hover:bg-surface-hover hover:text-text-primary focus-visible:outline-2 focus-visible:outline-primary-focus transition-base whitespace-nowrap"
        aria-label="Select location"
      >
        📍 Location
      </button>
    </div>
  );
}