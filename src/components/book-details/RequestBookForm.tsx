"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "react-toastify";
import type { BookRequest } from "@/interface/bookRequest/checkRequest";
import { RequestBookFormValues, requestBookSchema } from "@/lib/validaions/request-book-schema";
import { createBookRequest } from "@/services/server/action";

interface RequestBookFormProps {
  bookCoverUrl: string;
  sellerPhone: string;
  sellerMessenger?: string;
  postId: string;
  sellerId: string;
  requesterId?: string;
  postTitle: string;
  sellerName: string;
  defaultRequesterName?: string;
  defaultRequesterPhone?: string;
  requesterAvatarUrl?: string | null;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function RequestBookForm({
  bookCoverUrl,
  sellerPhone,
  sellerMessenger,
  postId,
  sellerId,
  requesterId,
  postTitle,
  sellerName,
  defaultRequesterName,
  defaultRequesterPhone,
  requesterAvatarUrl,
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
      requesterName: defaultRequesterName ?? "",
      phoneNumber: defaultRequesterPhone ?? "",
      message: "",
    },
  });

  const onSubmit = async (values: RequestBookFormValues) => {
    setIsSubmitting(true);

    try {
      if (!requesterId) {
        toast.error("Please sign in before sending a book request.");
        return;
      }

      const payload: BookRequest = {
        postId,
        postTitle,
        bookCoverUrl,
        sellerId,
        sellerName,
        sellerContact: {
          phone: sellerPhone,
          messenger: sellerMessenger,
        },
        requesterId,
        requesterName: values.requesterName,
        requesterAvatarUrl: requesterAvatarUrl ?? undefined,
        requesterContact: {
          phone: values.phoneNumber,
        },
        message: values.message?.trim() || undefined,
        status: "pending",
        requestDate: new Date(),
      };

      const response = await createBookRequest(payload);

      if (!response?.success) {
        throw new Error(response?.message || "Failed to send request.");
      }

      toast.success("Your request has been sent to the seller!");
      onSuccess();
    } catch (error) {
      console.error("Book request submission failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-4">
      <div>
        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
          Requester Name
        </label>
        <input
          type="text"
          {...register("requesterName")}
          className={`w-full text-text-primary mt-1 border rounded-input pl-4 pr-4 py-2.5 text-sm outline-none transition-base ${errors.requesterName
            ? "border-danger focus-visible:outline-danger"
            : "border-border focus:border-border-focus focus-visible:outline-primary-focus"
            }`}
          placeholder="Your full name"
        />
        {errors.requesterName && (
          <p className="text-xs font-medium text-danger mt-0.5">
            {errors.requesterName.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
          Phone Number
        </label>
        <input
          type="tel"
          {...register("phoneNumber")}
          className={`w-full text-text-primary mt-1 border rounded-input pl-4 pr-4 py-2.5 text-sm outline-none transition-base ${errors.phoneNumber
            ? "border-danger focus-visible:outline-danger"
            : "border-border focus:border-border-focus focus-visible:outline-primary-focus"
            }`}
          placeholder="e.g. 017XXXXXXXX"
        />
        {errors.phoneNumber && (
          <p className="text-xs font-medium text-danger mt-0.5">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
          Message{" "}
          <span className="normal-case font-medium text-text-muted">
            (optional)
          </span>
        </label>
        <textarea
          {...register("message")}
          rows={3}
          className="w-full text-text-primary mt-1 border border-border focus:border-border-focus rounded-input pl-4 pr-4 py-2.5 text-sm outline-none transition-base resize-none"
          placeholder="Add a note to the seller (optional)"
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="py-2.5 px-4 rounded-btn font-bold text-sm text-text-secondary border border-border hover:bg-background transition-colors cursor-pointer disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 py-2.5 px-4 rounded-btn font-bold text-sm text-text-inverse bg-primary hover:bg-primary-hover transition-colors cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          <span>Send Request</span>
        </button>
      </div>
    </form>
  );
}