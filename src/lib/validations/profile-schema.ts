import { z } from "zod";

export const profileSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(80, "Name is too long"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid phone number"),
  district: z.string().min(1, "District is required"),
  area: z.string().min(1, "Area is required"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
