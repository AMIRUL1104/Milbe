import type { ReactNode } from "react";

type StatusViewProps = {
    icon: ReactNode;
    tone?: "primary" | "danger";
    title: string;
    description: ReactNode;
    children?: ReactNode;
};

export default function StatusView({
    icon,
    tone = "primary",
    title,
    description,
    children,
}: StatusViewProps) {
    return (
        <div className="w-full flex flex-col items-center gap-5 text-center" aria-live="polite">
            <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${tone === "danger" ? "bg-danger/10 text-danger" : "bg-primary/10 text-primary"
                    }`}
            >
                {icon}
            </div>
            <div className="flex flex-col gap-1.5">
                <h1 className="text-2xl font-black text-text-primary tracking-tight">{title}</h1>
                <p className="text-sm text-text-muted leading-relaxed">{description}</p>
            </div>
            {children && <div className="w-full flex flex-col gap-3 text-left">{children}</div>}
        </div>
    );
}