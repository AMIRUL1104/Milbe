"use client";

import {
  useEffect,
  useState,
  useCallback,
  useSyncExternalStore,
} from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface NavigatorStandalone extends Navigator {
  standalone?: boolean;
}

function subscribeToIOSChanges() {
  return () => {};
}

function getIOSSnapshot() {
  if (typeof window === "undefined") return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as unknown as { MSStream?: unknown }).MSStream
  );
}

function subscribeToInstalledChanges(onChange: () => void) {
  if (typeof window.matchMedia !== "function") return () => {};
  const mediaQuery = window.matchMedia("(display-mode: standalone)");
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getInstalledSnapshot() {
  if (typeof window === "undefined") return false;
  const isStandalone =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(display-mode: standalone)").matches;
  const isIOSStandalone =
    (navigator as NavigatorStandalone).standalone === true;
  return isStandalone || isIOSStandalone;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const isIOS = useSyncExternalStore(
    subscribeToIOSChanges,
    getIOSSnapshot,
    () => false,
  );
  const isInstalledFromBrowser = useSyncExternalStore(
    subscribeToInstalledChanges,
    getInstalledSnapshot,
    () => false,
  );
  const isInstalled = isInstalledFromBrowser || isAppInstalled;
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    // 1. Safe Client-Side Guard & VS Code / Dev Check
    if (typeof window === "undefined") return;

    // 2. Register Event Listeners safely
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsAppInstalled(true);
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
        setIsAppInstalled(true);
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