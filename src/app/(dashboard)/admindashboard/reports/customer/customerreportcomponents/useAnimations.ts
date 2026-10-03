"use client";

import { useEffect, useRef, useState } from "react";
import { easeOut } from "./chartUtils";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useReveal(trigger: string, duration = 1000) {
  const [t, setT] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setT(1);
      return;
    }

    let raf = 0;
    const start = performance.now();
    setT(0);
    const tick = (now: number) => {
      const v = Math.min(1, (now - start) / duration);
      setT(v);
      if (v < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, duration]);

  return t;
}

export function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0);
  const from = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      from.current = target;
      setValue(target);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const startValue = from.current;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const v = startValue + (target - startValue) * easeOut(t);
      from.current = v;
      setValue(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}
