"use client";

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import { useForm, FormProvider, useWatch, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import BasicInfoSection from "./sections/BasicInfoSection";
import BookListSection from "./sections/BookListSection";
import LocationSection from "./sections/LocationSection";
import DescriptionSection from "./sections/DescriptionSection";

import {
  NewPostPayload,
  PostItem,
  UpdatePostPayload,
} from "@/interface/post/types";
import { addNewPost, updatePost } from "@/services/features/posts";
import { updateUserProfile } from "@/services/features/userProfile";
import { getFriendlyApiError } from "@/lib/apiErrorMap";
import {
  AddPostFormValues,
  addPostSchema,
  editPostSchema,
  postFormSchema,
} from "@/lib/validations/add-post-schema";
import { hasCompleteContactProfile } from "@/lib/utils/contact-profile";
import {
  STEP_SECTIONS,
  DEFAULT_DISTRICT,
  normalizeCategory,
  normalizeDistrict,
  getDistrictLabelBn,
} from "@/lib/constant/post";
import SubmitButton from "./sections/SubmitButton";
import { deletePendingImageAction } from "@/services/features/images/actions";
import { useUnsavedChangesGuard } from "@/components/navigation/UnsavedChangesGuard";

type AddPostFormInput = z.input<typeof postFormSchema> & {
  images: { url: string; assetId: string }[];
};

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

const DRAFT_TIMESTAMP_EVENT = "milbe:add-post-draft-timestamp";

function subscribeToDraftTimestamp(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(DRAFT_TIMESTAMP_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(DRAFT_TIMESTAMP_EVENT, onChange);
  };
}

function getDraftTimestamp() {
  return localStorage.getItem("addPostDraftTimestamp");
}

function clearDraftTimestamp() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("addPostDraftTimestamp");
  window.dispatchEvent(new Event(DRAFT_TIMESTAMP_EVENT));
}

function buildDefaultValues(profile: AddPostProfile): AddPostFormInput {
  return {
    title: "",
    category: "",
    type: "sell",
    images: [],
    image: "",
    imageAssetId: null,
    totalPrice: null,
    overallCondition: "good",
    district: profile.district
      ? normalizeDistrict(profile.district) ?? profile.district
      : DEFAULT_DISTRICT,
    area: profile.area,
    phone: profile.phoneNumber,
    messenger: "",
    whatsappOnly: false,
    description: "",
    saveToProfile: false,
    books: [],
  };
}

function buildPayload(values: AddPostFormValues): UpdatePostPayload {
  // images[] is primary (locked to 1); legacy mirrors auto-derived for back-compat.
  const images = (values.images ?? []).slice(0, 1).map((img) => ({
    url: img.url,
    assetId: img.assetId,
  }));
  const cover = images[0] ?? null;
  return {
    title: values.title,
    category: values.category,
    type: values.type,
    images,
    image: cover?.url ?? null,
    imageAssetId: cover?.assetId ?? null,
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
  const coverUrl = post.images?.[0]?.url ?? post.image ?? "";
  const coverAssetId = post.images?.[0]?.assetId ?? post.imageAssetId ?? null;
  const images =
    coverUrl && coverAssetId ? [{ url: coverUrl, assetId: coverAssetId }] : [];
  return {
    title: post.title,
    // Legacy taxonomy values stay as-is (edit schema accepts them); canonical
    // ones normalize (case/alias) so saved data converges on save.
    category: normalizeCategory(post.category) ?? post.category ?? "",
    type: post.type,
    images,
    image: coverUrl,
    imageAssetId: coverAssetId,
    totalPrice: post.totalPrice,
    overallCondition: post.overallCondition,
    district: normalizeDistrict(post.district) ?? post.district,
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
  const [savedImageAssetId, setSavedImageAssetId] = useState<string | null>(
    isEditMode
      ? (initialPost?.images?.[0]?.assetId ?? initialPost?.imageAssetId ?? null)
      : null,
  );
  const savedImageAssetIdRef = useRef(savedImageAssetId);
  const [activeStep, setActiveStep] = useState(0);
  const storedDraftTimestamp = useSyncExternalStore(
    subscribeToDraftTimestamp,
    getDraftTimestamp,
    () => null,
  );
  const draftTimestamp = isEditMode ? null : storedDraftTimestamp;

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
    // Create/edit schemas differ only in images optionality; unify the
    // resolver type so the conditional schema compiles.
    resolver: zodResolver(
      isEditMode ? editPostSchema : addPostSchema,
    ) as unknown as Resolver<AddPostFormInput, unknown, AddPostFormValues>,
    defaultValues,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
    reset: resetForm,
  } = methods;
  const uploadPendingRef = useRef(false);

  const handleUploadPendingChange = useCallback((pending: boolean) => {
    uploadPendingRef.current = pending;
    setIsUploadPending(pending);
  }, []);

  const waitForUpload = useCallback(async () => {
    while (
      uploadPendingRef.current ||
      methods.formState.isSubmitting
    ) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }, [methods]);

  const cleanupPendingImage = useCallback(async () => {
    await waitForUpload();
    const assetId =
      methods.getValues("images")?.[0]?.assetId ??
      methods.getValues("imageAssetId");
    if (assetId && assetId !== savedImageAssetIdRef.current) {
      await deletePendingImageAction(assetId);
    }

    if (!isEditMode && typeof window !== "undefined") {
      const savedDraft = localStorage.getItem("addPostDraft");
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);
          if (draft && typeof draft === "object") {
            localStorage.setItem(
              "addPostDraft",
              JSON.stringify({ ...draft, images: [], image: "", imageAssetId: null }),
            );
          }
        } catch (error) {
          console.error("Draft image cleanup failed.", error);
          localStorage.removeItem("addPostDraft");
          clearDraftTimestamp();
        }
      }
    }
  }, [isEditMode, methods, waitForUpload]);

  const sendPendingImageCleanup = useCallback(() => {
    if (
      uploadPendingRef.current ||
      methods.formState.isSubmitting ||
      typeof navigator === "undefined" ||
      !navigator.sendBeacon
    ) {
      return;
    }
    const assetId =
      methods.getValues("images")?.[0]?.assetId ??
      methods.getValues("imageAssetId");
    if (!assetId || assetId === savedImageAssetIdRef.current) return;

    const queued = navigator.sendBeacon(
      "/api/images/cleanup",
      new Blob([JSON.stringify({ assetIds: [assetId] })], {
        type: "application/json",
      }),
    );
    if (!queued) {
      console.error("Could not queue pending post image cleanup.");
    }
  }, [methods]);

  useUnsavedChangesGuard({
    enabled:
      isDirty ||
      isUploadPending ||
      isSubmitting,
    onLeave: cleanupPendingImage,
    onPageHide: sendPendingImageCleanup,
  });

  const watchedValues = useWatch({ control: methods.control });
  const isDonate = watchedValues.type === "donate";
  const title = watchedValues.title;
  const district = watchedValues.district;
  const area = watchedValues.area;
  const books = watchedValues.books;
  const totalPrice = watchedValues.totalPrice;
  const overallCondition = watchedValues.overallCondition ?? "good";

  const meta =
    [area, getDistrictLabelBn(district) || district].filter(Boolean).join(", ") ||
    "";

  // 1. Initial Load: edit mode → populate the form from the fetched post;
  //    create mode → restore the saved draft (existing behavior).
  useEffect(() => {
    if (isEditMode && initialPost) {
      reset(postToForm(initialPost));
      return;
    }

    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("addPostDraft");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        resetForm((prev) => ({ ...prev, ...parsed }));
      } catch (err) {
        console.error("Draft parsing failed:", err);
        localStorage.removeItem("addPostDraft");
        clearDraftTimestamp();
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
        window.dispatchEvent(new Event(DRAFT_TIMESTAMP_EVENT));
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
          const nextSavedImageAssetId =
            response.data?.imageAssetId ?? null;
          savedImageAssetIdRef.current = nextSavedImageAssetId;
          setSavedImageAssetId(nextSavedImageAssetId);
          toast.success(
            response.meta?.cleanupPending
              ? "পোস্ট আপডেট হয়েছে; পুরোনো ছবির storage cleanup retry হবে।"
              : "পোস্ট সফলভাবে আপডেট হয়েছে!",
          );

          if (typeof window !== "undefined") {
            localStorage.removeItem("addPostDraft");
            clearDraftTimestamp();
          }
          reset(values);
        } else {
          toast.error(response?.message ?? "পোস্ট আপডেট করা যায়নি।");
        }
        return;
      }

      const image = payload.image;
      const imageAssetId = payload.imageAssetId;
      if (!image || !imageAssetId) {
        toast.error("পোস্টের একটি ছবি দিন।");
        return;
      }
      const response = await addNewPost({
        ...payload,
        image,
        imageAssetId,
      } satisfies NewPostPayload);

      if (!response?.success) {
        toast.error(response?.message ?? "পোস্ট প্রকাশ করা যায়নি।");
        return;
      }

      // Post created — inform immediately, before the profile call.
      toast.success("পোস্ট সফলভাবে প্রকাশিত হয়েছে!");

      if (typeof window !== "undefined") {
        localStorage.removeItem("addPostDraft");
        clearDraftTimestamp();
      }
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
        onSubmit={(event) => {
          void handleSubmit(onSubmit)(event);
        }}
        className="  max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 px-4 py-5 lg:px-6 lg:py-8 lg:gap-7"
        noValidate
      >
        <div className="flex flex-col gap-4 min-w-0">


          <FormProvider {...methods}>
            <BasicInfoSection
              onUploadingChange={handleUploadPendingChange}
              initialImageAssetId={isEditMode ? savedImageAssetId : null}
            />
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
          imageUrl={watchedValues.images?.[0]?.url || watchedValues.image || null}
          badge={isDonate ? "দান" : "বিক্রি"}
          isDonate={isDonate}
          title={title ?? ""}
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