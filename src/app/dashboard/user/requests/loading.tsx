'use client';

/**
 * Skeleton Loading Component for Requests Page
 * Displays a responsive loading state that mirrors the structure of requests/page.tsx
 * Includes: Page header, tabs, and request cards for both sent and received tabs
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
 * TabsSkeleton
 * Mimics the HeroUI Tabs component with tab buttons and border
 */
function TabsSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Tab buttons row */}
      <div className="flex gap-6 border-b border-border-light">
        <div className="h-12 w-32 bg-gray-100 rounded" />
        <div className="h-12 w-32 bg-gray-100 rounded" />
      </div>

      {/* Tab content area */}
      <div className="pt-6" />
    </div>
  );
}

/**
 * SentRequestCardSkeleton
 * Mimics the SentRequestCard component structure
 * Layout: image placeholder + content with title, seller, date, message
 */
function SentRequestCardSkeleton() {
  return (
    <div className="flex gap-4 rounded-card border border-border-light bg-surface p-4 shadow-sm sm:p-5 animate-pulse">
      {/* Image placeholder */}
      <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-28 sm:w-20" />

      {/* Content placeholder */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex flex-col gap-2">
          {/* Title and status badge row */}
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="h-5 w-3/4 bg-gray-100 rounded" />
            <div className="h-6 w-16 bg-gray-100 rounded-full" />
          </div>

          {/* Seller and date row */}
          <div className="flex flex-col gap-1">
            <div className="h-3 w-40 bg-gray-100 rounded" />
            <div className="h-3 w-32 bg-gray-100 rounded" />
          </div>

          {/* Message placeholder */}
          <div className="h-12 w-full bg-gray-100 rounded-lg" />

          {/* Contact info placeholder */}
          <div className="h-12 w-full bg-green-50 border border-green-100 rounded-lg" />
        </div>

        {/* Actions placeholder */}
        <div className="flex gap-5">
          <div className="h-8 w-24 bg-gray-100 rounded-btn" />
        </div>
      </div>
    </div>
  );
}

/**
 * ReceivedRequestCardSkeleton
 * Mimics the ReceivedRequestCard component structure
 * Layout: avatar + content with name, date, message
 */
function ReceivedRequestCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-border-light bg-surface p-4 shadow-sm sm:flex-row sm:items-start sm:gap-4 animate-pulse">
      {/* Avatar placeholder */}
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gray-100" />

      {/* Content placeholder */}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {/* Name and date row */}
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="h-4 w-32 bg-gray-100 rounded" />
            <div className="h-3 w-24 bg-gray-100 rounded" />
          </div>
          <div className="h-6 w-16 bg-gray-100 rounded-full" />
        </div>

        {/* Message placeholder */}
        <div className="h-10 w-full bg-gray-100 rounded-lg" />

        {/* Actions placeholder */}
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-gray-100 rounded" />
          <div className="h-8 w-20 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
}

/**
 * ToolbarSkeleton
 * Mimics the ReceivedRequestsToolbar with search, status filter, and sort
 * Responsive: stacked on mobile, flex row on sm+
 */
function ToolbarSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Search input */}
        <div className="relative flex-1">
          <div className="w-full h-10 bg-gray-100 rounded-input" />
        </div>

        {/* Status filter */}
        <div className="h-10 w-full sm:w-40 bg-gray-100 rounded-input" />

        {/* Sort filter */}
        <div className="h-10 w-full sm:w-40 bg-gray-100 rounded-input" />
      </div>

      {/* Result count text */}
      <div className="h-3 w-40 bg-gray-100 rounded px-1" />
    </div>
  );
}

/**
 * PostSelectorMobileSkeleton
 * Mimics the PostSelectorMobile component
 */
function PostSelectorMobileSkeleton() {
  return (
    <div className="h-10 w-full bg-gray-100 rounded-input animate-pulse" />
  );
}

/**
 * PostListPanelSkeleton
 * Mimics the PostListPanel component (sidebar on desktop)
 * Shows a sticky list of post items
 */
function PostListPanelSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex gap-2 rounded-card border border-border-light bg-surface p-3 cursor-pointer"
        >
          {/* Post image placeholder */}
          <div className="h-12 w-8 shrink-0 rounded bg-gray-100" />

          {/* Post title and count */}
          <div className="flex-1 space-y-1">
            <div className="h-3 w-24 bg-gray-100 rounded" />
            <div className="h-2 w-12 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * ReceivedTabContentSkeleton
 * Mimics the ReceivedRequestsClient component layout
 * Includes: mobile post selector + grid with toolbar + cards + sidebar
 */
function ReceivedTabContentSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* Mobile post selector */}
      <div className="lg:hidden">
        <PostSelectorMobileSkeleton />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        {/* Main content */}
        <div className="flex flex-col gap-4 lg:order-1">
          {/* Toolbar */}
          <ToolbarSkeleton />

          {/* Request cards list */}
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <ReceivedRequestCardSkeleton key={index} />
            ))}
          </div>
        </div>

        {/* Desktop post list panel (sidebar) */}
        <div className="hidden lg:order-2 lg:block">
          <div className="sticky top-6">
            <PostListPanelSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * SentTabContentSkeleton
 * Mimics the SentRequestsList component layout
 * Displays a list of sent request cards
 */
function SentTabContentSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <SentRequestCardSkeleton key={index} />
      ))}
    </div>
  );
}

/**
 * Main Loading Component
 * Combines all skeleton components to create a complete loading page
 * Structure matches requests/page.tsx with tabs and tab content
 */
export default function RequestsLoading() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header Section */}
      <PageHeaderSkeleton />

      {/* Tabs Section */}
      <TabsSkeleton />

      {/* Tab Content - Shows both tabs' content skeletons */}
      <div className="space-y-6">
        {/* Sent Tab Content */}
        <SentTabContentSkeleton />

        {/* Received Tab Content */}
        <div className="pt-2">
          <ReceivedTabContentSkeleton />
        </div>
      </div>
    </div>
  );
}
