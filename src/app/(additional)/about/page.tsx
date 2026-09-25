import React from "react";
import Link from "next/link";
import {
    BookOpen,
    Search,
    MessageSquare,
    Handshake,
    ShieldCheck,
    Users,
    HeartHandshake,
    Sparkles,
    CheckCircle2,
    ArrowRight,
    TrendingUp,
    RefreshCw,
    Target,
    Compass
} from "lucide-react";

export const metadata = {
    title: "আমাদের সম্পর্কে | Milbe",
    description: "মিলবে শিক্ষার্থীদের জন্য তৈরি একটি সহজ বই কেনাবেচা ও দানের প্ল্যাটফর্ম।",
};

export default function AboutUsPage() {
    return (
        <div className="bg-background text-text-primary min-h-screen">

            {/* 1. Hero Section - মিলবে কি এবং কেন ? */}
            <section className="relative overflow-hidden pt-12 pb-16 md:py-24 border-b border-border-light bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Text Content */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light text-primary font-semibold text-xs md:text-sm">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span>শিক্ষার্থীদের জন্য তৈরি বই শেয়ারিং প্ল্যাটফর্ম</span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary leading-tight">
                                মিলবে কি এবং কেন?
                            </h1>

                            <div className="text-base sm:text-lg text-text-secondary space-y-4 leading-relaxed">
                                <p className="font-medium text-text-primary">
                                    মিলবে শিক্ষার্থীদের জন্য তৈরি একটি সহজ বই কেনাবেচা ও দানের প্ল্যাটফর্ম। এখানে প্রয়োজন নেই এমন একাডেমিক বই অন্য শিক্ষার্থীর কাছে বিক্রি বা দান করা যায়, আবার প্রয়োজনীয় বইও সহজে খুঁজে পাওয়া যায়।
                                </p>
                                <p className="p-4 rounded-xl bg-background border border-border text-sm md:text-base border-l-4 border-l-primary">
                                    <strong className="text-primary font-semibold">আমাদের লক্ষ্য খুব সহজ —</strong> একজন শিক্ষার্থীর কাছে পড়ে থাকা বই যেন অন্য একজন শিক্ষার্থীর কাজে লাগে।
                                </p>
                                <p>
                                    মিলবে শিক্ষার্থীদের কাছাকাছি বই খুঁজে পেতে এবং বইয়ের মালিকের সঙ্গে যোগাযোগ করতে সাহায্য করে। বইয়ের পোস্ট দেখে পছন্দ হলে রিকোয়েস্ট পাঠানো যায়। রিকোয়েস্ট গ্রহণ করা হলে প্রয়োজনীয় যোগাযোগের তথ্য দেখা যায়, এরপর দুজন নিজেদের মধ্যে কথা বলে বই দেওয়া-নেওয়ার বিষয়টি ঠিক করে নিতে পারে।
                                </p>
                            </div>

                            <div className="pt-2 flex flex-wrap gap-4">
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-xs hover:shadow-md active:scale-95 text-sm sm:text-base"
                                >
                                    <Search className="w-4 h-4" />
                                    <span>বই খুঁজুন</span>
                                </Link>
                                <Link
                                    href="/posts/add"
                                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-text-primary font-bold px-6 py-3 rounded-xl transition-all shadow-xs hover:shadow-md active:scale-95 text-sm sm:text-base"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    <span>বই পোস্ট করুন</span>
                                </Link>
                            </div>
                        </div>

                        {/* Visual Card */}
                        <div className="lg:col-span-5 flex justify-center">
                            <div className="relative w-full max-w-md bg-linear-to-br from-primary-light via-white to-secondary-light p-8 rounded-3xl border border-border shadow-xl overflow-hidden">
                                <div className="absolute -right-8 -top-8 w-32 h-32 bg-accent-light rounded-full blur-2xl pointer-events-none" />

                                <div className="relative z-10 flex flex-col items-center text-center space-y-6 py-4">
                                    <div className="w-20 h-20 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 animate-bounce">
                                        <BookOpen className="w-10 h-10" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-primary">জ্ঞান শেয়ারিং সহজ হলো</h3>
                                        <p className="text-xs sm:text-sm text-text-secondary">
                                            কাছাকাছি শিক্ষার্থীদের সাথে সরাসরি বুক রিকোয়েস্ট ও এক্সচেঞ্জ করার বিশ্বস্ত মাধ্যম।
                                        </p>
                                    </div>
                                    <div className="w-full grid grid-cols-2 gap-3 pt-2">
                                        <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-border-light text-center">
                                            <span className="block text-xs text-text-muted">সুযোগ</span>
                                            <strong className="text-xs sm:text-sm font-semibold text-primary">বিক্রি বা দান</strong>
                                        </div>
                                        <div className="bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-border-light text-center">
                                            <span className="block text-xs text-text-muted">সুবিধা</span>
                                            <strong className="text-xs sm:text-sm font-semibold text-primary">কম খরচ</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. Mission & Vision */}
            <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

                    {/* Mission Card */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-xs space-y-4 flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold">
                                <Target className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-primary">আমাদের লক্ষ্য (Mission)</h2>
                            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                                বাংলাদেশের শিক্ষার্থীদের জন্য প্রয়োজনীয় একাডেমিক বই আরও সহজে এবং কম খরচে পাওয়া সম্ভব করা।
                            </p>
                            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                                একই সঙ্গে, অব্যবহৃত বইগুলোকে আবার শিক্ষার্থীদের কাজে লাগানোর সুযোগ তৈরি করা—যাতে একটি বই একজনের পড়াশোনা শেষ হওয়ার পরও অন্য কারও কাজে আসে।
                            </p>
                        </div>
                    </div>

                    {/* Vision Card */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-xs space-y-4 flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-secondary-light text-secondary flex items-center justify-center font-bold">
                                <Compass className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-text-primary">আমাদের ভিশন (Vision)</h2>
                            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                                বাংলাদেশে বই কেনাবেচা ও শেয়ার করার জন্য একটি পরিচিত, সহজ ও নির্ভরযোগ্য প্ল্যাটফর্ম হয়ে ওঠা।                            </p>
                            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                                সময়ের সঙ্গে শিক্ষার্থীদের একাডেমিক বইয়ের পাশাপাশি বিভিন্ন ধরনের বইও যেন সহজে কেনা, বিক্রি ও শেয়ার করা যায়—আমরা সেই সুযোগ তৈরি করতে চাই।
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* 3. How Milbe Works (মিলবে কীভাবে কাজ করে) */}
            <section className="bg-white py-12 sm:py-16 border-y border-border-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">
                            মিলবে কীভাবে কাজ করে
                        </h2>
                        <p className="text-sm sm:text-base text-text-secondary">
                            বই আদান-প্রদানের ৪টি অত্যন্ত সহজ ধাপ
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                        <StepCard
                            step="01"
                            icon={<BookOpen className="w-6 h-6 text-primary" />}
                            title="১. বই পোস্ট করুন"
                            description="আপনার কাছে থাকা এমন কোনো একাডেমিক বই যা আর প্রয়োজন নেই, সেটি বিক্রি বা দান করার জন্য সহজেই পোস্ট করুন।"
                        />
                        <StepCard
                            step="02"
                            icon={<Search className="w-6 h-6 text-primary" />}
                            title="২. প্রয়োজনের বই খুঁজুন"
                            description="আপনার প্রয়োজনীয় বই খুঁজে দেখুন এবং কাছাকাছি এলাকার বইগুলোও সহজে ব্রাউজ করুন।"
                        />
                        <StepCard
                            step="03"
                            icon={<MessageSquare className="w-6 h-6 text-primary" />}
                            title="৩. রিকোয়েস্ট পাঠান"
                            description="পছন্দের বই পেলে পোস্টের মালিকের কাছে একটি রিকোয়েস্ট পাঠান।"
                        />
                        <StepCard
                            step="04"
                            icon={<Handshake className="w-6 h-6 text-primary" />}
                            title="৪. যোগাযোগ করে বই সংগ্রহ করুন"
                            description="রিকোয়েস্ট গ্রহণ করা হলে যোগাযোগের তথ্য দেখা যাবে। এরপর বইয়ের মালিকের সঙ্গে কথা বলে মূল্য, স্থান ও সংগ্রহের বিষয়টি ঠিক করে নিন।"
                        />
                    </div>
                </div>
            </section>

            {/* 4. Why Use Milbe (কেন মিলবে ব্যবহার করবেন) */}
            <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
                        কেন মিলবে ব্যবহার করবেন
                    </h2>
                    <p className="text-sm sm:text-base text-text-secondary">
                        আমাদের প্ল্যাটফর্ম ব্যবহারের দারুণ কিছু সুবিধা
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={<TrendingUp className="w-5 h-5 text-primary" />}
                        title="কম খরচে বই"
                        description="নতুন বই কেনার বদলে ব্যবহৃত বই কিনে পড়াশোনার খরচ কমানোর সুযোগ।"
                    />
                    <FeatureCard
                        icon={<Search className="w-5 h-5 text-primary" />}
                        title="সহজে বই খুঁজে পাওয়া"
                        description="বিষয়, অবস্থান ও অন্যান্য তথ্য ব্যবহার করে প্রয়োজনের বই খুঁজে দেখুন।"
                    />
                    <FeatureCard
                        icon={<Users className="w-5 h-5 text-primary" />}
                        title="কাছাকাছি শিক্ষার্থীদের সঙ্গে যোগাযোগ"
                        description="আপনার এলাকার শিক্ষার্থীদের পোস্ট করা বই খুঁজে পাওয়া এবং প্রয়োজন হলে তাদের সঙ্গে যোগাযোগ করা সহজ।"
                    />
                    <FeatureCard
                        icon={<HeartHandshake className="w-5 h-5 text-primary" />}
                        title="বিক্রি বা দান করুন"
                        description="প্রয়োজন নেই এমন বই বিক্রি করে কিছু টাকা ফেরত পেতে পারেন, অথবা অন্য শিক্ষার্থীকে সাহায্য করতে বই দান করতে পারেন।"
                    />
                    <FeatureCard
                        icon={<CheckCircle2 className="w-5 h-5 text-primary" />}
                        title="সহজ ও সরাসরি প্রক্রিয়া"
                        description="বই খুঁজুন, রিকোয়েস্ট পাঠান এবং রিকোয়েস্ট গ্রহণ হলে মালিকের সঙ্গে যোগাযোগ করুন—পুরো প্রক্রিয়াটি সহজ রাখাই আমাদের লক্ষ্য।"
                    />
                    <FeatureCard
                        icon={<RefreshCw className="w-5 h-5 text-primary" />}
                        title="বইয়ের পুনঃব্যবহার"
                        description="একজনের পড়াশোনা শেষ হলেও বইটির ব্যবহার শেষ হয়ে যায় না। একই বই অন্য একজন শিক্ষার্থীর পড়াশোনায় কাজে লাগতে পারে।"
                    />
                </div>
            </section>

            {/* 5. Platform Statistics (স্ট্যাটিস্টিকস সেকশন) */}
            <section className="bg-primary text-white py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <span className="text-xs uppercase tracking-widest text-accent font-bold">প্ল্যাটফর্ম স্ট্যাটিস্টিকস</span>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        <StatCard value="১২,৫০০+" label="বই তালিকাভুক্ত" />
                        <StatCard value="৮,২০০+" label="সক্রিয় শিক্ষার্থী" />
                        <StatCard value="৬,৪০০+" label="সফল রিকোয়েস্ট" />
                        <StatCard value="৪৫+" label="বিশ্ববিদ্যালয় কভার" />
                    </div>
                </div>
            </section>

            {/* 6. Core Values (আমাদের মূল মূল্যবোধ) */}
            <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary">
                        আমাদের মূল মূল্যবোধ
                    </h2>
                    <p className="text-sm sm:text-base text-text-secondary">
                        যে নীতিগুলোর ওপর ভিত্তি করে মিলবে পরিচালিত হয়
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ValueCard
                        icon={<ShieldCheck className="w-6 h-6 text-primary" />}
                        title="বিশ্বাস"
                        description="বইয়ের তথ্য ও ব্যবহারকারীদের মধ্যে যোগাযোগকে যতটা সম্ভব পরিষ্কার ও স্বচ্ছ রাখা।"
                    />
                    <ValueCard
                        icon={<Users className="w-6 h-6 text-primary" />}
                        title="সহযোগিতা"
                        description="শিক্ষার্থীদের নিজেদের মধ্যে বই আদান-প্রদানের মাধ্যমে একে অন্যকে সহযোগিতা করার সুযোগ তৈরি করা।"
                    />
                    <ValueCard
                        icon={<Sparkles className="w-6 h-6 text-primary" />}
                        title="সহজলভ্যতা"
                        description="প্রয়োজনীয় বই খুঁজে পাওয়া এবং অব্যবহৃত বই অন্যের কাছে পৌঁছে দেওয়া সহজ করা।"
                    />
                    <ValueCard
                        icon={<RefreshCw className="w-6 h-6 text-primary" />}
                        title="পুনঃব্যবহার"
                        description="একটি বইয়ের ব্যবহার একজন শিক্ষার্থীর মধ্যেই সীমাবদ্ধ না রেখে সেটিকে আবার কাজে লাগানোর সুযোগ তৈরি করা।"
                    />
                </div>
            </section>

            {/* 7. Call To Action (CTA) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
                <div className="bg-linear-to-r from-primary to-primary-hover text-white rounded-3xl p-8 sm:p-12 md:p-16 text-center space-y-6 shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
                        <BookOpen className="w-80 h-80 text-white" />
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
                        আপনার কাছে এমন কোনো বই আছে যা আর প্রয়োজন নেই?
                    </h2>
                    <p className="text-white/90 max-w-xl mx-auto text-sm sm:text-base md:text-lg">
                        হয়তো আপনার কাছে পড়ে থাকা বইটিই অন্য একজন শিক্ষার্থীর প্রয়োজন। মিলবেতে বই পোস্ট করুন, প্রয়োজনের বই খুঁজুন এবং শিক্ষার্থীদের সঙ্গে সহজে যোগাযোগ করুন।
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 relative z-10">
                        <Link
                            href="/"
                            className="w-full sm:w-auto text-center bg-white text-primary hover:bg-slate-100 font-bold px-8 py-3.5 rounded-xl transition-all shadow-md active:scale-95 inline-flex items-center justify-center gap-2"
                        >
                            <span>বই খুঁজুন</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/posts/add"
                            className="w-full sm:w-auto text-center bg-accent hover:bg-accent-hover text-text-primary font-bold px-8 py-3.5 rounded-xl transition-all shadow-md active:scale-95 inline-flex items-center justify-center gap-2"
                        >
                            <span>বই পোস্ট করুন</span>
                            <BookOpen className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}

// ==================== Reusable Component Sub-structures ====================

function StepCard({ step, icon, title, description }: { step: string; icon: React.ReactNode; title: string; description: string }) {
    return (
        /* Mobile vs Desktop Behavior: 
           Mobie: bg-primary-light, border-primary, text-primary active by default
           Desktop (md:): changes to normal state and trigger active styling on hover
        */
        <div className="bg-primary-light border-primary md:bg-background md:border-border rounded-2xl p-6 relative flex flex-col justify-between md:hover:border-primary md:hover:bg-primary-light transition-all group">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-primary-light border border-primary/20 md:bg-white md:border-border-light flex items-center justify-center shadow-2xs md:group-hover:bg-primary-light transition-colors">
                        {icon}
                    </div>
                    <span className="text-2xl font-extrabold text-primary md:text-primary/20 md:group-hover:text-primary transition-colors">
                        {step}
                    </span>
                </div>
                <div className="space-y-2">
                    <h3 className="font-bold text-lg text-text-primary">{title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        /* Mobile vs Desktop Behavior: 
           Mobile: border-primary, shadow-xs active by default
           Desktop (md:): default border and applies shadow + border on hover
        */
        <div className="bg-white p-6 rounded-2xl border-primary shadow-xs md:border-border md:shadow-2xs md:hover:shadow-md md:hover:border-primary transition-all flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                {icon}
            </div>
            <div className="space-y-1">
                <h3 className="font-bold text-base text-text-primary">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

function StatCard({ value, label }: { value: string; label: string }) {
    return (
        <div className="space-y-1">
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">{value}</div>
            <div className="text-xs sm:text-sm font-medium text-white/80">{label}</div>
        </div>
    );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        /* Mobile vs Desktop Behavior: 
           Mobile: shadow-xs by default
           Desktop (md:): applies shadow on hover
        */
        <div className="bg-white border border-border rounded-2xl p-6 flex flex-col gap-3 shadow-xs md:shadow-none md:hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
                {icon}
            </div>
            <div className="space-y-1">
                <h3 className="font-bold text-base text-text-primary">{title}</h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{description}</p>
            </div>
        </div>
    );
}