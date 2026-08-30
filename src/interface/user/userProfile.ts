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
  role: "user" | "admin";
  memberSince: string; // ISO date string
}

export interface UpdateProfilePayload {
  fullName: string;
  phoneNumber: string;
  district: string;
  area: string;
  avatarUrl?: string | null;
}

export type UserProfileResponse = ApiResponse<UserProfile>;