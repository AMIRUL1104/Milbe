import { z } from "zod";

export const bookEntrySchema = z.object({
  bookId: z.string().optional().default(""),
  publisherId: z.string().optional().default(""),
  bookName: z.string().min(1, "বইয়ের নাম দিন"),
  publisherName: z.string().min(1, "পাবলিশারের নাম দিন"),
  image: z.string().nullable().default(null),
  condition: z.enum(["new", "excellent", "good", "fair"], {
    error: "অবস্থা বেছে নিন",
  }),
  price: z
    .union([z.number(), z.nan(), z.null()])
    .transform((val) => (Number.isNaN(val) ? null : val))
    .default(null),
});

// আপনার বিদ্যমান bookEntrySchema এখানে থাকবে
// const bookEntrySchema = ...

export const addPostSchema = z
  .object({
    // ব্যাকএন্ড/পেলোড ম্যানেজমেন্টের জন্য ফিল্ডসমূহ
    sellerId: z.string().optional(),
    sellerName: z.string().optional(),
    sellerEmail: z.string().optional(),
    status: z.enum(["available", "sold", "donated"]).default("available"),
    acceptedRequestId: z.string().nullable().default(null),
    isDeleted: z.boolean().default(false),
    updatedAt: z.string().optional(),

    // ফর্মের মূল ইনপুট ফিল্ডসমূহ
    title: z.string().min(1, "Title is required"),
    category: z.string().min(1, "Select a category"),
    type: z.enum(["sell", "donate"], {
      error: "Select a listing type",
    }),
    image: z.string().min(1, "A post image is required"),
    district: z.string().min(1, "District is required"),
    area: z.string().min(1, "Area is required"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^[0-9+\-\s]{6,15}$/, "Enter a valid phone number"),
    messenger: z.string().optional().default(""),
    whatsappOnly: z.boolean().default(false),
    description: z.string().optional().default(""),
    books: z.array(bookEntrySchema).min(1, "Add at least one book"),
  })
  .superRefine((data, ctx) => {
    if (data.type === "sell") {
      data.books.forEach((book, index) => {
        if (book.price === null || book.price === undefined || book.price < 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Price is required and must be 0 or more for a Sell post",
            path: ["books", index, "price"],
          });
        }
      });
    }
  });

export type AddPostFormValues = z.infer<typeof addPostSchema>;
export type BookEntryFormValues = z.infer<typeof bookEntrySchema>;
