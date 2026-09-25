"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, ListFilter, Check } from "lucide-react";

interface NavigationItem {
    id: string;
    label: string;
}

interface PrivacyNavigationProps {
    items: NavigationItem[];
}

export default function PrivacyNavigation({ items }: PrivacyNavigationProps) {
    const [activeId, setActiveId] = useState<string>("introduction");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 180;

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

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [items]);

    const scrollToSection = (id: string) => {
        setIsMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            const offset = 90;
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

    const activeItemLabel = items.find((item) => item.id === activeId)?.label || items[0].label;

    return (
        <div>
            {/* Mobile Dropdown Navigator (Visible on Mobile/Tablet < lg) */}
            <div className="lg:hidden mb-6 sticky top-20 z-30 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200/80 shadow-sm">
                <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl text-slate-800 font-semibold text-sm transition-all border border-slate-200/60"
                    aria-expanded={isMobileMenuOpen}
                >
                    <div className="flex items-center gap-2.5 truncate">
                        <ListFilter className="w-4 h-4 text-[#35858E] shrink-0" />
                        <span className="text-slate-500 font-normal text-xs uppercase tracking-wider">সূচিপত্র:</span>
                        <span className="truncate text-slate-900 font-bold">{activeItemLabel}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ${isMobileMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu Items */}
                {isMobileMenuOpen && (
                    <div className="mt-2 max-h-72 overflow-y-auto rounded-xl bg-white border border-slate-200 shadow-lg divide-y divide-slate-100 p-1">
                        {items.map((item) => {
                            const isActive = activeId === item.id;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => scrollToSection(item.id)}
                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-medium rounded-lg transition-colors text-left ${isActive
                                            ? "bg-[#35858E]/10 text-[#35858E] font-bold"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        }`}
                                >
                                    <span className="truncate">{item.label}</span>
                                    {isActive && <Check className="w-3.5 h-3.5 text-[#35858E] shrink-0 ml-2" />}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Desktop Navigation Links Sidebar */}
            <nav className="hidden lg:block space-y-1">
                {items.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-4 py-2.5 text-sm font-semibold rounded-xl transition-all block ${activeId === item.id
                                ? "bg-[#35858E]/10 text-[#35858E] pl-5 font-bold"
                                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </div>
    );
}