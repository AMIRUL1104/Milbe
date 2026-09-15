export const dynamic = "force-dynamic";
import type { ReactNode } from "react";

import SidebarClient from "@/components/dashboard/sidebar/SidebarClient";
import { adminNavItems, userNavItems } from "@/lib/dashboard/nav-config";
import { getUserSession } from "@/services/core/session";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await getUserSession();
  const role = session?.role === "admin" ? "admin" : "user";
  const navItems = role === "admin" ? adminNavItems : userNavItems;

  return (
    <div className="flex min-h-screen bg-[#F5F7F8]">
      <SidebarClient
        navItems={navItems}
        user={{
          name: session?.name ?? "Guest",
          email: session?.email ?? "",
          avatarUrl: session?.image ?? null,
          role,
        }}
      />

      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
