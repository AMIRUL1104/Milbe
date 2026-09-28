import Header from "@/components/layout/navbar/Header";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex-1 flex flex-col items-center bg-background px-4 py-8">
            <Header variant="default" />
            <div className="w-full max-w-md">{children}</div>
        </div>
    );
}