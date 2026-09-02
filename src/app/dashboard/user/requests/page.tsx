import { ReceivedRequestsClient } from "@/components/dashboard/user/requests/received/ReceivedRequestsClient";
import { RequestsTabs } from "@/components/dashboard/user/requests/RequestsTabs";
import { SentRequestsList } from "@/components/dashboard/user/requests/sent/SentRequestsList";
import type { BookRequestResponse } from "@/interface/bookRequest/bookRequest";
import type { BookRequest } from "@/interface/bookRequest/checkRequest";
import type { PostSummary, ReceivedRequest, SentRequest } from "@/interface/dashboard/request";
import type { BookItem } from "@/interface/post related/postDetails";
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
    sellerContact: request.sellerContact
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
  };
}

function buildPostSummaries(
  posts: BookItem[],
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

  const sentRequests = (sentResponse?.data?.requests ?? []).map(toSentRequest);
  const receivedRequestsData = receivedResponse?.data?.requests ?? [];
  const receivedRequests = receivedRequestsData.map(toReceivedRequest);

  const myPostsResponse = await getMyPosts();
  const postsData = (myPostsResponse.data?.books ?? []) as BookItem[];
  const posts = buildPostSummaries(postsData, receivedRequestsData);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Requests</h1>
        <p className="text-sm text-gray-500">
          Track requests you&apos;ve sent and manage requests you&apos;ve
          received on your posts.
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
