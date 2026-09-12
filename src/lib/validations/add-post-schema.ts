import { z } from "zod";

export const bookEntrySchema = z.object({
  bookId: z.string().optional().default(""),
  publisherId: z.string().optional().default(""),
  bookName: z.string().min(1, "বইয়ের নাম দিন"),
  publisherName: z.string().min(1, "পাবলিশারের নাম দিন"),
  image: z.string().nullable().default(null),
  condition: z.enum(["new", "like_new", "good", "fair"], {
    message: "অবস্থা বেছে নিন",
  }),
  price: z
    .union([z.number(), z.nan(), z.null()])
    .transform((val) => (Number.isNaN(val) ? null : val))
    .default(null),
  availableStatus: z.enum(["available", "unavailable"]).default("available"),
});

export const addPostSchema = z
  .object({
    title: z.string().min(1, "পোস্টের শিরোনাম দিন"),
    category: z.string().min(1, "ক্যাটাগরি বেছে নিন"),
    type: z.enum(["sell", "donate"], {
      message: "পোস্টের ধরন বেছে নিন",
    }),
    image: z.string().min(1, "পোস্টের একটি ছবি দিন"),
    district: z.string().min(1, "জেলা নির্বাচন করুন"),
    area: z.string().min(1, "এলাকা নির্বাচন করুন"),
    phone: z
      .string()
      .min(1, "ফোন নম্বর দিন")
      .regex(/^[0-9+\-\s]{6,15}$/, "বৈধ ফোন নম্বর দিন"),
    messenger: z.string().optional().default(""),
    whatsappOnly: z.boolean().default(false),
    description: z.string().optional().default(""),
    books: z.array(bookEntrySchema).min(1, "কমপক্ষে একটি বই যোগ করুন"),
  })
  .superRefine((data, ctx) => {
    if (data.type === "sell") {
      data.books.forEach((book, index) => {
        if (book.price === null || book.price === undefined || book.price < 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "বিক্রয় পোস্টে মূল্য দিতে হবে এবং তা ০ বা তার বেশি হতে হবে",
            path: ["books", index, "price"],
          });
        }
      });
    }
  });

export type AddPostFormValues = z.infer<typeof addPostSchema>;
export type BookEntryFormValues = z.infer<typeof bookEntrySchema>;
