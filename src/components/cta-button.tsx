import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  className?: string;
};

type AnchorProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

/**
 * Primary CTA — solid ink pill by default, crossfades to --brand (the
 * logo green) on hover/focus, with a thin ritu-accent rule that slides in
 * along the bottom edge as the one seasonal touch. This follows the
 * design system's own rule (see globals.css): season accent is for small
 * details only, never a primary-action fill — every earlier hover built
 * from --season-accent itself (flat tint, color-mix toward ink) fought
 * that rule and kept coming out wrong. --brand is a single, pre-tested
 * dark green, so washi text on top is always safely legible, in every
 * ritu, with zero per-season variance to re-check.
 *
 * Renders as <a> when given `href`, otherwise a <button>.
 */
export function CtaButton({ children, className = "", ...props }: AnchorProps | ButtonProps) {
  const baseClassName = `group relative isolate inline-flex items-center justify-center overflow-hidden px-7 py-3.5 text-[13px] tracking-[0.14em] text-washi transition-opacity sm:px-8 sm:py-4 disabled:opacity-60 ${className}`;

  const inner = (
    <>
      {/* Default solid state */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-ink transition-opacity duration-300 ease-out group-hover:opacity-0 group-focus-visible:opacity-0"
      />
      {/* Hover state: solid brand green, always-safe contrast. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-brand opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      {/* Seasonal detail: a thin accent rule that grows in from the left
          on hover — the only place the ritu color touches this button. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
        style={{ background: "var(--season-accent)" }}
      />
      <span className="relative z-10">{children}</span>
    </>
  );

  if (typeof props.href === "string") {
    const { href, ...anchorRest } = props as AnchorProps;
    return (
      <a href={href} className={baseClassName} {...anchorRest}>
        {inner}
      </a>
    );
  }

  const buttonRest = props as ButtonProps;
  return (
    <button type="button" className={baseClassName} {...buttonRest}>
      {inner}
    </button>
  );
}
