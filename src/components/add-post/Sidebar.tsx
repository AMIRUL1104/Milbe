"use client";

import PreviewCard from "./PreviewCard";
import TipsCard from "./TipsCard";
import { Button } from "@/components/ui/Button";

interface SidebarProps {
  imageUrl: string | null;
  badge: string;
  isDonate: boolean;
  title: string;
  meta: string;
  bookCount: number;
  totalPrice: number | null;
  isSubmitting: boolean;
  isUploading: boolean;
}

export default function Sidebar({
  imageUrl,
  badge,
  isDonate,
  title,
  meta,
  bookCount,
  totalPrice,
  isSubmitting,
  isUploading,
}: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col gap-3.5 sticky top-24">
      <PreviewCard
        imageUrl={imageUrl}
        badge={badge}
        isDonate={isDonate}
        title={title}
        meta={meta}
        bookCount={bookCount}
        totalPrice={totalPrice}
      />
      <TipsCard />
      <div className="hidden lg:block">
        <Button
          variant="accent"
          size="lg"
          className="w-full"
          disabled={isSubmitting || isUploading}
          type="submit"
        >
          পোস্ট প্রকাশ করুন
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </aside>
  );
}
