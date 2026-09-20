import { FilePlus, Search, Send, PhoneCall } from "lucide-react";

interface StepItem {
    number: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

const STEPS: StepItem[] = [
    {
        number: "01",
        title: "বই পোস্ট করুন",
        description: "আপনার বইটি বিক্রি অথবা দান করতে কয়েকটি তথ্য দিয়ে একটি পোস্ট তৈরি করুন।",
        icon: FilePlus,
    },
    {
        number: "02",
        title: "আপনার প্রয়োজনীয় বই খুঁজুন",
        description: "বইয়ের নাম, লেখক, ক্যাটাগরি বা লোকেশন দিয়ে সহজেই আপনার প্রয়োজনীয় বইটি খুঁজে নিন।",
        icon: Search,
    },
    {
        number: "03",
        title: "রিকোয়েস্ট পাঠান",
        description: "পছন্দের বইটি পেয়ে গেলে মালিকের কাছে একটি রিকোয়েস্ট পাঠান।",
        icon: Send,
    },
    {
        number: "04",
        title: "যোগাযোগ করে বইটি নিন",
        description: "মালিক রিকোয়েস্ট গ্রহণ করলে যোগাযোগের তথ্য দেখুন এবং সুবিধামতো বইটি সংগ্রহ করুন।",
        icon: PhoneCall,
    },
];

export default function HowItWorks() {
    return (
        <section className="w-full py-12 md:py-16 bg-slate-50/50 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Heading */}
                <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-700 bg-teal-50 rounded-full mb-3">
                        সহজ ৪টি ধাপ
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                        মিলবে কীভাবে কাজ করে
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-slate-600">
                        বই খুঁজতে, বিক্রি করতে বা দান করতে Milbe-তে মাত্র ৪টি সহজ ধাপ।
                    </p>
                </div>

                {/* Steps Flow Grid */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {/* Desktop Connected Line (Visible on lg screens) */}
                    <div
                        className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-teal-200 -translate-y-6 -z-0"
                        aria-hidden="true"
                    />

                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={step.number}
                                className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                {/* Step Number Badge */}
                                <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full mb-4 border border-teal-100/80">
                                    STEP {step.number}
                                </span>

                                {/* Icon Container */}
                                <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20 mb-4 ring-4 ring-teal-50">
                                    <Icon className="w-7 h-7" />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-slate-900 mb-2">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-slate-600 leading-relaxed max-w-[260px]">
                                    {step.description}
                                </p>

                                {/* Mobile Flow Connector (Arrow between cards) */}
                                {index < STEPS.length - 1 && (
                                    <div className="lg:hidden mt-4 text-slate-300 flex justify-center">
                                        <svg
                                            className="w-5 h-5 animate-pulse"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}