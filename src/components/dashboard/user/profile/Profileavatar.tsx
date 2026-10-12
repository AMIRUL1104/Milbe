"use client";

import React, { useRef } from "react";
import { Camera, Loader2, X } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useState } from "react";
import { uploadImageAction } from "@/services/features/images/actions";

const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_SIZE_BYTES = 4 * 1024 * 1024;

interface ProfileAvatarProps {
    avatarUrl: string | null;
    fullName: string;
    isEditing: boolean;
    previewUrl: string | null;
    isRemoved: boolean;
    isUploading: boolean;
    onUploadingChange: (isUploading: boolean) => void;
    onImageChange: (previewUrl: string, assetId: string) => Promise<void>;
    onRemove: () => Promise<void>;
}

function getInitials(name: string): string {
    const trimmed = (name || "").trim();
    if (!trimmed) return "U";
    return trimmed
        .split(/\s+/)
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

export function ProfileAvatar({
    avatarUrl,
    fullName,
    isEditing,
    previewUrl,
    isRemoved,
    isUploading,
    onUploadingChange,
    onImageChange,
    onRemove,
}: ProfileAvatarProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isRemoving, setIsRemoving] = useState(false);

    const displayUrl = previewUrl || (!isRemoved ? avatarUrl : null);

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!ACCEPTED_TYPES.has(file.type)) {
            toast.error("Only JPG, PNG, or WEBP images are allowed.");
            e.target.value = "";
            return;
        }
        if (file.size > MAX_SIZE_BYTES) {
            toast.error("Image must be 4 MB or smaller.");
            e.target.value = "";
            return;
        }

        onUploadingChange(true);
        try {
            const formData = new FormData();
            formData.append("image", file, file.name);
            const uploaded = await uploadImageAction(formData, "profile");
            await onImageChange(uploaded.secureUrl, uploaded.assetId);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Profile image upload failed.",
            );
        } finally {
            onUploadingChange(false);
            e.target.value = "";
        }
    }

    const imageLoader = ({ src }: { src: string }) => {
        return src;
    };

    return (
        <div className="relative inline-block">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full ring-4 ring-surface shadow-lg overflow-hidden bg-secondary flex items-center justify-center relative">
                {displayUrl ? (
                    <Image
                        loader={imageLoader}
                        fill
                        src={displayUrl}
                        alt={fullName || "ব্যবহারকারী"}
                        className="w-full h-full object-cover"
                        sizes="112px"
                    />
                ) : (
                    <span className="text-text-inverse text-3xl font-bold select-none">
                        {getInitials(fullName)}
                    </span>
                )}
            </div>

            {isEditing ? (
                <>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading || isRemoving}
                        className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-primary hover:bg-primary-hover text-text-inverse shadow-md flex items-center justify-center transition-base"
                        aria-label="Change profile photo"
                    >
                        {isUploading ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <Camera size={16} />
                        )}
                    </button>
                    {displayUrl ? (
                        <button
                            type="button"
                            onClick={async () => {
                                setIsRemoving(true);
                                try {
                                    await onRemove();
                                } catch (error) {
                                    toast.error(
                                        error instanceof Error
                                            ? error.message
                                            : "ছবিটি মুছে ফেলা যায়নি। আবার চেষ্টা করুন।",
                                    );
                                } finally {
                                    setIsRemoving(false);
                                }
                            }}
                            disabled={isUploading || isRemoving}
                            className="absolute top-0 right-0 w-8 h-8 rounded-full bg-danger hover:bg-danger/90 text-text-inverse shadow-md flex items-center justify-center transition-base disabled:opacity-60"
                            aria-label="Remove profile photo"
                        >
                            <X size={15} />
                        </button>
                    ) : null}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={isUploading || isRemoving}
                    />
                </>
            ) : null}
        </div>
    );
}