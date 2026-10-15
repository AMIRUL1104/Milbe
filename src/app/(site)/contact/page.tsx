import type { Metadata } from "next";
import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import BackButton from "@/components/ui/BackButton";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata("contact");

export default function ContactPage() {
    // তোমার তথ্যগুলো এখানে বসিয়ে নেবে
    const phoneNumber = "+8801846153741";
    const whatsAppNumber = "8801315399059"; // কান্ট্রি কোড সহ (+ ছাড়া)
    const emailAddress = "amirulislam9.e@gmail.com";

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-6 sm:py-12 text-slate-800">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">

                {/* Back Button */}
                <div>
                    <BackButton />
                </div>

                {/* Header Title */}
                <div className="text-center space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                        আমাদের সাথে যোগাযোগ করুন
                    </h1>
                    <p className="text-sm sm:text-base text-slate-500 max-w-lg mx-auto">
                        বই কেনাবেচা বা এক্সচেঞ্জ সংক্রান্ত যেকোনো প্রয়োজনে আমাদের সাথে সরাসরি নিচের মাধ্যমে যোগাযোগ করতে পারেন।
                    </p>
                </div>

                {/* Contact Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                    {/* WhatsApp Card */}
                    <a
                        href={`https://wa.me/${whatsAppNumber}?text=আসসালামু আলাইকুম, মিলবে সম্পর্কে জানতে চাচ্ছিলাম।`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-5 bg-white border border-[#25D366]/40 sm:border-slate-200 rounded-2xl shadow-sm hover:border-[#25D366] transition-all group"
                    >
                        <div className="w-12 h-12 bg-emerald-100/70 sm:bg-emerald-50 text-[#25D366] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <MessageCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-[#25D366] sm:text-slate-400 uppercase tracking-wider">
                                হোয়াটসঅ্যাপ (WhatsApp)
                            </p>
                            <h3 className="text-base font-semibold text-slate-800 mt-0.5">চ্যাট করুন</h3>
                            <p className="text-xs text-slate-500 mt-0.5">দ্রুততম সময়ে রেসপন্স পেতে</p>
                        </div>
                    </a>

                    {/* Phone Call Card */}
                    <a
                        href={`tel:${phoneNumber}`}
                        className="flex items-center gap-4 p-5 bg-white border border-[#35858E]/40 sm:border-slate-200 rounded-2xl shadow-sm hover:border-[#35858E] transition-all group"
                    >
                        <div className="w-12 h-12 bg-teal-100/70 sm:bg-teal-50 text-[#35858E] rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-[#35858E] sm:text-slate-400 uppercase tracking-wider">
                                ফোন কল
                            </p>
                            <h3 className="text-base font-semibold text-slate-800 mt-0.5">{phoneNumber}</h3>
                            <p className="text-xs text-slate-500 mt-0.5">সরাসরি কথা বলতে ক্লিক করুন</p>
                        </div>
                    </a>

                    {/* Email Card */}
                    <a
                        href={`mailto:${emailAddress}`}
                        className="flex items-center gap-4 p-5 bg-white border border-blue-200 sm:border-slate-200 rounded-2xl shadow-sm hover:border-blue-500 transition-all group"
                    >
                        <div className="w-12 h-12 bg-blue-100/70 sm:bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-blue-600 sm:text-slate-400 uppercase tracking-wider">
                                ইমেইল (Email)
                            </p>
                            <h3 className="text-base font-semibold text-slate-800 mt-0.5 break-all">{emailAddress}</h3>
                            <p className="text-xs text-slate-500 mt-0.5">অফিসিয়াল যোগাযোগ</p>
                        </div>
                    </a>

                    {/* Location & Time Card */}
                    <div className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">লোকেশন</p>
                            <h3 className="text-base font-semibold text-slate-800 mt-0.5">সিলেট, বাংলাদেশ</h3>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                <Clock className="w-3.5 h-3.5" /> সকাল ১০টা - রাত ১০টা
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}