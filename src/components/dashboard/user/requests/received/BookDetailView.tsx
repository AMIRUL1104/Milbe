import { useMemo } from "react";
import type {
  PostSummary,
  ReceivedRequest,
  SortOption,
  StatusFilter,
} from "@/interface/dashboard/request";
import { filterReceivedRequests, sortReceivedRequests } from "../filters";
import { NoMatchingRequestsEmptyState, NoRequestsForPostEmptyState } from "./ReceivedEmptyStates";
import { ReceivedRequestCard } from "./ReceivedRequestCard";
import { ReceivedRequestsToolbar } from "./ReceivedRequestsToolbar";

interface BookDetailViewProps {
  posts: PostSummary[];
  requests: ReceivedRequest[];
  selectedPostId: string | null;
  onBack: () => void;
  search: string;
  setSearch: (value: string) => void;
  statusFilter: StatusFilter;
  setStatusFilter: (value: StatusFilter) => void;
  sortOption: SortOption;
  setSortOption: (value: SortOption) => void;
}

export function BookDetailView({
  posts,
  requests,
  selectedPostId,
  onBack,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sortOption,
  setSortOption,
}: BookDetailViewProps) {
  const selectedPost = posts.find((post) => post.id === selectedPostId);
  const requestsForSelectedPost = useMemo(
    () => requests.filter((request) => request.postId === selectedPostId),
    [requests, selectedPostId]
  );

  const requestCounts = useMemo(() => ({
    total: requestsForSelectedPost.length,
    pending: requestsForSelectedPost.filter(
      (request) => request.status === "pending"
    ).length,
  }), [requestsForSelectedPost]);

  const visibleRequests = useMemo(() => {
    const filtered = filterReceivedRequests(
      requestsForSelectedPost,
      search,
      statusFilter
    );
    return sortReceivedRequests(filtered, sortOption);
  }, [requestsForSelectedPost, search, statusFilter, sortOption]);

  if (!selectedPost) {
    return <div className="p-4 text-center text-text-muted">Post not found</div>;
  }

  return (
    <div className="flex flex-col gap-5 pb-6">
      {/* Header with back button - Mobile Optimized */}
      <div className="sticky top-0 z-10 flex items-center justify-between rounded-xl bg-surface/90 px-3.5 py-3 border border-border-light shadow-xs backdrop-blur-md">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-lg bg-background px-3 py-1.5 text-xs font-semibold text-primary shadow-2xs transition-colors hover:bg-primary/10 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.793H14.5a.5.5 0 0 0 .5-.5z"
            />
          </svg>
          পেছনে যান
        </button>
        <h2 className="max-w-[200px] truncate text-sm font-bold text-text-primary sm:max-w-md sm:text-base">
          {selectedPost.title}
        </h2>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-2 gap-3.5 rounded-2xl border border-border-light bg-surface/80 p-4 shadow-xs backdrop-blur-md sm:p-5">
        <div className="flex flex-col justify-between rounded-xl bg-background p-3.5 shadow-2xs sm:p-4 border border-border-light/40">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted sm:text-sm">
            মোট প্রাপ্ত রিকোয়েস্ট
          </p>
          <p className="mt-2 text-2xl font-extrabold text-text-primary sm:text-3xl">
            {requestCounts.total}
          </p>
        </div>
        <div className="flex flex-col justify-between rounded-xl bg-accent-light/60 p-3.5 shadow-2xs sm:p-4 border border-accent/20">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-text sm:text-sm">
            অপেক্ষমাণ রিকোয়েস্ট
          </p>
          <p className="mt-2 text-2xl font-extrabold text-accent-text sm:text-3xl">
            {requestCounts.pending}
          </p>
        </div>
      </div>

      {/* Toolbar and Request List */}
      <div className="flex flex-col gap-4">
        {!requestsForSelectedPost.length ? (
          <NoRequestsForPostEmptyState />
        ) : (
          <>
            <ReceivedRequestsToolbar
              search={search}
              onSearchChange={setSearch}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              sortOption={sortOption}
              onSortChange={setSortOption}
              resultCount={visibleRequests.length}
            />

            {visibleRequests.length === 0 && (
              <NoMatchingRequestsEmptyState />
            )}

            <div className="flex flex-col gap-3">
              {visibleRequests.map((request) => (
                <ReceivedRequestCard key={request.id} request={request} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}