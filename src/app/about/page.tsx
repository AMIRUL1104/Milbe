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
    title: "About Us | BookBridge",
    description: "Learn more about BookBridge, Bangladesh's leading student-to-student academic book marketplace.",
};

export default function AboutUsPage() {
    return (
        <div className="bg-white text-slate-900 min-h-screen font-sans">

            {/* 1. Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#35858E]">
                        About BookBridge
                    </h1>
                    <div className="text-base md:text-lg text-slate-600 space-y-4 leading-relaxed">
                        <p>
                            BookBridge is a dedicated student-to-student marketplace designed to make educational resources more affordable and accessible. We bridge the gap between students who have completed their courses and those who need academic books for their next journey.
                        </p>
                        <p>
                            By fostering a peer-to-peer sharing ecosystem, we help students reduce their academic expenses significantly. Whether you want to sell, buy, exchange, or donate, BookBridge provides a structured and transparent environment tailored specifically for the student community.
                        </p>
                        <p>
                            Beyond the financial benefits, our platform champions sustainable learning. Giving a book a second life reduces paper waste and environmental impact, driving Bangladesh towards a smarter, eco-friendly future of education.
                        </p>
                    </div>
                </div>
                <div className="flex justify-center items-center w-full h-75 md:h-112.5 relative bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-emerald-50/30">
                        <BookOpen className="w-20 h-20 text-emerald-600 mb-4 animate-pulse" />
                        <p className="text-sm font-medium text-[#35858E] uppercase tracking-wider">Connecting Knowledge</p>
                        <p className="text-xs text-slate-500 mt-1 max-w-xs">Empowering students through sustainable book sharing across universities.</p>
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
                    <h2 className="text-2xl font-bold text-[#35858E]">Our Mission</h2>
                    <p className="text-slate-600 leading-relaxed">
                        Our mission is to break down financial barriers to quality education in Bangladesh. We empower students by providing a secure platform to repurpose unused academic books, minimizing waste, and cultivating a proactive community culture centered around mutual support and knowledge sharing.
                    </p>
                </div>

                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/60 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-700">
                        <Layers className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-cyan-800">Our Vision</h2>
                    <p className="text-slate-600 leading-relaxed">
                        {`We envision becoming Bangladesh's largest and most trusted academic book ecosystem. By seamlessly connecting students across colleges and universities, we aim to ensure no textbook sits idle on a shelf while another student struggles to afford it.`}                    </p>
                </div>
            </section>

            {/* 4. How BookBridge Works */}
            <section className="bg-slate-50 border-y border-slate-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold text-slate-900">How BookBridge Works</h2>
                        <p className="text-slate-500 mt-2">Four simple steps to buy, sell, or donate academic books instantly.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StepCard
                            icon={<BookOpen className="w-6 h-6" />}
                            step="01"
                            title="Post Books"
                            description="Create a clean listing for the academic books you want to sell, exchange, or donate in seconds."
                        />
                        <StepCard
                            icon={<Search className="w-6 h-6" />}
                            step="02"
                            title="Find Books"
                            description="Browse through comprehensive categories tailored by field of study, location, and specific universities."
                        />
                        <StepCard
                            icon={<MessageSquare className="w-6 h-6" />}
                            step="03"
                            title="Send Request"
                            description="Found a book you need? Send an instant request directly to the owner without hassle."
                        />
                        <StepCard
                            icon={<Handshake className="w-6 h-6" />}
                            step="04"
                            title="Connect & Collect"
                            description="Once accepted, safely access contact details to finalize your exchange offline on campus."
                        />
                    </div>
                </div>
            </section>

            {/* 5. Why Choose BookBridge */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold text-slate-900">Why Choose BookBridge</h2>
                    <p className="text-slate-500 mt-2">A platform optimized systematically to serve the everyday academic lifecycle of students.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<GraduationCap className="w-5 h-5 text-emerald-600" />}
                        title="Affordable Books"
                        description="Access verified textbooks, reference papers, and exam prep material at a fraction of standard retail prices."
                    />
                    <FeatureCard
                        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                        title="Easy to Use"
                        description="An intuitive, responsive dynamic user layout engineered for rapid uploads and fluid navigation."
                    />
                    <FeatureCard
                        icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
                        title="Safe Community"
                        description="Better Auth verified user structures ensuring safer communications and trustworthy peer handovers."
                    />
                    <FeatureCard
                        icon={<Layers className="w-5 h-5 text-emerald-600" />}
                        title="Buy, Sell & Donate"
                        description="Complete control over transactions. Earn pocket money or choose to directly help someone in need by donating."
                    />
                    <FeatureCard
                        icon={<Search className="w-5 h-5 text-emerald-600" />}
                        title="Quick Search"
                        description="Filter dynamically by publication year, current condition, instant location metrics, or target institution."
                    />
                    <FeatureCard
                        icon={<Users className="w-5 h-5 text-emerald-600" />}
                        title="Student Focused"
                        description="Every tool, parameter, and interaction route is meticulously optimized around real-world campus workflows."
                    />
                </div>
            </section>

            {/* 6. Platform Statistics */}
            <section className="bg-[#35858E] text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <StatCard value="12,500+" label="Books Listed" />
                    <StatCard value="8,200+" label="Active Students" />
                    <StatCard value="6,400+" label="Successful Requests" />
                    <StatCard value="45+" label="Universities Covered" />
                </div>
            </section>

            {/* 7. Core Values */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold text-slate-900">Our Core Values</h2>
                    <p className="text-slate-500 mt-2">The fundamental pillars guiding how we build our software and direct our community.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ValueCard
                        icon={<ShieldCheck className="w-6 h-6text-[#35858E]" />}
                        title="Trust"
                        description="We build transparent peer mechanics to keep book descriptions honest and interactions perfectly reliable."
                    />
                    <ValueCard
                        icon={<Users className="w-6 h-6text-[#35858E]" />}
                        title="Community"
                        description="Fostering a unique, sustainable culture where students routinely look out for and support fellow students."
                    />
                    <ValueCard
                        icon={<GraduationCap className="w-6 h-6text-[#35858E]" />}
                        title="Accessibility"
                        description="Making critical educational tools and reference frameworks affordable for everyone everywhere."
                    />
                    <ValueCard
                        icon={<Leaf className="w-6 h-6text-[#35858E]" />}
                        title="Sustainability"
                        description="Actively promoting circular usage patterns to lower carbon footprints and paper resource consumption."
                    />
                </div>
            </section>

            {/* 8. Call To Action */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-16 text-center space-y-6 border border-slate-800">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto">
                        Ready to Give Your Books a Second Life?
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-base md:text-lg">
                        Join thousands of students who are saving money, supporting peers, and contributing to a greener campus planet today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <Link
                            href="/"
                            className="w-full sm:w-auto text-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-sm"
                        >
                            Browse Books
                        </Link>
                        <Link
                            href="/posts/create"
                            className="w-full sm:w-auto text-center bg-transparent hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors"
                        >
                            Post a Book
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