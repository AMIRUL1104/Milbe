import { CATEGORY_VALUES } from "./categories";

/** @deprecated Re-export of enum members is not available here. Use values via `CATEGORY_VALUES`. */
export { CATEGORY_VALUES };

export type { CategoryValue } from "./categories";
export {
  getCategoryLabelBn,
  getCategoryLabelEn,
  normalizeCategory,
  isCategoryValue,
} from "./categories";
export {
  DISTRICT_OPTIONS,
  DISTRICT_VALUES,
  DEFAULT_DISTRICT,
  getDistrictLabelBn,
  normalizeDistrict,
  isDistrictValue,
} from "./districts";
export type { DistrictValue } from "./districts";

/**
 * Category slugs (stable English DB values). Single source = `./categories`.
 * UI renders the Bangla label via `getCategoryLabelBn`; DB stores these slugs.
 */
export const BOOK_CATEGORIES = CATEGORY_VALUES;

export const BOOK_CONDITIONS: { label: string; value: "new" | "like_new" | "good" | "fair" }[] = [
  { label: "New", value: "new" },
  { label: "Like New", value: "like_new" },
  { label: "Good", value: "good" },
  { label: "Fair", value: "fair" },
];

/** Bengali display labels for the condition enum (form, preview, cards). */
export const CONDITION_LABELS_BN: Record<"new" | "like_new" | "good" | "fair", string> = {
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
