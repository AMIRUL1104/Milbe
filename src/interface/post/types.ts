export type PostType = "sell" | "donate";
export type BookCondition = "new" | "excellent" | "good" | "fair";
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
