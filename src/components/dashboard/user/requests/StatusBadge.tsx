import { CheckCircle2, Clock, XCircle } from "lucide-react";
import type { RequestStatus } from "@/interface/dashboard/request";

const STATUS_CONFIG: Record<
  RequestStatus,
  { label: string; className: string; icon: typeof Clock }
> = {
  pending: {
    label: "Pending",
    className: "bg-warning-light text-warning-text border-warning-border",
    icon: Clock,
  },
  accepted: {
    label: "Accepted",
    className: "bg-success-light text-success-text border-success-border",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Rejected",
    className: "bg-danger-light text-danger-text border-danger-border",
    icon: XCircle,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-background text-text-secondary border-border",
    icon: XCircle,
  },
};

interface StatusBadgeProps {
  status: RequestStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${config.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}