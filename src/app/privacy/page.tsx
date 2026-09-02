import React from "react";
import { Metadata } from "next";
import PrivacyNavigation from "@/components/privacy/PrivacyNavigation";
import {
    Shield,
    UserCheck,
    Database,
    Eye,
    Share2,
    Cookie,
    Lock,
    Scale,
    Users,
    RefreshCw,
    Mail,
    AlertCircle
} from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Policy | Milbe",
    description: "Learn how Milbe collects, protects, and uses your information responsibly within our academic marketplace.",
};

const NAVIGATION_ITEMS = [
    { id: "introduction", label: "১. ভূমিকা" },
    { id: "collection", label: "২. তথ্য সংগ্রহ" },
    { id: "usage", label: "৩. তথ্য ব্যবহার" },
    { id: "sharing", label: "৪. তথ্য শেয়ারিং" },
    { id: "cookies", label: "৫. কুকি নীতি" },
    { id: "security", label: "৬. ডেটা সিকিউরিটি" },
    { id: "rights", label: "৭. ব্যবহারকারীর অধিকার" },
    { id: "children", label: "৮. শিশুদের গোপনীয়তা" },
    { id: "updates", label: "৯. নীতি আপডেট" },
    { id: "contact", label: "১০. যোগাযোগ" },
];

export default function PrivacyPolicyPage() {
    const currentFormattedDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans">

            {/* 1. Hero Section */}
            <header className="border-b border-slate-100 bg-slate-50/50 py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 text-[#35858E] font-bold text-sm uppercase tracking-wider mb-3">
                        <Shield className="w-5 h-5" />
                        <span>বিশ্বাস ও নিরাপত্তা</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
                        গোপনীয়তা নীতি
                    </h1>
                    <p className="text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed">
                        মিলবেতে, আমরা আপনার গোপনীয়তাকে সম্মান করি এবং আপনার ব্যক্তিগত তথ্য সুরক্ষিত করতে প্রতিশ্রুতিবদ্ধ। এই নীতিতে আমাদের ডেটা রুটিনগুলি স্বচ্ছভাবে ব্যাখ্যা করা হয়েছে।
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-600">
                        <span className="w-2 h-2 rounded-full bg-[#35858E] animate-pulse" />
                        <span>সর্বশেষ আপডেট: {currentFormattedDate}</span>
                    </div>
                </div>
            </header>

            {/* Main Content Hub */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">

                    {/* Sticky Sidebar Navigation (Desktop Only) */}
                    <aside className="hidden lg:block lg:col-span-1 sticky top-28 border border-slate-200/60 rounded-2xl p-4 bg-white shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-4 mb-3">সূচিপত্র</p>
                        <PrivacyNavigation items={NAVIGATION_ITEMS} />
                    </aside>

                    {/* Privacy Policy Documents Section */}
                    <div className="col-span-1 lg:col-span-3 space-y-8">

                        {/* Introduction */}
                        <SectionCard id="introduction" icon={<UserCheck />} label="১. ভূমিকা">
                            <p>
                                মিলবেতে স্বাগতম। এই গোপনীয়তা নীতি আমাদের মার্কেটপ্লেস অ্যাপ্লিকেশন জুড়ে ব্যবহৃত ডেটা সংগ্রহ ও প্রক্রিয়াকরণ পদ্ধতি নিয়ন্ত্রণ করে। একটি অ্যাকাউন্ট রেজিস্টার করে, একাডেমিক বই লিস্টিং আপলোড করে, বা রিকোয়েস্ট ইন্টারঅ্যাকশন শুরু করে, আপনি স্পষ্টভাবে স্বীকার করেন এবং এখানে উল্লেখিত ফ্রেমওয়ার্কে সম্মত হন।
                            </p>
                            <p>
                                এই নীতি মিলবের পিয়ার-টু-পিয়ার কাঠামোর মধ্যে সমস্ত রেজিস্টার্ড অ্যাকাউন্ট, পরিদর্শক শিক্ষার্থী এবং ব্যক্তিদের জন্য প্রযোজ্য।
                            </p>
                        </SectionCard>

                        {/* Information We Collect */}
                        <SectionCard id="collection" icon={<Database />} label="২. তথ্য সংগ্রহ">
                            <p>
                                মিলবে কঠোরভাবে একাডেমিক স্ট্যাটাস যাচাই এবং নিরাপদ হ্যান্ডওভার সম্পন্ন করার জন্য প্রয়োজনীয় ক্রিয়াক্ষম প্যারামিটারের জন্য ডেটা সংগ্রহ সীমিত করে। আমরা সংগ্রহ করি:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-600">
                                <li><strong>Account শংসাপত্র:</strong> পুরো নাম, যাচাইকৃত Email ঠিকানা, এবং Better Auth ইন্টিগ্রেশনের মাধ্যমে তৈরি ক্রিপ্টোগ্রাফিক টোকেন।</li>
                                <li><strong>যোগাযোগ পথ:</strong> ব্যক্তিগত ফোন নম্বর, কেবল একটি বিনিময় রিকোয়েস্ট যাচাই হওয়ার পর পিয়ার সংযোগের অনুমতি দেওয়ার জন্য প্রয়োজন।</li>
                                <li><strong>কন্টেন্ট প্রোফাইল:</strong> প্রোফাইল ছবি, আপলোড করা বইয়ের চিত্র, শারীরিক অবস্থা লগ, মূল্য মেটাডেটা এবং বই রিকোয়েস্টের সাথে ডায়নামিকভাবে জমা দেওয়া কাঠামোগত বার্তা।</li>
                                <li><strong>প্রযুক্তিগত টেলিমেট্রি:</strong> বেনামি ব্যবহার বিশ্লেষণ, বিস্তৃত অবস্থান প্যারামিটার এবং নিরাপদ সেশন শনাক্তকারী।</li>
                            </ul>
                        </SectionCard>

                        {/* How We Use Information */}
                        <SectionCard id="usage" icon={<Eye />} label="৩. তথ্য ব্যবহার">
                            <p>
                                আমরা অতিরিক্ত তথ্য সংগ্রহ করি না। আপনার প্রোফাইল মেট্রিক্স নির্বাচনীভাবে ব্যবহার করা হয়:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-600">
                                <li>অ্যাকাউন্ট নিরাপদে সরবরাহ করা এবং প্রমাণীকরণ স্টেট নির্বিঘ্নে পরিচালনা করা।</li>
                                <li>বিশ্ববিদ্যালয় ট্যাগ এবং ভৌগোলিক প্যারামিটার অনুযায়ী বইয়ের লিস্টিং সঠিকভাবে প্রদর্শন করা।</li>
                                <li>লেনদেনমূলক বই রিকোয়েস্ট প্রক্রিয়াকরণ এবং রিয়েল-টাইম পুশ ইভেন্টের মাধ্যমে সিস্টেম ব্যবহারকারীদের সতর্ক করা।</li>
                                <li>প্রশাসনিক ড্যাশবোর্ড ফ্লো অপ্টিমাইজ করা এবং সামগ্রিক অ্যাপ্লিকেশন লোডিং গতি বিশ্লেষণ করা।</li>
                                <li>প্রতারণামূলক ডাবল-লিস্টিং, স্প্যাম বট সেটআপ এবং ক্ষতিকারক একাডেমিক পোস্টিং প্রশমিত করা।</li>
                            </ul>
                        </SectionCard>

                        {/* Sharing Information */}
                        <SectionCard id="sharing" icon={<Share2 />} label="৪. আপনার তথ্য শেয়ারিং">
                            <p className="font-semibold text-slate-900">
                                মিলবে মৌলিকভাবে গ্যারান্টি দেয় যে আমরা কখনও বাহ্যিক বিজ্ঞাপন এজেন্সিগুলিতে ব্যবহারকারী ডেটা প্রোফাইল বিক্রি, ভাড়া বা মোনেটাইজ করি না।
                            </p>
                            <p>
                                ডেটা বিতরণ কেবল নিম্নলিখিত বিচ্ছিন্ন শর্তাবলীর অধীনে ঘটে:
                            </p>
                            <ol className="list-decimal pl-5 space-y-2 mt-2 text-slate-600">
                                <li><strong>পিয়ার বিনিময়:</strong> যোগাযোগ লিস্টিং (ফোন নম্বর) তাৎক্ষণিকভাবে আনলক হয় এবং কেবল উভয় পক্ষের জন্য *কেবল* একটি বই মালিক একটি রিকোয়েস্ট কার্ডে গ্রহণ করার পর।</li>
                                <li><strong>অবকাঠামো সত্তা:</strong> প্রয়োজনীয় ভেরিয়েবল প্ল্যাটফর্ম আপটাইম সমর্থনকারী বিশ্বস্ত সার্ভার হাব (MongoDB ক্লাস্টার, হোস্টিং ব্যাকএন্ড) এর সাথে নিরাপদে ইন্টারফেস করতে পারে।</li>
                                <li><strong>আইনি প্রয়োজনীয়তা:</strong> বাংলাদেশের মধ্যে স্ট্যাটোরি আইন বা নিয়ন্ত্রক কর্তৃপক্ষ দ্বারা আনুষ্ঠানিকভাবে বাধ্য করা হলে তথ্য প্রকাশ করা হতে পারে।</li>
                            </ol>
                        </SectionCard>

                        {/* Cookies */}
                        <SectionCard id="cookies" icon={<Cookie />} label="৫. কুকি নীতি">
                            <p>
                                মিলবে অপারেশনাল সামঞ্জস্য বজায় রাখতে ন্যূনতম, অত্যন্ত নিরাপদ কুকি ব্যবহার করে। এগুলির মধ্যে রয়েছে:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-600">
                                <li><strong>প্রমাণীকরণ কুকি:</strong> পুনরাবৃত্তি শংসাপত্র চাওয়া ছাড়াই বর্তমান শিক্ষার্থী লগ স্টেট ট্র্যাক করতে নিরাপদে প্রশাসিত।</li>
                                <li><strong>পছন্দ কুকি:</strong> সার্চ ফিল্টার, বিশ্ববিদ্যালয় নির্বাচন এবং প্রদর্শন মেট্রিক্স ধরে রাখে।</li>
                            </ul>
                            <p>
                                আপনি আপনার স্থানীয় ওয়েব ব্রাউজার পছন্দের মাধ্যমে কুকি বন্ধ করতে পারেন, যদিও এটি করলে প্রমাণীকরণ রুট অস্থিতিশীল হতে পারে।
                            </p>
                        </SectionCard>

                        {/* Data Security */}
                        <SectionCard id="security" icon={<Lock />} label="৬. ডেটা সিকিউরিটি">
                            <p>
                                ডেটা সিকিউরিটি আমাদের অবকাঠামোতে কাঠামোবদ্ধ। আমাদের ইউজার ইন্টারফেস এবং অভ্যন্তরীণ MongoDB ডেটাবেসের মধ্যে প্রতিটি লেনদেন রাউটিং এন্ড-টু-এন্ড HTTPS এনক্রিপশন প্রোটোকল ব্যবহার করে। আমরা Better Auth ফ্রেমওয়ার্কের মাধ্যমে প্রদত্ত স্তরবিশিষ্ট ডেটাবেস অ্যাক্সেস নিয়ম এবং অপ্টিমাইজ স্বয়ংক্রিয় সিস্টেম প্রয়োগ করি।
                            </p>
                            <p className="text-sm italic text-slate-500">
                                দায়িত্ব অস্বীকার: যদিও আমরা আধুনিক, প্রোডাকশন-গ্রেড সিকিউরিটি আর্কিটেকচার প্রয়োগ করি, কোনো অনলাইন নেটওয়ার্ক স্তর বা স্টোরেজ সিস্টেম কখনও ১০০% নিরাপদ হিসেবে গ্যারান্টি দেওয়া যায় না।
                            </p>
                        </SectionCard>

                        {/* User Rights */}
                        <SectionCard id="rights" icon={<Scale />} label="৭. ব্যবহারকারীর অধিকার">
                            <p>
                                একজন শিক্ষার্থী ব্যবহারকারী হিসেবে, আপনি আপনার আপলোড করা তথ্যের উপর সম্পূর্ণ স্বায়ত্তশাসন ধরে রাখেন। আপনি পারেন:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-600">
                                <li>Profile সেটিংসের মাধ্যমে যেকোনো সময় সরাসরি আপনার ব্যক্তিগত Account তথ্য দেখতে, পরিবর্তন করতে বা আপডেট করতে।</li>
                                <li>আপনার লাইভ ডিরেক্টরি থেকে প্রকাশিত একাডেমিক বইয়ের লিস্টিং তাৎক্ষণিকভাবে সম্পাদনা করতে বা অপসারণ করতে।</li>
                                <li>সাপোর্ট চ্যানেলের সাথে সরাসরি যোগাযোগ করে আমাদের সার্ভার থেকে সম্পূর্ণ Account মুছে ফেলা বা সম্পূর্ণ ডেটা পরিষ্কার রিকোয়েস্ট করতে।</li>
                            </ul>
                        </SectionCard>

                        {/* Children's Privacy */}
                        <SectionCard id="children" icon={<Users />} label="৮. শিশুদের গোপনীয়তা">
                            <p>
                                মিলবে স্পষ্টভাবে তরুণ প্রাপ্তবয়স্ক এবং বিশ্ববিদ্যালয় স্তরের শিক্ষার্থীদের জন্য মাধ্যমিক এবং উচ্চমাধ্যমিক শিক্ষার পাঠ্যবই সুবিধাদানের জন্য কাঠামোবদ্ধ। আমরা সুপারভাইজার তত্ত্বাবধান ছাড়া একাডেমিক পরিপক্কতার আইনি বয়সের নিচে অপ্রাপ্তবয়স্কদের প্রতি ইচ্ছাকৃতভাবে সংগ্রহ বা লক্ষ্য করি না।
                            </p>
                        </SectionCard>

                        {/* Policy Updates */}
                        <SectionCard id="updates" icon={<RefreshCw />} label="৯. নীতি আপডেট">
                            <p>
                                সিকিউরিটি আপডেট বা ইকোসিস্টেম সম্প্রসারণের সাথে মানিয়ে নিতে এই গোপনীয়তা নীতি ফ্রেমওয়ার্ক পরিবর্তন করার অধিকার আমরা সংরক্ষণ করি। যখন উচ্চ-অগ্রাধিকার রূপান্তর ঘটবে, তখন আমরা অ্যাপ্লিকেশন UI ড্যাশবোর্ড জুড়ে সূক্ষ্ম গ্লোবাল সতর্কতার মাধ্যমে ব্যবহারকারীদের অবহিত করব।
                            </p>
                        </SectionCard>

                        {/* Contact Us */}
                        <SectionCard id="contact" icon={<Mail />} label="১০. যোগাযোগ">
                            <p>
                                সরাসরি সিকিউরিটি পর্যালোচনা, আইনি উদ্বেগ বা প্রযুক্তিগত সাপোর্ট রিকোয়েস্টের জন্য, আমাদের প্রশাসন ডেস্কে যোগাযোগ করতে দ্বিধা করবেন না:
                            </p>
                            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/60 inline-block space-y-1 text-sm">
                                <p><strong>Email:</strong> <span className="text-[#35858E]">support@milbe.shop</span></p>
                                <p><strong>প্ল্যাটফর্ম অপারেশন:</strong> মিলবে</p>
                            </div>
                        </SectionCard>

                        {/* Important Notice Highlight Card */}
                        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 flex flex-col sm:flex-row gap-5 items-start mt-12">
                            <div className="p-3 rounded-xl bg-[#35858E]/20 text-[#35858E] shrink-0">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-lg font-bold">আপনার গোপনীয়তা গুরুত্বপূর্ণ</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    মিলবে পিয়ার বিশ্বাস এবং শিক্ষার্থী সহযোগিতার উপর নির্মিত। আমরা বিশ্ববিদ্যালয় জুড়ে চক্রীয় পাঠ্যবই ব্যবহারের জন্য একটি সহলভ্য, পরিবেশ-বান্ধব ফ্রেমওয়ার্ক তৈরি করার সময় আপনার বিবরণ সুরক্ষিত করতে আমাদের কাঠামোগত সম্পদ উৎসর্গ করি।
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

// ==================== Custom Semantic Sub-Card Component ====================

interface SectionCardProps {
    id: string;
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
}

function SectionCard({ id, icon, label, children }: SectionCardProps) {
    return (
        <section
            id={id}
            className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 space-y-4 hover:border-[#35858E]/40 hover:shadow-sm transition-all duration-200 scroll-mt-6"
        >
            <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-[#35858E]/10 text-[#35858E] flex items-center justify-center shrink-0 [&_svg]:w-5 [&_svg]:h-5">
                    {icon}
                </div>
                <h2 className="text-xl font-bold text-slate-900">{label}</h2>
            </div>
            <div className="text-sm md:text-base text-slate-600 space-y-3 leading-relaxed">
                {children}
            </div>
        </section>
    );
}