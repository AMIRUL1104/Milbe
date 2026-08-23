interface UserStatusBadgeProps {
  isBlocked: boolean;
}

export function UserStatusBadge({ isBlocked }: UserStatusBadgeProps) {
  if (isBlocked) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-danger-border bg-danger-light px-2.5 py-0.5 text-xs font-bold text-danger-text">
        <span className="h-1.5 w-1.5 rounded-full bg-danger" />
        Suspended
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-success-border bg-success-light px-2.5 py-0.5 text-xs font-bold text-success-text">
      <span className="h-1.5 w-1.5 rounded-full bg-success" />
      Active
    </span>
  );
}