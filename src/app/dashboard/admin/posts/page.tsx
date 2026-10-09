// app/dashboard/admin/posts/page.tsx

import ManagePostsTable from "./ManagePostsTable";
import { PostsErrorFallback } from "./PostsErrorFallback";

import { getAllPosts } from "@/services/features/admin";
import type { PostItem } from "@/interface/post/types";

export default async function ManagePostsPage() {
  // `getAllPosts` throws on network/auth failures (ApiError), and the API
  // returns the posts array directly in `data`. Map both cases explicitly so
  // a failed fetch renders an error state instead of crashing the page, and
  // a successful response renders every post (previously `data?.data` was
  // always undefined, so the table always received []).
  let posts: PostItem[] | null = null;

  try {
    const response = await getAllPosts();
    posts =
      response.success && Array.isArray(response.data) ? response.data : null;
  } catch {
    posts = null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Manage Posts</h1>
        <p className="text-sm text-gray-500 mt-1">
          View and manage all book listings on the platform.
        </p>
      </div>

      {posts ? (
        <ManagePostsTable initialPosts={posts} />
      ) : (
        <PostsErrorFallback />
      )}
    </div>
  );
}
