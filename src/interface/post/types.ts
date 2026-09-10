import type { BookItem } from "./postDetails";

export type NewPostPayload = Pick<
  BookItem,
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

export type PostType = "sell" | "donate";
export type BookCondition = "new" | "like_new" | "good" | "fair";
export type PostStatus = "available" | "requested" | "sold" | "donated";

export interface BookEntry {
  bookId: string;
  publisherId: string;
  publisherName: string;
  bookName: string;
  image: string | null;
  condition: BookCondition;
  price: number | null;
}

export interface AddNewPostResult {
  success: boolean;
  message?: string;
  postId?: string;
}
