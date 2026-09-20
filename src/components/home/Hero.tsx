import Link from "next/link";
import { PlusCircle, GraduationCap, ShoppingBag, MessageSquare, Search, Users } from "lucide-react";

export default function Hero() {
    return (
        <section
            aria-label="Milbe Hero Section"
            className="relative w-full py-10 md:py-16 bg-[#F5F7F8] border-b border-[#EDF1F2] overflow-hidden"
        >
            {/* Dynamic SEO JSON-LD Schema for Search Engines */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "Milbe",
                        "url": "https://milbe.shop",
                        "description": "বাংলাদেশের শিক্ষার্থীদের একাডেমিক বই কেনাবেচা ও দান করার প্ল্যাটফর্ম।",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://milbe.shop/?search={search_term_string}",
                            "query-input": "required name=search_term_string",
                        },
                    }),
                }}
            />

            {/* Decorative Subtle Background Accents */}
            <div
                aria-hidden="true"
                className="absolute -top-24 -left-24 w-72 h-72 bg-[#35858E]/10 rounded-full blur-3xl pointer-events-none"
            />
            <div
                aria-hidden="true"
                className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#F6CE71]/15 rounded-full blur-3xl pointer-events-none"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* Left Column: Core Message & Call To Action (7 cols) */}
                    <div className="lg:col-span-7 text-center sm:text-left space-y-5 md:space-y-6">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#35858E]/10 border border-[#35858E]/20 text-xs sm:text-sm font-semibold text-[#35858E]">
                            <GraduationCap className="w-4 h-4 text-[#35858E]" />
                            <span>শিক্ষার্থীদের একাডেমিক বই বিনিময় প্ল্যাটফর্ম</span>
                        </div>

                        {/* Main H1 Title with clean word-spacing */}
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] tracking-normal leading-normal md:leading-relaxed [word-spacing:0.12em]">
                            বাংলাদেশের শিক্ষার্থীদের একাডেমিক বই{" "}
                            <span className="text-[#35858E]">কেনাবেচা</span> ও{" "}
                            <span className="text-[#35858E]">দানের</span> বিশ্বস্ত ঠিকানা
                        </h1>

                        {/* Updated Subtitle */}
                        <p className="text-sm sm:text-base md:text-lg text-[#4b5563] leading-relaxed font-normal max-w-2xl">
                            আপনার প্রয়োজনীয় একাডেমিক বই খুঁজুন, নিজের অব্যবহৃত পুরোনো বই সহজেই বিক্রি করুন অথবা অন্য শিক্ষার্থীর সহায়তায় দান করুন।
                        </p>

                        {/* Primary Action Button */}
                        <div className="pt-2">
                            <Link
                                href="/add-post"
                                className="inline-flex items-center justify-center gap-2 bg-[#35858E] hover:bg-[#2d737b] text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-[8px] transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                            >
                                <PlusCircle className="w-5 h-5 text-[#F6CE71]" />
                                <span>আপনার বই পোস্ট করুন</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Premium Floating Feature Cards Grid (5 cols) */}
                    <div className="lg:col-span-5 sm:grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 hidden ">

                        {/* Card 1 */}
                        <div className="p-4 bg-white rounded-[12px] border border-[#EDF1F2] shadow-2xs hover:shadow-sm transition-all duration-200">
                            <div className="w-9 h-9 rounded-lg bg-[#35858E]/10 flex items-center justify-center text-[#35858E] mb-2.5">
                                <ShoppingBag className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-bold text-[#171717]">পুরোনো বই বিক্রি করুন</h3>
                            <p className="text-xs text-[#4b5563] mt-1 leading-normal">
                                আপনার আগের শিক্ষাবর্ষের পুরোনো বই বিক্রি করুন।
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="p-4 bg-white rounded-[12px] border border-[#EDF1F2] shadow-2xs hover:shadow-sm transition-all duration-200">
                            <div className="w-9 h-9 rounded-lg bg-[#35858E]/10 flex items-center justify-center text-[#35858E] mb-2.5">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-bold text-[#171717]">ক্রেতার সাথে সরাসরি যোগাযোগ</h3>
                            <p className="text-xs text-[#4b5563] mt-1 leading-normal">
                                কোনো মধ্যস্থতাকারী ছাড়াই সরাসরি কথা বলুন।
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="p-4 bg-white rounded-[12px] border border-[#EDF1F2] shadow-2xs hover:shadow-sm transition-all duration-200">
                            <div className="w-9 h-9 rounded-lg bg-[#35858E]/10 flex items-center justify-center text-[#35858E] mb-2.5">
                                <Search className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-bold text-[#171717]">প্রয়োজনীয় বই খুঁজুন</h3>
                            <p className="text-xs text-[#4b5563] mt-1 leading-normal">
                                আপনার প্রয়োজনীয় পুরোনো একাডেমিক বই খুঁজুন—মিলবেই!
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div className="p-4 bg-white rounded-[12px] border border-[#EDF1F2] shadow-2xs hover:shadow-sm transition-all duration-200">
                            <div className="w-9 h-9 rounded-lg bg-[#35858E]/10 flex items-center justify-center text-[#35858E] mb-2.5">
                                <Users className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm font-bold text-[#171717]">আশেপাশের সহপাঠী</h3>
                            <p className="text-xs text-[#4b5563] mt-1 leading-normal">
                                আপনার আশেপাশের সহপাঠীর কাছ থেকে পুরোনো বই সংগ্রহ করুন কোনো মধ্যস্থতাকারী ছাড়াই।
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}