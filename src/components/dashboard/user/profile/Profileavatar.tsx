"use client";

import React, { useRef } from "react";
import { Camera } from "lucide-react";
import Image from "next/image";
import { uploadImageToImgBB } from "@/lib/utils/imgbb";

interface ProfileAvatarProps {
    avatarUrl: string | null;
    fullName: string;
    isEditing: boolean;
    previewUrl: string | null;
    onImageChange: (file: File, previewUrl: string) => void;
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
    onImageChange,
}: ProfileAvatarProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const displayUrl = previewUrl || avatarUrl;

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const res = await uploadImageToImgBB(file);
            if (res && res.url) {
                onImageChange(file, res.url);
            }
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    }

    const imgbbLoader = ({ src }: { src: string }) => {
        return src;
    };

    return (
        <div className="relative inline-block">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full ring-4 ring-surface shadow-lg overflow-hidden bg-secondary flex items-center justify-center relative">
                {displayUrl ? (
                    <Image
                        loader={imgbbLoader}
                        fill
                        src={displayUrl as string}
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
                        className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-primary hover:bg-primary-hover text-text-inverse shadow-md flex items-center justify-center transition-base"
                        aria-label="Change profile photo"
                    >
                        <Camera size={16} />
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </>
            ) : null}
        </div>
    );
}