"use client";

import type { ReactNode } from "react";

type SocialButtonProps = {
    icon: ReactNode;
    label: string;
    onClick?: () => void;
};

export default function SocialButton({ icon, label, onClick }: SocialButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full flex items-center justify-center gap-3 bg-surface border border-border hover:bg-background text-text-secondary font-semibold py-2.5 px-4 rounded-xl transition-base shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-primary-focus"
        >
            {icon}
            <span className="text-sm">{label}</span>
        </button>
    );
}