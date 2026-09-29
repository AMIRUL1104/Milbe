import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { z } from "zod";
import { sendVerifyMail, sendExistingAccountMail } from "./email";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in the .env file.");
}

// ভেরিফিকেশন লিংক এই URL থেকে বানানো হয়। production-এ অবশ্যই https://milbe.shop হতে হবে।
const baseUrl = process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_BASE_URL;

const client = new MongoClient(uri);
const db = client.db("BookBridgeDB");

export const auth = betterAuth({
  baseURL: baseUrl,
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  emailAndPassword: {
    enabled: true,
    // ভেরিফাই ছাড়া লগইন করা যাবে না
    requireEmailVerification: true,
    // পুরনো ইমেইল দিয়ে কেউ সাইন আপ করতে গেলে error না দিয়ে (enumeration protection)
    // ওই ইমেইলে একটা notice পাঠানো হয়
    onExistingUserSignUp: async ({ user }) => {
      sendExistingAccountMail({
        to: user.email,
        name: user.name,
        loginUrl: `${baseUrl}/auth/signin`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      sendVerifyMail({ to: user.email, name: user.name, url });
    },
  },
  // need to add some additional field . role , isblocked,
  user: {
    additionalFields: {
      role: {
        type: ["user", "admin"],
        defaultValue: "user",
        input: false,
      },

      profileCompleted: {
        type: "boolean",
        defaultValue: false,
        input: false,
      },

      isBlocked: {
        type: "boolean",
        defaultValue: false,
        input: false,
      },

      // ── Milbe profile fields ────────────────────────────────────────────────
      // Formerly stored in the separate `userProfile` collection; consolidated
      // onto the Better Auth `user` document.
      // User-editable profile fields (`input: true` → the user may update them
      // through Better Auth's `updateUser`). `role`, `isBlocked` and
      // `profileCompleted` stay `input: false` so users can never set them.
      phoneNumber: {
        type: "string",
        defaultValue: "",
        input: true,
        validator: {
          input: z
            .string()
            .refine(
              (value) => value === "" || /^[0-9+\-\s()]{7,20}$/.test(value),
              "Enter a valid phone number",
            ),
        },
      },

      district: {
        type: "string",
        defaultValue: "",
        input: true,
        validator: { input: z.string().max(50) },
      },

      area: {
        type: "string",
        defaultValue: "",
        input: true,
        validator: { input: z.string().max(100) },
      },
    },
  },

  // Keeps `profileCompleted` in sync whenever the user document is updated
  // with profile fields (e.g. through Better Auth's `/update-user`).
  databaseHooks: {
    user: {
      update: {
        before: async (data, ctx) => {
          const current = ctx?.context?.session?.user;
          if (!current) {
            // Internal/userless flows: leave the flag untouched.
            return { data: {} };
          }

          const merged = { ...current, ...data };
          const completed = Boolean(
            (merged.phoneNumber ?? "").trim() &&
            (merged.district ?? "").trim() &&
            (merged.area ?? "").trim(),
          );

          if (completed === Boolean(current.profileCompleted)) {
            return { data: {} };
          }

          return { data: { profileCompleted: completed } };
        },
      },
    },
  },
});
