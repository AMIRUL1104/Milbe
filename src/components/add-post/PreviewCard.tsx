"use client";

interface PreviewCardProps {
  imageUrl: string | null;
  badge: string;
  isDonate: boolean;
  title: string;
  meta: string;
  bookCount: number;
  totalPrice: number | null;
}

export default function PreviewCard({
  imageUrl,
  badge,
  isDonate,
  title,
  meta,
  bookCount,
  totalPrice,
}: PreviewCardProps) {
  const priceDisplay = isDonate ? "ফ্রি" : `৳${(totalPrice ?? 0).toLocaleString("en-US")}`;

  return (
    <div className="bg-surface border border-border-light rounded-card overflow-hidden">
      <div className="h-[150px] bg-background flex items-center justify-center text-text-muted relative">
        {imageUrl ? (
          <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        )}
      </div>
      <div className="p-4">
        <span
          className={`inline-flex items-center gap-1 text-[11.5px] font-bold px-2.5 py-1 rounded-full mb-2.5 ${
            isDonate
              ? "bg-secondary-light text-secondary-hover"
              : "bg-primary-light text-primary"
          }`}
        >
          {badge}
        </span>
        <p className="text-sm font-bold mb-1 text-text-primary">
          {title || "পোস্টের শিরোনাম এখানে দেখা যাবে"}
        </p>
        <p className="text-xs text-text-muted mb-3.5">
          {meta || "জেলা যোগ করা হয়নি"}
        </p>
        <div className="flex border-t border-border-light pt-3 gap-3">
          <div>
            <div className="text-[11px] text-text-muted mb-0.5">মোট বই</div>
            <div className="text-sm font-bold font-en">{bookCount}</div>
          </div>
          <div>
            <div className="text-[11px] text-text-muted mb-0.5">মোট মূল্য</div>
            <div className="text-sm font-bold font-en">{priceDisplay}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
