import { UserProfile } from "@/interface/user/userProfile";
import React from "react";

interface ProfileHeaderProps {
    user: UserProfile;
    avatarSlot: React.ReactNode;
}

const ROLE_LABELS: Record<UserProfile["role"], string> = {
    user: "সাধারণ ব্যবহারকারী",
    admin: "অ্যাডমিন",
};

const ROLE_STYLES: Record<UserProfile["role"], string> = {
    user: "bg-primary-light text-primary",
    admin: "bg-accent-light text-accent-text",
};

function formatMemberSince(iso: string): string {
    return new Date(iso).toLocaleDateString("bn-BD", {
        month: "long",
        year: "numeric",
    });
}

export function ProfileHeader({ user, avatarSlot }: ProfileHeaderProps) {
    return (
        <div className="relative rounded-card overflow-hidden border border-border-light shadow-sm bg-surface">
            <div
                className="h-28 w-full"
                style={{
                    background:
                        "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 60%, var(--color-accent) 100%)",
                }}
            />

            <div className="px-6 pb-6">
                <div className="flex flex-wrap items-end gap-4 -mt-10 sm:-mt-14">
                    {avatarSlot}

                    <div className="mb-1 min-w-0 flex-1">
                        <h1 className="text-xl font-bold text-text-primary leading-tight truncate">
                            {user.fullName || "ব্যবহারকারী"}
                        </h1>
                        <p className="text-sm text-text-muted truncate">{user.email}</p>
                    </div>

                    <div className="mb-1 shrink-0 w-full sm:w-auto sm:ml-auto flex flex-col items-end gap-1">
                        <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${ROLE_STYLES[user.role]}`}
                        >
                            {ROLE_LABELS[user.role]}
                        </span>
                        <span className="text-xs text-text-muted">
                            সদস্য হয়েছেন {formatMemberSince(user.memberSince)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}