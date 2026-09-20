import { PostItem } from "@/interface/post/types";
import BookCard from "@/components/shared/BookCard";
import SectionHeading from "../shared/SectionHeading";
import ActiveFilterChips from "./ActiveFilterChips";
import { toBengaliNumber } from "@/lib/utils/toBengaliNumber";

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

  // meta.total can be missing on older API responses — fall back to the
  // count of books actually rendered on this page so we never show "০"
  // incorrectly or "undefined".
  const resultCount =
    typeof total === "number" && Number.isFinite(total) && total > 0
      ? total
      : books.length;

  const countSubtitle = isFiltered
    ? `${toBengaliNumber(resultCount)}টি বই পাওয়া গেছে`
    : `মোট ${toBengaliNumber(resultCount)}টি বই`;

  if (error) {
    return (
      <div className="rounded-card border border-danger/30 bg-background px-4 py-8 text-center">
        <p className="font-semibold text-text-primary">সকল বই</p>
        <p className="mt-2 text-sm text-text-muted">Unable to load books right now.</p>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <>
        {filterChips}
        <div className="text-center text-text-muted py-16 bg-background rounded-card border border-dashed border-border">
          {isFiltered ? (
            <>
              <p className="font-semibold text-text-primary">কোনো বই পাওয়া যায়নি</p>
              <p className="mt-2">{countSubtitle} — আপনার Filter পরিবর্তন করে আবার চেষ্টা করুন।</p>
              <a
                href="#filter-controls"
                className="mt-4 inline-block font-semibold text-primary hover:underline"
              >
                Filter পরিবর্তন করুন
              </a>
            </>
          ) : (
            "আপনার সার্চের সাথে মিলে যাওয়া কোনো বই পাওয়া যায়নি।"
          )}
        </div>
      </>
    );
  }

  return (
    <>
      {filterChips}
      <SectionHeading
        title={isFiltered ? "Filtered Results" : "সকল বই"}
        subtitle={countSubtitle}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-10">

        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </>
  )
    ;
}
