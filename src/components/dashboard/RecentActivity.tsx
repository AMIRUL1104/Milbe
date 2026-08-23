import { ActivityItemData } from "@/interface/dashboard/dashboard";
import RecentActivityItem from "./RecentActivityItem";

interface RecentActivityProps {
  activities: ActivityItemData[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-surface rounded-card border border-border-light shadow-sm">
      <div className="px-5 py-4 border-b border-border-light">
        <h2 className="text-base font-bold text-text-primary">Recent Activity</h2>
      </div>
      <ul className="divide-y divide-border-light">
        {activities.map((activity) => (
          <RecentActivityItem key={activity.id} activity={activity} />
        ))}
      </ul>
    </div>
  );
}