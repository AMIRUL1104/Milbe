import { Users } from "lucide-react";

interface UsersStatsCardsProps {
  total: number;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  accent: string;
}

function StatCard({ icon, label, count, accent }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-card border border-border-light bg-surface p-5 shadow-sm">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-black text-text-primary">{count}</p>
        <p className="text-xs font-semibold text-text-muted">{label}</p>
      </div>
    </div>
  );
}

export function UsersStatsCards({ total }: UsersStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard
        icon={<Users className="h-5 w-5 text-primary" />}
        label="Total Users"
        count={total}
        accent="bg-primary-light"
      />
    </div>
  );
}