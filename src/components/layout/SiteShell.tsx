import type { ReactNode } from "react";
import Header, { type HeaderVariant, type HeaderInitialUser } from "@/components/layout/navbar/Header";
import { BottomNav } from "@/components/layout/navbar/BottomNav";
import Footer from "@/components/layout/Footer/Footer";
import { getUserSession } from "@/services/core/session";

interface SiteShellProps {
  variant: HeaderVariant;
  children: ReactNode;
}

export async function SiteShell({ variant, children }: SiteShellProps) {
  // Server-side session resolution (cached by React.cache() - zero extra DB call)
  const session = await getUserSession();

  const initialUser: HeaderInitialUser = session
    ? {
        id: session.id,
        email: session.email,
        name: session.name,
        image: session.image,
        role: session.role,
      }
    : null;

  return (
    <>
      <Header variant={variant} initialUser={initialUser} />
      <div className="flex-1 pt-16">{children}</div>
      <BottomNav initialUser={initialUser} />
      <Footer />
    </>
  );
}