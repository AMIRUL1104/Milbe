import type { ReactNode } from "react";
import Header, { type HeaderVariant } from "@/components/layout/navbar/Header";
import { BottomNav } from "@/components/layout/navbar/BottomNav";
import Footer from "@/components/layout/Footer/Footer";

interface SiteShellProps {
  variant: HeaderVariant;
  children: ReactNode;
}

export function SiteShell({ variant, children }: SiteShellProps) {
  return (
    <>
      <Header variant={variant} />
      <div className="flex-1 pt-16">{children}</div>
      <BottomNav />
      <Footer />
    </>
  );
}