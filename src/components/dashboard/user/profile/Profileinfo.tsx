import React from "react";
import { Mail, Phone, MapPin, Calendar, Shield, Home } from "lucide-react";
import { UserProfile } from "@/interface/user/userProfile";

interface ProfileInfoProps {
    user: UserProfile;
}

interface InfoFieldProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    locked?: boolean;
}

function InfoField({ icon, label, value, locked }: InfoFieldProps) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 text-primary">
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-0.5">
                    {label}
                    {locked && (
                        <span className="ml-1.5 text-[10px] font-semibold text-text-muted normal-case tracking-normal">
                            (অপরিবর্তনীয়)
                        </span>
                    )}
                </p>
                <p className="text-sm font-medium text-text-primary wrap-break-word">{value}</p>
            </div>
        </div>
    );
}

function formatMemberSince(iso: string): string {
    return new Date(iso).toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

const ROLE_DISPLAY: Record<UserProfile["role"], string> = {
    user: "সাধারণ ব্যবহারকারী",
    admin: "অ্যাডমিন",
};

export function ProfileInfo({ user }: ProfileInfoProps) {
    return (
        <div className="rounded-card border border-border-light shadow-sm bg-surface p-6">
            <h2 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-5">
                অ্যাকাউন্টের তথ্য
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InfoField
                    icon={<Mail size={15} />}
                    label="ইমেইল"
                    value={user.email}
                    locked
                />
                <InfoField
                    icon={<Phone size={15} />}
                    label="ফোন নম্বর"
                    value={user.phoneNumber}
                />
                <InfoField
                    icon={<MapPin size={15} />}
                    label="জেলা"
                    value={user.district}
                />
                <InfoField
                    icon={<Home size={15} />}
                    label="এলাকা"
                    value={user.area}
                />
                <InfoField
                    icon={<Calendar size={15} />}
                    label="সদস্য হয়েছেন"
                    value={formatMemberSince(user.memberSince)}
                />
                <InfoField
                    icon={<Shield size={15} />}
                    label="অ্যাকাউন্টের ধরন"
                    value={ROLE_DISPLAY[user.role]}
                />
            </div>
        </div>
    );
}