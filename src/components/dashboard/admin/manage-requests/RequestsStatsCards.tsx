import { Inbox } from "lucide-react";

interface RequestsStatsCardsProps {
  total: number;
}

export function RequestsStatsCards({ total }: RequestsStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="flex items-center gap-4 rounded-card border border-border-light bg-surface p-5 shadow-sm">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-light">
          <Inbox className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-2xl font-bold text-text-primary">
            {total.toLocaleString()}
          </p>
          <p className="text-sm text-text-muted">Total Requests</p>
        </div>
      </div>
    </div>
  );
}
