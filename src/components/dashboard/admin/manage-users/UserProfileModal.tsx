"use client";

import { Calendar, Mail, MapPin, Phone, X } from "lucide-react";
import type { UserProfile } from "@/interface/user/userProfile";
import { UserAvatar } from "./UserAvatar";
import { UserRoleBadge } from "./UserRoleBadge";
import { UserStatusBadge } from "./UserStatusBadge";

interface UserProfileModalProps {
  user: UserProfile;
  onClose: () => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-border-light bg-background px-3.5 py-2.5">
      <span className="shrink-0 text-text-muted">{icon}</span>
      <div className="min-w-0">
        <dt className="text-xs font-semibold text-text-muted">{label}</dt>
        <dd className="truncate text-sm text-text-primary">
          {value || <span className="text-text-muted">—</span>}
        </dd>
      </div>
    </div>
  );
}

export function UserProfileModal({ user, onClose }: UserProfileModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-profile-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 mx-4 w-full max-w-md rounded-2xl border border-border-light bg-surface p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 cursor-pointer text-text-muted transition-colors hover:text-text-secondary"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-5 flex items-center gap-4">
          <UserAvatar name={user.fullName} image={user.avatarUrl} />
          <div className="min-w-0">
            <h2
              id="user-profile-modal-title"
              className="truncate text-lg font-bold text-text-primary"
            >
              {user.fullName}
            </h2>
            <p className="truncate text-sm text-text-muted">{user.email}</p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <UserRoleBadge role={user.role} />
          <UserStatusBadge banned={user.banned} />
        </div>

        <dl className="grid grid-cols-1 gap-3">
          <InfoRow
            icon={<Phone className="h-4 w-4" />}
            label="Phone"
            value={user.phoneNumber}
          />
          <InfoRow
            icon={<MapPin className="h-4 w-4" />}
            label="District"
            value={user.district}
          />
          <InfoRow
            icon={<MapPin className="h-4 w-4" />}
            label="Area"
            value={user.area}
          />
          <InfoRow
            icon={<Calendar className="h-4 w-4" />}
            label="Member Since"
            value={formatDate(user.memberSince)}
          />
          <InfoRow
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value={user.email}
          />
        </dl>
      </div>
    </div>
  );
}