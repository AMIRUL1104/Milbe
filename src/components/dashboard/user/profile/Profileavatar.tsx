"use client";

import React, { useRef } from "react";
import { Camera } from "lucide-react";
import Image from "next/image";
import { uploadImageToImgBB } from "@/components/add-post/imgbb";

interface ProfileAvatarProps {
    avatarUrl: string | null;
    fullName: string;
    isEditing: boolean;
    previewUrl: string | null;
    onImageChange: (file: File, previewUrl: string) => void;
    onEditClick: () => void;
}

function getInitials(name: string): string {
    return name
        .split(" ")
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
    onEditClick,
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
            <div className="w-28 h-28 rounded-full ring-4 ring-surface shadow-lg overflow-hidden bg-secondary flex items-center justify-center relative">
                {displayUrl ? (
                    <Image
                        loader={imgbbLoader}
                        fill
                        src={displayUrl as string}
                        alt={fullName}
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
            ) : (
                <button
                    type="button"
                    onClick={onEditClick}
                    className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-primary hover:bg-primary-hover text-text-inverse shadow-md flex items-center justify-center transition-base"
                    aria-label="Edit profile"
                >
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                </button>
            )}
        </div>
    );
}