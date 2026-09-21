"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "react-toastify";
import {
  RequestBookFormValues,
  requestBookSchema,
} from "@/lib/validations/request-book-schema";
import { CreateBookRequestPayload } from "@/interface/bookRequest/createBookRequest";
import { createBookRequest } from "@/services/features/bookRequests";
import { getFriendlyApiError } from "@/lib/apiErrorMap";

interface RequestBookFormProps {
  postId: string;
  requesterId?: string;
  defaultRequesterPhone?: string;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function RequestBookForm({
  postId,
  requesterId,
  defaultRequesterPhone,
  onCancel,
  onSuccess,
}: RequestBookFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestBookFormValues>({
    resolver: zodResolver(requestBookSchema),
    defaultValues: {
      phoneNumber: defaultRequesterPhone ?? "",
      message: "",
    },
  });

  const onSubmit = async (values: RequestBookFormValues) => {
    if (!requesterId) {
      toast.error("লগইন করে রিকোয়েস্ট পাঠাতে হবে।");
      return;
    }

    setIsSubmitting(true);

    try {
      const message = values.message?.trim();
      const payload: CreateBookRequestPayload = {
        postId,
        requesterContact: {
          phone: values.phoneNumber.trim(),
        },
        ...(message ? { message } : {}),
      };

      const response = await createBookRequest(payload);

      if (!response?.success) {
        throw new Error(response?.message || "রিকোয়েস্ট পাঠানো যায়নি।");
      }

      toast.success("রিকোয়েস্ট পাঠানো হয়েছে। সেলার শীঘ্রই আপনার অনুরোধ দেখবেন।");
      onSuccess();
    } catch (error) {
      toast.error(getFriendlyApiError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
      {/* Scrollable Input Fields Area */}
      <div className="space-y-4 px-5 sm:px-6 py-4 flex-1 overflow-y-auto">
        {/* Phone Number Field */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            ফোন নম্বর <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            {...register("phoneNumber")}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 ${errors.phoneNumber
                ? "border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 bg-rose-50/30"
                : "border-slate-200 focus:border-[#35858E] focus:ring-2 focus:ring-[#35858E]/10 bg-white"
              }`}
            placeholder="যেমন: 017XXXXXXXX"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-xs font-medium text-rose-500">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Optional Message Field */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            মেসেজ{" "}
            <span className="font-normal text-slate-400 normal-case">
              (ঐচ্ছিক)
            </span>
          </label>
          <textarea
            {...register("message")}
            rows={3}
            className="w-full resize-none rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-[#35858E] focus:ring-2 focus:ring-[#35858E]/10 bg-white placeholder:text-slate-400"
            placeholder="সেলারের কাছে একটি ছোট বার্তা লিখুন..."
          />
        </div>
      </div>

      {/* Sticky Bottom Actions Container */}
      <div className="sticky bottom-0 left-0 right-0 z-20 flex items-center justify-end gap-3 px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-100 rounded-b-2xl sm:rounded-b-3xl">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-600 transition-colors hover:bg-white hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          বাতিল
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-xl bg-[#35858E] px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-all hover:bg-[#2c6e76] shadow-xs active:scale-98 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          <span>রিকোয়েস্ট পাঠান</span>
        </button>
      </div>
    </form>
  );
}