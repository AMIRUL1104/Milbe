import { z } from "zod";

// Future-proof limits: model is images[], UX locked to exactly 1 for now.
// Multi-image enable = change POST_IMAGE_MAX (e.g. 5) + multi-slot UI.
export const POST_IMAGE_MIN = 1;
export const POST_IMAGE_MAX = 1;

export const postImageSchema = z.object({
  url: z.string().min(1, "পোস্টের একটি ছবি দিন"),
  assetId: z.string().min(1, "ছবি আপলোড সম্পন্ন করুন"),
});

const imagesSchema = z
  .array(postImageSchema)
  .min(POST_IMAGE_MIN, "পোস্টের একটি ছবি দিন")
  .max(POST_IMAGE_MAX, `এখন সর্বোচ্চ ${POST_IMAGE_MAX}টি ছবি দেওয়া যাবে`);

// Per-book data contract: only three optional text fields. Price and
// condition live at the POST level (totalPrice / overallCondition);
// `availableStatus` is a hidden carried field (server/request lifecycle).
export const bookEntrySchema = z.object({
  bookId: z.string().optional().default(""),
  publisherId: z.string().optional().default(""),
  bookName: z.string().optional().default(""),
  author: z.string().optional().default(""),
  publisherName: z.string().optional().default(""),
  availableStatus: z.enum(["available", "unavailable"]).default("available"),
});

export const postFormSchema = z.object({
    title: z.string().min(1, "পোস্টের শিরোনাম দিন"),
    category: z.string().min(1, "ক্যাটাগরি বেছে নিন"),
    type: z.enum(["sell", "donate"], {
      message: "পোস্টের ধরন বেছে নিন",
    }),
    // Primary multi-image store (locked to 1 now).
    images: imagesSchema,
    // @deprecated mirrors of images[0] — auto-synced, kept for back-compat.
    image: z.string().optional().default(""),
    imageAssetId: z.string().nullable().optional(),
    // Post-level total price. NaN (cleared number input) → null.
    totalPrice: z
      .union([z.number(), z.nan(), z.null()])
      .transform((val) => (Number.isNaN(val) ? null : val))
      .default(null),
    overallCondition: z
      .enum(["new", "like_new", "good", "fair"], {
        message: "বইয়ের অবস্থা বেছে নিন",
      })
      .default("good"),
    district: z.string().min(1, "জেলা নির্বাচন করুন"),
    area: z.string().min(1, "এলাকা নির্বাচন করুন"),
    phone: z
      .string()
      .min(1, "ফোন নম্বর দিন")
      .regex(/^[0-9+\-\s]{6,15}$/, "বৈধ ফোন নম্বর দিন"),
    messenger: z.string().optional().default(""),
    whatsappOnly: z.boolean().default(false),
    description: z.string().optional().default(""),
    // Form-only checkbox: saves district/area/phone to the profile AFTER a
    // successful post create. Never sent to the post API.
    saveToProfile: z.boolean().default(false),
    // Book list is fully optional — an empty list is valid.
    books: z.array(bookEntrySchema).default([]),
  });

const validatePostValues = (
  data: z.infer<typeof postFormSchema>,
  ctx: z.RefinementCtx,
) => {
  if (data.type === "sell") {
    if (data.totalPrice === null || data.totalPrice < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "বিক্রয় পোস্টে মোট দাম দিন (০ বা তার বেশি)",
        path: ["totalPrice"],
      });
    }
  } else if (data.totalPrice !== null) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "দান পোস্টে মূল্য লাগবে না",
      path: ["totalPrice"],
    });
  }
};

export const addPostSchema = postFormSchema.superRefine((data, ctx) => {
  validatePostValues(data, ctx);
  // images[] is the source of truth; mirrors auto-sync in the UI layer.
  if (!data.images || data.images.length < POST_IMAGE_MIN) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "পোস্টের একটি ছবি দিন",
      path: ["images"],
    });
  }
  if (!data.images?.[0]?.assetId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "ছবি আপলোড সম্পন্ন করুন",
      path: ["imageAssetId"],
    });
  }
});

export const editPostSchema = postFormSchema
  .extend({
    // Edit allows an empty array (image removable); create still requires 1.
    // Keep `.min(0)` explicit so input/output types stay `images: {..}[]`.
    images: z.array(postImageSchema).min(0).max(POST_IMAGE_MAX).default([]),
  })
  .superRefine(validatePostValues);

export type AddPostFormValues = z.infer<typeof addPostSchema>;
export type BookEntryFormValues = z.infer<typeof bookEntrySchema>;
