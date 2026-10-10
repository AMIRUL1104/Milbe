import type {
  PostType,
  BookCondition,
  AddNewPostResult,
} from "@/interface/post/types";

export { PostType, BookCondition, AddNewPostResult };

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

/** Bengali display labels for the condition enum (form, preview, cards). */
export const CONDITION_LABELS_BN: Record<BookCondition, string> = {
  new: "একদম নতুন",
  like_new: "নতুন মত",
  good: "ভালো",
  fair: "মোটামুটি",
};

/** Single source for the 4-step Add Post progress indicator (TopBar + form). */
export const STEP_SECTIONS = [
  "step-basic",
  "step-location",
  "step-description",
  "step-books",
] as const;

export const STEP_LABELS = [
  "মূল তথ্য",
  "অবস্থান ও যোগাযোগ",
  "বিবরণ",
  "বইয়ের তালিকা",
] as const;
