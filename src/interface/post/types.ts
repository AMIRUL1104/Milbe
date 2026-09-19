export type PostType = "sell" | "donate";
export type PostStatus = "available" | "sold" | "donated";
export type BookCondition = "new" | "like_new" | "good" | "fair";
export type AvailableStatus = "available" | "unavailable";

export interface PostBookEntry {
  bookId?: string;
  publisherId?: string;
  bookName: string;
  publisherName: string;
  image: string | null;
  condition: BookCondition;
  price: number | null;
  availableStatus: AvailableStatus;
}

export interface PostItem {
  _id: string;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  title: string;
  category: string;
  type: PostType;
  image: string;
  district: string;
  area: string;
  phone?: string;
  messenger?: string;
  whatsappOnly?: boolean;
  description: string;
  status: PostStatus;
  acceptedRequestId: string | null;
  isDeleted: boolean;
  publishedAt: string;
  updatedAt: string;
  books: PostBookEntry[];
}

export type NewPostPayload = Pick<
  PostItem,
  | "title"
  | "category"
  | "type"
  | "image"
  | "district"
  | "area"
  | "phone"
  | "messenger"
  | "whatsappOnly"
  | "description"
  | "books"
>;

/** Payload accepted by PATCH /api/posts/:id — same editable fields as create. */
export type UpdatePostPayload = NewPostPayload;

export interface AddNewPostResult {
  success: boolean;
  message?: string;
  postId?: string;
}
