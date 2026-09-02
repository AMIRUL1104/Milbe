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
    Heart
} from "lucide-react";

export const metadata: Metadata = {
    title: "Terms & Conditions | Milbe",
    description: "Read the official user agreements, rules, and responsibilities for using the Milbe academic marketplace.",
};

const NAVIGATION_ITEMS = [
    { id: "acceptance", label: "১. শর্তাবলী গ্রহণ" },
    { id: "eligibility", label: "২. যোগ্যতা" },
    { id: "accounts", label: "৩. ব্যবহারকারী অ্যাকাউন্ট" },
    { id: "listings", label: "৪. বই লিস্টিং" },
    { id: "requests", label: "৫. বই রিকোয়েস্ট" },
    { id: "responsibilities", label: "৬. ব্যবহারকারীর দায়িত্ব" },
    { id: "prohibited", label: "৭. নিষিদ্ধ কার্যকলাপ" },
    { id: "ownership", label: "৮. কন্টেন্ট মালিকানা" },
    { id: "liability", label: "৯. দায় সীমাবদ্ধতা" },
    { id: "suspension", label: "১০. Account স্থগিতাবস্থা" },
    { id: "changes", label: "১১. শর্তাবলী পরিবর্তন" },
    { id: "contact", label: "১২. যোগাযোগ" },
];

export default function TermsAndConditionsPage() {
    const currentFormattedDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans">

            {/* Hero Section */}
            <header className="border-b border-slate-100 bg-slate-50/50 py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 text-[#35858E] font-bold text-sm uppercase tracking-wider mb-3">
                        <FileText className="w-5 h-5" />
                        <span>আইনি কাঠামো</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
                        শর্তাবলী
                    </h1>
                    <p className="text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed">
                        এই শর্তাবলী মিলবে প্ল্যাটফর্মের ব্যবহার নিয়ন্ত্রণ করে। আমাদের সম্প্রদায় সেবা অ্যাক্সেস করার আগে দয়া করে এই নিয়মগুলি ভালোভাবে পর্যালোচনা করুন।
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-600">
                        <span className="w-2 h-2 rounded-full bg-[#35858E] animate-pulse" />
                        <span>সর্বশেষ আপডেট: {currentFormattedDate}</span>
                    </div>
                </div>
            </header>

            {/* Layout Structure */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">

                    {/* Sticky Sidebar (Desktop Only) */}
                    <aside className="hidden lg:block lg:col-span-1 sticky top-28 border border-slate-200/60 rounded-2xl p-4 bg-white shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-4 mb-3">বিভাগসমূহ</p>
                        <TermsNavigation items={NAVIGATION_ITEMS} />
                    </aside>

                    {/* Terms Content Cards */}
                    <div className="col-span-1 lg:col-span-3 space-y-8">

                        {/* 1. Acceptance of Terms */}
                        <TermsCard id="acceptance" icon={<UserCheck />} label="১. শর্তাবলী গ্রহণ">
                            <p>
                                আপনার প্রোফাইল রেজিস্ট্রেশন সম্পন্ন করে, আমাদের অ্যাপ্লিকেশন পোর্টালের মাধ্যমে প্রমাণীকরণ করে, বা পিয়ার লিস্টিংয়ের সাথে ইন্টারঅ্যাক্ট করে, আপনি নিশ্চিত করেন যে আপনি এই শর্তাবলী পড়েছেন, বুঝেছেন এবং সম্পূর্ণ মনোযোগের সাথে এতে সম্মত হন।
                            </p>
                            <p>
                                আপনি যদি স্পষ্টভাবে এই আইনি শর্তাবলী গ্রহণ না করেন, তাহলে আপনি মিলবেতে লিস্টিং তৈরি করতে বা যোগাযোগ লুপ স্থাপন করতে সীমাবদ্ধ।
                            </p>
                        </TermsCard>

                        {/* 2. Eligibility */}
                        <TermsCard id="eligibility" icon={<ShieldAlert />} label="২. যোগ্যতা">
                            <p>
                                মিলবে স্পষ্টভাবে একাডেমিক ওয়ার্কফ্লো সমর্থন করতে নির্মিত। প্ল্যাটফর্মে অংশগ্রহণের জন্য যোগ্য থাকতে, আপনাকে অবশ্যই নিম্নলিখিত প্যারামিটারগুলি পূরণ করতে হবে:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-600">
                                <li>প্রোফাইল সংকলন ধাপের সময় আপনাকে অবশ্যই প্রকৃত ব্যক্তিগত তথ্য প্রদান করতে হবে।</li>
                                <li>এই সেবা মূলত মাধ্যমিক, উচ্চমাধ্যমিক বা বিশ্ববিদ্যা�লয় স্তরের শিক্ষায় নিয়োজিত সক্রিয় শিক্ষার্থীদের জন্য।</li>
                                <li>আপনি সমস্ত ক্রিপ্টোগ্রাফিক Account টোকেন এবং অনুমোদন প্যারামিটার ট্র্যাক এবং সুরক্ষিত রাখার জন্য সম্পূর্ণ ব্যক্তিগত দায়িত্ব বহন করেন।</li>
                            </ul>
                        </TermsCard>

                        {/* 3. User Accounts */}
                        <TermsCard id="accounts" icon={<Award />} label="৩. ব্যবহারকারী অ্যাকাউন্ট">
                            <p>
                                ডেটা সুরক্ষা বজায় রাখতে, প্রতিটি অনন্য পরিচয় ঠিক **একটি ব্যক্তিগত অ্যাকাউন্ট**-এ সীমাবদ্ধ। মডারেশন প্যারামিটার বাইপাস করতে পুনরাবৃত্তি ডুপ্লিকেট প্রোফাইল বা মাধ্যমিক ডামি রেকর্ড তৈরি করা কঠোরভাবে নিষিদ্ধ।
                            </p>
                            <p>
                                আপনার যাচাইকৃত লেআউট থেকে শুরু হওয়া সমস্ত কার্যকলাপ, বই আপডেট এবং রিকোয়েস্ট লগগুলির জন্য আপনি সম্পূর্ণভাবে দায়ী।
                            </p>
                        </TermsCard>

                        {/* 4. Book Listings */}
                        <TermsCard id="listings" icon={<BookOpen />} label="৪. বই লিস্টিং">
                            <p>
                                একাডেমিক লিস্টিং প্রকাশকারী ব্যবহারকারীরা জমা দেওয়া প্যারামিটারগুলির বৈধতার জন্য সম্পূর্ণ, একক দায়িত্ব গ্রহণ করেন। প্রতিটি এন্ট্রি অবশ্যই গ্যারান্টি দিতে হবে:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-600">
                                <li><strong>সঠিক শিরোনাম:</strong> বইয়ের কভার টেক্সটের সাথে মিলিয়ে সুনির্দিষ্ট মেটাডেটা।</li>
                                <li><strong>সৎ অবস্থা:</strong> শারীরিক ক্ষয়, নোট বা হাইলাইটিংয়ের সঠিক উপস্থাপনা।</li>
                                <li><strong>প্রকৃত চিত্র:</strong> স্টোক মার্কেটিং ভিজ্যুয়ালের পরিবর্তে প্রকৃত ভৌত কপির প্রকৃত ক্যাপচার।</li>
                            </ul>
                            <p>
                                অত্যন্ত বিভ্রান্তিকর আইটেম বিবরণ বা বাণিজ্যিক স্টোর ইনভেন্টরি তালিকা প্রকাশ করা প্ল্যাটফর্ম নির্দেশিকা লঙ্ঘন।
                            </p>
                        </TermsCard>

                        {/* 5. Book Requests */}
                        <TermsCard id="requests" icon={<Send />} label="৫. বই রিকোয়েস্ট">
                            <p>
                                শিক্ষার্থীরা উপলব্ধ লিস্টিংয়ে ডায়নামিকভাবে রিকোয়েস্ট নিবন্ধন করতে পারেন। তবে, বই বিক্রেতা তাদের পছন্দ অনুযায়ী যেকোনো ইনবাউন্ড রিকোয়েস্ট গ্রহণ বা প্রত্যাখ্যান করার সম্পূর্ণ, সম্পূর্ণ স্বায়ত্তশাসন রাখেন।
                            </p>
                            <p>
                                <strong>গুরুত্বপূর্ণ:</strong> যোগাযোগ পথ (যেমন ব্যক্তিগত ফোন লিংক) লক থাকে এবং নিরাপদে মাস্ক থাকে যতক্ষণ না মালিক স্পষ্টভাবে একটি রিকোয়েস্ট গৃহীত হিসেবে চিহ্নিত করেন। মিলবে রিকোয়েস্ট গ্রহণ বা ম্যাচ সম্পন্ন করার গ্যারান্টি দিতে পারে না।
                            </p>
                        </TermsCard>

                        {/* 6. User Responsibilities */}
                        <TermsCard id="responsibilities" icon={<Layers />} label="৬. ব্যবহারকারীর দায়িত্ব">
                            <p>
                                মিলবে ব্যবহার করার সময়, আপনি নিরাপদে এবং পরিপক্বভাবে ইন্টারঅ্যাক্ট করতে প্রতিশ্রুতি দেন। আপনাকে পেশাদারীভাবে কথোপকথন রাখতে, পাঠ্যবই ডেটা সম্পর্কে সত্যভাবে যোগাযোগ করতে এবং অফলাইন ক্যাম্পাস মিটআপের সময় সহশিক্ষার্থীদের প্রতি সম্মানজনকভাবে আচরণ করতে আশা করা হয়।
                            </p>
                        </TermsCard>

                        {/* 7. Prohibited Activities */}
                        <TermsCard id="prohibited" icon={<AlertOctagon />} label="৭. নিষিদ্ধ কার্যকলাপ">
                            <p>
                                একটি নিরাপদ একাডেমিক পরিবেশ বজায় রাখতে, নিম্নলিখিত নিষিদ্ধ আচরণগুলির মধ্যে যেকোনোতে জড়িত হলে তাৎক্ষণিক সংশোধনমূলক ব্যবস্থা নেওয়া হবে:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                <ProhibitedItem label="কপিরাইটযুক্ত বা বেআইনি মিডিয়া আপলোড করা" />
                                <ProhibitedItem label="ভুয়া লিস্টিং বা প্রতাণ বই পোস্ট করা" />
                                <ProhibitedItem label="সম্প্রদায়ের সদস্যদের হয়রানি বা স্টকিং করা" />
                                <ProhibitedItem label="পিয়ার রিকোয়েস্ট নোটিফিকেশন অ্যারে স্প্যাম করা" />
                                <ProhibitedItem label="বাণিজ্যিক মার্কেটিংয়ের জন্য শিক্ষার্থী নম্বর শোষণ করা" />
                                <ProhibitedItem label="প্ল্যাটফর্ম আর্কিটেকচর হ্যাকিং বা অস্থিতিশীল করা" />
                            </div>
                        </TermsCard>

                        {/* 8. Content Ownership */}
                        <TermsCard id="ownership" icon={<FileText />} label="৮. কন্টেন্ট মালিকানা">
                            <p>
                                আপনি প্ল্যাটফর্মে আপলোড করা যেকোনো টেক্সট লগ বা পাঠ্যবই স্ন্যাপশটের উপর সম্পূর্ণ, মূল কপিরাইট মালিকানা বজায় রাখেন।
                            </p>
                            <p>
                                তবে, লাইভ ডিরেক্টরিতে ডেটা প্রোফাইল যোগ করে, আপনি মিলবেকে একটি অনন্য, নন-এক্সক্লুসিভ, বিশ্বব্যাপ৲াইসেন্স প্রদান করেন যা আমাদের ইকোসিস্টেম কাঠামো জুড়ে আইটেম কন্টেন্ট প্রদর্শন, হোস্ট এবং সূচীবদ্ধ করার অনুমতি দেয়।
                            </p>
                        </TermsCard>

                        {/* 9. Limitation of Liability */}
                        <TermsCard id="liability" icon={<AlertTriangle />} label="৯. দায় সীমাবদ্ধতা">
                            <p className="font-semibold text-slate-900">
                                মিলবে কেবল একটি পিয়ার-টু-পিয়ার সংযোগ প্ল্যাটফর্ম হিসেবে কাজ করে। আমরা ভৌত সম্পদ পরিচালনা করি না, মুদ্রা পরিচালনা করি না বা অফলাইন ইন্টারঅ্যাকশন নিয়ন্ত্রণ করি না।
                            </p>
                            <p>
                                তদনুসারে, মিলবে দায়ী বা জবাবদিহি হবে না:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-slate-600">
                                <li>ক্রেতা এবং বিক্রেতার মধ্যে সংঘটিত সরাসরি লেনদেনমূলক চুক্তি বা বিরোধ।</li>
                                <li>বিতরিত বইয়ের শারীরিক পাঠযোগ্যতা, হারানো পৃষ্ঠা বা অবস্থা বৈচিত্র্য।</li>
                                <li>অফলাইন ক্যাম্পাস মিটআপের সময় সম্মুখীন হওয়া ব্যক্তিগত নিরাপত্তা, আচরণ বৈপরীত্য বা লজিস্টিক ব্যর্থতা।</li>
                            </ul>
                        </TermsCard>

                        {/* 10. Account Suspension */}
                        <TermsCard id="suspension" icon={<UserX />} label="১০. Account স্থগিতাবস্থা">
                            <p>
                                মিলবে প্রশাসন একজন ব্যবহারকারী এই সম্প্রদায় শর্তাবলী লঙ্ঘন করলে সতর্কতা ছাড়াই তাৎক্ষণিকভাবে Account স্থয়ীভাবে ফ্রিজ করার, প্রোফাইল স্থায়ীভাবে বন্ধ করার বা লাইভ ভিউ থেকে সমস্যাযুক্ত বই আইটেম অপসারণ করার সম্পূর্ণ নির্বাহী ক্ষমতা বজায় রাখে।
                            </p>
                        </TermsCard>

                        {/* 11. Changes to Terms */}
                        <TermsCard id="changes" icon={<RefreshCw />} label="১১. শর্তাবলী পরিবর্তন">
                            <p>
                                সিস্টেম উন্নতি বা সম্মতি প্রোটোকল প্রতিফলিত করতে এই শর্তাবলী সামঞ্জস্য করার অপারেশনাল বিশেষাধিকার আমরা সংরক্ষণ করি। আপডেট শর্তাবলী সম্প্রচার করার পর অ্যাপ্লিকেশন ব্যবহার চালিয়ে যাওয়া পরিবর্তনগুলিতে স্পষ্ট আইনি সম্মতি নির্দেশ করে।
                            </p>
                        </TermsCard>

                        {/* 12. Contact Us */}
                        <TermsCard id="contact" icon={<Mail />} label="১২. যোগাযোগ">
                            <p>
                                প্ল্যাটফর্ম নির্দেশিকা সম্পর্কে স্পষ্টীকরণ প্রয়োজন হলে, বা সিস্টেমিক নিয়ম লঙ্ঘন রিপোর্ট করতে চাইলে, আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন:
                            </p>
                            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/60 inline-block space-y-1 text-sm">
                                <p><strong>Email:</strong> <span className="text-[#35858E]">amirulislam9.e@gmail.com</span></p>
                                <p><strong>অপারেশন ডেস্ক:</strong> মিলবে</p>
                            </div>
                        </TermsCard>

                        {/* Highlight Notice Card */}
                        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 flex flex-col sm:flex-row gap-5 items-start mt-12">
                            <div className="p-3 rounded-xl bg-[#35858E]/20 text-[#35858E] shrink-0">
                                <Heart className="w-6 h-6" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-lg font-bold">ন্যায্য ব্যবহার ও সম্প্রদায় সম্মান</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    মিলবে শিক্ষার্থীদের একটি নিরাপদ এবং সম্মানজনক সম্প্রদায়ে একাডেমিক বই কেনা, বিক্রি এবং দান করতে সাহায্য করতে বিদ্যমান। সবার জন্য একটি স্বাস্থ্যকর শিক্ষামূলক মার্কেটপ্লেস নিশ্চিত করতে প্রত্যেক ব্যবহারকারী সৎভাবে, দায়িত্বশীলভাবে এবং সম্মানজনকভাবে অভ্যন্তরীণ আচরণ করা আশা করা হয়।
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

// ==================== Custom Sub-Components ====================

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

function ProhibitedItem({ label }: { label: string }) {
    return (
        <div className="flex items-start gap-3 p-3 bg-red-50/40 border border-red-100 rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
            <span className="text-xs md:text-sm font-medium text-slate-700">{label}</span>
        </div>
    );
}