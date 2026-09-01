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
    { id: "introduction", label: "1. Introduction" },
    { id: "collection", label: "2. Information We Collect" },
    { id: "usage", label: "3. How We Use Information" },
    { id: "sharing", label: "4. Sharing Information" },
    { id: "cookies", label: "5. Cookies Policy" },
    { id: "security", label: "6. Data Security" },
    { id: "rights", label: "7. User Rights" },
    { id: "children", label: "8. Children's Privacy" },
    { id: "updates", label: "9. Policy Updates" },
    { id: "contact", label: "10. Contact Us" },
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
                        <span>Trust & Security</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed">
                        At Milbe, we value your privacy and are committed to protecting your personal information. This policy transparently breaks down our data routines.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-600">
                        <span className="w-2 h-2 rounded-full bg-[#35858E] animate-pulse" />
                        <span>Last Updated: {currentFormattedDate}</span>
                    </div>
                </div>
            </header>

            {/* Main Content Hub */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">

                    {/* Sticky Sidebar Navigation (Desktop Only) */}
                    <aside className="hidden lg:block lg:col-span-1 sticky top-28 border border-slate-200/60 rounded-2xl p-4 bg-white shadow-sm">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-4 mb-3">Table of Contents</p>
                        <PrivacyNavigation items={NAVIGATION_ITEMS} />
                    </aside>

                    {/* Privacy Policy Documents Section */}
                    <div className="col-span-1 lg:col-span-3 space-y-8">

                        {/* Introduction */}
                        <SectionCard id="introduction" icon={<UserCheck />} title="1. Introduction">
                            <p>
                                Welcome to Milbe. This Privacy Policy governs the data collection and processing methods utilized across our marketplace application. By registering an account, uploading academic book listings, or initiating request interactions, you explicitly acknowledge and agree to the framework outlined herein.
                            </p>
                            <p>
                                This policy applies natively to all registered accounts, visiting students, and individuals operating within the peer-to-peer structure of Milbe.
                            </p>
                        </SectionCard>

                        {/* Information We Collect */}
                        <SectionCard id="collection" icon={<Database />} title="2. Information We Collect">
                            <p>
                                Milbe strictly limits data procurement to actionable parameters essential for verifying academic status and completing safe handovers. We collect:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-600">
                                <li><strong>Account Credentials:</strong> Full Name, verified Email Address, and cryptographic tokens generated via Better Auth integrations.</li>
                                <li><strong>Communication Pathways:</strong> Personal Phone Number, required solely to allow peer connections once an exchange request is validated.</li>
                                <li><strong>Content Profiles:</strong> Profile Pictures, uploaded book imagery, physical condition logs, pricing metadata, and structural messages submitted dynamically along with book requests.</li>
                                <li><strong>Technical Telemetry:</strong> Anonymized usage analytics, broad location parameters, and secure session identifiers.</li>
                            </ul>
                        </SectionCard>

                        {/* How We Use Information */}
                        <SectionCard id="usage" icon={<Eye />} title="3. How We Use Information">
                            <p>
                                We do not collect excessive information. Your profile metrics are utilized selectively to:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-600">
                                <li>Securely provision accounts and handle authentication states seamlessly.</li>
                                <li>Display book listings accurately sorted by university tags and geographic parameters.</li>
                                <li>Process transactional book requests and alert system users through real-time push events.</li>
                                <li>Optimize administrative dashboard flows and analyze overall application loading speeds.</li>
                                <li>Mitigate fraudulent double-listings, spam bot setups, and malicious academic postings.</li>
                            </ul>
                        </SectionCard>

                        {/* Sharing Information */}
                        <SectionCard id="sharing" icon={<Share2 />} title="4. Sharing Your Information">
                            <p className="font-semibold text-slate-900">
                                Milbe fundamentally guarantees that we never sell, lease, or monetize user data profiles to external advertisement agencies.
                            </p>
                            <p>
                                Data distribution occurs strictly under the following isolated conditions:
                            </p>
                            <ol className="list-decimal pl-5 space-y-2 mt-2 text-slate-600">
                                <li><strong>Peer Exchanges:</strong> Contact listings (Phone Numbers) unlock instantly and exclusively for both parties *only* after a book owner formally clicks Accept on a request card.</li>
                                <li><strong>Infrastructure Entities:</strong> Necessary variables may interface safely with trusted server hubs (MongoDB clusters, hosting backends) supporting platform uptimes.</li>
                                <li><strong>Legal Requirements:</strong> Information may be disclosed if formally mandated by statutory laws or regulatory authorities within Bangladesh.</li>
                            </ol>
                        </SectionCard>

                        {/* Cookies */}
                        <SectionCard id="cookies" icon={<Cookie />} title="5. Cookies Policy">
                            <p>
                                Milbe utilizes minimal, highly secure cookies to retain operational consistency. These include:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-600">
                                <li><strong>Authentication Cookies:</strong> Administered securely to track current student log states without asking for redundant credentials.</li>
                                <li><strong>Preference Cookies:</strong> Retains search filters, university selections, and display metrics.</li>
                            </ul>
                            <p>
                                You can turn off cookies via your local web browser preferences, though doing so may destabilize authentication routes.
                            </p>
                        </SectionCard>

                        {/* Data Security */}
                        <SectionCard id="security" icon={<Lock />} title="6. Data Security">
                            <p>
                                Data security is structured into our infrastructure. Every transaction routing between our user interface and internal MongoDB databases uses end-to-end HTTPS encryption protocols. We impose layered database access rules alongside optimized automated systems provided via Better Auth frameworks.
                            </p>
                            <p className="text-sm italic text-slate-500">
                                Disclaimer: While we enforce modern, production-grade security architecture, no online network layer or storage system can ever be guaranteed as 100% secure.
                            </p>
                        </SectionCard>

                        {/* User Rights */}
                        <SectionCard id="rights" icon={<Scale />} title="7. User Rights">
                            <p>
                                As a student user, you hold complete autonomy over your uploaded information. You can:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2 text-slate-600">
                                <li>Directly view, modify, or update your personal account info at any time through the Profile Settings.</li>
                                <li>Edit or remove published academic book listings instantly from your live directory.</li>
                                <li>Request absolute account deletion or full data purges from our servers by communicating directly with support channels.</li>
                            </ul>
                        </SectionCard>

                        {/* Children's Privacy */}
                        <SectionCard id="children" icon={<Users />} title="8. Children's Privacy">
                            <p>
                                Milbe is explicitly structured to facilitate secondary and tertiary education textbooks for young adults and university level students. We do not intentionally compile or target operations towards minors under the legal age of academic maturity without supervisor oversight.
                            </p>
                        </SectionCard>

                        {/* Policy Updates */}
                        <SectionCard id="updates" icon={<RefreshCw />} title="9. Policy Updates">
                            <p>
                                We reserve the right to modify this Privacy Policy framework to conform with security updates or ecosystem expansions. When high-priority transformations take place, we will notify users through subtle global alerts across the application UI dashboard.
                            </p>
                        </SectionCard>

                        {/* Contact Us */}
                        <SectionCard id="contact" icon={<Mail />} title="10. Contact Us">
                            <p>
                                For direct security reviews, legal concerns, or technical support requests, feel free to reach out to our administration desk:
                            </p>
                            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/60 inline-block space-y-1 text-sm">
                                <p><strong>Email:</strong> <span className="text-[#35858E]">support@milbe.shop</span></p>
                                <p><strong>Platform Operations:</strong> Milbe</p>
                            </div>
                        </SectionCard>

                        {/* Important Notice Highlight Card */}
                        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 flex flex-col sm:flex-row gap-5 items-start mt-12">
                            <div className="p-3 rounded-xl bg-[#35858E]/20 text-[#35858E] shrink-0">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-lg font-bold">Your Privacy Matters</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Milbe is built upon peer trust and student collaboration. We dedicate our structural resources toward protecting your details while creating an accessible, eco-friendly framework for circular textbook utilization across universities.
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
    title: string;
    children: React.ReactNode;
}

function SectionCard({ id, icon, title, children }: SectionCardProps) {
    return (
        <section
            id={id}
            className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 space-y-4 hover:border-[#35858E]/40 hover:shadow-sm transition-all duration-200 scroll-mt-6"
        >
            <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                {/* 
                  আমরা Lucide Icons-এর ডিফল্ট সাইজ ব্যবহার করব এবং 
                  এই প্যারেন্ট ডিভ (text-[#35858E] এবং size) দিয়ে আইকনের সাইজ কন্ট্রোল করব।
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