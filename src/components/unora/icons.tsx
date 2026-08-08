import type { ReactNode } from "react";
import { UNORA } from "./theme";

/* -----------------------------------------------------------------------
   IconBadge — the circular flat-icon-on-color-disc pattern from the
   reference poster. Every Unora section reuses this one wrapper so the
   badge size/stroke/shadow language stays consistent across the page.
----------------------------------------------------------------------- */
export function IconBadge({
  children,
  bg = UNORA.coral,
  fg = "#FFFFFF",
  size = 72,
}: {
  children: ReactNode;
  bg?: string;
  fg?: string;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: bg,
        color: fg,
        boxShadow: "0 6px 18px rgba(22, 59, 77, 0.18)",
      }}
    >
      <span style={{ width: size * 0.46, height: size * 0.46 }}>
        {children}
      </span>
    </span>
  );
}

/* -----------------------------------------------------------------------
   Hand-drawn inline icon set, matching the reference's rounded flat-line
   style (no icon-library dependency, consistent with the rest of the
   codebase). Each icon fills its parent box (width/height 100%) so
   IconBadge controls final size.
----------------------------------------------------------------------- */
const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  width: "100%",
  height: "100%",
};

export function ShieldCheckIcon() {
  return (
    <svg {...common}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M8.5 12l2.3 2.3L15.5 9.5" />
    </svg>
  );
}

export function RibbonIcon() {
  return (
    <svg {...common}>
      <circle cx="12" cy="8" r="5" />
      <path d="M8.5 12.3L6 21l6-3 6 3-2.5-8.7" />
    </svg>
  );
}

export function LeafIcon() {
  return (
    <svg {...common}>
      <path d="M5 19c9 0 14-5 14-14-9 0-14 5-14 14z" />
      <path d="M5 19c2-4.5 5-7.5 9-10" />
    </svg>
  );
}

export function PeopleIcon() {
  return (
    <svg {...common}>
      <circle cx="8.5" cy="8" r="3" />
      <circle cx="16" cy="9" r="2.4" />
      <path d="M3 20c0-3.3 2.5-5.5 5.5-5.5S14 16.7 14 20" />
      <path d="M14.5 14.8c2.6.2 4.5 2.2 4.5 5.2" />
    </svg>
  );
}

export function HeartIcon() {
  return (
    <svg {...common}>
      <path d="M12 20s-7-4.4-9.3-8.8C1.2 8 2.6 5 5.7 5c1.9 0 3.4 1.1 4.3 2.6C10.9 6.1 12.4 5 14.3 5c3.1 0 4.5 3 3 6.2C19 15.6 12 20 12 20z" />
    </svg>
  );
}

export function BriefcaseIcon() {
  return (
    <svg {...common}>
      <rect x="3" y="8" width="18" height="11" rx="2" />
      <path d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" />
      <path d="M3 13h18" />
    </svg>
  );
}

export function TruckIcon() {
  return (
    <svg {...common}>
      <rect x="2.5" y="7" width="12" height="9" rx="1.2" />
      <path d="M14.5 10.5H18l3 3V16h-6.5z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17.5" cy="18" r="1.6" />
    </svg>
  );
}

export function SparklesIcon() {
  return (
    <svg {...common}>
      <path d="M12 3l1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3z" />
      <path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15z" />
    </svg>
  );
}

export function ChefHatIcon() {
  return (
    <svg {...common}>
      <path d="M7 12a4 4 0 01.7-7.9A4.5 4.5 0 0112 2a4.5 4.5 0 014.3 2.1A4 4 0 0117 12v5H7v-5z" />
      <path d="M7.5 21h9" />
      <path d="M8 17v3M16 17v3" />
    </svg>
  );
}

export function ScaleIcon() {
  return (
    <svg {...common}>
      <path d="M12 3v18M6 7h12" />
      <path d="M3 7l3 6a3 3 0 006 0L9 7" />
      <path d="M15 7l3 6a3 3 0 006 0l-3-6" />
      <path d="M8 21h8" />
    </svg>
  );
}

export function HandshakeIcon() {
  return (
    <svg {...common}>
      <path d="M2 12l4-4 4 3 4-3 2 2" />
      <path d="M6 8l6 6 2-2" />
      <path d="M14 10l3 3a2 2 0 002.8-2.8L16 6.5" />
      <path d="M22 12l-4 4-4-3" />
    </svg>
  );
}

export function QuestionCircleIcon() {
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.2 9.5a2.8 2.8 0 015.4.9c0 1.8-2.6 2.1-2.6 3.8" />
      <path d="M12 17.2v.1" />
    </svg>
  );
}

export function CalendarClockIcon() {
  return (
    <svg {...common}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <circle cx="15.5" cy="15.5" r="3.2" />
      <path d="M15.5 14v1.6l1.1.9" />
    </svg>
  );
}
