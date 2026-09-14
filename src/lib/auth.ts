import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";


const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in the .env file.");
}

const client = new MongoClient(uri);
const db = client.db("BookBridgeDB");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
   emailAndPassword: { 
    enabled: true, 
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
    // onto the Better Auth `user` document. `input: false` keeps writes behind
    // the validated Express `PATCH /api/users` route (Better Auth rejects any
    // request trying to set these fields directly).
    phoneNumber: {
      type: "string",
      defaultValue: "",
      input: false,
    },

    district: {
      type: "string",
      defaultValue: "",
      input: false,
    },

    area: {
      type: "string",
      defaultValue: "",
      input: false,
    },
  },
}
});