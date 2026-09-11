import type { Metadata } from "next";

import { getUserSession } from "@/services/core/session";
import { redirect } from "next/navigation";
import AddPostForm from "@/components/add-post/AddPostForm";

export const metadata: Metadata = {
  title: "Add Post | Milbe",
  description: "List your academic books for sale or donation on Milbe.",
};

export default async function AddPostPage() {
  const user = await getUserSession();
  if (!user) {
    redirect("/auth/signin?redirect=/books/add");
  }

  return <AddPostForm />;
}
