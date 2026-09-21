import { Card } from "@heroui/react";
import RequestBookButton from "./RequestBookButton";
import { PostItem } from "@/interface/post/types";
import { getUserSession } from "@/services/core/session";

interface BookMetaCardProps {
  post: PostItem;
}

export default async function BookMetaCard({ post }: BookMetaCardProps) {
  const session = await getUserSession();
  const totalBundlePrice = post.books.reduce((acc, book) => acc + (book.price ?? 0), 0);

  return (
    <Card className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-5">
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
              মোট বান্ডেল মূল্য
            </span>
            <span className="text-2xl font-black text-slate-900">
              {post.type === "donate" ? (
                <span className="text-[#35858E]">ফ্রি / বিনামূল্যে</span>
              ) : (
                `৳${totalBundlePrice}`
              )}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
              স্ট্যাটাস
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md uppercase tracking-wide">
              {post.status || "এভেইলএবল"}
            </span>
          </div>
        </div>

        <div className="border-t border-b border-slate-100 py-3 text-xs text-slate-600 flex justify-between w-full">
          <span>
            মোট বই: <span className="font-bold text-slate-900">{post.books.length}টি</span>
          </span>
          <span>
            টাইপ: <span className="font-bold text-slate-900 uppercase">{post.type}</span>
          </span>
        </div>
      </div>

      <div className="w-full pt-1">
        <RequestBookButton
          postId={post._id}
          requesterId={session?.id}
          postTitle={post.title}
          sellerName={post.sellerName}
          requesterPhone={session?.phoneNumber ?? undefined}
        />
      </div>
    </Card>
  );
}