"use client";

import { useMemo, useState } from "react";
import type { PostItem } from "@/interface/post/types";
import type { MyPostsFilter, MyPostsSort } from "@/interface/post/responses";
import { filterPosts, sortPosts } from "./filters";
import MyPostsToolbar from "./MyPostsToolbar";
import MyPostsGrid from "./MyPostsGrid";
import EmptyState from "./EmptyState";

interface MyPostsClientProps {
  initialPosts: PostItem[];
}

export default function MyPostsClient({ initialPosts }: MyPostsClientProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<MyPostsFilter>("all");
  const [sort, setSort] = useState<MyPostsSort>("newest");

  const visiblePosts = useMemo(() => {
    const filtered = filterPosts(posts, search, filter);
    return sortPosts(filtered, sort);
  }, [posts, search, filter, sort]);

  function handleDeleted(postId: string) {
    setPosts((prev) => prev.filter((post) => post._id !== postId));
  }

  if (posts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-5">
      <MyPostsToolbar
        search={search}
        onSearchChange={setSearch}
        filter={filter}
        onFilterChange={setFilter}
        sort={sort}
        onSortChange={setSort}
        resultCount={visiblePosts.length}
      />

      {visiblePosts.length === 0 ? (
        <EmptyState hasActiveFilters />
      ) : (
        <MyPostsGrid posts={visiblePosts} onDeleted={handleDeleted} />
      )}
    </div>
  );
}
