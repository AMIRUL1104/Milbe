"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Pencil, LogOut } from "lucide-react";
import { UpdateProfilePayload, UserProfile } from "@/interface/user/userProfile";
import { ProfileFormValues, profileSchema } from "@/lib/validations/profile-schema";
import { ProfileAvatar } from "./Profileavatar";
import { ProfileHeader } from "./Profileheader";
import { ProfileForm } from "./Profileform";
import { ProfileActions } from "./Profileactions";
import { ProfileInfo } from "./Profileinfo";
import { updateUserProfile } from "@/services/features/userProfile";
import { deletePendingImageAction } from "@/services/features/images/actions";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/Button";
import { useUnsavedChangesGuard } from "@/components/navigation/UnsavedChangesGuard";


interface ProfileClientProps {
    initialUser: UserProfile;
}

export function ProfileClient({ initialUser }: ProfileClientProps) {
    const [user, setUser] = useState<UserProfile>(initialUser);
    const [isEditing, setIsEditing] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [pendingAvatarAssetId, setPendingAvatarAssetId] = useState<string | null>(null);
    const pendingAvatarAssetIdRef = useRef<string | null>(null);
    const [isAvatarRemoved, setIsAvatarRemoved] = useState(false);
    const [isAvatarUploading, setIsAvatarUploading] = useState(false);
    const avatarUploadPendingRef = useRef(false);
    const router = useRouter();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            district: user.district,
            area: user.area,
        },
    });

    const handleAvatarUploadingChange = useCallback((pending: boolean) => {
        avatarUploadPendingRef.current = pending;
        setIsAvatarUploading(pending);
    }, []);

    const updatePendingAvatarAssetId = useCallback((assetId: string | null) => {
        setPendingAvatarAssetId(assetId);
    }, []);

    useEffect(() => {
        pendingAvatarAssetIdRef.current = pendingAvatarAssetId;
    }, [pendingAvatarAssetId]);

    const waitForProfileWork = useCallback(async () => {
        while (
            avatarUploadPendingRef.current ||
            form.formState.isSubmitting
        ) {
            await new Promise((resolve) => setTimeout(resolve, 50));
        }
    }, [form]);

    const cleanupPendingAvatar = useCallback(async () => {
        await waitForProfileWork();
        const assetId = pendingAvatarAssetIdRef.current;
        if (assetId) {
            await deletePendingImageAction(assetId);
        }
    }, [waitForProfileWork]);

    const sendPendingAvatarCleanup = useCallback(() => {
        if (
            avatarUploadPendingRef.current ||
            form.formState.isSubmitting ||
            !pendingAvatarAssetIdRef.current ||
            typeof navigator === "undefined" ||
            !navigator.sendBeacon
        ) {
            return;
        }

        const queued = navigator.sendBeacon(
            "/api/images/cleanup",
            new Blob([JSON.stringify({ assetIds: [pendingAvatarAssetIdRef.current] })], {
                type: "application/json",
            }),
        );
        if (!queued) {
            console.error("Could not queue pending profile image cleanup.");
        }
    }, [form]);

    const requestNavigation = useUnsavedChangesGuard({
        enabled:
            isEditing &&
            (form.formState.isDirty ||
                Boolean(pendingAvatarAssetId) ||
                isAvatarRemoved ||
                isAvatarUploading ||
                form.formState.isSubmitting),
        onLeave: cleanupPendingAvatar,
        onPageHide: sendPendingAvatarCleanup,
    });

    function enterEditMode() {
        form.reset({
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            district: user.district,
            area: user.area,
        });
        setPreviewUrl(null);
        updatePendingAvatarAssetId(null);
        setIsAvatarRemoved(false);
        setIsEditing(true);
    }

    async function cancelEdit() {
        try {
            await cleanupPendingAvatar();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? `ছবিটি মুছে ফেলা যায়নি; cleanup retry হবে। ${error.message}`
                    : "ছবিটি মুছে ফেলা যায়নি; cleanup retry হবে।",
            );
        }
        setIsEditing(false);
        setPreviewUrl(null);
        updatePendingAvatarAssetId(null);
        setIsAvatarRemoved(false);
        form.reset();
    }

    async function handleImageChange(url: string, assetId: string) {
        if (pendingAvatarAssetId && pendingAvatarAssetId !== assetId) {
            try {
                await deletePendingImageAction(pendingAvatarAssetId);
            } catch (error) {
                try {
                    await deletePendingImageAction(assetId);
                } catch (cleanupError) {
                    console.error(
                        "New profile image cleanup failed after replacing a pending image:",
                        cleanupError,
                    );
                }
                throw error;
            }
        }
        setPreviewUrl(url);
        updatePendingAvatarAssetId(assetId);
        setIsAvatarRemoved(false);
    }

    async function handleAvatarRemove() {
        if (pendingAvatarAssetId) {
            await deletePendingImageAction(pendingAvatarAssetId);
            updatePendingAvatarAssetId(null);
            setPreviewUrl(null);
            setIsAvatarRemoved(false);
            return;
        }
        setPreviewUrl(null);
        setIsAvatarRemoved(Boolean(user.avatarUrl));
    }

    async function onSubmit(values: ProfileFormValues) {
        // Build the payload so optional fields (phoneNumber / district / area)
        // are ALWAYS sent as trimmed strings. An empty string ("") tells the
        // backend to CLEAR the stored value; only an omitted key (undefined)
        // leaves a field untouched. Whitespace is trimmed first so "   " is
        // treated the same as an intentionally cleared (empty) field.
        const payload: UpdateProfilePayload = {
            fullName: values.fullName,
            phoneNumber: (values.phoneNumber ?? "").trim(),
            district: (values.district ?? "").trim(),
            area: (values.area ?? "").trim(),
            ...(pendingAvatarAssetId && previewUrl
                ? {
                    avatarUrl: previewUrl,
                    avatarAssetId: pendingAvatarAssetId,
                }
                : isAvatarRemoved
                    ? { avatarUrl: null, avatarAssetId: null }
                    : {}),
        };

        try {
            const res = await updateUserProfile(payload);
            toast.success(
                res.cleanupPending
                    ? "প্রোফাইল আপডেট হয়েছে; পুরোনো ছবির cleanup retry হবে।"
                    : "Profile updated successfully!",
            );
            setUser((prev) => ({
                ...prev,
                fullName: res.profile.fullName,
                phoneNumber: res.profile.phoneNumber,
                district: res.profile.district,
                area: res.profile.area,
                avatarUrl: res.profile.avatarUrl,
                avatarAssetId: res.profile.avatarAssetId,
            }));
            // Re-sync the form with the server state so a cleared field
            // shows the still-stored value instead of the cleared input.
            form.reset({
                fullName: res.profile.fullName,
                phoneNumber: res.profile.phoneNumber,
                district: res.profile.district,
                area: res.profile.area,
            });
            setIsEditing(false);
            setPreviewUrl(null);
            updatePendingAvatarAssetId(null);
            setIsAvatarRemoved(false);
            router.refresh();
        } catch {
            toast.error("Failed to update profile. Please try again.");
        }
    }

    const avatarNode = (
        <ProfileAvatar
            avatarUrl={user.avatarUrl}
            fullName={user.fullName}
            isEditing={isEditing}
            previewUrl={previewUrl}
            isRemoved={isAvatarRemoved}
            isUploading={isAvatarUploading}
            onUploadingChange={handleAvatarUploadingChange}
            onRemove={handleAvatarRemove}
            onImageChange={handleImageChange}
        />
    );

    async function handleSignOut() {
        requestNavigation(async () => {
            await signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/auth/signin");
                        router.refresh();
                    },
                },
            });
        });
    }

    if (isEditing) {
        return (
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
                noValidate
            >
                <ProfileHeader user={user} avatarSlot={avatarNode} />
                <ProfileForm form={form} email={user.email} />
                <ProfileActions
                    onCancel={cancelEdit}
                    isSubmitting={form.formState.isSubmitting}
                />
            </form>
        );
    }

    return (
        <div className="flex flex-col gap-5">
            <ProfileHeader user={user} avatarSlot={avatarNode} />
            <div className="flex justify-center gap-3 py-2">
                <Button variant="outline" size="sm" onClick={enterEditMode}>
                    <Pencil size={14} /> Edit Profile
                </Button>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                    <LogOut size={14} /> LogOut
                </Button>
            </div>
            <ProfileInfo user={user} />
        </div>
    );
}