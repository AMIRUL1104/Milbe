import { LogOut } from "lucide-react";
import type { DashboardUser } from "@/interface/dashboard/dashboard";

interface SidebarProfileProps {
  user: DashboardUser;
  isCollapsed: boolean;
}

export default function SidebarProfile({
  user,
  isCollapsed,
}: SidebarProfileProps) {
  const initials =
    user.name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?";

  return (
    <div
      className={`flex items-center gap-3 rounded-xl p-2 hover:bg-background transition-base cursor-pointer ${
        isCollapsed ? "justify-center" : ""
      }`}
      title={isCollapsed ? user.name : undefined}
    >
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary text-text-inverse text-xs font-bold shrink-0">
        {initials}
      </div>
      {!isCollapsed && (
        <>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-primary truncate">
              {user.name}
            </p>
            <p className="text-xs text-text-muted truncate capitalize">
              {user.role}
            </p>
          </div>
          <LogOut className="w-4 h-4 text-text-muted shrink-0" />
        </>
      )}
    </div>
  );
}