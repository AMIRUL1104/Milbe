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
  image: string | null;
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
  image: string;
  imageAssetId: string;
}

export interface UpdatePostPayload
  extends Omit<NewPostPayload, "image" | "imageAssetId"> {
  image: string | null;
  imageAssetId: string | null;
}

export interface AddNewPostResult {
  success: boolean;
  message?: string;
  postId?: string;
}
