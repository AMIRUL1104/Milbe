"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import NavigationLinks from "./NavigationLinks";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";
import MobileMenuButton from "./MobileMenuButton";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface MobileNavigationProps {
  isLoggedIn: boolean;
  role: "user" | "admin" | null;
}

export default function MobileNavigation({
  isLoggedIn,
  role,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function handleClose() {
    setIsOpen(false);
  }

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/signin");
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="md:hidden flex items-center gap-4">
      {isLoggedIn && <UserMenu role={role} />}

      <MobileMenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-overlay-dark z-40 backdrop-blur-xs transition-opacity"
            onClick={handleClose}
          />

          <div className="fixed inset-y-0 right-0 w-full max-w-[280px] bg-primary border-l border-white-10 z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-end p-6 pb-0">
              <MobileMenuButton isOpen={isOpen} onClick={handleClose} />
            </div>

            <nav className="flex flex-col gap-2 px-6 pt-6 flex-1 overflow-y-auto">
              <NavigationLinks
                isLoggedIn={isLoggedIn}
                role={role}
                isMobile={true}
                onLinkClick={handleClose}
              />
            </nav>

            <div className="px-6 pb-6 flex flex-col gap-4">
              <hr className="border-white-10" />

              {isLoggedIn && (
                <button
                  onClick={handleSignout}
                  className="flex items-center gap-2 w-full px-3 py-2.5 text-sm font-semibold text-text-inverse/90 hover:text-accent rounded-md transition-base group"
                >
                  <LogOut className="w-4 h-4 text-text-inverse/60 group-hover:text-accent transition-colors" />
                  Sign Out
                </button>
              )}

              {!isLoggedIn && <AuthButtons />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}