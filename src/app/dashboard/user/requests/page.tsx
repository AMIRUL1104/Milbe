import { ReceivedRequestsClient } from "@/components/dashboard/user/requests/received/ReceivedRequestsClient";
import { RequestsErrorState } from "@/components/dashboard/user/requests/RequestsErrorState";
import { RequestsTabs } from "@/components/dashboard/user/requests/RequestsTabs";
import { SentRequestsList } from "@/components/dashboard/user/requests/sent/SentRequestsList";
import type { BookRequest } from "@/interface/bookRequest/checkRequest";
import type { PostSummary, ReceivedRequest, SentRequest } from "@/interface/dashboard/request";
import type { PostItem } from "@/interface/post/types";
import { getUserSession } from "@/services/core/session";
import { getMyPosts } from "@/services/features/posts";
import { getSentRequests as getSentBookRequests, getReceivedRequests as getReceivedBookRequests } from "@/services/features/bookRequests";

function toIsoDate(value: Date | string | undefined): string {
  if (!value) {
    return new Date().toISOString();
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }

  return date.toISOString();
}

function toSentRequest(request: BookRequest): SentRequest {
  return {
    id:
      request._id?.toString() ??
      `${request.postId}-${request.requesterId}-${toIsoDate(request.requestDate)}`,
    postId: request.postId,
    postTitle: request.postTitle,
    bookCoverUrl: request.bookCoverUrl,
    sellerName: request.sellerName,
    requestDate: toIsoDate(request.requestDate),
    status: request.status,
    message: request.message,
    sellerContact:
      request.status === "accepted" && request.sellerContact
        ? {
          phone: request.sellerContact.phone ?? "",
          messenger: request.sellerContact.messenger,
        }
        : undefined,
  };
}

function toReceivedRequest(request: BookRequest): ReceivedRequest {
  return {
    id:
      request._id?.toString() ??
      `${request.postId}-${request.requesterId}-${toIsoDate(request.requestDate)}`,
    postId: request.postId,
    requesterName: request.requesterName,
    requesterAvatarUrl: request.requesterAvatarUrl,
    requestDate: toIsoDate(request.requestDate),
    status: request.status,
    message: request.message,
    requesterContact:
      request.status === "accepted" && request.requesterContact
        ? {
          phone: request.requesterContact.phone,
        }
        : undefined,
  };
}

function buildPostSummaries(
  posts: PostItem[],
  requests: BookRequest[],
): PostSummary[] {
  const pendingCounts = new Map<string, number>();

  requests.forEach((request) => {
    if (request.status === "pending") {
      pendingCounts.set(request.postId, (pendingCounts.get(request.postId) ?? 0) + 1);
    }
  });

  return posts.map((post) => ({
    id: post._id,
    title: post.title,
    bookCoverUrl: post.image,
    pendingCount: pendingCounts.get(post._id) ?? 0,
  }));
}

export default async function RequestsPage() {
  let sentRequests: SentRequest[] = [];
  let receivedRequests: ReceivedRequest[] = [];
  let posts: PostSummary[] = [];
  let hasError = false;

  try {
    const user = await getUserSession();
    const userId = user?.id ?? "";

    const [sentResponse, receivedResponse] = await Promise.all([
      userId
        ? getSentBookRequests(userId)
        : Promise.resolve(null),
      userId
        ? getReceivedBookRequests(userId)
        : Promise.resolve(null),
    ]);

    sentRequests = (sentResponse?.data ?? []).map(toSentRequest);
    const receivedRequestsData = receivedResponse?.data ?? [];
    receivedRequests = receivedRequestsData.map(toReceivedRequest);

    const myPostsResponse = await getMyPosts();
    const postsData = (myPostsResponse?.data ?? []) as PostItem[];
    posts = buildPostSummaries(postsData, receivedRequestsData);
  } catch {
    hasError = true;
  }

  // console.log("sentRequests", sentRequests);
  // console.log("receivedRequests", receivedRequests);
  if (hasError) {
    return <RequestsErrorState />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">রিকোয়েস্ট</h1>
        <p className="text-sm text-gray-500">
          আপনার পাঠানো এবং আপনার পোস্টে আসা রিকোয়েস্টগুলো এখানে দেখতে পারবেন।
        </p>
      </div>

      <RequestsTabs
        sentContent={<SentRequestsList requests={sentRequests} />}
        receivedContent={
          <ReceivedRequestsClient posts={posts} requests={receivedRequests} />
        }
      />
    </div>
  );
}
