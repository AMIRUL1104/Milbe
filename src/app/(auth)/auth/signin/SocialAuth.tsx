"use client";

export default function SocialAuth() {
  const handleGoogleLogin = async () => {
    // Better Auth Integration Point:
    // await authClient.signIn.social({ provider: "google" });
    // console.log("[SocialAuth] Google sign-in triggered for Better Auth");
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-3 bg-surface border border-border hover:bg-background text-text-secondary font-semibold py-2.5 px-4 rounded-xl transition-base shadow-xs cursor-pointer focus-visible:outline-2 focus-visible:outline-primary-focus"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="#EA4335"
          d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.642 1.01 14.97 0 12 0 7.354 0 3.327 2.66 1.357 6.551l3.91 3.214z"
        />
        <path
          fill="#4285F4"
          d="M16.04 15.345c-1.077.732-2.432 1.164-4.04 1.164-2.955 0-5.46-1.982-6.355-4.654L1.727 15.06C3.741 19.01 7.822 21.818 12 21.818c2.936 0 5.645-1.01 7.664-2.745l-3.623-3.728z"
        />
        <path
          fill="#FBBC05"
          d="M5.686 11.855a7.034 7.034 0 0 1 0-2.091L1.777 6.55A11.933 11.933 0 0 0 0 12c0 1.927.455 3.745 1.255 5.373l4.43-3.518z"
        />
        <path
          fill="#34A853"
          d="M23.49 12.273c0-.79-.073-1.563-.209-2.309H12v4.51h6.464a5.523 5.523 0 0 1-2.395 3.618l3.623 3.727c2.123-1.954 3.395-4.836 3.395-8.255z"
        />
      </svg>
      <span className="text-sm">Continue with Google</span>
    </button>
  );
}