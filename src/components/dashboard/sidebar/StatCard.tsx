import { ArrowUp, ArrowDown } from "lucide-react";
import type { StatCardData } from "@/interface/dashboard/dashboard";

export default function StatCard({
  label,
  value,
  change,
  trend = "neutral",
  icon: Icon,
}: StatCardData) {
  return (
    <div className="bg-surface rounded-card border border-border-light p-5 shadow-sm hover:shadow-md transition-base">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-light text-primary">
          <Icon className="w-5 h-5" />
        </div>
        {change && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
              trend === "up"
                ? "bg-success-light text-success-text"
                : trend === "down"
                ? "bg-danger-light text-danger-text"
                : "bg-background text-text-muted"
            }`}
          >
            {trend === "up" && <ArrowUp className="w-3 h-3" />}
            {trend === "down" && <ArrowDown className="w-3 h-3" />}
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
      <p className="text-sm text-text-muted mt-1">{label}</p>
    </div>
  );
}