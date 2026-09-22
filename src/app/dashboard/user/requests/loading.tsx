

/**
 * Skeleton Loading Component for Requests Page
 * Mirrors requests/page.tsx exactly:
 *   header -> HeroUI tabs (sent/received) -> default (sent) tab panel content
 * Responsive breakpoints (sm / lg) match the real components so there is
 * no layout shift when the actual content loads.
 */

/**
 * PageHeaderSkeleton
 * Mimics the page title (text-2xl) and description (text-sm)
 */
function PageHeaderSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-48 bg-gray-100 rounded-md" />
      <div className="mt-2 h-5 w-full max-w-96 bg-gray-100 rounded-md" />
    </div>
  );
}

/**
 * TabsSkeleton
 * Mimics the HeroUI Tabs list in RequestsTabs.tsx:
 * - Mobile (<lg): full-width 2-column grid, bordered, rounded-xl
 * - Desktop (lg+): flex row with gap-6 and bottom border, h-12 tabs
 */
function TabsSkeleton() {
  return (
    <div className="animate-pulse max-lg:grid max-lg:grid-cols-2 max-lg:overflow-hidden max-lg:rounded-xl max-lg:border max-lg:border-border-light lg:flex lg:gap-6 lg:border-b lg:border-border-light">
      <div className="h-12 bg-gray-100 rounded max-lg:w-full max-lg:rounded-none max-lg:border-r max-lg:border-border-light lg:w-32" />
      <div className="h-12 bg-gray-100 rounded max-lg:w-full max-lg:rounded-none lg:w-32" />
    </div>
  );
}

/**
 * SentRequestCardSkeleton
 * Mimics the SentRequestCard component structure:
 * cover image (h-24 w-16, sm: h-28 w-20) + title/badge, seller/date row,
 * message block, success contact block, actions row (View Post + Cancel)
 */
function SentRequestCardSkeleton() {
  return (
    <div className="flex gap-4 rounded-card border border-border-light bg-surface p-4 shadow-sm sm:p-5 animate-pulse">
      {/* Cover image placeholder */}
      <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-28 sm:w-20" />

      {/* Content placeholder */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex flex-col gap-2">
          {/* Title and status badge row */}
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="h-5 w-3/4 max-w-56 bg-gray-100 rounded" />
            <div className="h-6 w-24 shrink-0 bg-gray-100 rounded-full" />
          </div>

          {/* Seller and date row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <div className="h-3 w-32 bg-gray-100 rounded" />
            <div className="h-3 w-28 bg-gray-100 rounded" />
          </div>

          {/* Message placeholder */}
          <div className="h-12 w-full bg-gray-100 rounded-lg" />

          {/* Contact info placeholder (success-style unlocked block) */}
          <div className="h-14 w-full bg-success-light border border-success-border rounded-lg" />
        </div>

        {/* Actions placeholder: View Post + Cancel */}
        <div className="flex gap-5">
          <div className="h-8 w-24 bg-gray-100 rounded-btn" />
          <div className="h-8 w-20 bg-gray-100 rounded-btn" />
        </div>
      </div>
    </div>
  );
}

/**
 * ReceivedRequestCardSkeleton
 * Mimics the ReceivedRequestCard component structure:
 * avatar (h-11 w-11) + name/date + status badge, message block,
 * requester-contact bar, accept/reject actions
 */
function ReceivedRequestCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-border-light bg-surface p-4 shadow-sm sm:flex-row sm:items-start sm:gap-4 animate-pulse">
      {/* Avatar placeholder */}
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gray-100" />

      {/* Content placeholder */}
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        {/* Name and date + status badge row */}
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="h-4 w-32 bg-gray-100 rounded" />
            <div className="h-3 w-24 bg-gray-100 rounded" />
          </div>
          <div className="h-6 w-24 shrink-0 bg-gray-100 rounded-full" />
        </div>

        {/* Message placeholder */}
        <div className="h-10 w-full bg-gray-100 rounded-lg" />

        {/* Requester contact bar placeholder (accepted state) */}
        <div className="flex items-center justify-between gap-2 rounded-lg border border-primary/20 bg-primary-light/40 p-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-7 w-7 shrink-0 rounded-full bg-gray-100" />
            <div className="flex flex-col gap-1 min-w-0">
              <div className="h-2 w-24 bg-gray-100 rounded" />
              <div className="h-3 w-28 bg-gray-100 rounded" />
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <div className="h-7 w-12 bg-gray-100 rounded-md" />
            <div className="h-7 w-7 bg-gray-100 rounded-md" />
          </div>
        </div>

        {/* Actions placeholder: Accept + Reject */}
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-gray-100 rounded-btn" />
          <div className="h-8 w-20 bg-gray-100 rounded-btn" />
        </div>
      </div>
    </div>
  );
}

/**
 * ToolbarSkeleton
 * Mimics the ReceivedRequestsToolbar layout:
 * - Mobile (<sm): count text on top, then a single row with search
 *   (flex-1) + two 10x10 (w-10 h-10) icon buttons
 * - Desktop (sm+): row with search (flex-1) + two selects (w-40),
 *   then count text below
 */
function ToolbarSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      {/* Mobile: count text on top, search + filter/sort icon buttons in one row */}
      <div className="sm:hidden">
        <div className="px-1 h-3 w-40 bg-gray-100 rounded" />
      </div>
      <div className="flex items-center gap-2 sm:hidden">
        <div className="h-10 flex-1 bg-gray-100 rounded-input" />
        <div className="h-10 w-10 shrink-0 bg-gray-100 rounded-input" />
        <div className="h-10 w-10 shrink-0 bg-gray-100 rounded-input" />
      </div>

      {/* Desktop: search + two selects in one row, count text below */}
      <div className="hidden sm:flex sm:flex-col sm:gap-3">
        <div className="flex flex-row gap-3">
          <div className="h-10 flex-1 bg-gray-100 rounded-input" />
          <div className="h-10 w-40 shrink-0 bg-gray-100 rounded-input" />
          <div className="h-10 w-40 shrink-0 bg-gray-100 rounded-input" />
        </div>
        <div className="px-1 h-3 w-40 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

/**
 * PostSelectorMobileSkeleton
 * Mimics the PostSelectorMobile horizontal pill chips:
 * pill = cover (h-5 w-4) + truncated title + optional count badge
 */
function PostSelectorMobileSkeleton() {
  return (
    <div className="-mx-4 flex gap-2 overflow-hidden px-4 pb-2 sm:mx-0 sm:px-0">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex shrink-0 items-center gap-2 rounded-full border border-border-light bg-surface px-3 py-1.5"
        >
          <div className="h-5 w-4 shrink-0 rounded-xs bg-gray-100" />
          <div className="h-3 w-20 bg-gray-100 rounded" />
        </div>
      ))}
    </div>
  );
}

/**
 * PostListPanelSkeleton
 * Mimics the PostListPanel component (desktop sidebar):
 * outer card with "Your Posts" heading + post items
 * (cover h-11 w-8 + 2-line title + count badge)
 */
function PostListPanelSkeleton() {
  return (
    <div className="rounded-card border border-border-light bg-surface p-4 shadow-sm animate-pulse">
      <div className="mb-3 px-1 h-3 w-20 bg-gray-100 rounded" />

      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-xl border border-border-light bg-surface p-2.5"
          >
            {/* Post cover placeholder */}
            <div className="h-11 w-8 shrink-0 rounded-md bg-gray-100" />

            {/* Post title */}
            <div className="h-3 flex-1 bg-gray-100 rounded" />

            {/* Count badge */}
            <div className="h-5.5 min-w-[22px] shrink-0 rounded-full bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * ReceivedTabContentSkeleton
 * Mimics the ReceivedRequestsClient component layout
 * Includes: mobile post selector chips + grid with toolbar + cards + sidebar
 * Exported for reuse (e.g., when the Received tab content loads separately)
 */
export function ReceivedTabContentSkeleton() {
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
 * Mirrors requests/page.tsx: header -> tabs -> active (default: sent)
 * tab panel with pt-6. Only ONE tab's content is rendered at a time,
 * exactly like the real page, so there is no layout shift on load.
 */
export default function RequestsLoading() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header Section */}
      <PageHeaderSkeleton />

      {/* Tabs Section */}
      <TabsSkeleton />

      {/* Active tab panel (default tab = Sent, matches RequestsTabs) */}
      <div className="pt-6">
        <SentTabContentSkeleton />
      </div>
    </div>
  );
}
