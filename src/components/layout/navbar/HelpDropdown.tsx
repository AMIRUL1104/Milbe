"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, FileText, HelpCircle, Lock } from "lucide-react";

const HELP_LINKS = [
    { href: "/faq", label: "Help Center", icon: HelpCircle },
    { href: "/terms", label: "Terms & Conditions", icon: FileText },
    { href: "/privacy", label: "Privacy Policy", icon: Lock },
];

export function HelpDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleMouseDown = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-haspopup="true"
                className="flex items-center gap-1 hover:text-text-inverse transition-colors py-1 px-2 rounded-md hover:bg-white/10 focus:outline-none"
            >
                <span>Help</span>
                <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-surface border border-border rounded-btn shadow-lg py-2 z-50 text-text-primary text-xs sm:text-sm">
                    {HELP_LINKS.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 hover:bg-background transition-colors"
                        >
                            <Icon className="w-4 h-4 text-primary shrink-0" />
                            <span>{label}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}