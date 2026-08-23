import { UserProfile } from "@/interface/user/userProfile";
import React from "react";

interface ProfileHeaderProps {
    user: UserProfile;
    avatarSlot: React.ReactNode;
}

const ROLE_LABELS: Record<UserProfile["role"], string> = {
    user: "Member",
    admin: "Administrator",
};

const ROLE_STYLES: Record<UserProfile["role"], string> = {
    user: "bg-primary-light text-primary",
    admin: "bg-accent-light text-accent-text",
};

function formatMemberSince(iso: string): string {
    return new Date(iso).toLocaleDateString("en-US", {
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
                <div className="flex items-end gap-4 -mt-14">
                    {avatarSlot}

                    <div className="mb-1 min-w-0">
                        <h1 className="text-xl font-bold text-text-primary leading-tight truncate">
                            {user.fullName}
                        </h1>
                        <p className="text-sm text-text-muted truncate">{user.email}</p>
                    </div>

                    <div className="ml-auto mb-1 shrink-0 flex flex-col items-end gap-1">
                        <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${ROLE_STYLES[user.role]}`}
                        >
                            {ROLE_LABELS[user.role]}
                        </span>
                        <span className="text-xs text-text-muted">
                            Member since {formatMemberSince(user.memberSince)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}