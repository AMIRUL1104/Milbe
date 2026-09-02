import type { Metadata } from "next";
import { getMyPosts } from "@/services/features/posts";
import MyPostsClient from "@/components/dashboard/user/my-posts/MyPostsClient";
import { MyPost } from "@/components/dashboard/user/my-posts/my-post";

// ১. MyPost টাইপটি ইম্পোর্ট করো (তোমার প্রজেক্টের সঠিক পাথ অনুযায়ী)
// উদাহরণস্বরূপ:


export const metadata: Metadata = {
  title: "My Posts | Milbe",
};

export default async function MyPostsPage() {
  const response = await getMyPosts();

  if (!response.success || !response.data) {
    return (
      <div className="min-h-screen w-full bg-[#F5F7F8] flex items-center justify-center">
        <p className="text-red-500 font-bold">My Posts not found or data error!</p>
      </div>
    );
  }

  // ২. Type Assertion (as MyPost[]) ব্যবহার করে unknown[] কে MyPost[] এ রূপান্তর করো
  const posts = (response.data.books ?? []) as MyPost[];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Posts</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage the books you&apos;ve listed for sale or donation.
        </p>
      </div>

      {/* এখন আর কোনো টাইপ এরর থাকবে না */}
      <MyPostsClient initialPosts={posts} />
    </div>
  );
}