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
    { id: "acceptance", label: "1. Acceptance of Terms" },
    { id: "eligibility", label: "2. Eligibility" },
    { id: "accounts", label: "3. User Accounts" },
    { id: "listings", label: "4. Book Listings" },
    { id: "requests", label: "5. Book Requests" },
    { id: "responsibilities", label: "6. User Responsibilities" },
    { id: "prohibited", label: "7. Prohibited Activities" },
    { id: "ownership", label: "8. Content Ownership" },
    { id: "liability", label: "9. Limitation of Liability" },
    { id: "suspension", label: "10. Account Suspension" },
    { id: "changes", label: "11. Changes to Terms" },
    { id: "contact", label: "12. Contact Us" },
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
                        <span>Legal Framework</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
                        Terms & Conditions
                    </h1>
                    <p className="text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed">
                        These terms govern the use of the Milbe platform. Please review these rules thoroughly before accessing our community services.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-600">
                        <span className="w-2 h-2 rounded-full bg-[#35858E] animate-pulse" />
                        <span>Last Updated: {currentFormattedDate}</span>
                    </div>
                </div>
            </header>

            {/* Layout Structure */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">

                    {/* Sticky Sidebar (Desktop Only) */}
                    <aside className="hidden lg:block lg:col-span-1 sticky top-28 border border-slate-200/60 rounded-2xl p-4 bg-white shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-4 mb-3">Sections</p>
                        <TermsNavigation items={NAVIGATION_ITEMS} />
                    </aside>

                    {/* Terms Content Cards */}
                    <div className="col-span-1 lg:col-span-3 space-y-8">

                        {/* 1. Acceptance of Terms */}
                        <TermsCard id="acceptance" icon={<UserCheck />} title="1. Acceptance of Terms">
                            <p>
                                By completing your profile registration, authenticating through our application portal, or interacting with peer listings, you confirm that you have read, understood, and unreservedly agree to be bound by these Terms & Conditions.
                            </p>
                            <p>
                                If you do not explicitly accept these legal terms, you are restricted from creating listings or establishing communication loops on Milbe.
                            </p>
                        </TermsCard>

                        {/* 2. Eligibility */}
                        <TermsCard id="eligibility" icon={<ShieldAlert />} title="2. Eligibility">
                            <p>
                                Milbe is explicitly built to support academic workflows. To remain eligible to participate on the platform, you must meet the following parameters:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-600">
                                <li>You must provide authentic personal information during the profile compilation step.</li>
                                <li>The service is fundamentally intended for active students pursuing secondary, higher secondary, or university-level education.</li>
                                <li>You maintain full personal responsibility for tracking and shielding all cryptographic account tokens and authorization parameters.</li>
                            </ul>
                        </TermsCard>

                        {/* 3. User Accounts */}
                        <TermsCard id="accounts" icon={<Award />} title="3. User Accounts">
                            <p>
                                To preserve data safety, each unique identity is restricted to exactly **one individual account**. Creating redundant duplicate profiles or secondary dummy records to bypass moderation parameters is strictly prohibited.
                            </p>
                            <p>
                                You are entirely liable for all activities, book updates, and request logs initiated from your validated account layout.
                            </p>
                        </TermsCard>

                        {/* 4. Book Listings */}
                        <TermsCard id="listings" icon={<BookOpen />} title="4. Book Listings">
                            <p>
                                Users who publish academic listings assume complete, singular accountability for the validity of the parameters submitted. Every single entry must guarantee:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-600">
                                <li><strong>Correct Title:</strong> The precise metadata matching the book cover text.</li>
                                <li><strong>Honest Condition:</strong> Accurate representation of physical decay, notes, or highlighting.</li>
                                <li><strong>Real Images:</strong> Genuine captures of the actual physical copy, rather than stock marketing visuals.</li>
                            </ul>
                            <p>
                                Publishing highly misleading item descriptions or commercial shop inventory lists is a violation of platform guidelines.
                            </p>
                        </TermsCard>

                        {/* 5. Book Requests */}
                        <TermsCard id="requests" icon={<Send />} title="5. Book Requests">
                            <p>
                                Students can dynamically register requests on available listings. However, the book seller holds full, absolute autonomy to accept or decline any inbound request based on their preferences.
                            </p>
                            <p>
                                <strong>Important:</strong> Contact pathways (such as personal phone links) remain locked and securely masked until the owner explicitly marks a request as accepted. Milbe cannot guarantee request acceptances or match completions.
                            </p>
                        </TermsCard>

                        {/* 6. User Responsibilities */}
                        <TermsCard id="responsibilities" icon={<Layers />} title="6. User Responsibilities">
                            <p>
                                When utilizing Milbe, you pledge to interact safely and maturely. You are expected to keep conversations professional, communicate truthfully regarding textbook data, and behave respectfully toward fellow students during offline campus meetups.
                            </p>
                        </TermsCard>

                        {/* 7. Prohibited Activities */}
                        <TermsCard id="prohibited" icon={<AlertOctagon />} title="7. Prohibited Activities">
                            <p>
                                To maintain a safe academic environment, engaging in any of the following prohibited behaviors will result in instant corrective measures:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                <ProhibitedItem label="Uploading copyrighted or illegal media" />
                                <ProhibitedItem label="Posting fake listings or phantom books" />
                                <ProhibitedItem label="Harassing or stalking community members" />
                                <ProhibitedItem label="Spamming peer request notification arrays" />
                                <ProhibitedItem label="Exploiting student numbers for commercial marketing" />
                                <ProhibitedItem label="Hacking or destabilizing platform architecture" />
                            </div>
                        </TermsCard>

                        {/* 8. Content Ownership */}
                        <TermsCard id="ownership" icon={<FileText />} title="8. Content Ownership">
                            <p>
                                You maintain complete, original copyright ownership over any text logs or textbook snapshots you upload to the platform.
                            </p>
                            <p>
                                However, by adding data profiles to the live directory, you grant Milbe a non-exclusive, royalty-free, global license to display, host, and index the item content across our ecosystem structures.
                            </p>
                        </TermsCard>

                        {/* 9. Limitation of Liability */}
                        <TermsCard id="liability" icon={<AlertTriangle />} title="9. Limitation of Liability">
                            <p className="font-semibold text-slate-900">
                                Milbe operates strictly as a peer-to-peer connection platform. We do not manage physical assets, handle currencies, or control offline interactions.
                            </p>
                            <p>
                                Accordingly, Milbe shall not be held liable or accountable for:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-slate-600">
                                <li>Direct transactional agreements or disputes occurring between buyers and sellers.</li>
                                <li>The physical legibility, missing pages, or condition variance of distributed books.</li>
                                <li>Personal safety, conduct anomalies, or logistical failures encountered during offline on-campus meetups.</li>
                            </ul>
                        </TermsCard>

                        {/* 10. Account Suspension */}
                        <TermsCard id="suspension" icon={<UserX />} title="10. Account Suspension">
                            <p>
                                Milbe administration maintains complete executive authority to temporarily freeze accounts, permanently terminate profiles, or strip problematic book items from the live view immediately without warning if a user breaches these community conditions.
                            </p>
                        </TermsCard>

                        {/* 11. Changes to Terms */}
                        <TermsCard id="changes" icon={<RefreshCw />} title="11. Changes to Terms">
                            <p>
                                We reserve the operational privilege to adjust these Terms & Conditions to reflect system improvements or compliance protocols. Continued utilization of the application following the broadcast of updated terms indicates clear legal consent to the changes.
                            </p>
                        </TermsCard>

                        {/* 12. Contact Us */}
                        <TermsCard id="contact" icon={<Mail />} title="12. Contact Us">
                            <p>
                                If you need clarification regarding platform guidelines, or wish to report systemic rule violations, contact our support team:
                            </p>
                            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/60 inline-block space-y-1 text-sm">
                                <p><strong>Email:</strong> <span className="text-[#35858E]">amirulislam9.e@gmail.com</span></p>
                                <p><strong>Operations Desk:</strong> Milbe</p>
                            </div>
                        </TermsCard>

                        {/* Highlight Notice Card */}
                        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 flex flex-col sm:flex-row gap-5 items-start mt-12">
                            <div className="p-3 rounded-xl bg-[#35858E]/20 text-[#35858E] shrink-0">
                                <Heart className="w-6 h-6" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-lg font-bold">Fair Use & Community Respect</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Milbe exists to help students buy, sell, and donate academic books in a safe and respectful community. Every user is expected to act honestly, responsibly, and respectfully to ensure a healthy educational marketplace for all.
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
    title: string;
    children: React.ReactNode;
}

function TermsCard({ id, icon, title, children }: TermsCardProps) {
    return (
        <section
            id={id}
            className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 space-y-4 hover:border-[#35858E]/40 hover:shadow-sm transition-all duration-200 scroll-mt-6"
        >
            <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                {/* [&_svg]:w-5 [&_svg]:h-5 ক্লাসটি চাইল্ড আইকনের 
                  উইডথ ও হাইট অটোমেটিক সেট করে দিবে কোনো টাইপ এরর ছাড়াই।
                */}
                <div className="w-9 h-9 rounded-lg bg-[#35858E]/10 text-[#35858E] flex items-center justify-center shrink-0 [&_svg]:w-5 [&_svg]:h-5">
                    {icon}
                </div>
                <h2 className="text-xl font-bold text-slate-900">{title}</h2>
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