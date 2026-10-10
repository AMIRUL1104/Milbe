import nodemailer from "nodemailer";
import { after } from "next/server";
import { toBengaliDigits } from "./utils/toBengaliDigits";

// ১. পরিবেশের ভেরিয়েবল থেকে এসএমটিপি পোর্ট সেট করা (ডিফল্ট ৪৬৫)
const port = Number(process.env.SMTP_PORT ?? 465);

// ২. নোডমেইলার ট্রান্সপোর্টার কনফিগারেশন
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: port === 465, // এসএসএল/টিএলএস সিকিউরিটি চেক
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

// ৩. মেইল অপশনসের টাইপ ডেফিনেশন
type MailOptions = { to: string; subject: string; html: string; text: string };

// ৪. মূল ইমেইল পাঠানোর অ্যাসিনক্রোনাস ফাংশন
async function sendEmail({ to, subject, html, text }: MailOptions) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM ?? `Milbe <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    text,
  });
}

// ৫. ব্যাকগ্রাউন্ডে ইমেইল পাঠানোর নিরাপদ ফাংশন (যা মূল রিকোয়েস্ট ব্লক করে না)
function sendEmailInBackground(options: MailOptions) {
  try {
    // প্রমিজ রিজেকশন বা ত্রুটি ক্যাচ করার জন্য .catch() ব্যবহার করা হয়েছে যাতে অ্যাপ ক্র্যাশ না করে
    const task = sendEmail(options).catch((err) => {
      console.error(
        "[email] ব্যাকগ্রাউন্ডে ইমেইল পাঠাতে গিয়ে সমস্যা হয়েছে:",
        err,
      );
    });

    // Next.js-এর after() ফাংশন দিয়ে সার্ভারলেস এনভায়রনমেন্টে প্রসেস বাঁচিয়ে রাখা হয়
    if (typeof after === "function") {
      after(task);
    }
  } catch (err) {
    console.error("[email] after() এক্সিকিউট করার সময় ত্রুটি:", err);
  }
}

// ৬. এক্সএসএস (XSS) আক্রমণ প্রতিরোধের জন্য এইচটিএমএল স্কেপ করার ফাংশন
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// ৭. সব ধরনের ইমেইলের জন্য কমন রেসপন্সিভ HTML লেআউট জেনারেটর
function layout(
  greeting: string,
  paragraphs: string[],
  button: { label: string; url: string },
  details?: { label: string; value: string }[],
  image?: { src: string; alt: string },
) {
  const url = escapeHtml(button.url);

  // পোস্ট বা অন্য কোনো ইমেজ থাকলে তার নিরাপদ ট্যাগ তৈরি, না থাকলে খালি স্ট্রিং
  const imageHtml =
    image && image.src
      ? `<img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt || "")}" style="display:block;width:100%;max-height:220px;object-fit:cover;border-radius:12px;margin:0 0 16px" />`
      : "";

  // প্যারাগ্রাফ বা মূল লেখার বডি ফরম্যাট করা
  const body = paragraphs
    .map(
      (p) =>
        `<p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6">${p}</p>`,
    )
    .join("");

  // সিকিউরিটি অ্যালার্ট বা অতিরিক্ত তথ্য দেখানোর জন্য ডিটেইলস টেবিল রো তৈরি
  const detailsHtml = details?.length
    ? `<div style="margin:0 0 16px;border:1px solid #DDE5E7;border-radius:12px;overflow:hidden">${details
        .map(
          (d, i) =>
            `<div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:10px 14px;${i > 0 ? "border-top:1px solid #DDE5E7;" : ""}${i % 2 === 1 ? "background:#F5F7F8;" : ""}"><span style="margin:0;font-size:13px;color:#6B7280;white-space:nowrap">${escapeHtml(d.label)}</span><span style="margin:0;font-size:13px;font-weight:700;color:#111827;text-align:right;word-break:break-all">${escapeHtml(d.value)}</span></div>`,
        )
        .join("")}</div>`
    : "";

  // মূল ইমেইল টেমপ্লেট রিটার্ন করা
  return `<div style="background:#F5F7F8;padding:24px 12px;font-family:Arial,sans-serif">
  <div style="max-width:480px;margin:0 auto;background:#ffffff;border:1px solid #DDE5E7;border-radius:16px;padding:28px">
    <p style="margin:0 0 16px;font-size:20px;font-weight:800;color:#35858E">Milbe</p>
    <p style="margin:0 0 12px;color:#111827;font-size:16px;font-weight:700">${greeting}</p>
    ${imageHtml}${body}${detailsHtml}
    <a href="${url}" style="display:inline-block;margin:8px 0 16px;background:#35858E;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:12px">${button.label}</a>
    <p style="margin:0;color:#6B7280;font-size:12px;line-height:1.5;word-break:break-all">বাটন কাজ না করলে এই লিংকটি ব্রাউজারে পেস্ট করুন:<br/>${url}</p>
  </div>
</div>`;
}

// ৮. অ্যাকাউন্ট ভেরিফিকেশন মেইল পাঠানোর ফাংশন
export function sendVerifyMail({
  to,
  name,
  url,
}: {
  to: string;
  name: string;
  url: string;
}) {
  sendEmailInBackground({
    to,
    subject: "মিলবে: আপনার ইমেইল ভেরিফাই করুন",
    html: layout(
      `হ্যালো ${escapeHtml(name)},`,
      [
        "মিলবেতে স্বাগতম! আপনার একাউন্ট চালু করতে নিচের বাটনে ক্লিক করে ইমেইল ভেরিফাই করুন।",
        "আপনি যদি একাউন্ট না খুলে থাকেন, তাহলে এই ইমেইলটি উপেক্ষা করুন।",
      ],
      { label: "ইমেইল ভেরিফাই করুন", url },
    ),
    text: `হ্যালো ${name},\n\nইমেইল ভেরিফাই করতে এই লিংকে যান:\n${url}\n\nআপনি একাউন্ট না খুলে থাকলে এই ইমেইল উপেক্ষা করুন।`,
  });
}

// ৯. বিদ্যমান অ্যাকাউন্ট দিয়ে সাইন-আপ চেষ্টার নোটিফিকেশন মেইল
export function sendExistingAccountMail({
  to,
  name,
  loginUrl,
}: {
  to: string;
  name: string;
  loginUrl: string;
}) {
  sendEmailInBackground({
    to,
    subject: "মিলবে: আপনার ইমেইল দিয়ে সাইন আপের চেষ্টা হয়েছে",
    html: layout(
      `হ্যালো ${escapeHtml(name)},`,
      [
        "কেউ আপনার ইমেইল ঠিকানা দিয়ে নতুন একাউন্ট খোলার চেষ্টা করেছে।",
        "আপনি নিজে করে থাকলে, এই ইমেইল দিয়ে আগেই একাউন্ট খোলা আছে, তাই সরাসরি লগইন করুন। আপনি না করে থাকলে এই ইমেইলটি উপেক্ষা করুন।",
      ],
      { label: "লগইন করুন", url: loginUrl },
    ),
    text: `হ্যালো ${name},\n\nকেউ আপনার ইমেইল দিয়ে নতুন একাউন্ট খোলার চেষ্টা করেছে। আপনার একাউন্ট আগেই আছে, লগইন করুন:\n${loginUrl}\n\nআপনি না করে থাকলে এই ইমেইল উপেক্ষা করুন।`,
  });
}

// ১০. পাসওয়ার্ড রিসেট করার অনুরোধের মেইল
export function sendResetPasswordMail({
  to,
  name,
  url,
}: {
  to: string;
  name: string;
  url: string;
}) {
  sendEmailInBackground({
    to,
    subject: "মিলবে: পাসওয়ার্ড রিসেট করুন",
    html: layout(
      `হ্যালো ${escapeHtml(name)},`,
      [
        "আপনার মিলবে একাউন্টের পাসওয়ার্ড রিসেট করার অনুরোধ পাওয়া গেছে। নতুন পাসওয়ার্ড দিতে নিচের বাটনে ক্লিক করুন। লিংকটি ১ ঘণ্টা পর্যন্ত কাজ করবে।",
        "আপনি অনুরোধ না করে থাকলে এই ইমেইলটি উপেক্ষা করুন, আপনার পাসওয়ার্ড বদলাবে না।",
      ],
      { label: "পাসওয়ার্ড রিসেট করুন", url },
    ),
    text: `হ্যালো ${name},\n\nপাসওয়ার্ড রিসেট করতে এই লিংকে যান (১ ঘণ্টা কাজ করবে):\n${url}\n\nআপনি অনুরোধ না করে থাকলে এই ইমেইল উপেক্ষা করুন, আপনার পাসওয়ার্ড বদলাবে না।`,
  });
}

// ১১. পাসওয়ার্ড সফলভাবে পরিবর্তনের কনফার্মেশন মেইল
export function sendPasswordChangedMail({
  to,
  name,
  forgotUrl,
}: {
  to: string;
  name: string;
  forgotUrl: string;
}) {
  sendEmailInBackground({
    to,
    subject: "মিলবে: আপনার পাসওয়ার্ড বদলানো হয়েছে",
    html: layout(
      `হ্যালো ${escapeHtml(name)},`,
      [
        "আপনার মিলবে একাউন্টের পাসওয়ার্ড এইমাত্র বদলানো হয়েছে।",
        "আপনি নিজে করে থাকলে কিছু করার দরকার নেই। আপনি না করে থাকলে এখনই পাসওয়ার্ড রিসেট করে নিন।",
      ],
      { label: "পাসওয়ার্ড রিসেট করুন", url: forgotUrl },
    ),
    text: `হ্যালো ${name},\n\nআপনার মিলবে একাউন্টের পাসওয়ার্ড এইমাত্র বদলানো হয়েছে। আপনি না করে থাকলে এখনই রিসেট করুন:\n${forgotUrl}`,
  });
}

// ১২. অ্যাডমিন কর্তৃক কোনো পোস্ট ডিলিট করা হলে সেলারকে নোটিফিকেশন পাঠানোর মেইল
export function sendPostDeletedMail({
  to,
  sellerName,
  postTitle,
  imageUrl,
  deletedAt,
  reason,
  repostUrl,
}: {
  to: string;
  sellerName: string;
  postTitle: string;
  imageUrl?: string | null;
  deletedAt: Date;
  reason: string;
  repostUrl: string;
}) {
  sendEmailInBackground({
    to,
    subject: "মিলবে: আপনার পোস্টটি ডিলিট করা হয়েছে",
    html: layout(
      `প্রিয় ${escapeHtml(sellerName)},`,
      [
        "আপনার মিলবে (Milbe)-এর একটি পোস্ট অ্যাডমিন কর্তৃক ডিলিট করা হয়েছে।",
        "পোস্টের বিস্তারিত তথ্য ও ডিলিট করার কারণ নিচে উল্লেখ করা হলো।",
        "প্ল্যাটফর্মের নিয়ম মেনে পোস্টটি সংশোধন করে আবার পাবলিশ করতে নিচের বাটনে ক্লিক করুন।",
      ],
      { label: "পুনরায় পোস্ট করুন", url: repostUrl },
      [
        { label: "পোস্টের শিরোনাম", value: postTitle },
        { label: "ডিলিটের সময়", value: formatLoginTime(deletedAt) },
        { label: "ডিলিট করার কারণ", value: reason },
      ],
      imageUrl ? { src: imageUrl, alt: postTitle } : undefined,
    ),
    text: `প্রিয় ${sellerName},\n\nআপনার মিলবে (Milbe)-এর পোস্টটি অ্যাডমিন কর্তৃক ডিলিট করা হয়েছে।\n\nপোস্টের বিবরণ:\nপোস্টের শিরোনাম: ${postTitle}\nডিলিটের সময়: ${formatLoginTime(deletedAt)}\nডিলিট করার কারণ: ${reason}\n\nনিয়ম মেনে পুনরায় পোস্ট করতে ভিসিট করুন:\n${repostUrl}\n\nধন্যবাদ,\nমিলবে টিম`,
  });
}

// ১৩. বাংলা মাসের তালিকা (তারিখ ফরম্যাট করার জন্য)
const BN_MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

// ১৪. ইউটিসি টাইমকে এশিয়া/ঢাকা (UTC+6) জোনে কনভার্ট করে বাংলা সংখ্যা ও বারে রূপান্তর করার ফাংশন
export function formatLoginTime(date: Date): string {
  const dhaka = new Date(date.getTime() + 6 * 60 * 60 * 1000);
  const day = dhaka.getUTCDate();
  const month = BN_MONTHS[dhaka.getUTCMonth()];
  const year = dhaka.getUTCFullYear();
  const hour24 = dhaka.getUTCHours();
  const minute = String(dhaka.getUTCMinutes()).padStart(2, "0");
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const dayPart =
    hour24 < 4
      ? "রাত"
      : hour24 < 6
        ? "ভোর"
        : hour24 < 12
          ? "সকাল"
          : hour24 < 16
            ? "দুপুর"
            : hour24 < 18
              ? "বিকাল"
              : hour24 < 20
                ? "সন্ধ্যা"
                : "রাত";

  return toBengaliDigits(
    `${day} ${month} ${year}, ${dayPart} ${hour12}:${minute}`,
  );
}

// ১৫. ইউজার এজেন্ট স্ট্রিং বিশ্লেষণ করে সুন্দর ডিভাইস ও ব্রাউজারের নাম বের করার ফাংশন
export function describeUserAgent(ua?: string | null): string {
  if (!ua) return "অজানা ডিভাইস";
  const uaLower = ua.toLowerCase();

  const browser = uaLower.includes("edg/")
    ? "Edge"
    : uaLower.includes("samsungbrowser")
      ? "Samsung Internet"
      : uaLower.includes("opr/") || uaLower.includes("opera")
        ? "Opera"
        : uaLower.includes("chrome")
          ? "Chrome"
          : uaLower.includes("firefox")
            ? "Firefox"
            : uaLower.includes("safari")
              ? "Safari"
              : null;

  const os = uaLower.includes("windows")
    ? "Windows"
    : uaLower.includes("iphone")
      ? "iPhone"
      : uaLower.includes("ipad")
        ? "iPad"
        : uaLower.includes("android")
          ? "Android"
          : uaLower.includes("mac os x") || uaLower.includes("macintosh")
            ? "macOS"
            : uaLower.includes("linux")
              ? "Linux"
              : null;

  if (browser && os) return `${browser} (${os})`;
  return browser ?? os ?? "অজানা ডিভাইস";
}

// ১৬. নতুন লগইন শনাক্ত হলে সিকিউরিটি অ্যালার্ট মেইল পাঠানোর ফাংশন
export function sendLoginAlertMail({
  to,
  name,
  loginAt,
  userAgent,
  ip,
  forgotUrl,
}: {
  to: string;
  name: string;
  loginAt: Date;
  userAgent?: string | null;
  ip?: string | null;
  forgotUrl: string;
}) {
  const device = describeUserAgent(userAgent);
  const ipText = ip ? ip : "পাওয়া যায়নি";
  const timeText = formatLoginTime(loginAt);

  sendEmailInBackground({
    to,
    subject: "মিলবে: আপনার একাউন্টে নতুন লগইন হয়েছে",
    html: layout(
      `হ্যালো ${escapeHtml(name)},`,
      [
        "আপনার মিলবে একাউন্টে ইমেইল ও পাসওয়ার্ড দিয়ে সফলভাবে লগইন হয়েছে।",
        "এটা আপনি না করে থাকলে কেউ আপনার পাসওয়ার্ড জেনে গেছে — নিচের বাটন থেকে এখনই পাসওয়ার্ড পরিবর্তন করে নিন।",
      ],
      { label: "পাসওয়ার্ড পরিবর্তন করুন", url: forgotUrl },
      [
        { label: "সময়", value: timeText },
        { label: "ডিভাইস", value: device },
        { label: "IP অ্যাড্রেস", value: ipText },
      ],
    ),
    text: `হ্যালো ${name},\n\nআপনার মিলবে একাউন্টে নতুন লগইন হয়েছে।\nসময়: ${timeText}\nডিভাইস: ${device}\nIP: ${ipText}\n\nআপনি না করে থাকলে এখনই পাসওয়ার্ড পরিবর্তন করুন:\n${forgotUrl}`,
  });
}
