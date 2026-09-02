import React from "react";
import Link from "next/link";
import {
    BookOpen,
    Search,
    MessageSquare,
    Handshake,
    ShieldCheck,
    Layers,
    Users,
    Leaf,
    GraduationCap,
    CheckCircle2
} from "lucide-react";

// Types for structured data
interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface StatCardProps {
    value: string;
    label: string;
}

export const metadata = {
    title: "আমাদের সম্পর্কে | Milbe",
    description: "Learn more about Milbe, Bangladesh's leading student-to-student academic book marketplace.",
};

export default function AboutUsPage() {
    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans">

            {/* 1. Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#35858E]">
                        মিলবে সম্পর্কে
                    </h1>
                    <div className="text-base md:text-lg text-slate-600 space-y-4 leading-relaxed">
                        <p>
                            মিলবে একটি বিশেষ শিক্ষার্থী-থেকে-শিক্ষার্থী মার্কেটপ্লেস যা শিক্ষাসম্পর্কিত সম্পদকে আরও সাশ্রয়ী ও সহলভ্য করতে ডিজাইন করা হয়েছে। আমরা তাদের সাথে যোগাযোগ স্থাপন করি যারা তাদের কোর্স সম্পন্ন করেছে এবং যারা তাদের পরবর্তী যাত্রায় একাডেমিক বই প্রয়োজন।
                        </p>
                        <p>
                            পিয়ার-টু-পিয়ার শেয়ারিং ইকোসিস্টেম গড়ে তুলে, আমরা শিক্ষার্থীদের তাদের একাডেমিক খরচ উল্লেখযোগ্যভাবে কমাতে সাহায্য করি। আপনি বিক্রি, কেনা, বিনিময় বা দান করতে চান কিনা, মিলবে শিক্ষার্থী সম্প্রদায়ের জন্য বিশেষভাবে তৈরি একটি কাঠামোগত এবং স্বচ্ছ পরিবেস প্রদান করে।
                        </p>
                        <p>
                            আর্থিক সুবিধার বাইরে, আমাদের প্ল্যাটফর্ম টেকসই শিক্ষার পক্ষে। একটি বইকে দ্বিতীয় জীবন দেওয়া কাগজের অপচয় এবং পরিবেশগত প্রভাব কমায়, বাংলাদেশকে শিক্ষার একটি স্মার্ট, পরিবেশ-বান্ধব ভবিষ্যতের দিকে এগিয়ে নিয়ে যায়।
                        </p>
                    </div>
                </div>
                <div className="flex justify-center items-center w-full h-75 md:h-112.5 relative bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-emerald-50/30">
                        <BookOpen className="w-20 h-20 text-emerald-600 mb-4 animate-pulse" />
                        <p className="text-sm font-medium text-[#35858E] uppercase tracking-wider">জ্ঞান সংযোগ করা হচ্ছে</p>
                        <p className="text-xs text-slate-500 mt-1 max-w-xs">বিশ্ববিদ্যালয় জুড়ে টেকসই বই শেয়ারিংয়ের মাধ্যমে শিক্ষার্থীদের ক্ষমতায়ন।</p>
                    </div>
                </div>
            </section>

            <hr className="border-slate-100 max-w-7xl mx-auto" />

            {/* 2 & 3. Our Mission & Vision */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/60 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-centertext-[#35858E]">
                        <GraduationCap className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#35858E]">আমাদের মিশন</h2>
                    <p className="text-slate-600 leading-relaxed">
                        বাংলাদেশে মানসম্পন্ন শিক্ষার আর্থিক বাধা ভাঙতে আমাদের মিশন। আমরা শিক্ষার্থীদের অব্যবহৃত একাডেমিক বই পুনর্ব্যবহার করার জন্য একটি নিরাপদ প্ল্যাটফর্ম প্রদান করে তাদের ক্ষমতায়ন করি, অপচয় কমাই, এবং পারস্পরিক সহায়তা ও জ্ঞান ভাগাভাগির উপর কেন্দ্রিত একটি সক্রিয় সম্প্রদায় সংস্কৃতি গড়ে তুলি।
                    </p>
                </div>

                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/60 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-700">
                        <Layers className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-cyan-800">আমাদের ভিশন</h2>
                    <p className="text-slate-600 leading-relaxed">
                        {`আমরা বাংলাদেশের বৃহত্তম এবং সবচেয়ে বিশ্বস্ত একাডেমিক বই ইকোসিস্টেম হতে চাই। কলেজ ও বিশ্ববিদ্যালয় জুড়ে শিক্ষার্থীদের নির্বিঘ্নে সংযুক্ত করে, আমরা নিশ্চিত করতে চাই যে কোনো পাঠ্যবই তাকে বসে না থাকে যখন অন্য শিক্ষার্থী তা কিনতে সংগ্রাম করছে।`}                    </p>
                </div>
            </section>

            {/* 4. How Milbe Works */}
            <section className="bg-slate-50 border-y border-slate-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold text-slate-900">মিলবে কীভাবে কাজ করে</h2>
                        <p className="text-slate-500 mt-2">একাডেমিক বই কিনতে, বিক্রি করতে বা দান করতে চারটি সহজ ধাপ।</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StepCard
                            icon={<BookOpen className="w-6 h-6" />}
                            step="01"
                            title="বই পোস্ট করুন"
                            description="আপনি বিক্রি, বিনিময় বা দান করতে চান এমন একাডেমিক বইয়ের জন্য কয়েক সেকেন্ডের মধ্যে একটি পরিষ্কার লিস্টিং তৈরি করুন।"
                        />
                        <StepCard
                            icon={<Search className="w-6 h-6" />}
                            step="02"
                            title="বই খুঁজুন"
                            description="অধ্যয়নের ক্ষেত্র, অবস্থান এবং নির্দিষ্ট বিশ্ববিদ্যালয় অনুযায়ী তৈরি ব্যাপক ক্যাটাগরির মাধ্যমে ব্রাউজ করুন।"
                        />
                        <StepCard
                            icon={<MessageSquare className="w-6 h-6" />}
                            step="03"
                            title="রিকোয়েস্ট পাঠান"
                            description="আপনার প্রয়োজনীয় বই পেয়েছেন? ঝামেলা ছাড়াই সরাসরি মালিককে রিকোয়েস্ট পাঠান।"
                        />
                        <StepCard
                            icon={<Handshake className="w-6 h-6" />}
                            step="04"
                            title="যোগাযোগ করুন ও সংগ্রহ করুন"
                            description="গৃহীত হলে, ক্যাম্পাসে অফলাইনে আপনার বিনিময় চূড়ান্ত করতে যোগাযোগের বিবরণ নিরাপদে অ্যাক্সেস করুন।"
                        />
                    </div>
                </div>
            </section>

            {/* 5. Why Choose Milbe */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold text-slate-900">কেন মিলবে বেছে নেবেন</h2>
                        <p className="text-slate-500 mt-2">শিক্ষার্থীদের প্রতিদিনের একাডেমিক জীবনচক্র পরিবেশনের জন্য প্ল্যাটফর্ম সিস্টেমে অপ্টিমাইজ করা হয়েছে।</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<GraduationCap className="w-5 h-5 text-emerald-600" />}
                            title="সাশ্রয়ী বই"
                            description="স্ট্যান্ডার্ড রিটেইল মূল্যের একটি অংশে যাচাইকৃত পাঠ্যবই, রেফারেন্স পেপার এবং পরীক্ষার প্রস্তুতি উপকরণ অ্যাক্সেস করুন।"
                        />
                        <FeatureCard
                            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                            title="ব্যবহার সহজ"
                            description="দ্রুত আপলোড এবং সাবলীল নেভিগেশনের জন্য ইঞ্জিনিয়ার করা একটি স্বজ্ঞাত, রেসপন্সিভ ডায়নামিক ইউজার লেআউট।"
                        />
                        <FeatureCard
                            icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
                            title="নিরাদর সম্প্রদায়"
                            description="Better Auth যাচাইকৃত ব্যবহারকারী কাঠামো নিরাপদ যোগাযোগ এবং বিশ্বস্ত পিয়ার হ্যান্ডওভার নিশ্চিত করে।"
                        />
                        <FeatureCard
                            icon={<Layers className="w-5 h-5 text-emerald-600" />}
                            title="কিনুন, বিক্রি করুন ও দান করুন"
                            description="লেনদেনের উপর সম্পূর্ণ নিয়ন্ত্রণ। পকেট মানি আয় করুন বা সরাসরি কাউকে সাহায্য করতে দান করুন।"
                        />
                        <FeatureCard
                            icon={<Search className="w-5 h-5 text-emerald-600" />}
                            title="দ্রুত সার্চ"
                            description="প্রকাশনার বছর, বর্তমান অবস্থা, তাৎক্ষণিক অবস্থান মেট্রিক্স বা লক্ষ্য প্রতিষ্ঠান অনুযায়ী ডায়নামিকভাবে ফিল্টার করুন।"
                        />
                        <FeatureCard
                            icon={<Users className="w-5 h-5 text-emerald-600" />}
                            title="শিক্ষার্থী-কেন্দ্রিক"
                            description="প্রতিটি টুল, প্যারামিটার এবং ইন্টারঅ্যাকশন রুট বাস্তব ক্যাম্পাস ওয়ার্কফ্লোর চারপাশে সূক্ষ্মভাবে অপ্টিমাইজ করা হয়েছে।"
                        />
                    </div>
            </section>

            {/* 6. Platform Statistics */}
            <section className="bg-[#35858E] text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <StatCard value="12,500+" label="বই তালিকাভুক্ত" />
                    <StatCard value="8,200+" label="সক্রিয় শিক্ষার্থী" />
                    <StatCard value="6,400+" label="সফল রিকোয়েস্ট" />
                    <StatCard value="45+" label="বিশ্ববিদ্যালয় কভার" />
                </div>
            </section>

            {/* 7. Core Values */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold text-slate-900">আমাদের মূল মূল্যবোধ</h2>
                        <p className="text-slate-500 mt-2">আমরা কীভাবে আমাদের সফটওয়্যার তৈরি করি এবং আমাদের সম্প্রদায় পরিচালনা করি তা নির্দেশকারী মৌলিক স্তম্ভ।</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ValueCard
                            icon={<ShieldCheck className="w-6 h-6text-[#35858E]" />}
                            title="বিশ্বাস"
                            description="আমরা বইয়ের বিবরণ সৎ এবং ইন্টারঅ্যাকশন সম্পূর্ণ নির্ভরযোগ্য রাখতে স্বচ্ছ পিয়ার মেকানিক্স তৈরি করি।"
                        />
                        <ValueCard
                            icon={<Users className="w-6 h-6text-[#35858E]" />}
                            title="সম্প্রদায়"
                            description="একটি অনন্য, টেকসই সংস্কৃতি গড়ে তোলা যেখানে শিক্ষার্থীরা নিয়মিত অন্য শিক্ষার্থীদের সাহায্য করে।"
                        />
                        <ValueCard
                            icon={<GraduationCap className="w-6 h-6text-[#35858E]" />}
                            title="সহলভ্যতা"
                            description="সবার জন্য গুরুত্বপূর্ণ শিক্ষামূলক টুল এবং রেফারেন্স ফ্রেমওয়ার্ক সাশ্রয়ী করা।"
                        />
                        <ValueCard
                            icon={<Leaf className="w-6 h-6text-[#35858E]" />}
                            title="টেকসইতা"
                            description="কার্বন ফুটপ্রিন্ট এবং কাগজ সম্পদ খরচ কমাতে চক্রীয় ব্যবহার প্যাটার্ন সক্রিয়ভাবে প্রচার করা।"
                        />
                    </div>
            </section>

            {/* 8. Call To Action */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-16 text-center space-y-6 border border-slate-800">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto">
                        আপনার বইকে দ্বিতীয় জীবন দিতে প্রস্তুত?
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-base md:text-lg">
                        হাজারো শিক্ষার্থীর সাথে যোগ দিন যারা আজই টাকা বাঁচাচ্ছে, সহপাঠীদের সাহায্য করছে এবং একটি সবুজ ক্যাম্পাস গ্রহে অবদান রাখছে।
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <Link
                            href="/"
                            className="w-full sm:w-auto text-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-sm"
                        >
                            বই ব্রাউজ করুন
                        </Link>
                        <Link
                            href="/posts/create"
                            className="w-full sm:w-auto text-center bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors"
                        >
                            বই পোস্ট করুন
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}

// ==================== Reusable Component Sub-structures ====================

function StepCard({ icon, step, title, description }: { icon: React.ReactNode; step: string; title: string; description: string }) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 relative overflow-visible flex flex-col justify-between">
            <div className="space-y-4">
                <span className="absolute top-4 right-5 text-3xl font-black text-slate-100 select-none tracking-tighter">
                    {step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-emerald-50text-[#35858E] flex items-center justify-center">
                    {icon}
                </div>
                <div className="space-y-1">
                    <h3 className="font-bold text-lg text-slate-900">{title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="flex items-start gap-4 p-2">
            <div className="mt-1 shrink-0 w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                {icon}
            </div>
            <div className="space-y-1">
                <h3 className="font-semibold text-base text-slate-950">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

function StatCard({ value, label }: StatCardProps) {
    return (
        <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-black tracking-tight">{value}</div>
            <div className="text-xs md:text-sm font-medium text-emerald-200 uppercase tracking-wider">{label}</div>
        </div>
    );
}

// Custom built Semantic card for Core Values section replacing HeroUI layout
function ValueCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center shadow-sm">
                {icon}
            </div>
            <div className="space-y-1">
                <h3 className="font-bold text-base text-slate-900">{title}</h3>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}