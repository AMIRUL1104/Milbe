import { z } from "zod";

export const requestBookSchema = z.object({
  phoneNumber: z.string().trim().min(1, "ফোন নম্বর প্রয়োজন"),
  message: z.string().optional(),
});

export type RequestBookFormValues = z.infer<typeof requestBookSchema>;
