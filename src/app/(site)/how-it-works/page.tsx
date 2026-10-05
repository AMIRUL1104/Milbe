import HowItWorks from '@/components/home/HowItWorks'
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildPageMetadata("howItWorks");

function HowItWorkpage() {
    return (
        <div>
            <HowItWorks />
        </div>
    )
}

export default HowItWorkpage