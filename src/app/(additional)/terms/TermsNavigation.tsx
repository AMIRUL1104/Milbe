"use client";

import React, { useEffect, useState } from "react";

interface NavigationItem {
    id: string;
    label: string;
}

interface TermsNavigationProps {
    items: NavigationItem[];
}

export default function TermsNavigation({ items }: TermsNavigationProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;

            for (const item of items) {
                const element = document.getElementById(item.id);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;

                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveId(item.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [items]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <nav className="space-y-1">
            {items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl transition-all block ${activeId === item.id
                            ? "bg-[#35858E]/10 text-[#35858E] pl-6"
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                >
                    {item.label}
                </button>
            ))}
        </nav>
    );
}