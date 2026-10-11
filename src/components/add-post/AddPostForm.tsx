"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import BasicInfoSection from "./sections/BasicInfoSection";
import BookListSection from "./sections/BookListSection";
import LocationSection from "./sections/LocationSection";
import DescriptionSection from "./sections/DescriptionSection";

import { NewPostPayload, PostItem } from "@/interface/post/types";
import { addNewPost, updatePost } from "@/services/features/posts";
import { updateUserProfile } from "@/services/features/userProfile";
import { getFriendlyApiError } from "@/lib/apiErrorMap";
import { AddPostFormValues, addPostSchema } from "@/lib/validations/add-post-schema";
import { STEP_SECTIONS } from "@/lib/constant/post";
import SubmitButton from "./sections/SubmitButton";

type AddPostFormInput = z.input<typeof addPostSchema>;

interface AddPostProfile {
  fullName: string;
  phoneNumber: string;
  district: string;
  area: string;
}

const EMPTY_PROFILE: AddPostProfile = {
  fullName: "",
  phoneNumber: "",
  district: "",
  area: "",
};

// The save-to-profile checkbox should only appear when the profile is
// incomplete — i.e. at least one of district / area / phone is missing.
// Empty string, whitespace-only, null and undefined all count as "missing".
const hasValue = (value: string | null | undefined): boolean =>
  typeof value === "string" && value.trim() !== "";

const hasCompleteContactProfile = (profile: AddPostProfile): boolean =>
  hasValue(profile.district) &&
  hasValue(profile.area) &&
  hasValue(profile.phoneNumber);

function buildDefaultValues(profile: AddPostProfile): AddPostFormInput {
  return {
    title: "",
    category: "",
    type: "sell",
    image: "",
    totalPrice: null,
    overallCondition: "good",
    district: profile.district,
    area: profile.area,
    phone: profile.phoneNumber,
    messenger: "",
    whatsappOnly: false,
    description: "",
    saveToProfile: false,
    books: [],
  };
}

function buildPayload(values: AddPostFormValues): NewPostPayload {
  return {
    title: values.title,
    category: values.category,
    type: values.type,
    image: values.image,
    totalPrice: values.type === "donate" ? null : values.totalPrice,
    overallCondition: values.overallCondition,
    district: values.district,
    area: values.area,
    phone: values.phone,
    messenger: values.messenger ?? "",
    whatsappOnly: values.whatsappOnly,
    description: values.description ?? "",
    books: values.books
      // Drop entries where the user added a card but filled nothing.
      .filter(
        (book) =>
          book.bookName?.trim() ||
          book.author?.trim() ||
          book.publisherName?.trim(),
      )
      .map((book) => ({
        bookId: book.bookId || undefined,
        publisherId: book.publisherId || undefined,
        bookName: book.bookName?.trim(),
        author: book.author?.trim(),
        publisherName: book.publisherName?.trim(),
        availableStatus: book.availableStatus,
      })),
  };
}

interface AddPostFormProps {
  mode?: "create" | "edit";
  postId?: string;
  initialPost?: PostItem;
  initialProfile?: AddPostProfile;
}

/** Maps a fetched PostItem into the shape the add-post form expects. */
function postToForm(post: PostItem): AddPostFormValues {
  return {
    title: post.title,
    category: post.category ?? "",
    type: post.type,
    image: post.image,
    totalPrice: post.totalPrice,
    overallCondition: post.overallCondition,
    district: post.district,
    area: post.area,
    phone: post.phone ?? "",
    messenger: post.messenger ?? "",
    whatsappOnly: post.whatsappOnly ?? false,
    description: post.description ?? "",
    saveToProfile: false,
    books: post.books.map((book) => ({
      bookId: book.bookId ?? "",
      publisherId: book.publisherId ?? "",
      bookName: book.bookName ?? "",
      author: book.author ?? "",
      publisherName: book.publisherName ?? "",
      availableStatus: book.availableStatus ?? "available",
    })),
  };
}

export default function AddPostForm({
  mode = "create",
  postId,
  initialPost,
  initialProfile = EMPTY_PROFILE,
}: AddPostFormProps) {
  const isEditMode = mode === "edit";
  const [isUploadPending, setIsUploadPending] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [draftTimestamp, setDraftTimestamp] = useState<string | null>(null);

  // Save-to-profile is offered only when the profile is missing at least one
  // of district / area / phone (and never in edit mode).
  const showSaveToProfile = !isEditMode && !hasCompleteContactProfile(initialProfile);

  // Profile-prefilled defaults; memoized so the reference stays stable across
  // renders (RHF only reads defaultValues on mount/reset anyway).
  const defaultValues = useMemo(
    () => buildDefaultValues(initialProfile),
    [initialProfile],
  );

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
  const totalPrice = watch("totalPrice");
  const overallCondition = watch("overallCondition") ?? "good";

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

  // Submit Handler — fixed sequential order:
  //   1) post create/update first; on failure NOTHING else runs,
  //   2) success toast immediately,
  //   3) then (create mode + checkbox) a silent profile update —
  //      no rollback, no re-submit, no extra notification on failure.
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

      if (!response?.success) {
        toast.error(response?.message ?? "পোস্ট প্রকাশ করা যায়নি।");
        return;
      }

      // Post created — inform immediately, before the profile call.
      toast.success("পোস্ট সফলভাবে প্রকাশিত হয়েছে!");

      if (typeof window !== "undefined") {
        localStorage.removeItem("addPostDraft");
        localStorage.removeItem("addPostDraftTimestamp");
      }
      setDraftTimestamp(null);
      reset(buildDefaultValues(initialProfile));

      // Save-to-profile is create-mode only, and the checkbox only renders
      // when the profile is incomplete. The current form values are sent;
      // empty optional fields are omitted so they never overwrite an
      // existing profile value with "".
      if (!isEditMode && values.saveToProfile) {
        try {
          await updateUserProfile({
            fullName: initialProfile.fullName,
            ...(values.phone.trim() ? { phoneNumber: values.phone.trim() } : {}),
            ...(values.district.trim() ? { district: values.district.trim() } : {}),
            ...(values.area.trim() ? { area: values.area.trim() } : {}),
          });
        } catch {
          // Silent by design: the post stays; no toast, no rollback.
        }
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


          <FormProvider {...methods}>
            <BasicInfoSection onUploadingChange={setIsUploadPending} />
            {/* Step 2: location + contact in ONE section (ContactSection
                renders inside LocationSection so progress stays at 4 steps). */}
            <LocationSection showSaveToProfile={showSaveToProfile} />
            <DescriptionSection />
            <BookListSection isEditing={isEditMode} />
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
          bookCount={books?.length ?? 0}
          totalPrice={isDonate ? null : totalPrice ?? null}
          overallCondition={overallCondition}
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