// ==========================================
// ১. কনফিগারেশন এবং কনস্ট্যান্ট (Constants)
// ==========================================

// ক্যাশের নাম ও ভার্সন। সার্ভিস ওয়ার্কার আপডেট করলে এই ভার্সন পরিবর্তন করতে হয় (যেমন: v1.3 থেকে v1.4)।
const CACHE_NAME = "milbe-v1.4";

// অ্যাপের মূল স্ট্যাটিক অ্যাসেট বা ফাইলসমূহ যেগুলো সার্ভিস ওয়ার্কার ইনস্টল হওয়ার সাথে সাথে ক্যাশে সেভ হবে।
const STATIC_ASSETS = [
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/apple-touch-icon.png",
  "/favicon.ico",
  "/offline", // [NEW]: ইন্টারনেট না থাকলে কাস্টম ফলব্যাক পেজ হিসেবে দেখানোর জন্য প্রিলোড রুট
];

// যেসব API বা ইউআরএল পাথ কখনোই ক্যাশে সেভ করা যাবে না (সিকিউরিটি এবং সিকিউর ডেটার জন্য)।
const NO_CACHE_PATHS = [
  "/api/auth/",
  "/api/dashboard/",
  "/profile", // প্রোফাইল পেজ ও তার সাব-রুট ক্যাশ হবে না
  "/add-post", // বই যোগ বা পোস্ট যোগ করার পেজ ক্যাশ হবে না
];

// ==========================================
// ২. হেল্পার ফাংশনসমূহ (Helper Functions)
// ==========================================

/**
 * ইউআরএল পাথটি নো-ক্যাশ (No-Cache) তালিকার অন্তর্ভুক্ত কিনা তা পরীক্ষা করে।
 * @param {string} pathname
 * @returns {boolean}
 */
function isNoCachePath(pathname) {
  // NO_CACHE_PATHS অ্যারের কোনো রুটের সাথে মিলে গেলে true রিটার্ন করবে।
  return NO_CACHE_PATHS.some((prefix) => pathname.startsWith(prefix));
}

/**
 * ফাইলটি স্ট্যাটিক রিসোর্স (যেমন: ইমেজ, ফন্ট, CSS, JS) কিনা তা পরীক্ষা করে।
 * @param {string} pathname
 * @returns {boolean}
 */
function isStaticAsset(pathname) {
  return (
    pathname.startsWith("/_next/static/") || // Next.js-এর বিল্ট-ইন জেনারেটেড JS ও CSS ফাইল
    pathname.startsWith("/_next/image/") || // Next.js-এর অপটিমাইজড ইমেজ
    STATIC_ASSETS.some((asset) => pathname === asset) || // আমরা উপরে যে স্ট্যাটিক ফাইল অ্যারে দিয়েছি
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".woff2")
  );
}

/**
 * [UPDATED]: ব্রাউজার থেকে আসা রিকোয়েস্টটি কোনো এইচটিএমএল পেজ অথবা Next.js-এর Client-Side Navigation (RSC Data)-এর জন্য কিনা তা চেক করে।
 * @param {Request} request
 * @param {URL} url
 * @returns {boolean}
 */
function isPageRequest(request, url) {
  const accept = request.headers.get("Accept") || "";
  // ১. ডাইরেক্ট পেজ ব্রাউজ করার সময় `text/html` চেক
  const isHTML = accept.includes("text/html");
  // ২. Next.js-এর লিংক ক্লিকের মাধ্যমে ক্লায়েন্ট-সাইড নেভিগেশনের সময় পাঠানো RSC (React Server Component) রিকোয়েস্ট ডিটেক্ট করা
  const isRSC = request.headers.has("RSC") || url.searchParams.has("_rsc");

  return isHTML || isRSC;
}

// ==========================================
// ৩. ইনস্টলেশন ইভেন্ট (Install Event)
// ==========================================

// ব্রাউজারে প্রথমবার সার্ভিস ওয়ার্কার রেজিস্টার বা ইনস্টল হওয়ার সময় এই ইভেন্ট ফায়ার হয়।
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // মূল স্ট্যাটিক ফাইলগুলো ইনস্টল হওয়ার সময় ব্রাউজার ক্যাশে প্রিলোড (Pre-load) করে রাখে।
      return cache.addAll(STATIC_ASSETS);
    }),
  );
  // নতুন সার্ভিস ওয়ার্কার ইনস্টল হওয়ার সাথে সাথে পূর্বের সার্ভিস ওয়ার্কারকে স্কিপ করে সক্রিয় হয়ে যায়।
  self.skipWaiting();
});

// ==========================================
// ৪. অ্যাক্টিভেশন ইভেন্ট (Activate Event)
// ==========================================

// নতুন ভার্সন রান হওয়ার সময় পুরোনো ভার্সনের জমে থাকা অপ্রয়োজনীয় ক্যাশ মুছে ফেলে।
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          // বর্তমান CACHE_NAME ছাড়া অন্য সব পুরোনো ক্যাশ ফিল্টার করে মুছে ফেলে
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name)),
      );
    }),
  );
  // ব্রাউজারের সমস্ত ওপেন থাকা ট্যাবে সাথে সাথেই নতুন সার্ভিস ওয়ার্কারের নিয়ন্ত্রণ নিয়ে নেয়।
  self.clients.claim();
});

// ==========================================
// ৫. ফেচ ইভেন্ট - নেটওয়ার্ক ও ক্যাশ কন্ট্রোল (Fetch Event)
// ==========================================

// ব্রাউজার থেকে কোনো ইমেজ, এপিআই, পেজ বা ফাইল লোড করার রিকোয়েস্ট পাঠালেই এই ফেচ ইভেন্টটি কাজ শুরু করে।
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // ১. কেবল GET রিকোয়েস্ট হ্যান্ডেল করা হবে। POST, PUT, DELETE ইত্যাদি রিকোয়েস্ট সার্ভিস ওয়ার্কার বাইপাস করে সরাসরি নেটওয়ার্কে চলে যাবে।
  if (request.method !== "GET") return;

  // ২. সিকিউরিটি চেক: যদি রিকোয়েস্টটি অথেন্টিকেশন, ইউজার ডাটা বা নো-ক্যাশ পাথের হয়, তবে নেটওয়ার্ক থেকে সরাসরি ফেস করা হবে।
  if (isNoCachePath(url.pathname)) {
    return;
  }

  // ৩. স্ট্র্যাটেজি ১: Network First (HTML Web Pages এবং Next.js Client Navigation-এর জন্য)
  // পেজ বা লিংক নেভিগেশনের সময় প্রথমে ইন্টারনেট/সার্ভার থেকে লেটেস্ট পেজ ও ডাটা আনার চেষ্টা করবে।
  if (isPageRequest(request, url)) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // [UPDATED]: ইন্টারনেট থেকে রেসপন্স সফল (Status 200) হলে সেটি ক্যাশে আপডেট করে ব্রাউজারে পাঠাবে। (Cross-origin/opaque response ফিক্সের জন্য type check শিথিল করা হয়েছে)
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // [FIXED]: ইন্টারনেট না থাকলে প্রথমে ক্যাশে খুঁজে দেখা হবে ইউজার পূর্বে পেজটিতে ভিজিট করেছিল কিনা।
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }

          // [NEW]: পেজটি যদি আগে কখনো ভিজিট/ক্যাশ করা না থাকে, তবে ক্রোম ডাইনোসর এরর না দেখিয়ে প্রিলোড থাকা কাস্টম /offline পেজটি রিটার্ন করবে।
          const offlinePage = await caches.match("/offline");
          if (offlinePage) {
            return offlinePage;
          }

          // ব্যাকআপ ফলব্যাক রেসপন্স
          return new Response(
            "You are offline. Please check your internet connection.",
            {
              headers: { "Content-Type": "text/html; charset=utf-8" },
            },
          );
        }),
    );
    return;
  }

  // ৪. স্ট্র্যাটেজি ২: Cache First (স্ট্যাটিক ফাইল যেমন CSS, JS, Images, Fonts-এর জন্য)
  // স্ট্যাটিক ফাইলের ক্ষেত্রে ব্রাউজার ক্যাশে আগে চেক করবে, থাকলে নেটওয়ার্কে যাবে না।
  if (isStaticAsset(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        // যদি ক্যাশে ফাইলটি আগে থেকেই থাকে, তবে সরাসরি ক্যাশ থেকে রিটার্ন করবে (দ্রুত লোড হবে)।
        if (cachedResponse) {
          return cachedResponse;
        }

        // ক্যাশে না থাকলে ইন্টারনেট/নেটওয়ার্ক থেকে ফাইলটি নিয়ে আসবে এবং ক্যাশে সেভ করবে।
        return fetch(request).then((networkResponse) => {
          // সফল রেসপন্স না পেলে (যেমন: 404, 500 এরর) তা ক্যাশে রাখবে না।
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          // থার্ড-পার্টি বা নিজের সার্ভারের স্ট্যাটিক ফাইল ক্যাশে সেভ করবে
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });

          return networkResponse;
        });
      }),
    );
    return;
  }

  // ৫. স্ট্র্যাটেজি ৩: Network Only / Pass Through (Dynamic Data, Dynamic API Calls)
  // [FIXED BUG]: অনাকাঙ্ক্ষিত ডাইনামিক ডেটা এবং Dynamic API Fetching যেন ভুলবশত ক্যাশে জমা হয়ে অ্যাপের স্টেট নষ্ট না করে,
  // তাই বাকি সব রিকোয়েস্ট সার্ভিস ওয়ার্কার ক্যাশে না রেখে সরাসরি ইন্টারনেট থেকে রিয়েল-টাইমে নিয়ে আসবে।
  event.respondWith(fetch(request));
});
