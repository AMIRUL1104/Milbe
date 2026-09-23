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
            {/* Mobile: single row — wide search input + two square icon buttons */}
            <div className="flex items-center gap-2 lg:hidden">
                <div className="h-[42px] flex-1 bg-gray-100 rounded-input" />
                <div className="h-[42px] w-[42px] shrink-0 bg-gray-100 rounded-input" />
                <div className="h-[42px] w-[42px] shrink-0 bg-gray-100 rounded-input" />
            </div>

            {/* Result count text */}
            <div className="h-3 w-40 bg-gray-100 rounded lg:hidden" />

            {/* Desktop (lg+): search + two w-48 dropdowns in one row */}
            <div className="hidden lg:flex lg:flex-row lg:items-center gap-3">
                <div className="h-10 flex-1 bg-gray-100 rounded-input" />
                <div className="h-10 w-48 bg-gray-100 rounded-input" />
                <div className="h-10 w-48 bg-gray-100 rounded-input" />
            </div>

            {/* Desktop result count text */}
            <div className="hidden lg:block h-3 w-40 bg-gray-100 rounded" />
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
            <div className="relative h-40 bg-gray-100 w-full">
                {/* Post type badge placeholder (top-left — mirrors BookCard badge) */}
                <div className="absolute top-2 left-2 h-5 w-10 bg-gray-200 rounded-md" />
            </div>

            {/* Text content placeholder */}
            <div className="p-4 space-y-2">
                {/* Title line */}
                <div className="h-4 bg-gray-100 rounded w-3/4" />

                {/* Subtitle/Author line */}
                <div className="h-3 bg-gray-100 rounded w-1/2" />

                {/* Additional info line */}
                <div className="h-3 bg-gray-100 rounded w-1/3" />
            </div>

            {/* Bottom action bar placeholder (mirrors Edit + Delete flex row) */}
            <div className="flex items-stretch gap-2 mt-2.5 px-0.5 pb-0.5">
                <div className="h-10 flex-1 bg-gray-100 rounded-btn" />
                <div className="h-10 flex-1 bg-gray-100 rounded-btn" />
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
