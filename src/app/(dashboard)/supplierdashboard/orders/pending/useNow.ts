"use client";

import { useEffect, useState } from "react";

export function useNow(intervalMs = 60_000): number | null {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const first = setTimeout(() => setNow(Date.now()), 0);
    const timer = setInterval(() => setNow(Date.now()), intervalMs);

    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, [intervalMs]);

  return now;
}