export const dynamic = "force-dynamic";
import type { ReactNode } from "react";

import Header from "@/components/layout/navbar/Header";
import SidebarClient from "@/components/dashboard/sidebar/SidebarClient";
import { adminNavItems, userNavItems } from "@/lib/dashboard/nav-config";
import { requireSession } from "@/services/core/session";
import { BottomNav } from "@/components/layout/navbar/BottomNav";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await requireSession();
  const role = session?.role === "admin" ? "admin" : "user";
  const navItems = role === "admin" ? adminNavItems : userNavItems;

  return (
    <>
      <Header variant="default" />
      <div className="flex min-h-screen bg-[#F5F7F8] pt-16">
        {/* <SidebarClient
          navItems={navItems}
          user={{
            name: session?.name ?? "Guest",
            email: session?.email ?? "",
            avatarUrl: session?.image ?? null,
            role,
          }}
        /> */}
        <main className="flex-1 min-w-0 max-sm:pb-20 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
      <BottomNav />
    </>
  );
}