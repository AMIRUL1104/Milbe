export type PostType = "sell" | "donate";
export type PostStatus = "available" | "sold" | "donated";
export type BookCondition = "new" | "like_new" | "good" | "fair";
export type AvailableStatus = "available" | "unavailable";

export interface PostBookEntry {
  bookId?: string;
  publisherId?: string;
  bookName?: string;
  author?: string;
  publisherName?: string;
  availableStatus: AvailableStatus;
}

export interface PostImageItem {
  url: string;
  assetId: string;
}

export interface PostItem {
  _id: string;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  title: string;
  slug?: string;
  searchSlug?: string;
  category: string;
  type: PostType;
  /** Primary multi-image store — currently locked to exactly 1 via validation. Optional for legacy API payloads. */
  images?: PostImageItem[];
  /** @deprecated mirror of images[0].url — use getCoverImage(post). */
  image: string | null;
  /** @deprecated mirror of images[0].assetId. */
  imageAssetId?: string | null;
  totalPrice: number | null;
  overallCondition: BookCondition;
  district: string;
  area: string;
  phone?: string;
  messenger?: string;
  whatsappOnly?: boolean;
  description: string;
  status: PostStatus;
  acceptedRequestId: string | null;
  acceptedEver: boolean;
  requestCount: number;
  isDeleted: boolean;
  publishedAt: string;
  updatedAt: string;
  books: PostBookEntry[];
}

type PostPayloadFields = Pick<
  PostItem,
  | "title"
  | "category"
  | "type"
  | "totalPrice"
  | "overallCondition"
  | "district"
  | "area"
  | "phone"
  | "messenger"
  | "whatsappOnly"
  | "description"
  | "books"
>;

export interface NewPostPayload extends PostPayloadFields {
  images: PostImageItem[];
  /** @deprecated auto-derived from images[0] — sent for back-compat. */
  image: string;
  /** @deprecated auto-derived from images[0] — sent for back-compat. */
  imageAssetId: string;
}

export interface UpdatePostPayload
  extends Omit<NewPostPayload, "image" | "imageAssetId" | "images"> {
  images: PostImageItem[];
  image: string | null;
  imageAssetId: string | null;
}

/** Single place to read the cover: images[0] → legacy image fallback. */
export function getCoverImage(post: {
  images?: PostImageItem[] | null;
  image?: string | null;
}): string {
  return post.images?.[0]?.url ?? post.image ?? "";
}

/** Single place to read the cover asset id. */
export function getCoverAssetId(post: {
  images?: PostImageItem[] | null;
  imageAssetId?: string | null;
}): string | null {
  return post.images?.[0]?.assetId ?? post.imageAssetId ?? null;
}

export interface AddNewPostResult {
  success: boolean;
  message?: string;
  postId?: string;
}
