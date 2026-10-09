import { cache } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserSession } from "@/interface/user/userSession";

// ভেতরের helper: blocked হলেও user ফেরত দেয় (এক request-এ একবারই fetch হয়)
const getSessionUser = cache(async (): Promise<UserSession | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) return null;

  return session.user as UserSession;
});

// ১. ইউজার সেশন পাওয়ার ফাংশন
// Suspended (banned) users are denied at the server-session layer as well.
// (The Express API enforces the same flag in `auth.middleware.ts`.)
export async function getUserSession(): Promise<UserSession | null> {
  const user = await getSessionUser();

  if (!user || (user.banned ?? user.isBlocked)) return null;

  return user;
}

// ২. ইউজার টোকেন পাওয়ার ফাংশন
export const getUserToken = async (): Promise<string | null> => {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });
  return sessionData?.session?.token || null;
};

// ৩. লগইন বাধ্যতামূলক: session নেই → signin, blocked → unauthorized
export const requireSession = async (): Promise<UserSession> => {
  const user = await getSessionUser();

  if (!user) {
    redirect("/auth/signin");
  }

  if (user.banned ?? user.isBlocked) {
    redirect("/unauthorized");
  }

  return user;
};

// ৪. রোল চেক: login নেই → signin, blocked বা রোল না মিললে → unauthorized
export const requireRole = async (
  allowedRole: "user" | "admin",
): Promise<UserSession> => {
  const user = await requireSession();

  if (user.role !== allowedRole) {
    redirect("/unauthorized");
  }

  return user;
};
