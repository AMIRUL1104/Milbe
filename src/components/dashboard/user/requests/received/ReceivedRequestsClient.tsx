"use client";

import { useMemo, useState } from "react";

import type {
  PostSummary,
  ReceivedRequest,
  SortOption,
  StatusFilter,
} from "@/interface/dashboard/request";
import { filterReceivedRequests, sortReceivedRequests } from "../filters";
import { NoMatchingRequestsEmptyState, NoPostsEmptyState, NoRequestsForPostEmptyState } from "./ReceivedEmptyStates";
import { PostSelectorMobile } from "./PostSelectorMobile";
import { ReceivedRequestCard } from "./ReceivedRequestCard";
import { PostListPanel } from "./PostListPanel";
import { ReceivedRequestsToolbar } from "./ReceivedRequestsToolbar";

interface ReceivedRequestsClientProps {
  posts: PostSummary[];
  requests: ReceivedRequest[];
}

export function ReceivedRequestsClient({
  posts,
  requests,
}: ReceivedRequestsClientProps) {
  const [activePostId, setActivePostId] = useState<string | null>(
    posts[0]?.id ?? null
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  const requestsForActivePost = useMemo(
    () => requests.filter((request) => request.postId === activePostId),
    [requests, activePostId]
  );

  const visibleRequests = useMemo(() => {
    const filtered = filterReceivedRequests(
      requestsForActivePost,
      search,
      statusFilter
    );
    return sortReceivedRequests(filtered, sortOption);
  }, [requestsForActivePost, search, statusFilter, sortOption]);

  if (posts.length === 0) {
    return <NoPostsEmptyState />;
  }

  const hasNoRequestsAtAll = requestsForActivePost.length === 0;
  const hasActiveFilters = search.trim().length > 0 || statusFilter !== "all";

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile post selector */}
      <div className="lg:hidden">
        <PostSelectorMobile
          posts={posts}
          activePostId={activePostId}
          onSelectPost={setActivePostId}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        {/* Main content */}
        <div className="flex flex-col gap-4 lg:order-1">
          {!hasNoRequestsAtAll && (
            <ReceivedRequestsToolbar
              search={search}
              onSearchChange={setSearch}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              sortOption={sortOption}
              onSortChange={setSortOption}
              resultCount={visibleRequests.length}
            />
          )}

          {hasNoRequestsAtAll ? (
            <NoRequestsForPostEmptyState />
          ) : visibleRequests.length === 0 && hasActiveFilters ? (
            <NoMatchingRequestsEmptyState />
          ) : (
            <div className="flex flex-col gap-3">
              {visibleRequests.map((request) => (
                <ReceivedRequestCard key={request.id} request={request} />
              ))}
            </div>
          )}
        </div>

        {/* Desktop post list panel */}
        <div className="hidden lg:order-2 lg:block">
          <div className="sticky top-6">
            <PostListPanel
              posts={posts}
              activePostId={activePostId}
              onSelectPost={setActivePostId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
