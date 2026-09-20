import Link from "next/link";
import { BookOpen } from "lucide-react";

function CTA() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            {/* 
        bg-gradient-to-br: আড়াআড়ি (Diagonal) গ্রেডিয়েন্ট 
        from-[#2d737b] via-[#35858E] via-75% to-[#F6CE71]/90: ২/৩ অংশ টিল/সবুজাভ এবং কোণাকুণি ১/৩ অংশ সুষম হলুদ টোন
      */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#2d737b] via-[#35858E] via-65% to-[#F6CE71]/90 text-white rounded-[16px] p-6 sm:p-10 md:p-14 border border-[#35858E]/40 shadow-lg">
                {/* Subtle Decorative Backdrop Element */}
                <div
                    aria-hidden="true"
                    className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none"
                />

                <div className="relative z-10 max-w-2xl mx-auto text-center space-y-5">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs sm:text-sm font-medium text-white backdrop-blur-sm">
                        <BookOpen className="w-3.5 h-3.5 text-[#F6CE71]" />
                        <span>নতুন যাত্রার শুরু</span>
                    </div>

                    {/* H2 Title with balanced size & natural word-spacing */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-normal leading-snug sm:leading-relaxed text-white [word-spacing:0.08em]">
                        আপনার বইকে দ্বিতীয় জীবন দিতে প্রস্তুত?
                    </h2>

                    {/* Description */}
                    <p className="text-white/95 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-normal">
                        আপনার পুরোনো বই অন্য শিক্ষার্থীর কাজে লাগান—সহজেই বিক্রি করুন, দান করুন বা প্রয়োজনীয় বই খুঁজুন।
                    </p>

                    {/* Call to Action Button */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
                        <Link
                            href="/add-post"
                            className="w-full sm:w-auto text-center bg-[#171717] hover:bg-[#2d2d2d] text-white font-medium text-sm sm:text-base px-7 py-3 rounded-[8px] transition-all duration-200 shadow-md active:scale-95 border border-white/10"
                        >
                            আপনার বই পোস্ট করুন
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CTA;