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
        question: "মিলবে কী?",
        answer: "মিলবে একটি বিশেষ পিয়ার-টু-পিয়ার মার্কেটপ্লেস যা শিক্ষার্থীদের জন্য ব্যবহৃত একাডেমিক বই কেনা, বিক্রি, বিনিময় বা দান করতে ডিজাইন করা হয়েছে। আমাদের প্রাথমিক লক্ষ্য হলো শিক্ষামূলক উপকরণগুলিকে আরও সাশ্রয়ী ও সহলভ্য করা এবং একটি টেকসই শিক্ষা জীবনচক্র প্রচার করা।",
    },
    {
        id: "2",
        category: "General",
        question: "মিলবে ব্যবহার করা কি বিনামূল্যে?",
        answer: "হ্যাঁ, মিলবে ব্যবহার করা সম্পূর্ণ বিনামূল্যে। কোনো রেজিস্ট্রেশন ফি, লিস্টিং চার্জ বা লুকানো লেনদেন সাফল্য ফি নেই। যদি একটি বই বিক্রির জন্য তালিকাভুক্ত করা হয়, তাহলে আর্থিক লেনদেন ক্রেতা ও বিক্রেতার মধ্যে তাদের অফলাইন মিটআপের সময় সংঘটিত হয়।",
    },
    {
        id: "3",
        category: "General",
        question: "কে মিলবে ব্যবহার করতে পারে?",
        answer: "যদিও একাডেমিক সাহিত্য খুঁজছেন এমন যে কেউ প্ল্যাটফর্ম ব্রাউজ করতে পারেন, মিলবে বাংলাদেশ জুড়ে স্কুল, কলেজ এবং বিশ্ববিদ্যালয়ের শিক্ষার্থীদের জন্য তাদের পাঠ্যবই ব্যবস্থাপনা অপ্টিমাইজ করতে নিখুঁতভাবে ইঞ্জিনিয়ার এবং অপ্টিমাইজ করা হয়েছে।",
    },
    {
        id: "4",
        category: "Buying",
        question: "আমি কীভাবে একটি বই খুঁজে পাব?",
        answer: "আপনি আমাদের ডায়নামিক সার্চ বারে বইয়ের শিরোনাম, লেখকের নাম বা বিষয় টাইপ করে তাৎক্ষণিকভাবে আপনার প্রয়োজনীয় বই খুঁজে পেতে পারেন। আপনি ক্যাটাগরি, শারীরিক জেলা অবস্থান এবং নির্দিষ্ট প্রাতিষ্ঠানিক ট্যাগ অনুযায়ী ফলাফল ফিল্টার করতে পারেন।",
    },
    {
        id: "5",
        category: "Buying",
        question: "আমি কি অন্য জেলা থেকে বই কিনতে পারি?",
        answer: "হ্যাঁ। যদিও মিলবে নিরাপদ, মুখোমুখি ক্যাম্পাস হ্যান্ডওভারের জন্য অপ্টিমাইজ করা হয়েছে, আপনি বই মালিকের সাথে তাদের গৃহীত বিবরণের মাধ্যমে যোগাযোগ করতে পারেন এবং আপনার নিজস্ব বিবেচনায় নির্ভরযোগ্য কুরিয়ার সেবা ব্যবহার করতে পারেন।",
    },
    {
        id: "6",
        category: "Buying",
        question: "আমি কীভাবে বিক্রেতার সাথে যোগাযোগ করব?",
        answer: "ব্যবহারকারীর নিরাপত্তা নিশ্চিত করতে এবং স্প্যাম রোধ করতে, যোগাযোগের বিবরণ নিরাপদ রাখা হয়। একবার আপনি একটি বই পোস্টে 'রিকোয়েস্ট পাঠান' ক্লিক করলে এবং সংশ্লিষ্ট মালিক আপনার রিকোয়েস্ট গ্রহণ করলে, সরাসরি যোগাযোগের চ্যানেলগুলি তাৎক্ষণিকভাবে আনলক হবে।",
    },
    {
        id: "7",
        category: "Selling",
        question: "আমি কীভাবে একটি বই পোস্ট করব?",
        answer: "কেবল 'বই পোস্ট করুন' ড্যাশবোর্ডে নেভিগেট করুন, আপনার পাঠ্যবইয়ের একটি পরিষ্কার ছবি আপলোড করুন, সংস্করণ, ক্যাটাগরি এবং বর্তমান শারীরিক অবস্থার মতো বিবরণ পূরণ করুন, আপনি বিক্রি বা দান করতে চান কিতা উল্লেখ করুন এবং প্রকাশ করুন।",
    },
    {
        id: "8",
        category: "Selling",
        question: "আমি কি বিক্রির পরিবর্তে বই দান করতে পারি?",
        answer: "অবশ্যই! বই তৈরির ফর্ম পূরণ করার সময়, আপনি স্পষ্টভাবে পোস্টের ধরন 'দান' হিসেবে সেট করতে পারেন। এই বইগুলি একটি স্বতন্ত্র দান ট্যাগ দিয়ে চিহ্নিত হবে, যা আর্থিক প্রয়োজনে শিক্ষার্থীদের কাছে দৃশ্যমান করবে।",
    },
    {
        id: "9",
        category: "Selling",
        question: "আমি কি পরে আমার পোস্ট সম্পাদনা করতে পারি?",
        answer: "হ্যাঁ। আপনার লিস্টিংয়ের উপর আপনার সম্পূর্ণ মালিকানা রয়েছে। আপনি আপনার ব্যক্তিগত ড্যাশবোর্ড ওয়ার্কফ্লো থেকে যেকোনো সময় মূল্য, বিবরণ, প্রাপ্যতা স্ট্যাটাস আপডেট করতে বা পোস্ট সম্পূর্ণ অপসারণ করতে পারেন।",
    },
    {
        id: "10",
        category: "Requests",
        question: "আমি কীভাবে একটি বই রিকোয়েস্ট করব?",
        answer: "যেকোনো বইয়ের লিস্টিং ব্রাউজ করার সময়, প্রমিনেন্ট 'রিকোয়েস্ট বই' ট্রিগারে ক্লিক করুন। সিস্টেম স্বয়ংক্রিয়ভাবে আপনার আগ্রহ সম্পর্কে মালিককে অবহিত করবে, তাদের আপনার প্রোফাইল পর্যালোচনা করতে এবং বিনিময় রাউটিং গ্রহণ করতে দেবে।",
    },
    {
        id: "11",
        category: "Requests",
        question: "আমি কি একাধিক রিকোয়েস্ট পাঠাতে পারি?",
        answer: "হ্যাঁ, আপনি আপনার বর্তমান সেমিস্টার বা পাঠ্যক্রম নির্দেশিকা অনুযায়ী বিভিন্ন মালিকের কাছ থেকে একযোগে একাধিক ভিন্ন একাডেমিক বই আত্মবিশ্বাসের সাথে রিকোয়েস্ট করতে পারেন।",
    },
    {
        id: "12",
        category: "Requests",
        question: "আমি কি আমার নিজের পোস্টে রিকোয়েস্ট করতে পারি?",
        answer: "না। ডেটা অখণ্ডতা বজায় রাখতে এবং অপ্রয়োজনীয় প্ল্যাটফর্ম অপারেশন দূর করতে সিস্টেম অ্যালগরিদম স্পষ্টভাবে ব্যবহারকারীদের তাদের নিজস্লিস্টিংয়ে রিকোয়েস্ট জমা দিতে বাধা দেয়।",
    },
    {
        id: "13",
        category: "Requests",
        question: "আমার রিকোয়েস্ট গৃহীত হওয়ার পরে কী হবে?",
        answer: "মালিক গ্রহণ করার সাথে সাথে, আপনি একটি স্বয়ংক্রিয় সতর্কতা পাবেন। মালিকের শেয়ারকৃত ফোন নম্বর বা যোগাযোগ লিংকগুলি আপনার রিকোয়েস্ট ইতিহাসের অধীনে দৃশ্যমান হবে, যা আপনাকে হ্যান্ডওভার অবস্থান নির্ধারণ করতে দেবে।",
    },
    {
        id: "14",
        category: "Account",
        question: "আমি কীভাবে আমার প্রোফাইল আপডেট করব?",
        answer: "আপনার Account প্রোফাইল সেটিংস ট্যাবে নেভিগেট করুন। সেখান থেকে, আপনি আপনার প্রদর্শিত বিশ্ববিদ্যালয় তথ্য, বর্তমান অধ্যয়ন এলাকা, প্রোফাইল ছবি এবং লিঙ্ককৃত যোগাযোগ পথগুলি নির্বিঘ্নে পরিবর্তন করতে পারেন।",
    },
    {
        id: "15",
        category: "Safety",
        question: "আমার ফোন নম্বর কি পাবলিক?",
        answer: "না। আপনার ফোন নম্বর কঠোরভাবে ব্যক্তিগত এবং কখনও পাবলিকভাবে ক্রল করা হয় না। একমাত্র সেই যাচাইকৃত শিক্ষার্থীর সাথে এটি নিরাপদে শেয়ার করা হয় যার বই রিকোয়েস্ট ইন্টারঅ্যাকশন অফিসিয়ালি গৃহীত হয়েছে।",
    },
    {
        id: "16",
        category: "Safety",
        question: "মিলবে কি প্রতিটি লিস্টিং যাচাই করে?",
        answer: "হ্যাঁ। প্রতিটি নতুন প্রকাশিত বইয়ের লিস্টিং আমাদের রিয়েল-টাইম অভ্যন্তরীণ স্বয়ংক্রিয় এবং ম্যানুয়াল মডারেশন পাইপলাইনের মাধ্যমে যায় যাতে অপ্রাসঙ্গিক টেক্সট ডকুমেন্ট, বাণিজ্যিক স্টোর অপারেশন বা অনুপযুক্ত মিডিয়া আপলোড ফিল্টার করা যায়।",
    },
];

const CATEGORIES: string[] = ["সব", "সাধারণ", "কেনা", "বিক্রি", "রিকোয়েস্ট", "Account", "নিরাপত্তা"];

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
                    সাধারণত জিজ্ঞাসিত <span className="text-[#35858E]">প্রশ্ন</span>
                </h1>
                <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    লিস্টিং, নিরাপদ শিক্ষার্থী রাউটিং এবং প্ল্যাটফর্ম মানদণ্ড সম্পর্কে ব্যাপক উত্তর দ্রুত খুঁজুন ও সনাক্ত করুন।
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
                        placeholder="আপনার প্রশ্ন খুঁজুন..."
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
                        <h3 className="text-lg font-bold text-slate-800">কোনো মিল প্রশ্ন পাওয়া যায়নি</h3>
                        <p className="text-sm text-slate-500 mt-1">আপনার সার্চ কোয়েরি রিসেট করুন বা অন্য ট্যাব বেছে নিন।</p>
                        <button
                            className="mt-5 text-sm font-bold text-[#35858E] hover:underline"
                            onClick={() => { setSearchQuery(""); setActiveCategory("সব"); }}
                        >
                            সব ফিল্টার মুছুন
                        </button>
                    </div>
                )}
            </div>

            {/* 6. Still Need Help Section */}
            <div className="mt-24 bg-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#35858E]/10 blur-3xl rounded-full pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">এখনো প্রশ্ন আছে?</h2>
                        <p className="text-sm text-slate-400 max-w-md">
                            {`  আপনার প্রয়োজনীয় উত্তর খুঁজে পাচ্ছেন না? আপনার Account লগ পরিষ্কার করতে আমাদের অপারেশন ডেস্কের সাথে যোগাযোগ করুন।
                       `}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto text-center bg-[#35858E] hover:bg-[#2b6d75] text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-sm shadow-sm"
                        >
                            সাপোর্টে যোগাযোগ
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
