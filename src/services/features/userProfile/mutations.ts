import { serverMutation } from "@/services/core/server";
import { UpdateProfilePayload } from "@/interface/user/userProfile";
import { UserProfileResponse } from "@/interface/user/userProfile";

export async function createUserProfile(): Promise<UserProfileResponse> {
  return serverMutation<Record<string, never>, UserProfileResponse>("/api/users", {}, "POST");
}

export async function updateUserProfile(data: UpdateProfilePayload): Promise<UserProfileResponse> {
  return serverMutation<UpdateProfilePayload, UserProfileResponse>("/api/users", data, "PATCH");
}