export interface BackendBookItem {
  bookId: string;
  publisherId: string;
  bookName: string;
  publisherName: string;
  image: string | null;
  condition: "like_new" | "good" | "fair";
  price: number;
}

export interface PostDetailData {
  _id: string;
  title: string;
  category: string;
  sellerId: string;
  sellerName: string;
  type: "sell" | "donate";
  image: string;
  district: string;
  area: string;
  phone: string;
  messenger: string;
  whatsappOnly: boolean;
  description: string;
  status: "available" | "requested" | "accepted";
  acceptedRequestId: string | null;
  isDeleted: boolean;
  publishedAt: string;
  books: BackendBookItem[];
}
