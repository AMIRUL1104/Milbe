import type { Metadata } from "next";
import AddPostForm from "@/components/add-post/AddPostForm";
import { getUserSession } from "@/services/core/session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Add Post | Milbe",
  description: "List your academic books for sale or donation on Milbe.",
};

// Server Component — no client-side state lives here. All interactivity is
// pushed down into AddPostForm and its children.
export default async function AddPostPage() {
  const user = await getUserSession();
  if (!user) {
    redirect("/auth/signin?redirect=/books/add");
  }
  // console.log(user) 
  return (
    <main className="px-4 py-8 sm:py-12 bg-[#F5F7F8]">
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-2xl font-semibold text-gray-700">Add a New Post</h1>
        <p className="text-default-500 mt-1 text-gray-700">
          Share your books with students who need them — sell or donate in a
          few steps.
        </p>
      </div>

      <AddPostForm user={{ id: user.id, name: user.name as string, email: user.email as string }} />
    </main>
  );
}
