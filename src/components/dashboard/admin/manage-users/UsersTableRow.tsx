import type { UserProfile } from "@/interface/user/userProfile";
import { UserAvatar } from "./UserAvatar";
import { UserRoleBadge } from "./UserRoleBadge";
import { UserStatusBadge } from "./UserStatusBadge";
import { UserActionsMenu } from "./UserActionsMenu";

interface UsersTableRowProps {
  user: UserProfile;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function UsersTableRow({ user }: UsersTableRowProps) {
  return (
    <tr className="border-b border-border-light transition-colors hover:bg-background/60">
      <td className="py-3.5 pl-5 pr-3">
        <UserAvatar name={user.fullName} image={user.avatarUrl} />
      </td>

      <td className="px-3 py-3.5">
        <span className="text-sm font-semibold text-text-primary">
          {user.fullName}
        </span>
      </td>

      <td className="px-3 py-3.5">
        <span className="text-sm text-text-muted">{user.email}</span>
      </td>

      <td className="px-3 py-3.5">
        <UserRoleBadge role={user.role} />
      </td>

      <td className="px-3 py-3.5">
        <UserStatusBadge isBlocked={false} />
      </td>

      <td className="px-3 py-3.5">
        <span className="text-sm text-text-muted">
          {formatDate(user.memberSince)}
        </span>
      </td>

      <td className="py-3.5 pl-3 pr-5 text-right">
        <UserActionsMenu user={user} />
      </td>
    </tr>
  );
}