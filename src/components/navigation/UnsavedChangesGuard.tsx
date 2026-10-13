"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface GuardOptions {
  enabled: boolean;
  onLeave: () => Promise<void>;
  onPageHide: () => void;
}

interface RegisteredGuard {
  isActive: () => boolean;
  onLeave: () => Promise<void>;
  onPageHide: () => void;
}

interface NavigationGuardContextValue {
  registerGuard: (guard: RegisteredGuard) => () => void;
  requestNavigation: (navigate: () => void | Promise<void>) => void;
}

const NavigationGuardContext =
  createContext<NavigationGuardContextValue | null>(null);

const HISTORY_GUARD_KEY = "__milbeUnsavedChangesGuard";

export function UnsavedChangesGuardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const guardRef = useRef<RegisteredGuard | null>(null);
  const trapArmedRef = useRef(false);
  const pendingBackNavigationRef = useRef(false);
  const allowLeaveRef = useRef(false);
  const [pendingNavigation, setPendingNavigation] = useState<
    (() => void | Promise<void>) | null
  >(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const [leaveError, setLeaveError] = useState<string | null>(null);

  const armHistoryTrap = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.history.state?.[HISTORY_GUARD_KEY] === true
    ) {
      trapArmedRef.current = true;
      return;
    }
    if (
      typeof window === "undefined" ||
      trapArmedRef.current ||
      !guardRef.current?.isActive()
    ) {
      return;
    }

    window.history.pushState(
      { ...window.history.state, [HISTORY_GUARD_KEY]: true },
      "",
      window.location.href,
    );
    trapArmedRef.current = true;
  }, []);

  const registerGuard = useCallback(
    (guard: RegisteredGuard) => {
      guardRef.current = guard;
      allowLeaveRef.current = false;
      armHistoryTrap();

      return () => {
        if (guardRef.current === guard) {
          guardRef.current = null;
          trapArmedRef.current = false;
        }
      };
    },
    [armHistoryTrap],
  );

  const requestNavigation = useCallback(
    (navigate: () => void | Promise<void>) => {
      if (
        !allowLeaveRef.current &&
        guardRef.current?.isActive()
      ) {
        pendingBackNavigationRef.current = false;
        setLeaveError(null);
        setPendingNavigation(() => navigate);
        return;
      }

      void navigate();
    },
    [],
  );

  const handleConfirmLeave = useCallback(async () => {
    const navigate = pendingNavigation;
    if (!navigate || isLeaving) return;

    setIsLeaving(true);
    setLeaveError(null);
    try {
      await guardRef.current?.onLeave();
      allowLeaveRef.current = true;

      if (pendingBackNavigationRef.current) {
        pendingBackNavigationRef.current = false;
        trapArmedRef.current = false;
        window.history.go(-2);
      } else {
        await navigate();
      }

      setPendingNavigation(null);
    } catch (error) {
      setLeaveError(
        error instanceof Error
          ? error.message
          : "ছবিটি মুছে ফেলা যায়নি। আবার চেষ্টা করুন।",
      );
    } finally {
      setIsLeaving(false);
    }
  }, [isLeaving, pendingNavigation]);

  const handleStay = useCallback(() => {
    pendingBackNavigationRef.current = false;
    setPendingNavigation(null);
    setLeaveError(null);
  }, []);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (
        anchor.target ||
        anchor.hasAttribute("download") ||
        anchor.relList.contains("external")
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search
      ) {
        return;
      }

      if (!guardRef.current?.isActive() || allowLeaveRef.current) return;

      event.preventDefault();
      setLeaveError(null);
      setPendingNavigation(() => () =>
        router.push(
          `${destination.pathname}${destination.search}${destination.hash}`,
        ),
      );
    };

    const onPopState = () => {
      if (!guardRef.current?.isActive() || allowLeaveRef.current) {
        trapArmedRef.current = false;
        return;
      }

      trapArmedRef.current = false;
      armHistoryTrap();
      pendingBackNavigationRef.current = true;
      setLeaveError(null);
      setPendingNavigation(() => () => undefined);
    };

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!guardRef.current?.isActive() || allowLeaveRef.current) return;
      event.preventDefault();
      event.returnValue = "";
    };

    const onPageHide = (event: PageTransitionEvent) => {
      if (
        event.persisted ||
        !guardRef.current?.isActive() ||
        allowLeaveRef.current
      ) {
        return;
      }
      guardRef.current.onPageHide();
    };

    document.addEventListener("click", onDocumentClick, true);
    window.addEventListener("popstate", onPopState);
    window.addEventListener("beforeunload", onBeforeUnload);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      document.removeEventListener("click", onDocumentClick, true);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [armHistoryTrap, router]);

  const contextValue = useMemo(
    () => ({ registerGuard, requestNavigation }),
    [registerGuard, requestNavigation],
  );

  return (
    <NavigationGuardContext.Provider value={contextValue}>
      {children}
      {pendingNavigation ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          role="presentation"
        >
          <section
            aria-labelledby="unsaved-navigation-title"
            aria-describedby="unsaved-navigation-message"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            role="dialog"
          >
            <h2
              className="text-lg font-bold text-gray-900"
              id="unsaved-navigation-title"
            >
              পেজ ছেড়ে যাবেন?
            </h2>
            <p
              className="mt-3 text-sm leading-6 text-gray-600"
              id="unsaved-navigation-message"
            >
              পেজ ছেড়ে গেলে আপনার অসম্পূর্ণ পরিবর্তন হারিয়ে যাবে। এই পেজে
              নতুন ছবি আপলোড করা থাকলে সেটি মুছে ফেলা হবে। আপনি কি পেজ ছেড়ে
              যেতে চান?
            </p>
            {leaveError ? (
              <p className="mt-3 text-sm text-red-700" role="alert">
                {leaveError}
              </p>
            ) : null}
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 disabled:opacity-60"
                disabled={isLeaving}
                onClick={handleStay}
                type="button"
              >
                না, থাকুন
              </button>
              <button
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-60"
                disabled={isLeaving}
                onClick={() => void handleConfirmLeave()}
                type="button"
              >
                {isLeaving ? "ছবি মুছে যাচ্ছে…" : "হ্যাঁ, পেজ ছাড়ুন"}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </NavigationGuardContext.Provider>
  );
}

export function useUnsavedChangesGuard(
  options: GuardOptions,
): (navigate: () => void | Promise<void>) => void {
  const context = useContext(NavigationGuardContext);
  if (!context) {
    throw new Error(
      "useUnsavedChangesGuard must be used inside UnsavedChangesGuardProvider.",
    );
  }

  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    if (!options.enabled) return;

    return context.registerGuard({
      isActive: () => optionsRef.current.enabled,
      onLeave: () => optionsRef.current.onLeave(),
      onPageHide: () => optionsRef.current.onPageHide(),
    });
  }, [context, options.enabled]);

  return context.requestNavigation;
}
