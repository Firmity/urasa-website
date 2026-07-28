"use client";

import { useEffect, useRef, useState } from "react";
import { useA11y } from "./app-provider";

export function CountUp({
  to,
  suffix = "",
  duration = 1200,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const { reduceMotion } = useA11y();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      const raf = requestAnimationFrame(() => setValue(to));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * to));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration, reduceMotion]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
