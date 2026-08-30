import { protectedFetch } from "@/services/core/serverFetch";
import { UserProfileResponse } from "@/interface/user/userProfile";

export async function getUserProfile(): Promise<UserProfileResponse> {
  return protectedFetch<UserProfileResponse>("/api/users");
}