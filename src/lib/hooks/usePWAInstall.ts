"use client";

import { useEffect, useState, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface NavigatorStandalone extends Navigator {
  standalone?: boolean;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    // 1. Safe Client-Side Guard & VS Code / Dev Check
    if (typeof window === "undefined") return;

    const isDevelopment = process.env.NODE_ENV === "development";
    setIsDev(isDevelopment);

    // 2. Safely detect iOS
    try {
      const isIOSDevice =
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(window as unknown as { MSStream?: unknown }).MSStream;
      setIsIOS(Boolean(isIOSDevice));
    } catch {
      setIsIOS(false);
    }

    // 3. Safely detect Standalone / Installed state
    try {
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
      const isIOSStandalone = (navigator as NavigatorStandalone).standalone === true;
      setIsInstalled(Boolean(isStandalone || isIOSStandalone));
    } catch {
      setIsInstalled(false);
    }

    // 4. Register Event Listeners safely
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return false;

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setIsInstalled(true);
        setIsInstallable(false);
        setDeferredPrompt(null);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [deferredPrompt]);

  return {
    // Dev environment-এ UI টেস্টের জন্য `isDev` ফ্ল্যাগসহ Safe condition
    isInstallable: isInstallable || isIOS || isDev,
    isInstalled,
    isIOS,
    isDev,
    promptInstall,
  };
}