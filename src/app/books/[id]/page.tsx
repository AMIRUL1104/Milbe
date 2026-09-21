import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import BookInformation from "@/components/book-details/BookInformation";
import SellerCard from "@/components/book-details/SellerCard";
import BookMetaCard from "@/components/book-details/BookMetaCard";
import BookHero from "@/components/book-details/BookHero";
import type { PostItem } from "@/interface/post/types";
import { getPostById } from "@/services/features/posts";

interface BookDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: BookDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const response = await getPostById(id);
    const post = response?.data;
    if (!post) {
      return {
        title: "বই পাওয়া যায়নি | Milbe",
      };
    }
    return {
      title: `${post.title} | Milbe`,
      description: post.description || `${post.title} - বইটির বিস্তারিত দেখুন Milbe-তে।`,
    };
  } catch {
    return {
      title: "বইয়ের বিবরণ | Milbe",
    };
  }
}

export default async function BookDetailsPage({ params }: BookDetailsPageProps) {
  const { id } = await params;

  let post: PostItem | null = null;
  let isError = false;

  try {
    const response = await getPostById(id);
    post = response?.data || null;
  } catch {
    isError = true;
  }

  if (isError || !post) {
    return (
      <div className="min-h-[70vh] w-full flex items-center justify-center p-4 bg-[#F8FAFC]">
        <div className="max-w-md w-full text-center bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            📖
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            বইয়ের তথ্য পাওয়া যায়নি!
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            পোস্টটি হয়তো মুছে ফেলা হয়েছে অথবা ইউআরএল (URL) টি সঠিক নয়।
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#35858E] hover:bg-[#2c6e76] text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 sm:py-10 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Back Button Section */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#35858E] bg-white hover:bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 transition-all duration-200 shadow-xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>হোমে ফিরে যান</span>
          </Link>
        </div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Hero & Book Information */}
          <div className="lg:col-span-8 space-y-6">
            <BookHero post={post} />
            <BookInformation post={post} />
          </div>

          {/* Right Column: Meta Card & Seller Card */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
            <BookMetaCard post={post} />
            <SellerCard post={post} />
          </div>
        </div>
      </div>
    </div>
  );
}