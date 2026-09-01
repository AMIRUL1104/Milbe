import { serverMutation } from "@/services/core/server";
import { UpdateProfilePayload, UserProfile } from "@/interface/user/userProfile";

export async function createUserProfile(): Promise<UserProfile> {
  return (await serverMutation<Record<string, never>, UserProfile>(
    "/api/users",
    {},
    "POST",
    { unwrap: true }
  )) as UserProfile;
}

export async function updateUserProfile(data: UpdateProfilePayload): Promise<UserProfile> {
  return (await serverMutation<UpdateProfilePayload, UserProfile>(
    "/api/users",
    data,
    "PATCH",
    { unwrap: true }
  )) as UserProfile;
}