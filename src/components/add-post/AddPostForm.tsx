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

import { NewPostPayload, PostItem } from "@/interface/post/types";
import { addNewPost, updatePost } from "@/services/features/posts";
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

interface AddPostFormProps {
  mode?: "create" | "edit";
  postId?: string;
  initialPost?: PostItem;
}

/** Maps a fetched PostItem into the shape the add-post form expects. */
function postToForm(post: PostItem): AddPostFormValues {
  return {
    title: post.title,
    category: post.category ?? "",
    type: post.type,
    image: post.image,
    district: post.district,
    area: post.area,
    phone: post.phone,
    messenger: post.messenger ?? "",
    whatsappOnly: post.whatsappOnly ?? false,
    description: post.description ?? "",
    books: post.books.map((book) => ({
      bookId: book.bookId ?? "",
      publisherId: book.publisherId ?? "",
      bookName: book.bookName,
      publisherName: book.publisherName,
      image: book.image || null,
      condition: book.condition,
      price: book.price ?? null,
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

export default function AddPostForm({
  mode = "create",
  postId,
  initialPost,
}: AddPostFormProps) {
  const isEditMode = mode === "edit";
  const [isUploadPending, setIsUploadPending] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [draftTimestamp, setDraftTimestamp] = useState<string | null>(null);

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
    reset: resetForm,
  } = methods;

  const watchedValues = watch();
  const isDonate = watch("type") === "donate";
  const title = watch("title");
  const district = watch("district");
  const area = watch("area");
  const books = watch("books");

  const totalPrice =
    books?.reduce((sum, book) => {
      if (isDonate) return 0;
      return sum + (Number(book.price) || 0);
    }, 0) ?? 0;

  const meta = [area, district].filter(Boolean).join(", ") || "";

  // 1. Initial Load: edit mode → populate the form from the fetched post;
  //    create mode → restore the saved draft (existing behavior).
  useEffect(() => {
    if (isEditMode && initialPost) {
      reset(postToForm(initialPost));
      return;
    }

    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("addPostDraft");
    const savedTime = localStorage.getItem("addPostDraftTimestamp");

    if (savedTime) setDraftTimestamp(savedTime);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        resetForm((prev) => ({ ...prev, ...parsed }));
      } catch (err) {
        console.error("Draft parsing failed:", err);
        localStorage.removeItem("addPostDraft");
        localStorage.removeItem("addPostDraftTimestamp");
      }
    }
  }, [reset, resetForm, isEditMode, initialPost]);

  // 2. Auto Save Effect (create mode only — never for edits)
  useEffect(() => {
    if (isSubmitting || isEditMode || typeof window === "undefined") return;

    const timer = setTimeout(() => {
      try {
        const timestamp = new Date().toISOString();
        localStorage.setItem("addPostDraft", JSON.stringify(watchedValues));
        localStorage.setItem("addPostDraftTimestamp", timestamp);
        setDraftTimestamp(timestamp);
      } catch (err) {
        console.error("Draft saving failed:", err);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [watchedValues, isSubmitting, isEditMode]);

  // Submit Handler (edit mode → PATCH, create mode → POST)
  const onSubmit = async (values: AddPostFormValues) => {
    try {
      const payload = buildPayload(values);

      if (isEditMode && postId) {
        const response = await updatePost(postId, payload);

        if (response?.success) {
          toast.success("পোস্ট সফলভাবে আপডেট হয়েছে!");

          if (typeof window !== "undefined") {
            localStorage.removeItem("addPostDraft");
            localStorage.removeItem("addPostDraftTimestamp");
          }
          setDraftTimestamp(null);
          reset(values);
        } else {
          toast.error(response?.message ?? "পোস্ট আপডেট করা যায়নি।");
        }
        return;
      }

      const response = await addNewPost(payload);

      if (response?.success) {
        toast.success("পোস্ট সফলভাবে প্রকাশিত হয়েছে!");

        if (typeof window !== "undefined") {
          localStorage.removeItem("addPostDraft");
          localStorage.removeItem("addPostDraftTimestamp");
        }
        setDraftTimestamp(null);
        reset(defaultValues);
      } else {
        toast.error(response?.message ?? "পোস্ট প্রকাশ করা যায়নি।");
      }
    } catch (error) {
      toast.error(getFriendlyApiError(error));
    }
  };

  const handleStepClick = useCallback((index: number) => {
    setActiveStep(index);
    const target = document.getElementById(STEP_SECTIONS[index]);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Intersection Observer for Active Step Scrolling
  useEffect(() => {
    const sections = STEP_SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.findIndex((s) => s.id === entry.target.id);
            if (idx >= 0) {
              setActiveStep(idx);
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
      <TopBar
        activeStepIndex={activeStep}
        onStepClick={handleStepClick}
        draftTimestamp={draftTimestamp}
        isEditing={isEditMode}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="  max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 px-4 py-5 lg:px-6 lg:py-8 lg:gap-7"
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
            <BookListSection isEditing={isEditMode} />
            <LocationSection />
            <ContactSection />
            <DescriptionSection />
            <SubmitButton
              isSubmitting={isSubmitting}
              isUploading={isUploadPending}
              isEditing={isEditMode}
            />
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
          renderSubmitButton={() => (
            <SubmitButton
              isSubmitting={isSubmitting}
              isUploading={isUploadPending}
              isEditing={isEditMode}
            />
          )}
        />
      </form>
    </>
  );
}