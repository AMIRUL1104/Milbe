import React from "react";
import { Metadata } from "next";
import PrivacyNavigation from "@/app/(additional)/privacy/PrivacyNavigation";
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
    AlertCircle,
    Image as ImageIcon,
    CreditCard,
    Trash2
} from "lucide-react";

export const metadata: Metadata = {
    title: "গোপনীয়তা নীতি | Milbe",
    description: "মিলবে কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত রাখে তা বিস্তারিত জানুন।",
};

// ১২টি ক্যাটাগরির আপডেট নেভিগেশন তালিকা
const NAVIGATION_ITEMS = [
    { id: "introduction", label: "১. ভূমিকা" },
    { id: "collection", label: "২. তথ্য সংগ্রহ" },
    { id: "usage", label: "৩. তথ্যের ব্যবহার" },
    { id: "image-hosting", label: "৪. মিডিয়া ও ছবি হোস্টিং" },
    { id: "sharing", label: "৫. তথ্য শেয়ারিং" },
    { id: "no-payment", label: "৬. পেমেন্ট ও ডেলিভারি নীতি" },
    { id: "cookies", label: "৭. কুকি নীতি" },
    { id: "security", label: "৮. ডেটা নিরাপত্তা" },
    { id: "user-rights", label: "৯. ব্যবহারকারীর অধিকার ও অ্যাকাউন্ট ডিলিট" },
    { id: "children", label: "১০. শিশুদের গোপনীয়তা" },
    { id: "updates", label: "১১. নীতি পরিবর্তন" },
    { id: "contact", label: "১২. যোগাযোগ" },
];

export default function PrivacyPolicyPage() {
    const currentFormattedDate = new Date().toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans pb-16">
            {/* 1. Hero Header Section */}
            <header className="border-b border-slate-100 bg-slate-50/60 py-10 md:py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2.5 text-[#35858E] font-bold text-xs md:text-sm uppercase tracking-wider mb-2.5">
                        <Shield className="w-4 h-4 md:w-5 md:h-5" />
                        <span>বিশ্বাস ও নিরাপত্তা</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
                        গোপনীয়তা নীতি (Privacy Policy)
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
                        মিলবে-তে আপনার তথ্যের সুরক্ষা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। আপনি কীভাবে আমাদের প্ল্যাটফর্ম ব্যবহার করবেন এবং আমরা আপনার তথ্য কীভাবে গোপন রাখি তা এখানে সহজ ও স্বচ্ছ ভাষায় তুলে ধরা হলো।
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200/80 text-xs font-semibold text-slate-600 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#35858E] animate-pulse" />
                        <span>সর্বশেষ আপডেট: {currentFormattedDate}</span>
                    </div>
                </div>
            </header>

            {/* Main Content Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-start">

                    {/* Sticky Navigation Sidebar (Desktop & Mobile Dropdown) */}
                    <aside className="lg:col-span-1 lg:sticky lg:top-24 border-0 lg:border border-slate-200/70 rounded-2xl lg:p-4 bg-transparent lg:bg-white shadow-none lg:shadow-sm">
                        <p className="hidden lg:block text-xs font-bold uppercase tracking-wider text-slate-400 px-4 mb-3">
                            সূচিপত্র (Sections)
                        </p>
                        <PrivacyNavigation items={NAVIGATION_ITEMS} />
                    </aside>

                    {/* Policy Details Cards */}
                    <main className="col-span-1 lg:col-span-3 space-y-6 md:space-y-8">

                        {/* 1. Introduction */}
                        <SectionCard id="introduction" icon={<UserCheck />} label="১. ভূমিকা">
                            <p>
                                মিলবে (Milbe.shop)-তে আপনাকে স্বাগতম। এটি বাংলাদেশের শিক্ষার্থী ও পাঠকদের জন্য একটি উন্মুক্ত ও নিরাপদ বই আদান-প্রদান এবং কেনাবেচার প্ল্যাটফর্ম।
                            </p>
                            <p>
                                আপনি যখন মিলবে-তে অ্যাকাউন্ট তৈরি করেন, বইয়ের লিস্টিং আপলোড করেন কিংবা বইয়ের জন্য রিকোয়েস্ট পাঠান, তখন আপনি এই গোপনীয়তা নীতির শর্তাবলীতে সম্মতি প্রদান করেন। আমাদের মূল লক্ষ্য হলো সর্বনিম্ন তথ্য সংগ্রহ করে আপনাকে সর্বোচ্চ নিরাপদ ও নিরবচ্ছিন্ন অভিজ্ঞতা দেওয়া।
                            </p>
                        </SectionCard>

                        {/* 2. Information Collection */}
                        <SectionCard id="collection" icon={<Database />} label="২. আমরা যেসকল তথ্য সংগ্রহ করি">
                            <p>
                                মিলবে শুধুমাত্র প্ল্যাটফর্মটি সঠিকভাবে পরিচালনা করতে এবং শিক্ষার্থী বা ব্যবহারকারীদের মধ্যকার সঠিক যোগাযোগ নিশ্চিত করার জন্য প্রয়োজনীয় তথ্য সংগ্রহ করে:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-600">
                                <li><strong>অ্যাকাউন্ট তথ্য:</strong> আপনি যখন Google Account বা ইমেইলের মাধ্যমে লগইন করেন, তখন আমরা আপনার নাম, ইমেইল ঠিকানা এবং প্রোফাইল ছবি পাই।</li>
                                <li><strong>যোগাযোগের বিবরণ:</strong> আপনার ফোন নম্বর বা হোয়াটসঅ্যাপ নম্বর (যা আপনি ইচ্ছে করলে প্রদান করেন), যাতে বই আদান-প্রদানের সময় উভয় পক্ষ সহজে যোগাযোগ করতে পারেন।</li>
                                <li><strong>বইয়ের পোস্ট ও কন্টেন্ট:</strong> আপলোড করা বইয়ের ছবি, বিবরণ, স্থান (জেলা/উপজেলা), কলেজ বা বিশ্ববিদ্যালয়ের নাম এবং নির্ধারিত মূল্য।</li>
                                <li><strong>পছন্দের তথ্য:</strong> আপনার সার্চ ফিল্টার এবং সংরক্ষিত লোকেশন তথ্য।</li>
                            </ul>
                        </SectionCard>

                        {/* 3. Information Usage */}
                        <SectionCard id="usage" icon={<Eye />} label="৩. সংগৃহীত তথ্যের ব্যবহার">
                            <p>
                                আমরা আপনার সংগৃহীত তথ্য শুধুমাত্র প্লাটফর্মের মূল কাজের জন্য ব্যবহার করে থাকি:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-600">
                                <li>আপনার অ্যাকাউন্টটি সুরক্ষিত রাখা এবং সেশন পরিচালনা করা।</li>
                                <li>আপনার কাছাকাছি এলাকার বইগুলো সহজে খুঁজে পেতে সাহায্য করা।</li>
                                <li>বইয়ের রিকোয়েস্ট পাঠানো বা গ্রহণ করার সাথে সাথে রিয়েল-টাইম নোটিফিকেশন প্রদান করা।</li>
                                <li>স্প্যাম পোস্ট, ভুয়া অ্যাকাউন্ট এবং ক্ষতিকারক কার্যক্রম প্রতিরোধ করা।</li>
                            </ul>
                        </SectionCard>

                        {/* 4. Media & Image Hosting */}
                        <SectionCard id="image-hosting" icon={<ImageIcon />} label="৪. মিডিয়া ও ছবি হোস্টিং (ImgBB)">
                            <p>
                                মিলবে প্ল্যাটফর্মে আপলোড করা সকল বইয়ের ছবি ও প্রোফাইল ইমেজ নিরাপদ থার্ড-পার্টি সার্ভিস <strong>ImgBB</strong>-এর সার্ভারে হোস্ট করা হয়।
                            </p>
                            <p>
                                আমাদের নিজস্ব মূল ডেটাবেসে ভারী ছবি সংরক্ষণ করা হয় না। তাই আপনার দেওয়া ছবিগুলো ImgBB-এর প্রাইভেসি স্ট্যান্ডার্ড মেনে নিরাপদ থাকে। আপনি যেকোনো সময় আপনার পোস্ট মুছে ফেললে তা প্ল্যাটফর্মের লাইভ ভিউ থেকে সরিয়ে দেওয়া হয়।
                            </p>
                        </SectionCard>

                        {/* 5. Information Sharing */}
                        <SectionCard id="sharing" icon={<Share2 />} label="৫. তথ্য শেয়ারিং ও গোপনীয়তা">
                            <p className="font-bold text-slate-900">
                                আমরা স্পষ্ট অঙ্গীকার করছি: মিলবে কখনো কোনো বিজ্ঞাপন সংস্থা বা তৃতীয় পক্ষের কাছে ব্যবহারকারীর ব্যক্তিগত তথ্য বিক্রি বা বাণিজ্যিক উদ্দেশ্যে শেয়ার করে না।
                            </p>
                            <p>
                                তথ্য শুধুমাত্র নিচের নির্দিষ্ট ক্ষেত্রগুলোতে প্রকাশ পায়:
                            </p>
                            <ol className="list-decimal pl-5 space-y-2 mt-2 text-slate-600">
                                <li><strong>বই লেনদেনের সময় (Peer-to-Peer):</strong> আপনি যখন কোনো বইয়ের রিকোয়েস্ট পাঠান এবং পোস্টদাতা সেই রিকোয়েস্টটি একসেপ্ট (Accept) করেন, শুধুমাত্র তখনই আপনাদের উভয়ের যোগাযোগের নম্বর আনলক বা দৃশ্যমান হয়। রিকোয়েস্ট একসেপ্ট হওয়ার আগে আপনার ফোন নম্বর সম্পূর্ণ গোপন থাকে।</li>
                                <li><strong>আইনি বাধ্যবাধকতা:</strong> আইন প্রয়োগকারী সংস্থা বা বাংলাদেশের প্রচলিত আইন অনুযায়ী বাধ্য হলে তথ্য প্রদান করা হতে পারে।</li>
                            </ol>
                        </SectionCard>

                        {/* 6. Payment & Delivery Disclaimer */}
                        <SectionCard id="no-payment" icon={<CreditCard />} label="৬. পেমেন্ট ও ডেলিভারি সংক্রান্ত নীতি">
                            <p>
                                <strong>ইন-অ্যাপ পেমেন্ট বা ডেলিভারি মুক্ত:</strong> মিলবে নিজস্ব কোনো ইন-অ্যাপ পেমেন্ট গেটওয়ে পরিচালনা করে না এবং অ্যাপের মাধ্যমে কোনো পেমেন্ট গ্রহণ করে না। মিলবের কোনো নিজস্ব ডেলিভারি সার্ভিসও নেই।
                            </p>
                            <p>
                                বই দেওয়া-নেওয়া, মূল্য নির্ধারণ এবং পেমেন্ট সম্পন্ন করার পুরো বিষয়টি ক্রেতা ও বিক্রেতা নিজ দায়িত্বে সরাসরি সম্পন্ন করেন। প্রকাশ্য নিরাপদ স্থানে সরাসরি দেখা করে বই যাচাই-বাছাইপূর্বক টাকা লেনদেন করার জন্য আমরা পরামর্শ দিই।
                            </p>
                        </SectionCard>

                        {/* 7. Cookie Policy */}
                        <SectionCard id="cookies" icon={<Cookie />} label="৭. কুকি (Cookie) নীতি">
                            <p>
                                অ্যাপের পারফর্মেন্স ও ইউজার সেশন বজায় রাখার জন্য আমরা সীমিত পরিমাণ জরুরি কুকি ব্যবহার করি:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-600">
                                <li><strong>অথেনটিকেশন কুকি:</strong> বারবার ইমেইল বা পাসওয়ার্ড দেওয়া ছাড়াই লগইন স্টেট ধরে রাখার জন্য।</li>
                                <li><strong>পছন্দের কুকি:</strong> আপনার ব্রাউজারে সাম্প্রতিক সার্চ বা ফিল্টার ধরে রাখার জন্য।</li>
                            </ul>
                        </SectionCard>

                        {/* 8. Data Security */}
                        <SectionCard id="security" icon={<Lock />} label="৮. ডেটা নিরাপত্তা">
                            <p>
                                আপনার তথ্যের নিরাপত্তা নিশ্চিত করতে মিলবে আধুনিক <strong>HTTPS/SSL এনক্রিপশন</strong> এবং প্রিমিয়াম ডেটাবেস আর্কিটেকচার ব্যবহার করে। পাসওয়ার্ড বা সংবেদনশীল টোকেনগুলো সুরক্ষিতভাবে এনক্রিপ্ট করে প্রক্রিয়াজাত করা হয়।
                            </p>
                        </SectionCard>

                        {/* 9. User Rights & Account Deletion */}
                        <SectionCard id="user-rights" icon={<Trash2 />} label="৯. ব্যবহারকারীর অধিকার ও অ্যাকাউন্ট ডিলিট">
                            <p>
                                মিলবেতে আপনার দেওয়া সকল তথ্যের উপর আপনার পূর্ণ নিয়ন্ত্রণ রয়েছে। আপনি যেকোনো সময় নিচের সুবিধাগুলো উপভোগ করতে পারেন:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-600">
                                <li>আপনার প্রোফাইল তথ্য বা পোস্টের যেকোনো বিবরণ সম্পাদনা ও পরিবর্তন করতে পারবেন।</li>
                                <li><strong>সরাসরি অ্যাকাউন্ট ডিলিট:</strong> কোনো প্রকার সাপোর্ট মেইলে যোগাযোগ করা ছাড়াই আপনার নিজস্ব Profile Settings পেইজে থাকা <strong>{"Delete Account"}</strong> বাটনে ক্লিক করে এক ক্লিকেই সম্পূর্ণ অ্যাকাউন্ট ডিলিট করে দিতে পারবেন।</li>
                                <li>অ্যাকাউন্ট ডিলিট করলে আপনার প্রোফাইল, সমস্ত একটিভ পোস্ট এবং হিস্ট্রি স্থায়ীভাবে মুছে যাবে।</li>
                            </ul>
                        </SectionCard>

                        {/* 10. Children Privacy */}
                        <SectionCard id="children" icon={<Users />} label="১০. শিক্ষার্থীদের উপযোগী ব্যবহার">
                            <p>
                                মিলবে মূলত স্কুল, কলেজ ও বিশ্ববিদ্যালয়ের শিক্ষার্থীদের জন্য ডিজাইন করা হয়েছে। আমরা ইচ্ছাকৃতভাবে শিশুদের ব্যক্তিগত তথ্য সংগ্রহ করি না।
                            </p>
                        </SectionCard>

                        {/* 11. Policy Updates */}
                        <SectionCard id="updates" icon={<RefreshCw />} label="১১. প্রাইভেসী পলিসি আপডেট">
                            <p>
                                সময়ের সাথে প্ল্যাটফর্মের সুবিধার্থে আমরা এই প্রাইভেসী পলিসিতে সংশোধন বা পরিমার্জন আনতে পারি। কোনো গুরুত্বপূর্ণ পরিবর্তন আনা হলে ওয়েবসাইটের নোটিফিকেশন বা ব্যানার নোটিশের মাধ্যমে আপনাকে জানানো হবে।
                            </p>
                        </SectionCard>

                        {/* 12. Contact Us */}
                        <SectionCard id="contact" icon={<Mail />} label="১২. যোগাযোগ">
                            <p>
                                আমাদের প্রাইভেসী পলিসি বা আপনার তথ্য সুরক্ষার বিষয়ে কোনো প্রশ্ন থাকলে আমাদের সাথে ইমেইলে যোগাযোগ করতে পারেন:
                            </p>
                            <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 inline-block space-y-1 text-sm">
                                <p><strong>ইমেইল:</strong> <span className="text-[#35858E] font-medium">support@milbe.shop</span></p>
                                <p><strong>অফিসিয়াল ওয়েবসাইট:</strong> milbe.shop</p>
                            </div>
                        </SectionCard>

                        {/* Highlight Bottom Card */}
                        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 flex flex-col sm:flex-row gap-5 items-start mt-8">
                            <div className="p-3 rounded-xl bg-[#35858E]/20 text-[#35858E] shrink-0">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-lg font-bold">শিক্ষার্থীদের ট্রাস্ট ও নিরাপত্তা আমাদের মূল ভিত্তি</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    মিলবে কেবল একটি বই বিনিময়ের মাধ্যম নয়, এটি পারস্পরিক বিশ্বাসের জায়গা। আপনার তথ্য সুরক্ষিত রেখে আপনাকে একটি ভালো সার্ভিস দেওয়াই আমাদের লক্ষ্য।
                                </p>
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
}

// Sub-Component for Clean Card Rendering (Server-rendered)
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
            className="bg-white border border-slate-200/80 rounded-2xl p-5 md:p-7 space-y-3.5 hover:border-[#35858E]/40 hover:shadow-sm transition-all duration-200 scroll-mt-24"
        >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-[#35858E]/10 text-[#35858E] flex items-center justify-center shrink-0 [&_svg]:w-4.5 [&_svg]:h-4.5 md:[&_svg]:w-5 md:[&_svg]:h-5">
                    {icon}
                </div>
                <h2 className="text-lg md:text-xl font-bold text-slate-900">{label}</h2>
            </div>
            <div className="text-sm md:text-base text-slate-600 space-y-2.5 leading-relaxed">
                {children}
            </div>
        </section>
    );
}