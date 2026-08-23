import { MapPin, MessageSquare } from "lucide-react";
import { PostDetailData } from "@/app/books/[id]/page";

interface SellerCardProps {
  post: PostDetailData;
}

export default function SellerCard({ post }: SellerCardProps) {
  return (
    <div className="bg-surface border border-border rounded-card p-5 shadow-xs flex flex-col gap-4">
      <h3 className="font-bold text-text-primary text-xs uppercase tracking-wider border-b border-border pb-2">
        Seller Profile
      </h3>

      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold text-base shrink-0">
          UI
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-text-primary text-sm sm:text-base">Student Member</span>
          <span className="text-xs text-text-muted">ID: {post.sellerId.substring(0, 8)}...</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-xs text-text-muted border-t border-dashed border-border pt-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-text-muted shrink-0" />
          <span>Location: {post.area}, {post.district}</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <MessageSquare className="w-4 h-4 text-secondary shrink-0" />
          <span className="text-text-secondary font-medium">
            {post.whatsappOnly ? "Prefers WhatsApp Messaging Only" : "Direct Calling Allowed"}
          </span>
        </div>
      </div>
    </div>
  );
}