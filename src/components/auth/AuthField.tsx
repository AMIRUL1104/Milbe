"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label: string;
    icon: LucideIcon;
    error?: string;
    hint?: ReactNode;
    endAdornment?: ReactNode;
};

const inputBase =
    "w-full bg-surface border rounded-input pl-10 py-2.5 text-sm text-text-primary placeholder:text-text-placeholder outline-none transition-base";

const AuthField = forwardRef<HTMLInputElement, AuthFieldProps>(function AuthField(
    { id, label, icon: Icon, error, hint, endAdornment, ...inputProps },
    ref,
) {
    const descriptionId = error || hint ? `${id}-description` : undefined;

    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-xs font-bold text-text-secondary">
                {label}
            </label>
            <div className="relative">
                <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                <input
                    ref={ref}
                    id={id}
                    aria-invalid={Boolean(error)}
                    aria-describedby={descriptionId}
                    className={`${inputBase} ${endAdornment ? "pr-10" : "pr-4"} ${error
                        ? "border-danger focus:border-danger focus-visible:outline-danger"
                        : "border-border focus:border-border-focus focus-visible:outline-primary-focus"
                        }`}
                    {...inputProps}
                />
                {endAdornment}
            </div>
            {error ? (
                <p id={descriptionId} role="alert" className="text-xs font-medium text-danger mt-0.5">
                    {error}
                </p>
            ) : hint ? (
                <div id={descriptionId} className="text-xs text-text-muted mt-0.5">
                    {hint}
                </div>
            ) : null}
        </div>
    );
});

export default AuthField;