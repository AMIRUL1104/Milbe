import { Calendar } from "lucide-react";
import type { UserProfile } from "@/interface/user/userProfile";
import { UserAvatar } from "./UserAvatar";
import { UserRoleBadge } from "./UserRoleBadge";
import { UserStatusBadge } from "./UserStatusBadge";
import { UserActionsMenu } from "./UserActionsMenu";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function UserMobileCard({ user }: UserMobileCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-card border border-border-light bg-surface p-4 shadow-sm">
      <UserAvatar name={user.fullName} image={user.avatarUrl} />

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-bold text-text-primary">{user.fullName}</p>
            <p className="truncate text-xs text-text-muted">{user.email}</p>
          </div>
          <UserActionsMenu user={user} />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <UserRoleBadge role={user.role} />
          <UserStatusBadge isBlocked={false} />
        </div>

        <span className="flex items-center gap-1 text-xs text-text-muted">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(user.memberSince)}
        </span>
      </div>
    </div>
  );
}

interface UserMobileCardProps {
  user: UserProfile;
}