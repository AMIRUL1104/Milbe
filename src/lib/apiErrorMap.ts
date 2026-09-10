import { ApiError } from "@/interface/apiResponse";

export function getFriendlyApiError(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.statusCode === 422) {
      return "সঠিক তথ্য প্রদান করুন। ক্ষতিকর তথ্য দেখুন।";
    }
    if (error.statusCode === 401) {
      return "লগইন করুন এবং আবার চেষ্টা করুন।";
    }
    if (error.statusCode === 403) {
      return "আপনার কাছে এই কাজের অনুমতি নেই।";
    }
    if (error.statusCode === 0) {
      return "নেটওয়ার্ক সমস্যা। ইন্টারনেট সংযোগ পরীক্ষা করুন।";
    }
    if (error.statusCode >= 500) {
      return "সার্ভার সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।";
    }
    return error.response?.message ?? "কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন।";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন।";
}
