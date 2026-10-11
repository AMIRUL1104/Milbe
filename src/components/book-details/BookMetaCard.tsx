import { Card } from "@heroui/react";
import RequestBookButton from "./RequestBookButton";
import { PostItem } from "@/interface/post/types";
import { getUserSession } from "@/services/core/session";
import { CONDITION_LABELS_BN } from "@/lib/constant/post";

interface BookMetaCardProps {
  post: PostItem;
}

export default async function BookMetaCard({ post }: BookMetaCardProps) {
  const session = await getUserSession();
  const conditionLabel = CONDITION_LABELS_BN[post.overallCondition] ?? "ভালো";
  const availabilityLabel =
    post.status === "available"
      ? "উপলব্ধ"
      : post.status === "sold"
        ? "বিক্রি হয়েছে"
        : "দান করা হয়েছে";

  return (
    <Card className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-5">
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
              বইয়ের মোট মূল্য
            </span>
            <span className="text-2xl font-black text-slate-900">
              {post.type === "donate" ? (
                <span className="text-[#35858E]">ফ্রি / বিনামূল্যে</span>
              ) : (
                `৳${post.totalPrice ?? 0}`
              )}
            </span>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span
              className={`text-xs font-bold border px-2.5 py-0.5 rounded-md uppercase tracking-wide ${
                post.status === "available"
                  ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                  : "text-slate-600 bg-slate-100 border-slate-200"
              }`}
            >
              {availabilityLabel}
            </span>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md">
              অবস্থা: {conditionLabel}
            </span>
          </div>
        </div>

        <div className="border-t border-b border-slate-100 py-3 text-xs text-slate-600 flex justify-between w-full">
          {post.books.length > 0 &&
            <span>
              মোট বই: <span className="font-bold text-slate-900">{post.books.length}টি</span>
            </span>
          }

          <span>
            <span className="font-bold text-slate-900 uppercase"></span>
          </span>
          <span>
            <span className="font-bold text-slate-900 uppercase">{post.type === "sell" ? "বিক্রি হবে" : "দান করা হবে"}</span>
          </span>
        </div>
      </div>

      <div className="w-full pt-1">
        {post.status === "available" ? (
          <RequestBookButton
            postId={post._id}
            postSlug={post.slug || post._id}
            requesterId={session?.id}
            postTitle={post.title}
            sellerName={post.sellerName}
            requesterPhone={session?.phoneNumber ?? undefined}
            requesterDistrict={session?.district ?? undefined}
            requesterArea={session?.area ?? undefined}
          />
        ) : (
          <p className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-center text-sm font-semibold text-slate-600">
            {post.status === "sold"
              ? "বইটি বিক্রি হয়ে গেছে"
              : "বইটি দান করা হয়েছে"}
          </p>
        )}
      </div>
    </Card>
  );
}