// src/components/layout/navbar/Navbar.tsx
import Logo from "./Logo";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import { getUserSession } from "@/services/core/session";

export default async function Navbar() {
  const user = await getUserSession();
  const isLoggedIn = !!user;
  const role: "user" | "admin" = user?.role || "user";

  // console.log(`[Navbar] Dark Theme Render - Logged In: ${isLoggedIn}, Role: ${role}`);

  
  return (
    <header className="sticky top-0 z-60 w-full bg-primary border-b border-white-10 shadow-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <Logo />

        <DesktopNavigation isLoggedIn={isLoggedIn} role={role} />

        <MobileNavigation isLoggedIn={isLoggedIn} role={role} />

      </div>
    </header>
  );
}