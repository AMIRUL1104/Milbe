"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import AuthField, { type AuthFieldProps } from "./AuthField";

type PasswordFieldProps = Omit<AuthFieldProps, "icon" | "type" | "endAdornment">;

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(function PasswordField(
    props,
    ref,
) {
    const [visible, setVisible] = useState(false);

    return (
        <AuthField
            {...props}
            ref={ref}
            icon={Lock}
            type={visible ? "text" : "password"}
            endAdornment={
                <button
                    type="button"
                    onClick={() => setVisible((v) => !v)}
                    aria-label={visible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
                    aria-pressed={visible}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-secondary rounded-md cursor-pointer"
                >
                    {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
            }
        />
    );
});

export default PasswordField;