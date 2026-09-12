"use client";
import { useState, useEffect, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import BasicInfoSection from "./sections/BasicInfoSection";
import BookListSection from "./sections/BookListSection";
import LocationSection from "./sections/LocationSection";
import ContactSection from "./sections/ContactSection";
import DescriptionSection from "./sections/DescriptionSection";

import { NewPostPayload } from "@/interface/post/types";
import { addNewPost } from "@/services/features/posts";
import { getFriendlyApiError } from "@/lib/apiErrorMap";
import { AddPostFormValues, addPostSchema } from "@/lib/validations/add-post-schema";
import SubmitButton from "./sections/SubmitButton";

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
      bookId: book.bookId || undefined,
      publisherId: book.publisherId || undefined,
      bookName: book.bookName,
      publisherName: book.publisherName,
      image: book.image,
      condition: book.condition,
      price: book.price ?? 0,
      availableStatus: book.availableStatus,
    })),
  };
}

const STEP_SECTIONS = [
  "step-basic",
  "step-books",
  "step-location",
  "step-contact",
];
export default function AddPostForm() {
  const [isUploadPending, setIsUploadPending] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm<AddPostFormInput, unknown, AddPostFormValues>({
    resolver: zodResolver(addPostSchema),
    defaultValues,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
    watch,
  } = methods;

  const isDonate = watch("type") === "donate";
  const title = watch("title");
  const district = watch("district");
  const area = watch("area");
  const books = watch("books");

  const totalPrice = books?.reduce((sum, book) => {
    if (isDonate) return 0;
    return sum + (Number(book.price) || 0);
  }, 0) ?? 0;

  const meta = [area, district].filter(Boolean).join(", ") || "";

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

  // Handle step click - update active step and scroll
  const handleStepClick = useCallback((index: number) => {
    setActiveStep(index);
    const target = document.getElementById(STEP_SECTIONS[index]);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const sections = STEP_SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const progressFill = document.getElementById("progressFill");
    const chips = document.querySelectorAll(".step-chip");

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.findIndex((s) => s.id === entry.target.id);
            if (idx >= 0) {
              setActiveStep(idx);
              if (progressFill) {
                progressFill.style.width = `${((idx + 1) / sections.length) * 100}%`;
              }
              chips.forEach((chip, i) => {
                chip.classList.toggle("active", i === idx);
                chip.classList.toggle("done", i < idx);
              });
            }
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <TopBar activeStepIndex={activeStep} onStepClick={handleStepClick} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 px-4 py-5 lg:px-6 lg:py-8 lg:gap-7"
        noValidate
      >
        <div className="flex flex-col gap-4 min-w-0">
          <div className="px-0.5 pb-2">
            <h1 className="font-bn-serif text-2xl font-semibold text-text-primary mb-1">
              বই বিক্রি করুন বা দান করুন
            </h1>
            <p className="text-sm text-text-secondary">
              আপনার বইগুলো অন্য শিক্ষার্থীদের কাজে লাগুক — মাত্র কয়েকটি ধাপে
              পোস্ট তৈরি করুন।
            </p>
          </div>

          <FormProvider {...methods}>
            <BasicInfoSection onUploadingChange={setIsUploadPending} />
            <BookListSection />
            <LocationSection />
            <ContactSection />
            <DescriptionSection />
            <SubmitButton isSubmitting={isSubmitting} isUploading={isUploadPending} />
          </FormProvider>
        </div>

        <Sidebar
          imageUrl={methods.watch("image") || null}
          badge={isDonate ? "দান" : "বিক্রি"}
          isDonate={isDonate}
          title={title}
          meta={meta}
          bookCount={books?.length ?? 1}
          totalPrice={isDonate ? null : totalPrice}
          isSubmitting={isSubmitting}
          isUploading={isUploadPending}
        />
      </form>

    </>
  );
}
