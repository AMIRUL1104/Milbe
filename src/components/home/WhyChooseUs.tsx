import {
    Banknote,
    ShoppingBag,
    HeartHandshake,
    SearchCheck,
    ShieldCheck,
    GraduationCap,
} from "lucide-react";

interface FeatureItem {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

const FEATURES: FeatureItem[] = [
    {
        id: "affordable",
        title: "সাশ্রয়ী বই",
        description:
            "নতুন বইয়ের তুলনায় কম খরচে ভালো অবস্থার পুরোনো একাডেমিক বই খুঁজে নিন এবং পড়াশোনার খরচ কমান।",
        icon: Banknote,
    },
    {
        id: "sell",
        title: "পুরোনো বই বিক্রি করুন",
        description:
            "কোর্স বা শিক্ষাবর্ষ শেষ হলে আপনার আর প্রয়োজন নেই এমন বই মিলবে-তে বিক্রি করুন এবং অন্য শিক্ষার্থীর কাছে পৌঁছে দিন।",
        icon: ShoppingBag,
    },
    {
        id: "donate",
        title: "বই দান করুন",
        description:
            "বই বিক্রি করতে না চাইলে অন্য শিক্ষার্থীর জন্য দান করুন। আপনার অব্যবহৃত বই কারও পড়াশোনায় কাজে লাগতে পারে।",
        icon: HeartHandshake,
    },
    {
        id: "search",
        title: "সহজে বই খুঁজুন",
        description:
            "বইয়ের নাম, লেখক, বিষয়, অবস্থান, মূল্য ও বইয়ের অবস্থা দিয়ে প্রয়োজনীয় পুরোনো বই সহজেই খুঁজে নিন।",
        icon: SearchCheck,
    },
    {
        id: "contact",
        title: "সহজ ও নিয়ন্ত্রিত যোগাযোগ",
        description:
            "বইয়ের তথ্য দেখে সহজেই অনুরোধ পাঠান। অনুরোধ গ্রহণ হলে প্রয়োজনীয় যোগাযোগের তথ্য পাওয়া যায়।",
        icon: ShieldCheck,
    },
    {
        id: "p2p",
        title: "শিক্ষার্থী থেকে শিক্ষার্থীর কাছে",
        description:
            "একজনের পড়াশোনা শেষে অব্যবহৃত বইটি হতে পারে আরেকজনের প্রয়োজনের বই। মিলবে সেই বইটি সঠিক শিক্ষার্থীর কাছে পৌঁছে দিতে সাহায্য করে।",
        icon: GraduationCap,
    },
];

export default function WhyChooseUs() {
    return (
        <section className="w-full py-12 md:py-16 bg-white border-t border-[#DDE5E7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#35858E] bg-[#35858E]/10 rounded-full mb-3">
                        আমাদের সুবিধা
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight">
                        কেন মিলবে বেছে নেবেন
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-[#4b5563] leading-relaxed">
                        শিক্ষার্থীদের জন্য তৈরি সহজ ও নির্ভরযোগ্য একটি বই বিনিময়ের প্ল্যাটফর্ম—যেখানে পুরোনো একাডেমিক বই কিনতে, বিক্রি করতে বা দান করতে পারবেন। আপনার আর প্রয়োজন নেই এমন বইটি অন্য শিক্ষার্থীর কাজে লাগতে পারে।
                    </p>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {FEATURES.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.id}
                                className="flex flex-col p-6 bg-[#F5F7F8] rounded-xl border border-[#EDF1F2] hover:border-[#35858E]/30 transition-all duration-200 hover:-translate-y-1 hover:shadow-sm group"
                            >
                                {/* Icon Container */}
                                <div className="w-12 h-12 rounded-xl bg-[#35858E]/10 text-[#35858E] flex items-center justify-center mb-4 group-hover:bg-[#35858E] group-hover:text-white transition-colors duration-200">
                                    <Icon className="w-6 h-6" />
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-bold text-[#171717] mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-[#4b5563] leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}