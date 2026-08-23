import type { UserRole } from "@/interface/dashboard/manageUsers";

interface UserRoleBadgeProps {
  role: UserRole;
}

const ROLE_STYLES: Record<UserRole, string> = {
  admin: "bg-primary-light text-primary border border-primary/20",
  user: "bg-background text-text-secondary border border-border",
};

const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Admin",
  user: "User",
};

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${ROLE_STYLES[role]}`}
    >
      {ROLE_LABELS[role]}
    </span>
  );
}