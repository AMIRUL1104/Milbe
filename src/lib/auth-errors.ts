type AuthError = { code?: string; status?: number; message?: string };

// Better Auth-এর ইংরেজি error code -> বাংলা message
const MESSAGES: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "ইমেইল বা পাসওয়ার্ড ঠিক নেই। আবার চেষ্টা করুন।",
  USER_ALREADY_EXISTS: "এই ইমেইল দিয়ে আগেই একাউন্ট খোলা হয়েছে। লগইন করুন।",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    "এই ইমেইল দিয়ে আগেই একাউন্ট খোলা হয়েছে। লগইন করুন।",
  PASSWORD_TOO_SHORT: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।",
  PASSWORD_TOO_LONG: "পাসওয়ার্ড অনেক বড় হয়ে গেছে।",
  INVALID_EMAIL: "সঠিক ইমেইল ঠিকানা দিন।",
  INVALID_TOKEN:
    "লিংকটির মেয়াদ শেষ হয়ে গেছে অথবা এটি আগেই ব্যবহার করা হয়েছে।",
  // Google OAuth errors
  ACCOUNT_LINKING_FAILED:
    "এই ইমেইল দিয়ে আগেই একাউন্ট আছে। অন্য পদ্ধতি দিয়ে লগইন করুন।",
  SOCIAL_ACCOUNT_LINKING_FAILED:
    "সোশাল অ্যাকাউন্ট লিংক করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
  PROVIDER_NOT_FOUND:
    "গুগল প্রোভাইডার সক্রিয় নয়। সংক্রান্ত সমস্যা জানাতে যোগাযোগ করুন।",
  OAUTH_CALLBACK_ERROR:
    "গুগল লগইন সম্পন্ন হয়নি। পুনরায় চেষ্টা করুন অथবা ইমেইল/পাসওয়ার্ড দিয়ে লগইন করুন।",
};

export function getAuthErrorMessage(error: AuthError, fallback: string) {
  if (error.code && MESSAGES[error.code]) return MESSAGES[error.code];
  if (error.status === 429) {
    return "অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।";
  }
  if (error.status === 403) {
    return "অ্যাক্সেস নিষিদ্ধ। আবার চেষ্টা করুন অথবা সংক্রান্ত সমস্যা জানাতে যোগাযোগ করুন।";
  }
  return fallback;
}
