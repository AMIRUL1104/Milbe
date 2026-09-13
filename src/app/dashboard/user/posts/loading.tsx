'use client';

/**
 * Skeleton Loading Component for My Posts Page
 * Displays a responsive loading state that mirrors the structure of posts/page.tsx
 * Includes: Page header, toolbar (search/filter/sort), and responsive grid of book cards
 */

/**
 * PageHeaderSkeleton
 * Mimics the page title and description layout
 */
function PageHeaderSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-48 bg-gray-100 rounded-md mb-2" />
      <div className="h-4 w-96 bg-gray-100 rounded-md" />
    </div>
  );
}

/**
 * ToolbarSkeleton
 * Mimics the search, filter, and sort controls layout
 * Responsive: stacked on mobile, flex row on larger screens
 */
function ToolbarSkeleton() {
  return (
    <div className="bg-surface rounded-card border border-border-light shadow-sm p-4 space-y-3 animate-pulse">
      {/* Search bar and controls row */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        {/* Search Input */}
        <div className="flex-1">
          <div className="w-full h-10 bg-gray-100 rounded-input" />
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex gap-3 lg:flex-row lg:items-center">
          {/* Filter Dropdown */}
          <div className="w-full lg:w-48">
            <div className="h-10 bg-gray-100 rounded-input" />
          </div>

          {/* Sort Dropdown */}
          <div className="w-full lg:w-48">
            <div className="h-10 bg-gray-100 rounded-input" />
          </div>
        </div>
      </div>

      {/* Result count text */}
      <div className="h-3 w-40 bg-gray-100 rounded" />
    </div>
  );
}

/**
 * SkeletonCard
 * Individual book card skeleton
 * Mimics the BookCard component structure with image placeholder and text lines
 */
function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-[#EDF1F2] overflow-hidden bg-white animate-pulse">
      {/* Image placeholder */}
      <div className="h-40 bg-gray-100 w-full" />

      {/* Text content placeholder */}
      <div className="p-4 space-y-2">
        {/* Title line */}
        <div className="h-4 bg-gray-100 rounded w-3/4" />

        {/* Subtitle/Author line */}
        <div className="h-3 bg-gray-100 rounded w-1/2" />

        {/* Additional info line */}
        <div className="h-3 bg-gray-100 rounded w-1/3" />
      </div>
    </div>
  );
}

/**
 * PostsGridSkeleton
 * Responsive grid of skeleton cards
 * Layout: 2 columns on mobile, 3 on tablet (lg), 4 on desktop (xl)
 * Matches the MyPostsGrid component layout
 */
function PostsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: 8 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

/**
 * Main Loading Component
 * Combines all skeleton components to create a complete loading page
 * Structure matches posts/page.tsx layout
 */
export default function PostsLoading() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Page Header Section */}
      <PageHeaderSkeleton />

      {/* Toolbar Section with Search, Filter, Sort */}
      <ToolbarSkeleton />

      {/* Responsive Grid of Book Cards */}
      <PostsGridSkeleton />
    </div>
  );
}
