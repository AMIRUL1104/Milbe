// src/app/books/[id]/page.tsx
import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import BookInformation from "@/components/book-details/BookInformation";
import SellerCard from "@/components/book-details/SellerCard";
import BookMetaCard from "@/components/book-details/BookMetaCard";
import BookHero from "@/components/book-details/BookHero";
import { getPostById } from "@/services/features/posts";


// let bookName ;
export const metadata: Metadata = {
  title: "Post Details | BookBridge",
  description: "View books bundle shared by students.",
};

// টাইপ ডেফিনিশন (তোমার ব্যাকএন্ড রেসপন্স অনুসারে)
export interface BackendBookItem {
  bookId: string;
  publisherId: string;
  bookName: string;
  publisherName: string;
  image: string | null;
  condition: "like_new" | "good" | "fair";
  price: number;
}

export interface PostDetailData {
  _id: string;
  title: string;
  category: string;
  sellerId: string;
  sellerName: string;
  type: "sell" | "donate";
  image: string;
  district: string;
  area: string;
  phone: string;
  messenger: string;
  whatsappOnly: boolean;
  description: string;
  status: "available" | "requested" | "accepted";
  acceptedRequestId: string | null;
  isDeleted: boolean;
  publishedAt: string;
  books: BackendBookItem[];
}

// ১. প্রথমে params এর টাইপ ডিফাইন করো (এটি একটি Promise হবে)
type Params = Promise<{ id: string }>;

// ২. কম্পোনেন্ট সিগনেচার আপডেট করো
export default async function BookDetailsPage({ params }: { params: Params }) {

  // ৩. অবশ্যই params-কে await করে নিতে হবে
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const response = await getPostById(id);
  // console.log("Fetched post data:", response);

  // ২. রেসপন্স null কিনা এবং তাতে data আছে কিনা তা চেক করো (Type Guard)
  if (!response || !response.success || !response.data) {
    return (
      <main className="min-h-screen w-full bg-[#F5F7F8] flex items-center justify-center">
        <p className="text-red-500 font-bold">Book not found or data error!</p>
      </main>
    );
  }

  // ৩. ডাটা টাইপ সেফ উপায়ে অ্যাসাইন করো
  const postData = response.data as PostDetailData;
  return (
    <main className="min-h-screen w-full bg-[#F5F7F8] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-[#35858E] transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* বাম কলাম: মেইন পোস্ট ইমেজ */}
          <div className="lg:col-span-5 w-full">
            <BookHero imageUrl={postData.image} name="Books Bundle" />
          </div>

          {/* ডান কলাম: পোস্ট ডিটেইলস ও বইয়ের তালিকা */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            <BookInformation post={postData} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SellerCard post={postData} />
              <BookMetaCard post={postData} />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}