import type { ReactNode } from "react";
import { UNORA } from "./theme";

/**
 * Unora-theme CTA — solid coral pill, deepens to coralDeep on hover. Kept
 * local to the unora/ folder (inline styles, not Tailwind color tokens) so
 * it never bleeds into the classic theme's --brand-based CtaButton.
 */
export function UnoraButton({
  href,
  children,
  variant = "coral",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "coral" | "navy" | "outline";
  className?: string;
}) {
  const styles: Record<string, { bg: string; fg: string; border?: string }> = {
    coral: { bg: UNORA.coral, fg: "#FFFFFF" },
    navy: { bg: UNORA.navy, fg: "#FFFFFF" },
    outline: { bg: "transparent", fg: UNORA.navy, border: UNORA.navy },
  };
  const s = styles[variant];

  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-medium tracking-[0.06em] transition-transform duration-300 ease-out hover:-translate-y-0.5 ${className}`}
      style={{
        background: s.bg,
        color: s.fg,
        border: s.border ? `1.5px solid ${s.border}` : "none",
      }}
    >
      {children}
      <svg
        aria-hidden="true"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        <path d="M9 6l6 6-6 6" />
      </svg>
    </a>
  );
}
