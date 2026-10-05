import nodemailer from "nodemailer";
import { after } from "next/server";
import { toBengaliDigits } from "./utils/toBengaliDigits";

const port = Number(process.env.SMTP_PORT ?? 465);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: port === 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

type MailOptions = { to: string; subject: string; html: string; text: string };

async function sendEmail({ to, subject, html, text }: MailOptions) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM ?? `Milbe <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    text,
  });
}

// await করা হয় না (timing attack এড়াতে)। after() serverless-এ কাজ শেষ হওয়া পর্যন্ত process বাঁচিয়ে রাখে।
function sendEmailInBackground(options: MailOptions) {
  const task = sendEmail(options).catch((err) =>
    console.error("[email] পাঠানো যায়নি:", err),
  );
  try {
    after(task);
  } catch {
    // request scope-এর বাইরে চললে task আগেই শুরু হয়ে গেছে, তাই সমস্যা নেই
  }
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function layout(
  greeting: string,
  paragraphs: string[],
  button: { label: string; url: string },
  // সিকিউরিটি অ্যালার্টের মতো কাঠামোবদ্ধ ডেটা (সময়/ডিভাইস/IP) দেখানোর জন্য
  // optional সারি — পুরনো মেইলগুলো এটি পাঠায় না, তাই তাদের লেআউট অপরিবর্তিত থাকে।
  details?: { label: string; value: string }[],
) {
  const url = escapeHtml(button.url);
  const body = paragraphs
    .map(
      (p) =>
        `<p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6">${p}</p>`,
    )
    .join("");

  // label/value এখানেই escape করা হয় — কলার কাঁচা মান পাঠালেও নিরাপদ থাকে।
  const detailsHtml = details?.length
    ? `<div style="margin:0 0 16px;border:1px solid #DDE5E7;border-radius:12px;overflow:hidden">${details
        .map(
          (d, i) =>
            `<div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:10px 14px;${i > 0 ? "border-top:1px solid #DDE5E7;" : ""}${i % 2 === 1 ? "background:#F5F7F8;" : ""}"><span style="margin:0;font-size:13px;color:#6B7280;white-space:nowrap">${escapeHtml(d.label)}</span><span style="margin:0;font-size:13px;font-weight:700;color:#111827;text-align:right;word-break:break-all">${escapeHtml(d.value)}</span></div>`,
        )
        .join("")}</div>`
    : "";

  return `<div style="background:#F5F7F8;padding:24px 12px;font-family:Arial,sans-serif">
  <div style="max-width:480px;margin:0 auto;background:#ffffff;border:1px solid #DDE5E7;border-radius:16px;padding:28px">
    <p style="margin:0 0 16px;font-size:20px;font-weight:800;color:#35858E">Milbe</p>
    <p style="margin:0 0 12px;color:#111827;font-size:16px;font-weight:700">${greeting}</p>
    ${body}${detailsHtml}
    <a href="${url}" style="display:inline-block;margin:8px 0 16px;background:#35858E;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:12px">${button.label}</a>
    <p style="margin:0;color:#6B7280;font-size:12px;line-height:1.5;word-break:break-all">বাটন কাজ না করলে এই লিংকটি ব্রাউজারে পেস্ট করুন:<br/>${url}</p>
  </div>
</div>`;
}

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

// ── লগইন সিকিউরিটি নোটিফিকেশন ─────────────────────────────────────────────

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

// Asia/Dhaka (UTC+6, DST নেই) টাইমজোনে বাংলা তারিখ-সময়। Intl/ICU-এর উপর
// নির্ভরতা এড়াতে ম্যানুয়াল অফসেটে সময় বের করা হয়।
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

// User-Agent স্ট্রিং থেকে ছোট, পড়ার মতো ডিভাইস বর্ণনা — নতুন dependency ছাড়াই।
export function describeUserAgent(ua?: string | null): string {
  if (!ua) return "অজানা ডিভাইস";
  const uaLower = ua.toLowerCase();

  // Edge/Opera/Samsung-এর UA-তে Chrome থাকে, তাই ওগুলো আগে চেক করা হয়।
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

  if (browser && os) return `${browser} • ${os}`;
  return browser ?? os ?? "অজানা ডিভাইস";
}

// সফল লগইনের সিকিউরিটি অ্যালার্ট — sendEmailInBackground-এর কারণে এটি কল করা
// কখনো অপেক্ষা করায় না, আর ডেলিভারি ব্যর্থ হলেও লগইন অপ্রভাবিত থাকে।
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
