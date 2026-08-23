import { ActivityItemData } from "@/interface/dashboard/dashboard";

interface RecentActivityItemProps {
  activity: ActivityItemData;
}

export default function RecentActivityItem({
  activity,
}: RecentActivityItemProps) {
  const Icon = activity.icon;

  return (
    <li className="flex items-start gap-3 px-5 py-4 hover:bg-background transition-base duration-150">
      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-warning-light text-warning-text shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary">
          {activity.title}
        </p>
        <p className="text-sm text-text-muted truncate">
          {activity.description}
        </p>
      </div>
      <span className="text-xs text-text-muted shrink-0 whitespace-nowrap">
        {activity.timestamp}
      </span>
    </li>
  );
}