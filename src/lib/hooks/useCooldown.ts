"use client";

import { useCallback, useEffect, useState } from "react";

// প্রতি সেকেন্ডে ১ করে কমে; বারবার "আবার পাঠান" চাপা ঠেকাতে
export function useCooldown(initialSeconds = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const start = useCallback((value = 60) => setSeconds(value), []);

  return { seconds, start };
}
