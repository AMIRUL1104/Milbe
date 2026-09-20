import Link from "next/link";
import Image from "next/image";
import { MapPin, BookOpen, Tag, ArrowUpRight } from "lucide-react";

import { PostItem } from "@/interface/post/types";
import { toBengaliNumber } from "@/lib/utils/toBengaliNumber";

interface BookCardProps {
  book: PostItem;
}

export default function BookCard({ book }: BookCardProps) {
  const primaryBook = book.books?.[0];
  const totalBooks = book.books?.length || 0;

  const totalPrice =
    book.books?.reduce((sum, item) => sum + (item.price || 0), 0) || 0;

  const publisherText = primaryBook?.publisherName || "প্রকাশনী উল্লেখ নেই";

  // Condition Mapper in Bangla
  const formatCondition = (condition?: string) => {
    if (!condition) return "নতুন";
    const condMap: Record<string, string> = {
      new: "একদম নতুন",
      like_new: "নতুন মত",
      good: "ভালো",
      fair: "মোটামুটি",
    };
    return condMap[condition.toLowerCase()] || condition.replace("_", " ");
  };

  return (
    <div className="group relative bg-surface border border-border/70 hover:border-primary/40 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full transform hover:-translate-y-0.5">

      {/* Reduced Image Container Height with object-contain */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full bg-surface-hover/60 overflow-hidden shrink-0 flex items-center justify-center p-1.5">
        <Image
          src={book.image || "/placeholder-book.jpg"}
          alt={primaryBook?.bookName || "বই পোস্ট"}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-1 group-hover:scale-102 transition-transform duration-300 ease-out"
        />

        {/* Type Badge (Donate / Sell) */}
        <div className="absolute top-2 left-2 z-10">
          <span
            className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide backdrop-blur-md shadow-xs border text-white ${book.type === "donate"
              ? "bg-secondary/90 border-secondary/30"
              : "bg-primary/90 border-primary/30"
              }`}
          >
            {book.type === "donate" ? "দান" : "বিক্রি"}
          </span>
        </div>

        {/* Total Books Count Tag (Clear & Meaningful) */}
        {totalBooks > 1 && (
          <div className="absolute top-2 right-2 z-10">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/70 text-white backdrop-blur-md border border-white/20 flex items-center gap-1 shadow-xs">
              <BookOpen className="w-3 h-3 text-primary-light" />
              মোট {toBengaliNumber(totalBooks)}টি বই
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div className="flex flex-col gap-1.5 min-w-0">

          {/* Publisher Name */}
          <div
            className="flex items-center gap-1 text-[11px] text-primary font-semibold tracking-tight min-w-0"
            title={publisherText}
          >
            <BookOpen className="w-3 h-3 shrink-0 opacity-80" />
            <span className="truncate block w-full">{publisherText}</span>
          </div>

          {/* Book Title */}
          <h3
            className="font-bold text-text-primary text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors min-w-0"
            title={book.title || primaryBook?.bookName || "শিরোনাম নেই"}
          >
            {book.title || primaryBook?.bookName || "শিরোনাম নেই"}
          </h3>

          {/* Location & Condition Info */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-text-muted mt-1">
            <div
              className="inline-flex items-center gap-1 bg-surface-hover/80 border border-border/50 px-2 py-0.5 rounded-md max-w-full"
              title={`${book.area}, ${book.district}`}
            >
              <MapPin className="w-3 h-3 text-primary shrink-0" />
              <span className="truncate">{`${book.area}, ${book.district}`}</span>
            </div>

            <div className="inline-flex items-center gap-1 bg-surface-hover/80 border border-border/50 px-2 py-0.5 rounded-md">
              <Tag className="w-3 h-3 text-accent shrink-0" />
              <span>{formatCondition(primaryBook?.condition)}</span>
            </div>
          </div>
        </div>

        {/* Footer: Price & Responsive Action Button */}
        <div className="border-t border-border/60 pt-2.5 mt-auto flex items-center justify-between gap-2 shrink-0">
          <div className="truncate">
            {book.type === "donate" ? (
              <span className="text-secondary font-extrabold text-sm sm:text-base">
                বিনামূল্যে
              </span>
            ) : (
              <div className="flex items-baseline gap-0.5 text-text-primary font-black text-base sm:text-lg ">
                <span className="text-xs font-bold text-primary">৳</span>
                <span>{toBengaliNumber(totalPrice)}</span>
              </div>
            )}
          </div>

          {/* Button: Solid color on Mobile, Hover effect on Laptop/Desktop */}
          <Link
            href={`/books/${book._id}`}
            className="inline-flex items-center gap-1 text-xs max-[390px]:text-[10px] font-bold max-[390px]:px-1.5 px-3 py-1.5 rounded-xl transition-all duration-200 bg-primary text-white md:bg-primary/10 md:text-primary md:hover:bg-primary md:hover:text-white group/btn shrink-0"
          >
            <span>বিস্তারিত</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}