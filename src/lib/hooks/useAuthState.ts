"use client";

import { useSyncExternalStore } from "react";
import { useSession } from "@/lib/auth-client";

const subscribe = () => () => {};

// Server ও client-এর প্রথম render-এ false, hydration শেষে true
function useIsMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export function useAuthState() {
  const { data: session, isPending } = useSession();
  const mounted = useIsMounted();

  const isReady = mounted && !isPending;
  const user = isReady ? (session?.user ?? null) : null;

  return { user, isLoggedIn: !!user, isReady };
}
