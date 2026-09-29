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
};

export function getAuthErrorMessage(error: AuthError, fallback: string) {
  if (error.code && MESSAGES[error.code]) return MESSAGES[error.code];
  if (error.status === 429) {
    return "অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।";
  }
  return fallback;
}
