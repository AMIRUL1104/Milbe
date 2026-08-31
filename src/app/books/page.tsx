// src/app/browse-books/page.tsx
import { Metadata } from "next";
import SectionHeading from "@/components/shared/SectionHeading";
import FilterSection from "@/components/browse-books/FilterSection";
import BooksGrid from "@/components/browse-books/BooksGrid";
import { getPosts } from "@/services/features/posts";
import { BookItem } from "@/interface/post related/postDetails";
import CustomPagination from "@/components/browse-books/BooksPagination";

// Next.js Metadata API
export const metadata: Metadata = {
  title: "Browse Books | BookBridge",
  description: "Browse academic books shared by students across Bangladesh.",
};
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BrowseBooksPage({ searchParams }: PageProps) {
  const resolvedParams = (await searchParams) || {};

  const postData = await getPosts<BookItem>({
    search: typeof resolvedParams.search === "string" ? resolvedParams.search : "",
    category: typeof resolvedParams.category === "string" ? resolvedParams.category : "",
    condition: typeof resolvedParams.condition === "string" ? resolvedParams.condition : "",
    type: (resolvedParams.type as "sell" | "donate" | "") || "",
    page: Number(resolvedParams.page) || 1,
    limit: 8,
  });

  return (
    <main className="min-h-screen w-full bg-[#F5F7F8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">

        <SectionHeading
          title="Browse Academic Books"
          subtitle="Search and filter through hundreds of textbook listings shared by fellow students."
        />

        <FilterSection />

        {/* ✅ কোনো 'as any' ছাড়া সরাসরি টাইপ-সেফ প্রপ্স পাস */}
        <BooksGrid searchParams={searchParams} />

        <div className="flex justify-center mt-6">
          <CustomPagination totalPages={postData.meta?.totalPages || 1} />
        </div>

      </div>
    </main>
  );
}