"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import BasicInfoSection from "./BasicInfoSection";
import ImageUpload from "./ImageUpload";
import BookListSection from "./BookListSection";
import LocationSection from "./LocationSection";
import ContactSection from "./ContactSection";
import DescriptionSection from "./DescriptionSection";
import SubmitButton from "./SubmitButton";
import { AddPostFormValues, addPostSchema } from "@/lib/validaions/add-post-schema";
import { BookItem } from "./post";
import { addNewPost } from "@/services/features/posts";

type AddPostFormInput = z.input<typeof addPostSchema>;

// NewPostPayload থেকে sellerId আর বাদ দেওয়া যাবে না কারণ সার্ভার এটি আশা করে
export type NewPostPayload = Omit<
  BookItem,
  "_id" | "publishedAt"
>;

const defaultValues: AddPostFormInput = {
  title: "",
  category: "",
  type: "sell",
  image: "",
  district: "",
  area: "",
  phone: "",
  messenger: "",
  whatsappOnly: false,
  description: "",
  books: [
    {
      bookId: "",
      publisherId: "",
      bookName: "",
      publisherName: "",
      image: null,
      condition: "good",
      price: null,
    },
  ],
};

// আপনার আগের স্ট্রাকচার অনুযায়ী buildPayload শুধুমাত্র values নিচ্ছে
function buildPayload(values: AddPostFormValues): NewPostPayload {
  return {
    sellerId: values.sellerId || "", // স্কিমাতে অপশনাল থাকায় এখানে ফলব্যাক দেওয়া হলো
    sellerName: values.sellerName || "", // স্কিমাতে অপশনাল থাকায় এখানে ফলব্যাক দেওয়া হলো;
    sellerEmail: values.sellerEmail || "", // স্কিমাতে অপশনাল থাকায় এখানে ফলব্যাক দেওয়া হলো;
    status: "available",
    acceptedRequestId: null,
    isDeleted: false,
    updatedAt: new Date().toISOString(),
    title: values.title,
    category: values.category,
    type: values.type,
    image: values.image,
    district: values.district,
    area: values.area,
    phone: values.phone,
    messenger: values.messenger ?? "",
    whatsappOnly: values.whatsappOnly,
    description: values.description ?? "",
    books: values.books.map((book) => ({
      bookId: book.bookId ?? "",
      publisherId: book.publisherId ?? "",
      bookName: book.bookName,
      publisherName: book.publisherName,
      image: book.image,
      condition: book.condition,
      price: book.price ?? 0,
    })),
  };
}

export default function AddPostForm({ user }: { user: { id: string; name: string; email: string } }) {
  const [isUploadPending, setIsUploadPending] = useState(false);

  const methods = useForm<AddPostFormInput, unknown, AddPostFormValues>({
    resolver: zodResolver(addPostSchema),
    defaultValues,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: AddPostFormValues) => {
    // আগের স্ট্রাকচার ঠিক রেখে values এর সাথে sellerId যুক্ত করা হলো
    const updatedValues = {
      ...values,
      sellerId: user.id,
      sellerName: user.name,
      sellerEmail: user.email,
    };

    try {
      const payload = buildPayload(updatedValues);
      const response = await addNewPost(payload as unknown as BookItem);

      if (response?.success) {
        toast.success("Post published successfully!");
        reset(defaultValues);
      } else {
        toast.error(response?.message ?? "Failed to publish post.");
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 max-w-2xl mx-auto"
        noValidate
      >
        <BasicInfoSection />
        <ImageUpload onUploadingChange={setIsUploadPending} />
        <BookListSection />
        <LocationSection />
        <ContactSection />
        <DescriptionSection />

        <SubmitButton
          isSubmitting={isSubmitting}
          isUploading={isUploadPending}
        />
      </form>
    </FormProvider>
  );
}


