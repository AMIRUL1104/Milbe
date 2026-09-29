import nodemailer from "nodemailer";
import { after } from "next/server";

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
) {
  const url = escapeHtml(button.url);
  const body = paragraphs
    .map(
      (p) =>
        `<p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6">${p}</p>`,
    )
    .join("");

  return `<div style="background:#F5F7F8;padding:24px 12px;font-family:Arial,sans-serif">
  <div style="max-width:480px;margin:0 auto;background:#ffffff;border:1px solid #DDE5E7;border-radius:16px;padding:28px">
    <p style="margin:0 0 16px;font-size:20px;font-weight:800;color:#35858E">Milbe</p>
    <p style="margin:0 0 12px;color:#111827;font-size:16px;font-weight:700">${greeting}</p>
    ${body}
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
