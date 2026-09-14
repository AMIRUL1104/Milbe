import type { Metadata } from "next";

import { getUserSession } from "@/services/core/session";
import { redirect } from "next/navigation";
import AddPostForm from "@/components/add-post/AddPostForm";
import { getPostById } from "@/services/features/posts";
import type { PostItem } from "@/interface/post/types";

export const metadata: Metadata = {
  title: "Add Post | Milbe",
  description: "List your academic books for sale or donation on Milbe.",
};

interface AddPostPageProps {
  searchParams: Promise<{ edit?: string }>;
}

export default async function AddPostPage({ searchParams }: AddPostPageProps) {
  const { edit } = await searchParams;
  const editId = edit?.trim();

  const user = await getUserSession();

  const signinTarget = editId
    ? `/add-post?edit=${encodeURIComponent(editId)}`
    : "/add-post";

  if (!user) {
    redirect(`/auth/signin?redirect=${encodeURIComponent(signinTarget)}`);
  }

  // Edit Mode: `/add-post?edit=<postId>` → fetch the existing post and make
  // sure the signed-in user owns it.
  if (editId) {
    let post: PostItem | null = null;

    try {
      const response = await getPostById(editId);
      if (response?.success && response.data) {
        post = response.data;
      }
    } catch {
      post = null;
    }

    if (!post || post.sellerId !== user.id) {
      redirect("/dashboard/user/posts");
    }

    return <AddPostForm mode="edit" postId={editId} initialPost={post} />;
  }

  // Create Mode: existing behavior unchanged.
  return <AddPostForm />;
}
