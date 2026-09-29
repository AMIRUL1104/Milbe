import type { ReactNode } from "react";
import { Check, Circle } from "lucide-react";

const MIN_LENGTH = 8;
const LABELS = ["", "দুর্বল", "মোটামুটি", "ভালো", "শক্তিশালী"];
const BAR_COLORS = ["", "bg-danger", "bg-[#FCDE70]", "bg-[#7DA78C]", "bg-primary"];

const hasLetterAndNumber = (value: string) => /[a-zA-Z]/.test(value) && /\d/.test(value);

// ৮ অক্ষরের কম হলে সবসময় "দুর্বল"; এই score শুধু দেখানোর জন্য, submit আটকায় না
function getStrength(password: string) {
  if (password.length < MIN_LENGTH) return 1;
  let score = 1;
  if (hasLetterAndNumber(password)) score++;
  if ((/[A-Z]/.test(password) && /[a-z]/.test(password)) || /[^a-zA-Z0-9]/.test(password)) score++;
  if (password.length >= 12) score++;
  return Math.min(score, 4);
}

function Rule({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <li className={`flex items-center gap-1.5 ${ok ? "text-primary font-medium" : "text-text-muted"}`}>
      {ok ? <Check className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
      {children}
    </li>
  );
}

export default function PasswordChecklist({ password }: { password: string }) {
  if (!password) return null;

  const score = getStrength(password);

  return (
    <div
      aria-live="polite"
      className="flex flex-col gap-2 rounded-xl bg-background/60 border border-border px-3 py-2.5"
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-1">
          {[1, 2, 3, 4].map((step) => (
            <span
              key={step}
              className={`h-1.5 flex-1 rounded-full transition-base ${
                step <= score ? BAR_COLORS[score] : "bg-border"
              }`}
            />
          ))}
        </div>
        <span className="text-xs font-semibold text-text-secondary min-w-14 text-right">
          {LABELS[score]}
        </span>
      </div>
      <ul className="flex flex-col gap-1 text-xs">
        <Rule ok={password.length >= MIN_LENGTH}>কমপক্ষে ৮ অক্ষর</Rule>
        <Rule ok={hasLetterAndNumber(password)}>অক্ষর ও সংখ্যা মিশিয়ে দিলে আরও নিরাপদ</Rule>
      </ul>
    </div>
  );
}