"use client";

import type { ReactNode } from "react";

type SocialButtonProps = {
    icon: ReactNode;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
};

export default function SocialButton({ icon, label, onClick, disabled }: SocialButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="w-full flex items-center justify-center gap-3 bg-surface border border-border hover:bg-background text-text-secondary font-semibold py-2.5 px-4 rounded-xl transition-base shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-primary-focus disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {icon}
            <span className="text-sm">{label}</span>
        </button>
    );
}