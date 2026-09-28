"use client";

import React, { useMemo, useState } from "react";
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
    BookOpen,
} from "lucide-react";

type FAQCategory =
    | "General"
    | "Buying"
    | "Selling"
    | "Requests"
    | "Account"
    | "Safety";

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
        question: "মিলবে কী?",
        answer:
            "মিলবে শিক্ষার্থীদের জন্য তৈরি একটি সহজ বই কেনাবেচা ও দানের প্ল্যাটফর্ম। এখানে  প্রয়োজন নেই এমন একাডেমিক বই বিক্রি বা দান করতে পারবেন , আবার প্রয়োজনীয় বইও সহজে খুঁজে পেতে পারেন ।",
    },
    {
        id: "2",
        category: "General",
        question: "মিলবে ব্যবহার করা কি বিনামূল্যে?",
        answer:
            "হ্যাঁ। মিলবে ব্যবহার করে বই খোঁজা, বই পোস্ট করা এবং রিকোয়েস্ট পাঠানোর জন্য কোনো প্ল্যাটফর্ম ফি নেই। বইয়ের দাম বা অন্য কোনো লেনদেন হলে সেটি ক্রেতা ও বিক্রেতা নিজেদের মধ্যে ঠিক করে নেন।",
    },
    {
        id: "3",
        category: "General",
        question: "কে মিলবে ব্যবহার করতে পারে?",
        answer:
            "মিলবে মূলত স্কুল, কলেজ ও বিশ্ববিদ্যালয়ের শিক্ষার্থীদের প্রয়োজনের কথা মাথায় রেখে তৈরি। তবে বই ব্রাউজ করার জন্য যে কেউ প্ল্যাটফর্মটি দেখতে পারেন।",
    },
    {
        id: "4",
        category: "General",
        question: "লোকেশন না দিলেও কি বই ব্রাউজ করা যায়?",
        answer:
            "হ্যাঁ। লোকেশন নির্বাচন না করেও বই ব্রাউজ করা যায়। তবে কাছাকাছি এলাকার বই দেখতে হলে আপনার লোকেশন নির্বাচন করা বাধ্যতামূলক। লোকেশন না দিলে আপনার কাছাকাছি বই দেখানো সম্ভব হবে না।",
    },
    {
        id: "5",
        category: "Buying",
        question: "আমি কীভাবে একটি বই খুঁজে পাব?",
        answer:
            "বইয়ের শিরোনাম, লেখকের নাম বা প্রয়োজনীয় তথ্য দিয়ে সার্চ করে বই খুঁজতে পারেন। চাইলে বিভিন্ন ফিল্টার ব্যবহার করেও প্রয়োজনের বই খুঁজে দেখতে পারেন।",
    },
    {
        id: "6",
        category: "Buying",
        question: "কাছাকাছি এলাকার বই কীভাবে দেখব?",
        answer:
            "আপনার কাছাকাছি এলাকার বই দেখতে আপনার লোকেশন নির্বাচন করতে হবে। লোকেশন নির্বাচন করার পর আপনার কাছাকাছি এলাকার শিক্ষার্থীদের পোস্ট করা  বইগুলো দেখতে পারবেন।",
    },
    {
        id: "7",
        category: "Buying",
        question: "অন্য এলাকার বা জেলার বই কি নেওয়া যায়?",
        answer:
            "হ্যাঁ। Milbe কোনো নির্দিষ্ট এলাকার বই নেওয়ার মধ্যে সীমাবদ্ধ নয়। আপনি অন্য এলাকার বইয়ের মালিকের সঙ্গে যোগাযোগ করে বই নেওয়ার বিষয়টি নিজেদের মধ্যে ঠিক করতে পারেন। বই কীভাবে ও কোথা থেকে সংগ্রহ করবেন, সেটি ক্রেতা ও বিক্রেতা নিজেদের মধ্যে ঠিক করবেন।",
    },
    {
        id: "8",
        category: "Buying",
        question: "রিকোয়েস্ট গ্রহণ হওয়ার পর বই কীভাবে নেব?",
        answer:
            "রিকোয়েস্ট গ্রহণ হলে ক্রেতা ও বিক্রেতা দুজনেই একে অন্যের প্রয়োজনীয় যোগাযোগের তথ্য দেখতে পারবেন। এরপর নিজেদের মধ্যে কথা বলে বইয়ের দাম, স্থান ও বই সংগ্রহের বিষয়টি ঠিক করে নিতে পারবেন।",
    },
    {
        id: "9",
        category: "Selling",
        question: "আমি কীভাবে একটি বই পোস্ট করব?",
        answer:
            "আপনার প্রয়োজন নেই এমন একাডেমিক বই বিক্রি বা দান করার জন্য বই পোস্ট করতে পারবেন। পোস্ট করার সময় প্রয়োজনীয় বইয়ের তথ্য, ছবি এবং বিক্রি বা দানের বিষয়টি উল্লেখ করে পোস্ট প্রকাশ করুন।",
    },
    {
        id: "10",
        category: "Selling",
        question: "আমি কি বই বিক্রি করার বদলে দান করতে পারি?",
        answer:
            "অবশ্যই। বই পোস্ট করার সময় সেটি বিক্রি করবেন নাকি দান করবেন, তা নির্বাচন করতে পারবেন।",
    },
    {
        id: "11",
        category: "Selling",
        question: "একটি পোস্টে কি একাধিক বই দেওয়া যায়?",
        answer:
            "হ্যাঁ। একটি পোস্টে একাধিক বই থাকতে পারে। তবে ওই পোস্টে থাকা বইগুলোর জন্য আলাদা আলাদা রিকোয়েস্ট পাঠানোর সুযোগ নেই; একটি রিকোয়েস্ট পুরো পোস্টের সব বইয়ের জন্য প্রযোজ্য।",
    },
    {
        id: "12",
        category: "Selling",
        question: "আমি কি আমার পোস্ট পরে সম্পাদনা করতে পারি?",
        answer:
            "হ্যাঁ। নিজের পোস্ট প্রয়োজন অনুযায়ী সম্পাদনা করতে পারবেন।",
    },
    {
        id: "13",
        category: "Selling",
        question: "আমি কি নিজের পোস্ট ডিলিট করতে পারি?",
        answer:
            "হ্যাঁ। আপনি চাইলে নিজের পোস্ট ডিলিট করতে পারবেন।",
    },
    {
        id: "14",
        category: "Selling",
        question: "বই বিক্রি হয়ে গেলে কি পোস্টের স্ট্যাটাস নিজে পরিবর্তন করতে হয়?",
        answer:
            "না। কোনো রিকোয়েস্ট গ্রহণ করা হলে পোস্টটি স্বয়ংক্রিয়ভাবে Unavailable হয়ে যায় এবং বইটি Sold হিসেবে গণ্য হয়। আবার accepted request পরে cancel হলে পোস্টটি আবার Available হিসেবে গণ্য হয়।",
    },
    {
        id: "15",
        category: "Selling",
        question: "Sold বা Donated বই কি পরে আবার দেখা যায়?",
        answer:
            "না। শুধু Available বইগুলোই browse ও search-এ দেখা যায়। Sold বা Donated হয়ে গেলে পোস্টগুলো আর সাধারণ ব্যবহারকারীদের কাছে দেখানো হয় না।",
    },
    {
        id: "16",
        category: "Requests",
        question: "আমি কীভাবে একটি বইয়ের জন্য রিকোয়েস্ট পাঠাব?",
        answer:
            "যে পোস্টের বই আপনার প্রয়োজন, সেই পোস্ট থেকে রিকোয়েস্ট পাঠাতে পারবেন। একটি পোস্টে একাধিক বই থাকলে একই রিকোয়েস্টে পোস্টের সব বইয়ের জন্য রিকোয়েস্ট পাঠানো হয়।",
    },
    {
        id: "17",
        category: "Requests",
        question: "আমি কি একাধিক বইয়ের জন্য রিকোয়েস্ট পাঠাতে পারি?",
        answer:
            "হ্যাঁ। বিভিন্ন পোস্টের বইয়ের জন্য আলাদা আলাদা রিকোয়েস্ট পাঠাতে পারবেন। তবে একই পোস্টে থাকা একাধিক বইয়ের জন্য আলাদা রিকোয়েস্ট করা যায় না; একটি রিকোয়েস্ট পুরো পোস্টের জন্যই হয়।",
    },
    {
        id: "18",
        category: "Requests",
        question: "আমি কি নিজের পোস্টে রিকোয়েস্ট পাঠাতে পারি?",
        answer:
            "না। নিজের পোস্ট করা বইয়ের জন্য নিজে রিকোয়েস্ট পাঠানো যায় না।",
    },
    {
        id: "19",
        category: "Requests",
        question: "রিকোয়েস্ট পাঠানোর পর কি ক্যান্সেল করা যায়?",
        answer:
            "হ্যাঁ। রিকোয়েস্ট পাঠানোর পর সেটি ক্যান্সেল করা যায়। তবে একবার ক্যান্সেল করলে একই পোস্টে আর নতুন করে রিকোয়েস্ট পাঠানো যাবে না।",
    },
    {
        id: "20",
        category: "Requests",
        question: "সেলার কি কোনো রিকোয়েস্ট রিজেক্ট করতে পারে?",
        answer:
            "হ্যাঁ। সেলার চাইলে কোনো রিকোয়েস্ট রিজেক্ট করতে পারেন। একবার রিজেক্ট হলে সেই user একই পোস্টে আর নতুন করে রিকোয়েস্ট পাঠাতে পারবেন না।",
    },
    {
        id: "21",
        category: "Requests",
        question: "একই পোস্টে একাধিক রিকোয়েস্ট এলে কী হয়?",
        answer:
            "বিক্রেতা একজনের রিকোয়েস্ট গ্রহণ করতে পারেন। একজনের রিকোয়েস্ট গ্রহণ হলে সেই বিক্রেতার জন্য যোগাযোগ করার সুযোগ খুলে যায় এবং একই পোস্টের অন্য pending রিকোয়েস্টগুলো স্বয়ংক্রিয়ভাবে Cancelled হয়ে যায়।",
    },
    {
        id: "22",
        category: "Requests",
        question: "একটি accepted request পরে cancel হলে কী হয়?",
        answer:
            "Accepted request পরে cancel হলে পোস্টটি আবার Available হিসেবে গণ্য হয়। তখন আগে Cancelled হয়ে যাওয়া নয়, বরং eligible থাকা অন্য রিকোয়েস্টগুলো আবার Pending হতে পারে। যে buyer-এর request একবার Cancelled হয়েছে, তার request আর Pending হবে না এবং সে আবার request পাঠাতেও পারবে না।",
    },
    {
        id: "23",
        category: "Requests",
        question: "রিকোয়েস্ট গ্রহণ হলে যোগাযোগের তথ্য কোথায় দেখা যাবে?",
        answer:
            "রিকোয়েস্ট গ্রহণ হলে Request page-এর পাঠানো রিকোয়েস্ট এবং প্রাপ্ত রিকোয়েস্ট—সংশ্লিষ্ট tab-এ accepted request-এর ভেতর যোগাযোগের তথ্য দেখা যাবে।",
    },
    {
        id: "24",
        category: "Requests",
        question: "Accepted request-এর পর ক্রেতা ও বিক্রেতা কী দেখতে পাবে?",
        answer:
            "Accepted request-এর পর ক্রেতা ও বিক্রেতা দুজনেই একে অন্যের সংশ্লিষ্ট রিকুয়েস্ট দেখতে পারবেন। যোগাযোগের নম্বরও শুধু এই দুইজনের জন্যই দেখা যাবে। অন্য কোনো user এই তথ্য দেখতে পারবেন না।",
    },
    {
        id: "25",
        category: "Requests",
        question: "মিলবে কি বইয়ের টাকা বা payment পরিচালনা করে?",
        answer:
            "না। মিলবে কোনো payment বা টাকা লেনদেন পরিচালনা করে না। বইয়ের মূল্য এবং টাকা কীভাবে দেওয়া হবে, সেটি ক্রেতা ও বিক্রেতা নিজেদের মধ্যে ঠিক করেন।",
    },
    {
        id: "26",
        category: "Requests",
        question: "মিলবে কি বই delivery করে?",
        answer:
            "না। মিলবে কোনো delivery service পরিচালনা করে না। বই কোথায় এবং কীভাবে দেওয়া-নেওয়া হবে, সেটি ক্রেতা ও বিক্রেতা নিজেদের মধ্যে ঠিক করেন।",
    },
    {
        id: "27",
        category: "Account",
        question: "আমি কীভাবে আমার প্রোফাইল আপডেট করব?",
        answer:
            "প্রোফাইল পেজ থেকে আপনার প্রয়োজনীয় তথ্য আপডেট করতে পারবেন।",
    },
    {
        id: "28",
        category: "Account",
        question: "মিলবে-তে কি Google দিয়ে লগইন করা যায়?",
        answer:
            "হ্যাঁ। Google account ব্যবহার করে মিলবে-তে লগইন করা যায়।",
    },
    {
        id: "29",
        category: "Account",
        question: "পাসওয়ার্ড ভুলে গেলে কি রিসেট করা যায়?",
        answer:
            "হ্যাঁ। পাসওয়ার্ড ভুলে গেলে password reset করার ব্যবস্থা রয়েছে।",
    },
    {
        id: "30",
        category: "Account",
        question: "আমি কি আমার মিলবে অ্যাকাউন্ট ডিলিট করতে পারি?",
        answer:
            "হ্যাঁ। আপনি চাইলে আপনার মিলবে অ্যাকাউন্ট ডিলিট করতে পারবেন।",
    },
    {
        id: "31",
        category: "Account",
        question: "আমি কি অন্য কোনো ইউজারকে ব্লক করতে পারি?",
        answer:
            "না আপনি কোনো ইউজারকে ব্লক করতে পারবেন না । তবে প্রয়োজন হলে মিলব কর্তৃপক্ষ যেকোনো ইউজারকে ব্লক করতে পারবে।"
    },
    {
        id: "32",
        category: "Safety",
        question: "আমার যোগাযোগের নম্বর কি সবার কাছে দেখা যায়?",
        answer:
            "না। যোগাযোগের নম্বর public নয়। কোনো request গ্রহণ হওয়ার পর সংশ্লিষ্ট buyer ও seller ছাড়া অন্য কেউ এই তথ্য দেখতে পারে না।",
    },
    {
        id: "33",
        category: "Safety",
        question: "রিকোয়েস্ট গ্রহণ হওয়ার আগে কি seller-এর যোগাযোগের তথ্য দেখা যায়?",
        answer:
            "না। নিরাপত্তার জন্য request গ্রহণ হওয়ার আগে যোগাযোগের নম্বর দেখা যায় না। Request accepted হওয়ার পর শুধু সংশ্লিষ্ট buyer ও seller-এর মধ্যে যোগাযোগের তথ্য দেখা যায়।",
    },
    {
        id: "34",
        category: "Safety",
        question: "কোনো ভুল বা অনুপযুক্ত পোস্ট দেখলে কী করব?",
        answer:
            "বর্তমানে পোস্ট report করার আলাদা কোনো feature নেই। তবে কোনো ভুল বা অনুপযুক্ত পোস্ট চোখে পড়লে Contact section-এর মাধ্যমে WhatsApp অথবা email-এ জানাতে পারেন।",
    },
];

const CATEGORIES: { value: FAQCategory | "All"; label: string }[] = [
    { value: "All", label: "সব" },
    { value: "General", label: "সাধারণ" },
    { value: "Buying", label: "কেনা" },
    { value: "Selling", label: "বিক্রি ও দান" },
    { value: "Requests", label: "রিকোয়েস্ট" },
    { value: "Account", label: "অ্যাকাউন্ট" },
    { value: "Safety", label: "নিরাপত্তা" },
];

export default function FAQContainer() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<FAQCategory | "All">(
        "All"
    );
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const filteredFaqs = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return FAQ_DATA.filter((faq) => {
            const matchesSearch =
                !query ||
                faq.question.toLowerCase().includes(query) ||
                faq.answer.toLowerCase().includes(query);

            const matchesCategory =
                activeCategory === "All" || faq.category === activeCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    const toggleAccordion = (id: string) => {
        setExpandedId((currentId) => (currentId === id ? null : id));
    };

    const resetFilters = () => {
        setSearchQuery("");
        setActiveCategory("All");
        setExpandedId(null);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                    সাধারণত জিজ্ঞাসিত{" "}
                    <span className="text-[#35858E]">প্রশ্ন</span>
                </h1>
                <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    মিলবে কীভাবে কাজ করে, বই কেনা-বেচা, রিকোয়েস্ট এবং
                    অ্যাকাউন্ট নিয়ে সাধারণ প্রশ্নের উত্তর এখানে পাবেন।
                </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-10">
                <div className="relative rounded-2xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => {
                            setSearchQuery(event.target.value);
                            setExpandedId(null);
                        }}
                        placeholder="আপনার প্রশ্ন খুঁজুন..."
                        aria-label="প্রশ্ন খুঁজুন"
                        className="block w-full h-14 pl-12 pr-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-900 text-base placeholder-slate-400 focus:outline-none focus:border-[#35858E] transition-colors"
                    />
                </div>
            </div>

            {/* FAQ Categories */}
            <div className="flex gap-2.5 mb-14 overflow-x-auto pb-2 sm:justify-center sm:flex-wrap sm:overflow-visible sm:pb-0">
                {CATEGORIES.map((category) => (
                    <button
                        key={category.value}
                        type="button"
                        onClick={() => {
                            setActiveCategory(category.value);
                            setExpandedId(null);
                        }}
                        className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${activeCategory === category.value
                            ? "bg-[#35858E] text-white shadow-sm"
                            : "bg-slate-50 border border-slate-200 text-slate-600 hover:border-[#35858E] hover:text-[#35858E]"
                            }`}
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            {/* FAQ Accordion */}
            <div className="max-w-3xl mx-auto min-h-[22rem]">
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
                                        type="button"
                                        onClick={() => toggleAccordion(faq.id)}
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-answer-${faq.id}`}
                                        className="w-full flex items-center justify-between text-left p-5 font-bold text-slate-800 text-base md:text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35858E] focus-visible:ring-inset group select-none"
                                    >
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div
                                                className={`p-2 rounded-xl transition-colors shrink-0 ${isOpen
                                                    ? "bg-[#35858E] text-white"
                                                    : "bg-slate-50 text-[#35858E] group-hover:bg-[#35858E] group-hover:text-white"
                                                    }`}
                                            >
                                                {getCategoryIcon(faq.category)}
                                            </div>
                                            <span className="group-hover:text-[#35858E] transition-colors">
                                                {faq.question}
                                            </span>
                                        </div>

                                        <ChevronDown
                                            className={`w-5 h-5 ml-4 shrink-0 text-slate-400 group-hover:text-[#35858E] transition-transform duration-200 ${isOpen
                                                ? "rotate-180 text-[#35858E]"
                                                : ""
                                                }`}
                                        />
                                    </button>

                                    <div
                                        id={`faq-answer-${faq.id}`}
                                        className={`grid transition-[grid-template-rows] duration-200 ${isOpen
                                            ? "grid-rows-[1fr] border-t border-slate-50"
                                            : "grid-rows-[0fr]"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="p-5 pl-16 text-slate-600 text-sm md:text-base leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-6">
                        <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                            <Search className="w-6 h-6 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">
                            কোনো প্রশ্ন পাওয়া যায়নি
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                            অন্যভাবে সার্চ করুন বা অন্য একটি ক্যাটাগরি বেছে
                            নিন।
                        </p>
                        <button
                            type="button"
                            className="mt-5 text-sm font-bold text-[#35858E] hover:underline"
                            onClick={resetFilters}
                        >
                            সব ফিল্টার মুছুন
                        </button>
                    </div>
                )}
            </div>

            {/* Still Need Help */}
            <div className="mt-24 bg-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#35858E]/10 blur-3xl rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">
                            এখনো প্রশ্ন আছে?
                        </h2>
                        <p className="text-sm text-slate-400 max-w-md">
                            প্রয়োজনীয় উত্তর খুঁজে না পেলে আমাদের সঙ্গে
                            যোগাযোগ করুন। আমরা আপনার প্রশ্নের উত্তর দেওয়ার
                            চেষ্টা করব।
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto text-center bg-[#35858E] hover:bg-[#2b6d75] text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-sm shadow-sm"
                        >
                            যোগাযোগ করুন
                        </Link>

                        <Link
                            href="/"
                            className="w-full sm:w-auto text-center bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl border border-white/10 transition-colors text-sm"
                        >
                            বই ব্রাউজ করুন
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getCategoryIcon(category: FAQCategory) {
    switch (category) {
        case "General":
            return <HelpCircle className="w-4 h-4" />;
        case "Buying":
            return <ShoppingBag className="w-4 h-4" />;
        case "Selling":
            return <Tag className="w-4 h-4" />;
        case "Requests":
            return <Send className="w-4 h-4" />;
        case "Account":
            return <User className="w-4 h-4" />;
        case "Safety":
            return <ShieldCheck className="w-4 h-4" />;
        default:
            return <BookOpen className="w-4 h-4" />;
    }
}
