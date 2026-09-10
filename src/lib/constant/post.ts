import type {
  PostType,
  BookCondition,
  BookEntry,
  AddNewPostResult,
} from "@/interface/post/types";

export { PostType, BookCondition, BookEntry, AddNewPostResult };

export const BOOK_CATEGORIES = [
  "Science",
  "Commerce",
  "Arts",
  "University",
  "Admission",
  "Business",
  "Engineering",
  "Medical",
  "Others",
] as const;

export const BOOK_CONDITIONS: { label: string; value: BookCondition }[] = [
  { label: "New", value: "new" },
  { label: "Like New", value: "like_new" },
  { label: "Good", value: "good" },
  { label: "Fair", value: "fair" },
];
