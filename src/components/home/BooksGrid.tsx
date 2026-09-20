import { PostItem } from "@/interface/post/types";
import BookCard from "@/components/shared/BookCard";
import ActiveFilterChips from "./ActiveFilterChips";
import ResetFilterButton from "./ResetFilterButton";
import { toBengaliNumber } from "@/lib/utils/toBengaliNumber";
import { SearchX, AlertCircle } from "lucide-react";

interface BooksGridProps {
  books: PostItem[];
  error?: boolean;
  isFiltered?: boolean;
  search?: string;
  category?: string;
  condition?: string;
  type?: "sell" | "donate" | "";
  /** Total matching posts across all pages (from GET /api/posts meta.total). */
  total?: number;
}

export default function BooksGrid({
  books,
  error = false,
  isFiltered = false,
  search,
  category,
  condition,
  type,
  total,
}: BooksGridProps) {
  const filterChips = isFiltered ? (
    <ActiveFilterChips
      search={search}
      category={category}
      condition={condition}
      type={type}
    />
  ) : null;

  // Fallback count calculation
  const resultCount =
    typeof total === "number" && Number.isFinite(total) && total > 0
      ? total
      : books?.length || 0;

  // Dynamic Section Wording
  const sectionTitle = isFiltered ? "আপনার সার্চের ফলাফল" : "সকল বই";
  const countBadgeText = isFiltered
    ? `${toBengaliNumber(resultCount)}টি বই পাওয়া গেছে`
    : `মোট ${toBengaliNumber(resultCount)}টি বই`;

  const statusSubtitle = isFiltered
    ? "আপনার সার্চ করা বইগুলো নিচে দেখানো হচ্ছে"
    : "প্ল্যাটফর্মের সকল একাডেমিক বই থেকে ব্রাউজ করুন";

  // Error State
  if (error) {
    return (
      <div className="w-full my-6 rounded-card border border-danger/30 bg-background p-6 sm:p-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-danger/10 text-danger mx-auto flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-text-primary">
          বইগুলো লোড করতে সমস্যা হচ্ছে
        </h3>
        <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
          সার্ভারের সাথে যোগাযোগ করতে সমস্যা হচ্ছে। পেজটি রিফ্রেশ দিয়ে আবার চেষ্টা করুন।
        </p>
      </div>
    );
  }

  // Empty State with ResetFilterButton Component
  if (!books || books.length === 0) {
    return (
      <div className="w-full space-y-4">
        {filterChips}
        <div className="w-full py-12 sm:py-16 px-4 text-center bg-surface rounded-card border border-dashed border-border space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-primary-light text-primary mx-auto flex items-center justify-center">
            <SearchX className="w-7 h-7" />
          </div>

          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className="text-base sm:text-lg font-bold text-text-primary">
              {isFiltered
                ? "কোনো বই পাওয়া যায়নি"
                : "বর্তমানে কোনো বই এভেলেবল নেই"}
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              {isFiltered
                ? "আপনার ফিল্টার বা সার্চের সাথে মিলে এমন কোনো বই পাওয়া যায়নি। ফিল্টার রিসেট করে আবার চেষ্টা করুন।"
                : "খুব শীঘ্রই নতুন বই পোস্ট করা হবে।"}
            </p>
          </div>

          {/* Interactive URL SearchParams Cleaning Button */}
          {isFiltered && (
            <div className="pt-2 flex justify-center">
              <ResetFilterButton />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {filterChips}

      {/* Dynamic Section Header with Responsive Mobile Centering */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-center sm:justify-between text-center sm:text-left gap-3 border-b border-border pb-4 sm:pb-5">
        <div className="space-y-1.5 flex flex-col items-center sm:items-start">
          <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-text-primary">
              {sectionTitle}
            </h2>

            {/* Styled Badge */}
            {resultCount > 0 && (
              <span className="inline-flex items-center rounded-full bg-primary-light border border-primary/20 px-3 py-0.5 text-[11px] sm:text-xs font-bold text-primary">
                {countBadgeText}
              </span>
            )}
          </div>

          {/* User-friendly Context Subtitle */}
          <p className="text-xs sm:text-sm text-text-secondary font-medium">
            {statusSubtitle}
          </p>
        </div>
      </div>

      {/* Responsive Book Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-6 pt-2">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}