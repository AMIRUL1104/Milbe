import { QuickActionData } from "@/interface/dashboard/dashboard";
import QuickActionCard from "./QuickActionCard";

interface QuickActionsProps {
  actions: QuickActionData[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="bg-surface rounded-card border border-border-light shadow-sm p-5">
      <h2 className="text-base font-bold text-text-primary mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action) => (
          <QuickActionCard key={action.label} action={action} />
        ))}
      </div>
    </div>
  );
}