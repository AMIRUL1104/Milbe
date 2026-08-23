import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { QuickActionData } from "@/interface/dashboard/dashboard";

interface QuickActionCardProps {
  action: QuickActionData;
}

export default function QuickActionCard({ action }: QuickActionCardProps) {
  const Icon = action.icon;

  return (
    <Link
      href={action.href}
      className="group flex items-center gap-3 rounded-xl border border-border-light p-3.5 hover:border-primary hover:bg-primary-light transition-base"
    >
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary-light text-primary shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <span className="flex-1 text-sm font-semibold text-text-secondary">
        {action.label}
      </span>
      <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-base" />
    </Link>
  );
}