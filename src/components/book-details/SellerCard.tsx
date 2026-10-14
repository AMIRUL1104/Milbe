"use client";

import { MapPin, User } from "lucide-react";
import { PostItem } from "@/interface/post/types";
import { getDistrictLabelBn } from "@/lib/constant/districts";

interface SellerCardProps {
  post: PostItem;
}

export default function SellerCard({ post }: SellerCardProps) {
  // Extract seller information Safely
  const sellerName = post.sellerName || "সেলার";
  const area = post.area || "";
  const district = getDistrictLabelBn(post.district) || "";
  const locationText =
    area || district ? `${area}${area && district ? ", " : ""}${district}` : "তথ্য দেওয়া নেই";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
      <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">
        বিক্রেতার তথ্য
      </h3>

      {/* Seller Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-[#35858E]/10 text-[#35858E] flex items-center justify-center font-bold text-lg shrink-0 border border-[#35858E]/20">
          {sellerName.charAt(0).toUpperCase() || <User className="w-5 h-5" />}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-slate-900 text-base">{sellerName}</span>
          <span className="text-xs text-[#35858E] font-medium">ভেরিফায়িড সদস্য</span>
        </div>
      </div>

      {/* Location Info */}
      <div className="flex flex-col gap-2.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-[#35858E] shrink-0 mt-0.5" />
          <div>
            <span className="text-slate-400 font-medium block">ঠিকানা:</span>
            <span className="font-semibold text-slate-800">{locationText}</span>
          </div>
        </div>
      </div>


    </div>
  );
}