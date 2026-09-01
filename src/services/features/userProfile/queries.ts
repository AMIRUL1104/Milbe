import { protectedFetch, unwrapResponse } from "@/services/core/serverFetch";
import { UserProfile } from "@/interface/user/userProfile";

export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    return await unwrapResponse<UserProfile>(
      await protectedFetch<UserProfile>("/api/users"),
    );
  } catch {
    return null;
  }
}