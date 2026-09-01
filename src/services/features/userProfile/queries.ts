import { protectedFetch, unwrapResponse } from "@/services/core/serverFetch";
import { UserProfileResponse } from "@/interface/user/userProfile";

export async function getUserProfile(): Promise<UserProfileResponse> {
  return unwrapResponse<UserProfileResponse>(
    await protectedFetch<UserProfileResponse>("/api/users")
  );
}