"use client";

import { useState } from "react";
import type {
  PostSummary,
  ReceivedRequest,
  SortOption,
  StatusFilter,
} from "@/interface/dashboard/request";
import { BookCardView } from "./BookCardView";
import { BookDetailView } from "./BookDetailView";
import { NoPostsEmptyState } from "./ReceivedEmptyStates";

interface ReceivedRequestsClientProps {
  posts: PostSummary[];
  requests: ReceivedRequest[];
}

export function ReceivedRequestsClient({
  posts,
  requests,
}: ReceivedRequestsClientProps) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  if (posts.length === 0) {
    return <NoPostsEmptyState />;
  }

  return (
    <div className="w-full">
      {selectedPostId === null ? (
        <BookCardView
          posts={posts}
          requests={requests}
          onPostSelect={setSelectedPostId}
        />
      ) : (
        <BookDetailView
          posts={posts}
          requests={requests}
          selectedPostId={selectedPostId}
          onBack={() => setSelectedPostId(null)}
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      )}
    </div>
  );
}