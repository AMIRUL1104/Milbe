// ═══════════════════════════════════════════════════════════════════
// market.ts — মার্কেট পজিশনিং-এর Single Source of Truth (Central Config)
//
// উদ্দেশ্য: সাইটের সব ইউজার-দৃশ্যমান পজিশনিং কপি (হিরো, ফুটার, মিশন,
// ভিশন ইত্যাদি) এক জায়গা থেকে নিয়ন্ত্রণ করা, যাতে MVP-তে "Sylhet-first"
// পজিশনিং থাকে এবং ভবিষ্যতে অন্য জেলা বা জাতীয় স্কোপে যাওয়ার সময়
// শুধু ACTIVE_MARKET_ID বদলালেই পুরো UI আপডেট হয়ে যায়।
//
// স্কোপ নোট: এই কনফিগ শুধু UI কপি ও পজিশনিং সামলায়। ফাংশনাল লোকেশন
// ডেটা (জেলা লিস্ট, ড্রপডাউন, API) এখান থেকে সম্পূর্ণ আলাদা থাকবে —
// দেখুন: src/lib/constant/location.ts
//
// SEO/মেটাডেটা (title, description, OG, JSON-LD, manifest) নিচের `seo`
// ব্লকে কেন্দ্রীয়ভাবে রাখা হয়েছে (Phase 2)।
// ═══════════════════════════════════════════════════════════════════

/** মার্কেটের ভৌগোলিক স্কোপ: MVP-তে একটি জেলা, ভবিষ্যতে জাতীয় হতে পারে */
export type MarketScope = "district" | "national";

/** ভৌগোলিক তথ্য — ফ্যাক্টুয়াল অংশ (ঠিকানা ইত্যাদি) */
export interface MarketRegion {
  /** অঞ্চলের বাংলা নাম */
  nameBn: string;
  /** অঞ্চলের ইংরেজি নাম */
  nameEn: string;
  /** DISTRICTS (src/lib/constant/location.ts)-এর সাথে ম্যাচ করা key */
  districtKey: string;
  /** দেশের বাংলা নাম — ঠিকানার কনটেক্সটে ব্যবহৃত */
  countryBn: string;
  /** দেশের ইংরেজি নাম — JSON-LD (schema.org)-এর জন্য, যেমন: "Bangladesh" */
  countryEn: string;
  /** পূর্ণ ঠিকানা লাইন — ফুটার কন্টাক্ট সেকশনের জন্য */
  addressLineBn: string;
}

/** টার্গেট অডিয়েন্স লেবেল */
export interface MarketAudience {
  /** অডিয়েন্সের বিশেষ্য রূপ, যেমন: "সিলেটের শিক্ষার্থীরা" */
  labelBn: string;
  /** বাক্যের ভেতরে ব্যবহারযোগ্য পসেসিভ রূপ, যেমন: "সিলেটের শিক্ষার্থীদের" */
  possessiveBn: string;
}

/** ইউজার-দৃশ্যমান পজিশনিং কপি (Phase 1-এর মূল খাওয়ার জায়গা) */
export interface MarketPositioning {
  /** হিরো ব্যাজ টেক্সট */
  badgeBn: string;
  /** হিরো ডেস্কটপ ট্যাগলাইন */
  taglineBn: string;
  /** ফুটার বর্ণনা */
  footerTaglineBn: string;
  /** সংক্ষিপ্ত বর্ণনা — FAQ-১ ইত্যাদি */
  shortDescriptionBn: string;
  /** About পেজ — Mission */
  missionBn: string;
  /** About পেজ — Vision */
  visionBn: string;
  /** মোবাইল MenuDrawer-এর নিচের ট্যাগলাইন */
  drawerTaglineBn: string;
}

/** একটি স্ট্যাটিক পেজের SEO কপি (Phase 2) */
export interface MarketSeoPage {
  /** পেজের URL পাথ (শুরুতে "/") */
  path: string;
  /** পেজ টাইটেল — ব্র্যান্ড সাফিক্স ছাড়া (titleTemplate সাফিক্স যোগ করবে) */
  title: string;
  /** পেজের meta description */
  description: string;
  /**
   * true হলে titleTemplate প্রয়োগ হবে না (absolute টাইটেল)।
   * টাইটেলে ব্র্যান্ড নিজেই থাকলে (যেমন হোমপেজ) ব্যবহার করুন।
   */
  absoluteTitle?: boolean;
}

/** SEO/মেটাডেটা ব্লক — রুট layout, স্ট্যাটিক পেজ, JSON-LD ও manifest এখান থেকে ডেরাইভ */
export interface MarketSeo {
  /** ব্র্যান্ড-ছাড়া ডিফল্ট টাইটেল (রুট layout + OG/Twitter ফলব্যাক) */
  defaultTitle: string;
  /** টাইটেল টেমপ্লেট — চাইল্ড পেজের টাইটেলে ব্র্যান্ড সাফিক্স যোগ করে */
  titleTemplate: string;
  /** সাইট-লেভেল বাংলা description (OG/Twitter/JSON-LD/manifest-ও এটি ব্যবহার করে) */
  description: string;
  /** সিলেট-ফার্স্ট কিওয়ার্ড লিস্ট */
  keywords: string[];
  /** OG locale (সাইট lang="bn", তাই "bn_BD") */
  ogLocale: string;
  /** OG siteName */
  siteName: string;
  /** Authoritative canonical origin — robots/sitemap-ও এটি ব্যবহার করে */
  canonicalBaseUrl: string;
  /** OG/Twitter ইমেজ — public ফোল্ডারের relative পাথ */
  ogImage: string;
  /** স্ট্যাটিক পেজসমূহের per-page SEO কপি (কী: home, about, faq, privacy, terms, howItWorks) */
  pages: Record<string, MarketSeoPage>;
}

export interface MarketConfig {
  /** মেশিন-রিডেবল মার্কেট আইডি */
  id: string;
  /** মার্কেট স্কোপ */
  scope: MarketScope;
  region: MarketRegion;
  audience: MarketAudience;
  positioning: MarketPositioning;
  /** SEO/মেটাডেটা কনফিগ (Phase 2) */
  seo: MarketSeo;
}

// ─── সব সম্ভাব্য মার্কেট এক জায়গায় (এক্সপ্যানশন-রেডি) ─────────────────
// নতুন জেলা/মার্কেটে যাওয়ার সময় এখানে নতুন এন্ট্রি যোগ করুন।
export const MARKETS: Record<string, MarketConfig> = {
  "sylhet-mvp": {
    id: "sylhet-mvp",
    scope: "district",
    region: {
      nameBn: "সিলেট",
      nameEn: "Sylhet",
      districtKey: "Sylhet",
      countryBn: "বাংলাদেশ",
      countryEn: "Bangladesh",
      addressLineBn: "সিলেট, বাংলাদেশ",
    },
    audience: {
      labelBn: "সিলেটের শিক্ষার্থীরা",
      possessiveBn: "সিলেটের শিক্ষার্থীদের",
    },
    positioning: {
      badgeBn: "সিলেটের শিক্ষার্থীদের পুরোনো বইয়ের মার্কেটপ্লেস",
      taglineBn:
        "সিলেটের শিক্ষার্থীদের একাডেমিক বই কেনাবেচা ও দান করার নির্ভরযোগ্য প্ল্যাটফর্ম।",
      footerTaglineBn:
        "সিলেটের শিক্ষার্থীদের জন্য একাডেমিক বই কেনাবেচা ও আদান-প্রদানের নির্ভরযোগ্য প্ল্যাটফর্ম।",
      shortDescriptionBn:
        "মিলবে সিলেটের শিক্ষার্থীদের জন্য তৈরি একটি সহজ বই কেনাবেচা ও দানের প্ল্যাটফর্ম।",
      missionBn:
        "সিলেটের শিক্ষার্থীদের জন্য প্রয়োজনীয় একাডেমিক বই সহজে, দ্রুত এবং সাশ্রয়ী খরচে খুঁজে পাওয়ার ডিজিটাল মাধ্যম তৈরি করা। একই সাথে, পড়া শেষে ফেলে রাখা অব্যবহৃত বইগুলোকে পুনরায় অন্য শিক্ষার্থীদের কাছে পৌঁছে দেওয়ার সুযোগ সৃষ্টি করা—যাতে প্রতিটি বই একাধিক শিক্ষার্থীর শিক্ষার পথকে সহজ করতে পারে এবং সার্বিকভাবে একটি টেকসই ও সহযোগিতাভিত্তিক বই শেয়ারিং কালচার গড়ে ওঠে।",
      visionBn:
        "সিলেটে সফল সূচনার মাধ্যমে যাত্রা শুরু করে, পরবর্তীতে পুরো বাংলাদেশের শিক্ষার্থীদের জন্য বই কেনাবেচা, আদান-প্রদান ও শেয়ার করার সবচেয়ে নির্ভরযোগ্য ও সহজ প্ল্যাটফর্ম হয়ে ওঠা। সময়ের সাথে সাথে শিক্ষার্থীদের একাডেমিক বইয়ের পাশাপাশি সব ধরনের বই সহজলভ্য করার মাধ্যমে একটি দেশব্যাপী বই শেয়ারিং ইকোসিস্টেম তৈরি করা আমাদের লক্ষ্য।",
      drawerTaglineBn:
        "মিলবে — সিলেটের শিক্ষার্থীদের বই কেনাবেচা ও দানের প্ল্যাটফর্ম",
    },
    seo: {
      defaultTitle: "মিলবে — সিলেটের শিক্ষার্থীদের পুরোনো বইয়ের মার্কেটপ্লেস",
      titleTemplate: "%s | Milbe",
      description:
        "মিলবে — সিলেটের শিক্ষার্থীদের জন্য একাডেমিক বই কেনাবেচা, আদান-প্রদান ও দানের নির্ভরযোগ্য প্ল্যাটফর্ম। পুরোনো বই সহজে বিক্রি করুন বা প্রয়োজনীয় বই কম দামে খুঁজে নিন।",
      keywords: [
        "মিলবে",
        "Milbe",
        "সিলেট বই",
        "সিলেটের বই কেনাবেচা",
        "Sylhet books",
        "used books Sylhet",
        "পুরোনো বই বিক্রি",
        "একাডেমিক বই",
        "পাঠ্যবই",
        "বই দান",
        "বই কেনাবেচা বাংলাদেশ",
        "student book marketplace",
        "textbooks Sylhet",
        "buy sell donate books",
      ],
      ogLocale: "bn_BD",
      siteName: "Milbe",
      canonicalBaseUrl: "https://milbe.vercel.app",
      ogImage: "/logo.jpg",
      pages: {
        home: {
          path: "/",
          title: "মিলবে | সিলেটের শিক্ষার্থীদের বই কেনাবেচা ও দানের প্ল্যাটফর্ম",
          description:
            "সিলেটের শিক্ষার্থীদের জন্য মিলবে — পুরোনো একাডেমিক বই কেনা, বেচা ও দান করার সহজ প্ল্যাটফর্ম। আপনার প্রয়োজনীয় পাঠ্যবই কম দামে খুঁজে নিন বা অব্যবহৃত বই অন্যের কাজে লাগান।",
          absoluteTitle: true,
        },
        about: {
          path: "/about",
          title: "আমাদের সম্পর্কে",
          description:
            "মিলবের লক্ষ্য ও ভিশন জানুন — সিলেটের শিক্ষার্থীদের জন্য বই কেনাবেচা ও দানের নির্ভরযোগ্য প্ল্যাটফর্ম গড়ে তোলার যাত্রা।",
        },
        faq: {
          path: "/faq",
          title: "সাধারণ জিজ্ঞাসা (FAQ)",
          description:
            "মিলবে কীভাবে কাজ করে, বই কেনা-বেচা ও দানের নিয়ম — সিলেটের শিক্ষার্থীদের সাধারণ প্রশ্নের উত্তর।",
        },
        privacy: {
          path: "/privacy",
          title: "গোপনীয়তা নীতি",
          description:
            "মিলবে কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত রাখে তা বিস্তারিত জানুন।",
        },
        terms: {
          path: "/terms",
          title: "শর্তাবলী ও নীতিমালা",
          description:
            "মিলবে প্ল্যাটফর্ম ব্যবহারের নিয়মাবলী, আইনি শর্তাবলী ও ব্যবহারকারীর দায়িত্ব সম্পর্কে জানুন।",
        },
        howItWorks: {
          path: "/how-it-works",
          title: "কীভাবে কাজ করে",
          description:
            "মিলবেতে মাত্র ৪টি ধাপে বই কেনাবেচা বা দান — বই পোস্ট করুন, প্রয়োজনীয় বই খুঁজুন, রিকোয়েস্ট পাঠান এবং যোগাযোগ করে বইটি সংগ্রহ করুন।",
        },
      },
    },
  },
  // ভবিষ্যৎ এক্সপ্যানশনের উদাহরণ (Phase 2/3-এ যোগ করা হবে):
  // "bangladesh-national": { ... },
};

// ─── সক্রিয় মার্কেট ─────────────────────────────────────────────────
// ভবিষ্যতে এক্সপ্যানশনের সময় শুধু এই এক লাইন বদলালেই পুরো UI কপি আপডেট হবে।
export const ACTIVE_MARKET_ID = "sylhet-mvp" as const;

export const marketConfig: MarketConfig = MARKETS[ACTIVE_MARKET_ID];
