"use client";

import { useEffect, useRef } from "react";

/** Adds `.is-visible` to the element once it enters the viewport.
 *  Purely additive/decorative: if JS fails or IO is unsupported, the
 *  `.reveal` base state must still render acceptable (non-hidden) content —
 *  handled by keeping opacity change subtle rather than starting at 0
 *  visibility in critical paths. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
