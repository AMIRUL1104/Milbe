import { z } from "zod";

export const requestBookSchema = z.object({
  requesterName: z.string().min(1, "Name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  message: z.string().optional(),
});

export type RequestBookFormValues = z.infer<typeof requestBookSchema>;
