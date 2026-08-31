import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserSession } from "@/interface/user/userSession";


// ১. ইউজার সেশন পাওয়ার ফাংশন
export async function getUserSession(): Promise<UserSession | null> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // সেশন বা ইউজার না থাকলে null রিটার্ন করবে
  if (!session || !session.user) {
    return null;
  }

  // টাইপ কাস্টিং করে সঠিক স্ট্রাকচার রিটার্ন
  return session.user as UserSession;
}

// ২. ইউজার টোকেন পাওয়ার ফাংশন
export const getUserToken = async (): Promise<string | null> => {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });
  return sessionData?.session?.token || null;
};

// ৩. রোল চেক করার ফাংশন (টাইপ ফিক্সড)
export const requireRole = async (allowedRole: "user" | "admin") => {
  const user = await getUserSession();

  // যদি ইউজার লগইন করা না থাকে অথবা রোল না মিলে, তবে রিডাইরেক্ট হবে
  if (!user || user.role !== allowedRole) {
    return redirect("/unauthorized");
  }

  return user; // রোল মিললে ইউজার অবজেক্ট রিটার্ন করতে পারেন
};
