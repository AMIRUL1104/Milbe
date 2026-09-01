"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { UpdateProfilePayload, UserProfile } from "@/interface/user/userProfile";
import { ProfileFormValues, profileSchema } from "@/lib/validaions/profile-schema";
import { ProfileAvatar } from "./Profileavatar";
import { ProfileHeader } from "./Profileheader";
import { ProfileForm } from "./Profileform";
import { ProfileActions } from "./Profileactions";
import { ProfileInfo } from "./Profileinfo";
import { updateUserProfile } from "@/services/features/userProfile";


interface ProfileClientProps {
    initialUser: UserProfile;
}

export function ProfileClient({ initialUser }: ProfileClientProps) {
    const [user, setUser] = useState<UserProfile>(initialUser);
    const [isEditing, setIsEditing] = useState(false);
    const [pendingImageFile, setPendingImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            district: user.district,
            area: user.area,
        },
    });

    function enterEditMode() {
        form.reset({
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            district: user.district,
            area: user.area,
        });
        setPreviewUrl(null);
        setPendingImageFile(null);
        setIsEditing(true);
    }

    function cancelEdit() {
        setIsEditing(false);
        setPreviewUrl(null);
        setPendingImageFile(null);
        form.reset();
    }

    function handleImageChange(file: File, url: string) {
        setPendingImageFile(file);
        setPreviewUrl(url);
    }

    async function onSubmit(values: ProfileFormValues) {
        // --- Connect updateProfile() API here later ---
        // const payload: UpdateProfilePayload = { ...values, avatarUrl: uploadedUrl };
        // await updateProfile(payload);

        // Simulate network delay
        await new Promise((res) => setTimeout(res, 800));

        const payload: UpdateProfilePayload = {
            ...values,
            avatarUrl: previewUrl ?? user.avatarUrl,
        };

        try {
            const res = await updateUserProfile(payload);
            toast.success("Profile updated successfully!");
            setUser((prev) => ({
                ...prev,
                fullName: res.fullName,
                phoneNumber: res.phoneNumber,
                district: res.district,
                area: res.area,
                avatarUrl: res.avatarUrl ?? prev.avatarUrl,
            }));
            setIsEditing(false);
            setPreviewUrl(null);
            setPendingImageFile(null);
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
            onImageChange={handleImageChange}
            onEditClick={enterEditMode}
        />
    );

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
            <ProfileInfo user={user} />
        </div>
    );
}