import { z } from "zod";

export const requestBookSchema = z.object({
  phoneNumber: z.string().trim().min(1, "ফোন নম্বর প্রয়োজন"),
  district: z.string().trim().min(1, "জেলা প্রয়োজন").max(50),
  area: z.string().trim().min(1, "এলাকা প্রয়োজন").max(50),
  message: z.string().optional(),
});

export type RequestBookFormValues = z.infer<typeof requestBookSchema>;
