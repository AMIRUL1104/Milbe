import type { PostType } from "./types";

export interface PostBook {
  bookId: string;
  publisherId: string;
  bookName: string;
  publisherName: string;
  image?: string | null;
  condition: string;
  price?: number;
}

export interface BookItem {
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
  phone: string;
  messenger: string;
  whatsappOnly: boolean;
  description: string;
  status: string;
  acceptedRequestId: string | null;
  isDeleted: boolean;
  publishedAt: string;
  updatedAt: string;
  books: PostBook[];
}
