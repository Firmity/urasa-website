"use client";

import { useSeason } from "./app-provider";

/** Small live indicator of the current (or previewed) ritu — dot tinted
 *  with --season-accent plus label/months. Kept as its own client leaf
 *  so server components (Philosophy, SeasonalMenu's static parts) don't
 *  need to become client components just to show it. */
export function RituBadge({ className = "" }: { className?: string }) {
  const { ritu } = useSeason();

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] tracking-[0.14em] text-nezumi ${className}`}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: "var(--season-accent)" }}
      />
      {ritu.label} &middot; {ritu.months}
    </span>
  );
}
