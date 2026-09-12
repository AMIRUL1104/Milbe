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
  renderSubmitButton?: () => React.ReactNode;
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
  renderSubmitButton,
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
      {renderSubmitButton && <div className="hidden lg:block">{renderSubmitButton()}</div>}

    </aside>
  );
}
