import React from "react";
import { Metadata } from "next";
import TermsNavigation from "./TermsNavigation";
import {
    FileText,
    UserCheck,
    ShieldAlert,
    BookOpen,
    Send,
    Award,
    AlertOctagon,
    Layers,
    AlertTriangle,
    UserX,
    RefreshCw,
    Mail,
    Heart,
    Banknote,
    Truck,
    Copyright,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Terms & Conditions | Milbe",
    description:
        "মিলবে প্ল্যাটফর্ম ব্যবহারের নিয়মাবলী, আইনি শর্তাবলী ও ব্যবহারকারীর দায়িত্ব সম্পর্কে জানুন।",
};

const NAVIGATION_ITEMS = [
    { id: "acceptance", label: "১. শর্তাবলী গ্রহণ" },
    { id: "eligibility", label: "২. যোগ্যতা ও বয়সসীমা" },
    { id: "accounts", label: "৩. ব্যবহারকারী অ্যাকাউন্ট" },
    { id: "listings", label: "৪. বইয়ের লিস্টিং ও তথ্য" },
    { id: "requests", label: "৫. বইয়ের রিকোয়েস্ট ও যোগাযোগ" },
    { id: "payments", label: "৬. লেনদেন ও মূল্য পরিশোধ" },
    { id: "delivery", label: "৭. বই হ্যান্ডওভার ও ডেলিভারি" },
    { id: "responsibilities", label: "৮. ব্যবহারকারীর দায়িত্ব" },
    { id: "prohibited", label: "৯. নিষিদ্ধ কার্যকলাপ" },
    { id: "ownership", label: "১০. কন্টেন্ট ও স্বত্বাধিকার" },
    { id: "liability", label: "১১. দায়ের সীমাবদ্ধতা" },
    { id: "suspension", label: "১২. অ্যাকাউন্ট স্থগিতকরণ" },
    { id: "changes", label: "১৩. শর্তাবলী পরিবর্তন" },
    { id: "contact", label: "১৪. যোগাযোগ" },
];

export default function TermsAndConditionsPage() {
    const currentFormattedDate = new Date().toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans">
            {/* Hero Section */}
            <header className="border-b border-slate-100 bg-slate-50/50 py-10 sm:py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2.5 text-[#35858E] font-bold text-xs sm:text-sm uppercase tracking-wider mb-2.5">
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>আইনি নীতিমালা</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3 sm:mb-4">
                        ব্যবহারের শর্তাবলী (Terms & Conditions)
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">
                        মিলবে (Milbe) প্ল্যাটফর্মটি ব্যবহারের পূর্বে দয়া করে এই শর্তাবলী গুরুত্ব সহকারে পড়ে নিন। আমাদের প্ল্যাটফর্মে বই কেনাবেচা, আদান-প্রদান বা ব্রাউজ করার মাধ্যমে আপনি এই শর্তাবলীতে সম্মতি প্রদান করছেন।
                    </p>
                    <div className="mt-5 sm:mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-600 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#35858E] animate-pulse" />
                        <span>সর্বশেষ আপডেট: {currentFormattedDate}</span>
                    </div>
                </div>
            </header>

            {/* Main Content Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12 items-start">

                    {/* Mobile & Desktop Navigation Sidebar Container */}
                    <aside className="lg:col-span-1 lg:sticky lg:top-28 lg:border lg:border-slate-200/80 lg:rounded-2xl lg:p-4 lg:bg-white lg:shadow-sm">
                        <p className="hidden lg:block text-xs font-bold uppercase tracking-wider text-slate-400 px-4 mb-3">
                            সূচিপত্র
                        </p>
                        <TermsNavigation items={NAVIGATION_ITEMS} />
                    </aside>

                    {/* Terms Content Cards */}
                    <div className="col-span-1 lg:col-span-3 space-y-6 sm:space-y-8">

                        {/* 1. Acceptance of Terms */}
                        <TermsCard id="acceptance" icon={<UserCheck />} label="১. শর্তাবলী গ্রহণ">
                            <p>
                                মিলবে (Milbe)-তে রেজিস্ট্রেশন করে, লগইন করে বা প্ল্যাটফর্মের যেকোনো সেবা (যেমন: বই পোস্ট দেখা, বই রিকোয়েস্ট করা) ব্যবহার করে আপনি স্বীকার করছেন যে আপনি এই শর্তাবলী পড়েছেন, বুঝেছেন এবং তা মেনে চলতে বাধ্য থাকবেন।
                            </p>
                            <p>
                                আপনি যদি এই আইনি শর্তাবলীতে সম্মত না হন, তবে প্ল্যাটফর্মে কোনো বইয়ের লিস্টিং তৈরি করা বা অন্য কোনো ব্যবহারকারীর সাথে যোগাযোগ করা থেকে বিরত থাকুন।
                            </p>
                        </TermsCard>

                        {/* 2. Eligibility */}
                        <TermsCard id="eligibility" icon={<ShieldAlert />} label="২. যোগ্যতা ও বয়সসীমা">
                            <p>
                                মিলবে মূলত স্কুল, কলেজ এবং বিশ্ববিদ্যালয়ের শিক্ষার্থীদের জন্য শিক্ষামূলক বই বিনিময়ের একটি উন্মুক্ত মাধ্যম।
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-600">
                                <li>মিলবে ব্যবহারের জন্য সুনির্দিষ্ট কোনো বয়সসীমা নেই। শিক্ষার্থীসহ যেকোনো বয়সের মানুষ এই প্ল্যাটফর্ম ব্যবহার করতে পারবেন।</li>
                                <li>অ্যাবাউট বা প্রোফাইল তৈরির সময় ব্যবহারকারীকে তার সঠিক তথ্য প্রদান করতে হবে।</li>
                                <li>আপনার অ্যাকাউন্টের পাসওয়ার্ড ও ব্যক্তিগত সিকিউরিটি বজায় রাখার দায়িত্ব সম্পূর্ণ আপনার নিজের।</li>
                            </ul>
                        </TermsCard>

                        {/* 3. User Accounts */}
                        <TermsCard id="accounts" icon={<Award />} label="৩. ব্যবহারকারী অ্যাকাউন্ট">
                            <p>
                                প্ল্যাটফর্মের গুণগত মান বজায় রাখতে একজন ব্যক্তি কেবল **একটি নিজস্ব অ্যাকাউন্ট** পরিচালনা করতে পারবেন। কোনো ধরনের প্রতারণা বা সিস্টেমের অপব্যবহারের উদ্দেশ্যে ফেক/ডামি অ্যাকাউন্ট তৈরি করা কঠোরভাবে নিষিদ্ধ।
                            </p>
                            <p>
                                আপনার নিবন্ধিত অ্যাকাউন্ট থেকে পরিচালিত সমস্ত কর্মকাণ্ড, বইয়ের পোস্ট ও মেসেজের সার্বিক দায়ভার আপনাকে গ্রহণ করতে হবে।
                            </p>
                        </TermsCard>

                        {/* 4. Book Listings */}
                        <TermsCard id="listings" icon={<BookOpen />} label="৪. বইয়ের লিস্টিং ও তথ্য">
                            <p>
                                যেকোনো বই বিক্রয় বা দানের জন্য পোস্ট করার সময় বিক্রেতা পোস্টের সমস্ত তথ্যের সঠিকতার দায়িত্ব নিবেন। প্রতিটি পোস্টে নিম্নলিখিত বিষয়গুলো নিশ্চিত করতে হবে:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-600">
                                <li><strong>সঠিক নাম ও বিবরণ:</strong> বইয়ের মূল প্রচ্ছদের সাথে মিলিয়ে শিরোনাম ও বিবরণ লিখতে হবে।</li>
                                <li><strong>বইয়ের প্রকৃত অবস্থা:</strong> বইটির বর্তমান শারীরিক অবস্থা (যেমন: ছেঁড়া পাতা, দাগ বা হাইলাইট ইত্যাদি) সৎভাবে উল্লেখ করতে হবে।</li>
                                <li><strong>প্রকৃত ছবি:</strong> ইন্টারনেট থেকে সংগৃহীত ছবি বা স্টক ফটোর পরিবর্তে বইটির আসল ছবি তুলে আপলোড করতে হবে।</li>
                            </ul>
                            <p>
                                কোনো বিভ্রান্তিকর তথ্য প্রদান করা বা বইয়ের দোকানে থাকা কমার্শিয়াল বা পাইকারি পশরা পোস্ট হিসেবে প্রকাশ করা মিলবে-র নীতিমালার পরিপন্থী।
                            </p>
                        </TermsCard>

                        {/* 5. Book Requests */}
                        <TermsCard id="requests" icon={<Send />} label="৫. বইয়ের রিকোয়েস্ট ও যোগাযোগ">
                            <p>
                                শিক্ষার্থীরা তাদের প্রয়োজনীয় বইয়ের পোস্ট দেখে সহজে রিকোয়েস্ট পাঠাতে পারেন। তবে, বিক্রেতা বা বইয়ের মালিক কার রিকোয়েস্ট গ্রহণ বা প্রত্যাখ্যান করবেন সে ব্যাপারে সম্পূর্ণ সিদ্ধান্ত নেওয়ার স্বাধীনতা রাখেন।
                            </p>
                            <p>
                                <strong>গোপনীয়তা সুরক্ষা:</strong> ব্যবহারকারীদের ব্যক্তিগত যোগাযোগ নম্বর সুরক্ষিত থাকে। বিক্রেতা স্পষ্টভাবে রিকোয়েস্ট একসেপ্ট না করা পর্যন্ত এই নম্বর প্রকাশ পায় না। মিলবে কোনো পোস্টের নিশ্চয়তা বা রিকোয়েস্ট গ্রহণের গ্যারান্টি দেয় না।
                            </p>
                        </TermsCard>

                        {/* 6. Payments Disclaimer */}
                        <TermsCard id="payments" icon={<Banknote />} label="৬. লেনদেন ও মূল্য পরিশোধ">
                            <p className="font-semibold text-slate-900">
                                মিলবে কোনো পেমেন্ট গেটওয়ে পরিচালনা করে না এবং প্ল্যাটফর্মের মাধ্যমে সরাসরি কোনো টাকা-পয়সা লেনদেন প্রসেস করে না।
                            </p>
                            <p>
                                বইয়ের মূল্য নির্ধারণ, অর্থ পরিশোধের মাধ্যম (যেমন: নগদ টাকা, বিকাশ বা অন্য উপায়) সম্পূর্ণরূপে ক্রেতা ও বিক্রেতার পারস্পরিক আলোচনার মাধ্যমে নির্ধারিত হবে। কোনো প্রকার আর্থিক লেনদেন সংক্রান্ত প্রতারণা বা আর্থিক বিরোধের দায় মিলবে বহন করবে না।
                            </p>
                        </TermsCard>

                        {/* 7. Delivery & Handover */}
                        <TermsCard id="delivery" icon={<Truck />} label="৭. বই হ্যান্ডওভার ও ডেলিভারি">
                            <p>
                                মিলবে নিজস্ব কোনো বই ডেলিভারি সার্ভিস বা লজিস্টিক সেবা প্রদান করে না।
                            </p>
                            <p>
                                বই আদান-প্রদানের মাধ্যম, সময় এবং স্থান ক্রেতা ও বিক্রেতা নিজেদের সুবিধামতো কথা বলে ঠিক করবেন। নিরাপদ লেনদেনের জন্য ক্যাম্পাসের মধ্যে বা কোনো পরিচিত জনবহুল স্থানে সরাসরি (In-person) হ্যান্ড-টু-হ্যান্ড বই বিনিময় করার পরামর্শ দেওয়া হয়।
                            </p>
                        </TermsCard>

                        {/* 8. User Responsibilities */}
                        <TermsCard id="responsibilities" icon={<Layers />} label="৮. ব্যবহারকারীর দায়িত্ব">
                            <p>
                                মিলবে ব্যবহারে আপনাকে শালীনতা ও দায়িত্বশীল আচরণ বজায় রাখতে হবে। অন্যান্য শিক্ষার্থীদের সাথে যোগাযোগের সময় ভদ্র আচরণ প্রদর্শন, সত্য তথ্য প্রদান এবং বই বিনিময়ের সময় সহযোগিতাপূর্ণ মনোভাব রাখার জন্য অনুরোধ করা হচ্ছে।
                            </p>
                        </TermsCard>

                        {/* 9. Prohibited Activities */}
                        <TermsCard id="prohibited" icon={<AlertOctagon />} label="৯. নিষিদ্ধ কার্যকলাপ">
                            <p>
                                নিরাপদ ও শিক্ষাবান্ধব পরিবেশ বজায় রাখতে নিচের ক্রিয়াকলাপগুলো কঠোরভাবে নিষিদ্ধ। এসব ক্ষেত্রে সাথে সাথে প্রয়োজনীয় ব্যবস্থা নেওয়া হবে:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                                <ProhibitedItem label="পাইরেটেড বা বেআইনি বইয়ের পিডিএফ/কপি আপলোড করা" />
                                <ProhibitedItem label="ভুয়া বইয়ের তথ্য বা বিভ্রান্তিকর পোস্ট তৈরি করা" />
                                <ProhibitedItem label="অন্য কোনো সদস্যকে হয়রানি বা গালাগাল করা" />
                                <ProhibitedItem label="স্প্যাম মেসেজ পাঠানো বা অহেতুক রিকোয়েস্ট করা" />
                                <ProhibitedItem label="মার্কেটিংয়ের উদ্দেশ্যে অন্যের ফোন নম্বর সংগ্রহ করা" />
                                <ProhibitedItem label="প্ল্যাটফর্মের নিরাপত্তা বিঘ্নিত করার চেষ্টা করা" />
                            </div>
                        </TermsCard>

                        {/* 10. Content Ownership & Copyright */}
                        <TermsCard id="ownership" icon={<Copyright />} label="১০. কন্টেন্ট ও স্বত্বাধিকার">
                            <p>
                                আপনার পোস্ট করা টেক্সট ও বইয়ের ছবির স্বত্বাধিকার বা কপিরাইট আপনার নিজের। তবে, মিলবে-তে পোস্ট করার মাধ্যমে আপনি প্ল্যাটফর্মটিকে সেই ছবি ও তথ্য প্রদর্শনের অনুমতি দিচ্ছেন।
                            </p>
                            <p>
                                কোনো ব্যবহারকারী যদি অন্য কোনো ব্যক্তি বা প্রকাশকের কপিরাইট লঙ্ঘন করে কোনো কন্টেন্ট আপলোড করেন এবং মূল সত্ত্বাধিকারী আমাদের রিপোর্ট করেন, তবে মিলবে তা পর্যালোচনা করে দ্রুত অপসারণের আইনি অধিকার রাখে।
                            </p>
                        </TermsCard>

                        {/* 11. Limitation of Liability */}
                        <TermsCard id="liability" icon={<AlertTriangle />} label="১১. দায়ের সীমাবদ্ধতা">
                            <p className="font-semibold text-slate-900">
                                মিলবে কেবল শিক্ষার্থীদের মধ্যে বই বিনিময়ের একটি মাধ্যম হিসেবে কাজ করে। মিলবে কোনো বইয়ের ভৌত মালিক নয়, ডেলিভারি প্রদানকারী নয় এবং সরাসরি আর্থিক লেনদেনকারী নয়।
                            </p>
                            <p>
                                ফলে মিলবে নিম্নলিখিত বিষয়ের জন্য কোনো দায়ভার গ্রহণ করবে না:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-slate-600">
                                <li>ক্রেতা ও বিক্রেতার নিজেদের মধ্যকার ব্যক্তিগত বা আর্থিক কোনো বিরোধ।</li>
                                <li>বইয়ের ভেতরের পৃষ্ঠার অবস্থা, মান বা ভুল তথ্যের জটিলতা।</li>
                                <li>সরাসরি দেখা করার সময় কোনো প্রকার ব্যক্তিগত দুর্ঘটনা, আচরণগত অসঙ্গতি বা অনাকাঙ্ক্ষিত পরিস্থিতি।</li>
                            </ul>
                        </TermsCard>

                        {/* 12. Account Suspension */}
                        <TermsCard id="suspension" icon={<UserX />} label="১২. অ্যাকাউন্ট স্থগিতকরণ">
                            <p>
                                কোনো ব্যবহারকারী মিলবে-র নীতিমালা লঙ্ঘন করলে, প্রতারণামূলক কাজের সাথে জড়িত থাকলে বা অন্য ব্যবহারকারীদের ক্ষতি সাধন করলে মিলবে কর্তৃপক্ষ কোনো পূর্ব সতর্কবার্তা ছাড়াই উক্ত ব্যবহারকারীর অ্যাকাউন্ট সাময়িক বা স্থায়ীভাবে বরখাস্ত (Suspend/Ban) করার পূর্ণ অধিকার রাখে।
                            </p>
                        </TermsCard>

                        {/* 13. Changes to Terms */}
                        <TermsCard id="changes" icon={<RefreshCw />} label="১৩. শর্তাবলী পরিবর্তন">
                            <p>
                                প্ল্যাটফর্মের উন্নয়ন বা সরকারি নীতিমালার আলোকে আমরা যেকোনো সময় ব্যবহারের শর্তাবলী পরিবর্তন বা পরিমার্জন করার অধিকার রাখি। সংশোধিত শর্তাবলী এই পাতায় প্রকাশিত হওয়ার পরও অ্যাপ/ওয়েবসাইট ব্যবহার অব্যাহত রাখার অর্থ হলো আপনি নতুন শর্তাবলীতে সম্মতি জানিয়েছেন।
                            </p>
                        </TermsCard>

                        {/* 14. Contact Us */}
                        <TermsCard id="contact" icon={<Mail />} label="১৪. যোগাযোগ">
                            <p>
                                শর্তাবলী সম্পর্কে কোনো প্রশ্ন থাকলে, কোনো নীতি লঙ্ঘনের রিপোর্ট করতে বা যেকোনো সহায়তার জন্য আমাদের ইমেইলে যোগাযোগ করুন:
                            </p>
                            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 inline-block space-y-1 text-sm w-full sm:w-auto">
                                <p><strong>ইমেইল:</strong> <span className="text-[#35858E] font-medium break-all sm:break-normal">amirulislam9.e@gmail.com</span></p>
                                <p><strong>হেল্পডেস্ক:</strong> মিলবে টিমস</p>
                            </div>
                        </TermsCard>

                        {/* Bottom Highlight Card */}
                        <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 md:p-8 border border-slate-800 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start mt-8 sm:mt-12">
                            <div className="p-3 rounded-xl bg-[#35858E]/20 text-[#35858E] shrink-0">
                                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div className="space-y-1.5 sm:space-y-2">
                                <h4 className="text-base sm:text-lg font-bold">সুস্থ পরিবেশ ও পারস্পরিক শ্রদ্ধা</h4>
                                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                                    মিলবে-র মূল উদ্দেশ্য শিক্ষার্থীদের বইয়ের খরচ কমানো এবং পারস্পরিক সহযোগিতার একটি সুন্দর সংস্কৃতি তৈরি করা। আসুন আমরা সবাই সৎ ও দায়িত্বশীল আচরণের মাধ্যমে একে অপরকে শিক্ষাযাত্রায় সাহায্য করি।
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

// Custom Sub-components
interface TermsCardProps {
    id: string;
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
}

function TermsCard({ id, icon, label, children }: TermsCardProps) {
    return (
        <section
            id={id}
            className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 md:p-8 space-y-3.5 sm:space-y-4 hover:border-[#35858E]/40 hover:shadow-sm transition-all duration-200 scroll-mt-20 lg:scroll-mt-28"
        >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#35858E]/10 text-[#35858E] flex items-center justify-center shrink-0 [&_svg]:w-4 [&_svg]:h-4 sm:[&_svg]:w-5 sm:[&_svg]:h-5">
                    {icon}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">{label}</h2>
            </div>
            <div className="text-xs sm:text-sm md:text-base text-slate-600 space-y-2.5 sm:space-y-3 leading-relaxed">
                {children}
            </div>
        </section>
    );
}

function ProhibitedItem({ label }: { label: string }) {
    return (
        <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-red-50/40 border border-red-100 rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-slate-700">{label}</span>
        </div>
    );
}