// src/app/faq/page.tsx
import FAQContainer from "@/components/faq/FAQContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ | Milbe",
    description: "Find answers to frequently asked questions about buying, selling, and donating books on Milbe.",
};

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-[#FDFDFD]">
            <FAQContainer />
        </main>
    );
}