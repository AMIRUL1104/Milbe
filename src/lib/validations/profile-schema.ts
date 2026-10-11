import { z } from "zod";

// Regex mirrors the Better Auth `additionalFields.phoneNumber.validator`
// in `src/lib/auth.ts` so a phone number is accepted identically on both the
// profile form and the profile-update backend.
const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/;

export const profileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .max(80, "Name is too long"),
  // Optional: whitespace/empty means "not set". When a value IS provided it
  // must match the same phone format the backend validator allows.
  // `.trim()` runs before the refine, so "   " is treated as empty.
  phoneNumber: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || PHONE_REGEX.test(value),
      "Enter a valid phone number",
    )
    .optional(),
  district: z.string().trim().max(50).optional(),
  area: z.string().trim().max(100).optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
