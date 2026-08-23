"use client";

import React, { useEffect, useState } from "react";

interface NavigationItem {
    id: string;
    label: string;
}

interface PrivacyNavigationProps {
    items: NavigationItem[];
}

export default function PrivacyNavigation({ items }: PrivacyNavigationProps) {
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
                    className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl transition-base block ${activeId === item.id
                            ? "bg-primary-light text-primary pl-6"
                            : "text-text-muted hover:text-text-primary hover:bg-background"
                        }`}
                >
                    {item.label}
                </button>
            ))}
        </nav>
    );
}