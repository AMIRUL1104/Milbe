// src/app/faq/page.tsx
import FAQContainer from "@/app/(site)/faq/FAQContainer";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildPageMetadata("faq");

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-[#FDFDFD]">
            <FAQContainer />
        </main>
    );
}