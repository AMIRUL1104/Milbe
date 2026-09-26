import Image from "next/image";
import Link from "next/link";

interface LogoProps {
    className?: string;
    variant?: "header" | "footer" | "icon";
    width?: number;
    height?: number;
}

export default function Logo({
    className = "",
    variant = "header",
    width,
    height,
}: LogoProps) {
    // ভ্যারিয়েন্ট অনুযায়ী ডিফল্ট সাইজ নির্ধারণ
    const defaultDimensions = {
        header: { w: 60, h: 40 },
        footer: { w: 80, h: 48 },
        icon: { w: 40, h: 40 }, // ১:১ স্কয়ার ভার্সনের জন্য
    };

    const imgWidth = width || defaultDimensions[variant].w;
    const imgHeight = height || defaultDimensions[variant].h;

    return (
        <Link
            href="/"
            className={`inline-flex items-center rounded-md transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-primary-focus ${className}`}
            aria-label="মিলবে হোম পেজ"
        >
            <Image
                src="/logo.jpg" // public/logo.png ফাইলটি ব্যবহার করবে
                alt="মিলবে লোগো"
                width={imgWidth}
                height={imgHeight}
                priority={variant === "header"} // হেডারের জন্য ফাস্ট লোডিং নিশ্চিত করবে
                className="object-contain h-auto w-auto"
            />
        </Link>
    );
}