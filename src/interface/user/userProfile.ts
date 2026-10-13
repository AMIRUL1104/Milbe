import { ApiResponse } from "@/interface/apiResponse";

export interface UserProfile {
  _id: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  district: string;
  area: string;
  avatarUrl: string | null;
  avatarAssetId: string | null;
  role: "user" | "admin";
  memberSince: string; // ISO date string
  banned: boolean;
}

export interface UpdateProfilePayload {
  fullName?: string;
  // Optional: an empty string ("") CLEARS the stored value on the backend.
  // Omitting the key (undefined) leaves the existing value untouched.
  phoneNumber?: string;
  district?: string;
  area?: string;
  avatarUrl?: string | null;
  avatarAssetId?: string | null;
}

export interface UpdateUserProfileResult {
  profile: UserProfile;
  cleanupPending: boolean;
}

export type UserProfileResponse = ApiResponse<UserProfile>;