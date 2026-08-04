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
  // Starts at the real final value, not 0. This span is server-rendered
  // like any other text — search engines and AI crawlers that don't run
  // JavaScript (most of them: GPTBot, ClaudeBot, CCBot, PerplexityBot,
  // etc.) read exactly what's in that initial HTML. With useState(0),
  // every stat on the site (cities, guest counts, events catered) would
  // read as "0" to them. The count-from-0 animation still happens for
  // real browsers — it's kicked off client-side in the effect below,
  // which only ever runs after hydration, so it can't cause a
  // server/client mismatch.
  const [value, setValue] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);
  const { reduceMotion } = useA11y();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion || !("IntersectionObserver" in window)) return;

    setValue(0);
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
