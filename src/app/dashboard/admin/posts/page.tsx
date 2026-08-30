// app/dashboard/admin/posts/page.tsx

import ManagePostsTable from "./ManagePostsTable";

import { getAllPosts } from "@/services/features/admin";



export default async function ManagePostsPage() {
  const allPosts = await getAllPosts();
  const posts = allPosts.data?.data ?? [];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Manage Posts</h1>
        <p className="text-sm text-gray-500 mt-1">
          View and manage all book listings on the platform.
        </p>
      </div>

      <ManagePostsTable initialPosts={posts} />
    </div>
  );
}
