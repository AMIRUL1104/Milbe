"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
    Search,
    ChevronDown,
    HelpCircle,
    ShoppingBag,
    Tag,
    Send,
    User,
    ShieldCheck,
    BookOpen
} from "lucide-react";

// FAQ Types
type FAQCategory = 'General' | 'Buying' | 'Selling' | 'Requests' | 'Account' | 'Safety';

interface FAQItem {
    id: string;
    category: FAQCategory;
    question: string;
    answer: string;
}

const FAQ_DATA: FAQItem[] = [
    {
        id: "1",
        category: "General",
        question: "What is BookBridge?",
        answer: "BookBridge is a dedicated peer-to-peer marketplace designed specifically for students to buy, sell, exchange, or donate used academic books. Our primary goal is to make educational materials more affordable and accessible while promoting a sustainable learning lifecycle.",
    },
    {
        id: "2",
        category: "General",
        question: "Is BookBridge free to use?",
        answer: "Yes, using BookBridge is completely free. There are no registration fees, listing charges, or hidden transaction success fees. If a book is listed for sale, the financial transaction happens directly between the buyer and the seller during their offline meetup.",
    },
    {
        id: "3",
        category: "General",
        question: "Who can use BookBridge?",
        answer: "While anyone looking for academic literature can browse the platform, BookBridge is meticulously engineered and optimized for school, college, and university students across Bangladesh to optimize their textbook management.",
    },
    {
        id: "4",
        category: "Buying",
        question: "How can I find a book?",
        answer: "You can find your required books instantly by typing the book title, author name, or subject into our dynamic search bar. You can also filter results by category, physical district location, and specific institutional tags.",
    },
    {
        id: "5",
        category: "Buying",
        question: "Can I buy books from another district?",
        answer: "Yes. Although BookBridge is optimized for secure, face-to-face on-campus handovers, you can contact the book owner via their accepted details and mutually agree on utilizing reliable courier services at your own discretion.",
    },
    {
        id: "6",
        category: "Buying",
        question: "How do I contact the seller?",
        answer: "To ensure user safety and prevent spam, contact details are kept secure. Once you click 'Send Request' on a book post and the respective owner accepts your request, the direct communication channels will be unlocked instantly.",
    },
    {
        id: "7",
        category: "Selling",
        question: "How do I post a book?",
        answer: "Simply navigate to the 'Post a Book' dashboard, upload a clear photo of your textbook, fill in details like the edition, category, and current physical condition, specify whether you want to Sell or Donate, and publish.",
    },
    {
        id: "8",
        category: "Selling",
        question: "Can I donate books instead of selling them?",
        answer: "Absolutely! When filling out the book creation form, you can explicitly set the post type to 'Donate'. These books will be labeled with a distinct donation tag, making them visible to students in financial need.",
    },
    {
        id: "9",
        category: "Selling",
        question: "Can I edit my post later?",
        answer: "Yes. You have complete ownership over your listings. You can update the pricing, description, availability status, or remove the post entirely at any point directly from your personal dashboard workflow.",
    },
    {
        id: "10",
        category: "Requests",
        question: "How do I request a book?",
        answer: "When browsing any book listing, click the prominent 'Request Book' trigger. The system will automatically notify the owner about your interest, allowing them to review your profile and accept the exchange routing.",
    },
    {
        id: "11",
        category: "Requests",
        question: "Can I send multiple requests?",
        answer: "Yes, you can confidently request multiple different academic books from various owners simultaneously based on your current semester or curriculum guidelines.",
    },
    {
        id: "12",
        category: "Requests",
        question: "Can I request my own post?",
        answer: "No. The system algorithm explicitly prevents users from submitting requests on their own listings to maintain data integrity and eliminate redundant platform operations.",
    },
    {
        id: "13",
        category: "Requests",
        question: "What happens after my request is accepted?",
        answer: "As soon as the owner accepts, you will receive an automated alert. The owner's shared phone number or contact links will become visible under your request history, allowing you to settle the handover location.",
    },
    {
        id: "14",
        category: "Account",
        question: "How do I update my profile?",
        answer: "Navigate to your Account Profile settings tab. From there, you can seamlessly modify your displayed university information, current study area, profile picture, and linked contact pathways.",
    },
    {
        id: "15",
        category: "Safety",
        question: "Is my phone number public?",
        answer: "No. Your phone number is strictly private and is never crawled publicly. It is only shared securely with the single verified student whose book request interaction has been officially accepted.",
    },
    {
        id: "16",
        category: "Safety",
        question: "Does BookBridge verify every listing?",
        answer: "Yes. Every newly published book listing goes through our real-time internal automated and manual moderation pipeline to filter out irrelevant text documents, commercial store operations, or inappropriate media uploads."
    }
];

const CATEGORIES: string[] = ["All", "General", "Buying", "Selling", "Requests", "Account", "Safety"];

export default function FAQContainer() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const filteredFaqs = useMemo(() => {
        return FAQ_DATA.filter((faq) => {
            const matchesSearch =
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    const toggleAccordion = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

            {/* 1. Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                    Frequently Asked <span className="text-[#35858E]">Questions</span>
                </h1>
                <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    Quickly search and locate comprehensive answers regarding listings, secure student routing, and platform standards.
                </p>
            </div>

            {/* 2. Search Bar */}
            <div className="max-w-2xl mx-auto mb-10">
                <div className="relative rounded-2xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search your question..."
                        className="block w-full h-14 pl-12 pr-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-900 text-base placeholder-slate-400 focus:outline-none focus:border-[#35858E] transition-colors"
                    />
                </div>
            </div>

            {/* 3. FAQ Categories */}
            <div className="flex flex-wrap justify-center gap-2.5 mb-14">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => {
                            setActiveCategory(cat);
                            setExpandedId(null);
                        }}
                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === cat
                            ? "bg-[#35858E] text-white shadow-sm"
                            : "bg-slate-50 border border-slate-200 text-slate-600 hover:border-[#35858E] hover:text-[#35858E]"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* 4. FAQ Cards (Custom Tailored Accordion) */}
            <div className="max-w-3xl mx-auto min-h-87.5">
                {filteredFaqs.length > 0 ? (
                    <div className="space-y-4">
                        {filteredFaqs.map((faq) => {
                            const isOpen = expandedId === faq.id;
                            return (
                                <div
                                    key={faq.id}
                                    className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-[#35858E] hover:shadow-sm transition-all duration-200"
                                >
                                    <button
                                        onClick={() => toggleAccordion(faq.id)}
                                        className="w-full flex items-center justify-between text-left p-5 font-bold text-slate-800 text-base md:text-lg focus:outline-none group select-none"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-xl transition-colors ${isOpen ? 'bg-[#35858E] text-white' : 'bg-slate-50 text-[#35858E] group-hover:bg-[#35858E] group-hover:text-white'}`}>
                                                {getCategoryIcon(faq.category)}
                                            </div>
                                            <span className="group-hover:text-[#35858E] transition-colors">{faq.question}</span>
                                        </div>
                                        <ChevronDown className={`w-5 h-5 ml-4 shrink-0 text-slate-400 group-hover:text-[#35858E] transition-transform duration-200 ${isOpen ? "rotate-180 text-[#35858E]" : ""}`} />
                                    </button>

                                    {/* Smooth dynamic panel toggle */}
                                    <div className={`transition-all duration-200 overflow-hidden ${isOpen ? "max-h-125 border-t border-slate-50" : "max-h-0"}`}>
                                        <div className="p-5 pl-16 text-slate-600 text-sm md:text-base leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* 5. Empty Search State */
                    <div className="text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-6">
                        <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                            <Search className="w-6 h-6 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">No matching questions found</h3>
                        <p className="text-sm text-slate-500 mt-1">Try resetting your search query or choosing another tab tier.</p>
                        <button
                            className="mt-5 text-sm font-bold text-[#35858E] hover:underline"
                            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>

            {/* 6. Still Need Help Section */}
            <div className="mt-24 bg-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#35858E]/10 blur-3xl rounded-full pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">Still have questions?</h2>
                        <p className="text-sm text-slate-400 max-w-md">
                            {`  Can't find the answers you need? Get in touch with our operations desk to clear your account logs.
                       `}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto text-center bg-[#35858E] hover:bg-[#2b6d75] text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-sm shadow-sm"
                        >
                            Contact Support
                        </Link>
                        <Link
                            href="/"
                            className="w-full sm:w-auto text-center bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl border border-white/10 transition-colors text-sm"
                        >
                            Browse Books
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}

// Icon mapper helper
function getCategoryIcon(category: string) {
    switch (category) {
        case "General": return <HelpCircle className="w-4 h-4" />;
        case "Buying": return <ShoppingBag className="w-4 h-4" />;
        case "Selling": return <Tag className="w-4 h-4" />;
        case "Requests": return <Send className="w-4 h-4" />;
        case "Account": return <User className="w-4 h-4" />;
        case "Safety": return <ShieldCheck className="w-4 h-4" />;
        default: return <BookOpen className="w-4 h-4" />;
    }
}
