"use client";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  helperText?: string;
}

export default function Switch({
  checked,
  onChange,
  label,
  helperText,
}: SwitchProps) {
  return (
    <div className="flex items-center justify-between gap-3 px-3.5 py-3 bg-surface-hover border border-border-light rounded-input">
      <div>
        <strong className="block text-sm font-semibold">{label}</strong>
        {helperText && <span className="text-xs text-text-muted">{helperText}</span>}
      </div>
      <label className="relative w-10.5 h-6 shrink-0 cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="absolute inset-0 bg-border rounded-full transition-base peer-checked:bg-primary" />
        <span className="absolute left-[3px] top-[3px] w-[18px] h-[18px] bg-white rounded-full transition-base peer-checked:translate-x-[18px] shadow-xs" />
      </label>
    </div>
  );
}
