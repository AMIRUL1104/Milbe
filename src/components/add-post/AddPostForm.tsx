"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import BasicInfoSection from "./sections/BasicInfoSection";
import ImageUpload from "./sections/ImageUpload";
import BookListSection from "./sections/BookListSection";
import LocationSection from "./sections/LocationSection";
import ContactSection from "./sections/ContactSection";
import DescriptionSection from "./sections/DescriptionSection";
import SubmitButton from "./sections/SubmitButton";
import { NewPostPayload } from "@/interface/post/types";
import { addNewPost } from "@/services/features/posts";
import { getFriendlyApiError } from "@/lib/apiErrorMap";
import { AddPostFormValues, addPostSchema } from "@/lib/validations/add-post-schema";

type AddPostFormInput = z.input<typeof addPostSchema>;

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

// Build a clean payload that matches the backend API contract.
function buildPayload(values: AddPostFormValues): NewPostPayload {
  return {
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
      availableStatus: book.availableStatus,
    })),
  };
}

export default function AddPostForm() {
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
    try {
      const payload = buildPayload(values);
      const response = await addNewPost(payload);

      if (response?.success) {
        toast.success("পোস্ট সফলভাবে প্রকাশিত হয়েছে!");
        reset(defaultValues);
      } else {
        toast.error(response?.message ?? "পোস্ট প্রকাশ করা যায়নি।");
      }
    } catch (error) {
      toast.error(getFriendlyApiError(error));
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


