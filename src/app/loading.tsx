'use client';

/**
 * Skeleton Loading Component for Home Page
 * Displays a responsive loading state that mirrors the structure of page.tsx
 * Includes: HeaderFilters, NearbyBooks (location section), BooksGrid, and Pagination
 */

/**
 * HeaderFiltersSkeleton
 * Mimics the HeaderFilters component with tabs and filter controls
 */
function HeaderFiltersSkeleton() {
    return (
        <div className="w-full bg-[#F5F7F8]/90 backdrop-blur border-b border-border px-3 py-4 sm:py-5 lg:py-6 animate-pulse">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-3">
                {/* Tabs row */}
                <div className="flex gap-1 bg-background rounded-btn p-1">
                    <div className="h-10 w-16 bg-gray-100 rounded-btn" />
                    <div className="h-10 w-16 bg-gray-100 rounded-btn" />
                    <div className="h-10 w-16 bg-gray-100 rounded-btn" />
                </div>

                {/* Search and filter controls row */}
                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search input */}
                    <div className="flex-1">
                        <div className="w-full h-10 bg-gray-100 rounded-input" />
                    </div>

                    {/* Filter button */}
                    <div className="h-10 w-14 bg-gray-100 rounded-input" />
                </div>
            </div>
        </div>
    );
}

/**
 * LocationWarningSkeletons
 * Mimics the LocationWarning component
 */
function LocationWarningSkeleton() {
    return (
        <div className="bg-background py-4 lg:py-5 animate-pulse">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-btn border border-border bg-surface px-4 py-3">
                    <div className="h-4 w-64 bg-gray-100 rounded" />
                    <div className="h-10 w-32 bg-gray-100 rounded-input" />
                </div>
            </div>
        </div>
    );
}

/**
 * NearbyBooksSectionSkeleton
 * Mimics the NearbyBooks section with title and book cards
 */
function NearbyBooksSectionSkeleton() {
    return (
        <section className="bg-background py-4 lg:py-5 animate-pulse">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-4">
                {/* Section heading */}
                <div className="space-y-1">
                    <div className="h-6 w-40 bg-gray-100 rounded" />
                    <div className="h-3 w-56 bg-gray-100 rounded" />
                    <div className="h-3 w-24 bg-gray-100 rounded" />
                </div>

                {/* Books grid - responsive 2/3/4 columns */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <SkeletonBookCard key={index} />
                    ))}
                </div>

                {/* View more button */}
                <div className="flex justify-center pt-3">
                    <div className="h-10 w-40 bg-gray-100 rounded-input" />
                </div>
            </div>
        </section>
    );
}

/**
 * SkeletonBookCard
 * Mimics the BookCard component structure
 */
function SkeletonBookCard() {
    return (
        <div className="rounded-2xl border border-[#EDF1F2] overflow-hidden bg-white animate-pulse">
            {/* Image placeholder */}
            <div className="h-40 bg-gray-100 w-full" />

            {/* Content placeholder */}
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
 * BooksGridSkeleton
 * Mimics the BooksGrid section with title, filter chips, and responsive card grid
 */
function BooksGridSkeleton() {
    return (
        <section className="animate-pulse">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-4">
                {/* Section heading */}
                <div className="space-y-1">
                    <div className="h-6 w-32 bg-gray-100 rounded" />
                    <div className="h-3 w-48 bg-gray-100 rounded" />
                    <div className="h-3 w-24 bg-gray-100 rounded" />
                </div>

                {/* Books grid - responsive 2/3/4 columns */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                    {Array.from({ length: 20 }).map((_, index) => (
                        <SkeletonBookCard key={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

/**
 * PaginationSkeleton
 * Mimics the BooksPagination component
 */
function PaginationSkeleton() {
    return (
        <div className="flex justify-center mt-6 animate-pulse">
            <div className="flex gap-2">
                <div className="h-10 w-10 bg-gray-100 rounded" />
                <div className="h-10 w-10 bg-gray-100 rounded" />
                <div className="h-10 w-10 bg-gray-100 rounded" />
                <div className="h-10 w-10 bg-gray-100 rounded" />
                <div className="h-10 w-10 bg-gray-100 rounded" />
            </div>
        </div>
    );
}

/**
 * Main Loading Component
 * Combines all skeleton components to create a complete loading page
 * Structure matches page.tsx layout with all sections
 */
export default function HomeLoading() {
    return (
        <div className="w-full min-h-screen bg-[#F5F7F8] font-sans antialiased overflow-x-hidden">
            <main>
                {/* Header Filters Section */}
                <HeaderFiltersSkeleton />

                {/* Location Warning / Nearby Books Section */}
                {/* Show location warning skeleton (simulating needs-login or needs-profile state) */}
                <LocationWarningSkeleton />

                {/* Nearby Books Section (when location is available) */}
                <NearbyBooksSectionSkeleton />

                {/* Main Books Grid Section */}
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-12 space-y-6">
                    <BooksGridSkeleton />
                    <PaginationSkeleton />
                </div>
            </main>
        </div>
    );
}
