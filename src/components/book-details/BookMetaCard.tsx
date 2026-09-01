import { Card } from "@heroui/react";
import RequestBookButton from "./RequestBookButton";
import { PostDetailData } from "@/app/books/[id]/page";
import { getUserProfile } from "@/services/features/userProfile";

interface BookMetaCardProps {
  post: PostDetailData;
}

export default async function BookMetaCard({ post }: BookMetaCardProps) {
  const user = await getUserProfile();

  const totalBundlePrice = post.books.reduce((acc, book) => acc + book.price, 0);

  return (
    <Card className="card bg-surface border border-border rounded-card p-5 shadow-xs flex flex-col justify-between h-full">

      <div className="card__content flex flex-col gap-4 w-full">

        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="text-xs text-text-muted font-medium">Total Bundle Value</span>
            <span className="text-2xl font-black text-text-primary card__title">
              {post.type === "donate" ? <span className="text-secondary">FREE</span> : `৳${totalBundlePrice}`}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs text-text-muted font-medium">Status</span>
            <span className="text-xs font-bold text-success-text bg-success-light px-2 py-0.5 rounded-sm uppercase tracking-wide">
              {post.status}
            </span>
          </div>
        </div>

        <div className="border-t border-b border-border py-2.5 text-xs text-text-secondary flex justify-between w-full card__description">
          <span>Total Books: <span className="font-bold text-text-primary">{post.books.length}</span></span>
          <span>Type: <span className="font-bold text-text-primary uppercase">{post.type}</span></span>
        </div>

      </div>

      <div className="card__footer w-full pt-4">
        <RequestBookButton
          postId={post._id}
          sellerId={post.sellerId}
          requesterId={user?.userId}
          postTitle={post.title}
          sellerName={post.sellerName}
          bookCoverUrl={post.image}
          sellerPhone={post.phone}
          sellerMessenger={post.messenger}
          requesterName={user?.fullName}
          requesterPhone={user?.phoneNumber}
          requesterAvatarUrl={user?.avatarUrl}
        />
      </div>

    </Card>
  );
}