"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useA11y } from "./app-provider";
import { unoraChromeVars } from "./unora/theme";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/#philosophy", label: "Philosophy" },
  { href: "/#menu", label: "Menu" },
  { href: "/services", label: "Services" },
  { href: "/careers", label: "Careers" },
  { href: "/enquire", label: "Enquire" },
];

// Scroll distance (px) below which the header never auto-hides — keeps the
// logo/nav reachable right after landing instead of vanishing on the first
// tiny scroll jitter.
const HIDE_THRESHOLD = 80;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const {
    reduceMotion,
    highContrast,
    toggleReduceMotion,
    toggleHighContrast,
    landingTheme,
    toggleLandingTheme,
  } = useA11y();
  // ON = classic (original washi) site; OFF (default, every fresh load) =
  // new Unora-styled landing page. Not persisted on purpose.
  const isClassic = landingTheme === "classic";

  // Re-themes the whole navbar (desktop bar + a11y panel + full-screen
  // mobile menu) for the Unora landing page — see unoraChromeVars for how.
  const unoraVars = unoraChromeVars(isClassic) as CSSProperties | undefined;

  const anyPanelOpen = menuOpen || a11yOpen;

  // Auto-hide on scroll down, reveal on scroll up. Any open panel (mobile
  // menu, a11y) forces the header visible so it never disappears out from
  // under an interaction in progress.
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastScrollY.current;
      if (y < HIDE_THRESHOLD) {
        setHidden(false);
      } else {
        setHidden(goingDown);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock page scroll while the full-screen mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      style={unoraVars}
      className={`sticky top-0 z-50 border-b border-line bg-washi/90 backdrop-blur transition-transform duration-300 ease-out ${
        hidden && !anyPanelOpen ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* relative z-50: without this, the fixed-position mobile-nav
          overlay (z-40) below paints ABOVE this static row per CSS
          stacking rules (positioned descendants stack above in-flow
          content within the same stacking context, DOM order
          notwithstanding) — that was silently swallowing taps on the
          hamburger button, so there was no way to close the menu. */}
      <div className="relative z-50 mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-5 sm:py-3 md:px-8 md:py-4">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Urasa — home">
          <Image
            src="/logo-mark.webp"
            alt="Urasa — We care about warmth"
            width={224}
            height={213}
            className="h-10 w-auto sm:h-12"
            priority
            unoptimized
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="brush-underline text-[13px] tracking-[0.12em] text-ink-soft"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <label className="mr-1 hidden cursor-pointer items-center gap-2 rounded-full border border-line py-1 pl-3 pr-1.5 md:flex">
            <span className="text-[11px] tracking-[0.1em] text-ink-soft">
              {isClassic ? "Classic" : "Unora"}
            </span>
            <span className="relative inline-flex h-5 w-9 shrink-0 items-center">
              <input
                type="checkbox"
                role="switch"
                aria-label="Switch between the classic Urasa site and the new landing page"
                checked={isClassic}
                onChange={toggleLandingTheme}
                className="peer sr-only"
              />
              <span className="h-5 w-9 rounded-full bg-nezumi-light transition-colors peer-checked:bg-brand" />
              <span className="absolute left-0.5 h-4 w-4 rounded-full bg-washi transition-transform peer-checked:translate-x-4" />
            </span>
          </label>

          <div className="relative">
            <button
              type="button"
              aria-expanded={a11yOpen}
              aria-controls="a11y-panel"
              onClick={() => setA11yOpen((v) => !v)}
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-brand hover:text-brand sm:h-10 sm:w-10 md:flex"
              aria-label="Accessibility settings"
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="7.5" r="1.4" fill="currentColor" stroke="none" />
                <path d="M7 11c1.7.9 3.2 1.3 5 1.3s3.3-.4 5-1.3M12 12.3v6.2M9.5 20l2.5-1.5 2.5 1.5" />
              </svg>
            </button>

            {a11yOpen && (
              <div
                id="a11y-panel"
                role="dialog"
                aria-label="Accessibility settings"
                className="absolute right-0 top-11 z-50 w-60 rounded-xl border border-line bg-washi p-4 shadow-xl ring-1 ring-ink/5 sm:w-64"
              >
                <p className="mb-3 text-sm text-ink">Accessibility</p>
                <ToggleRow
                  label="Reduce motion"
                  hint="Turns off scroll and hover animation"
                  checked={reduceMotion}
                  onChange={toggleReduceMotion}
                />
                <ToggleRow
                  label="High contrast"
                  hint="Maximizes text-to-background contrast"
                  checked={highContrast}
                  onChange={toggleHighContrast}
                />
              </div>
            )}
          </div>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft md:hidden sm:h-10 sm:w-10"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              {menuOpen ? (
                <path d="M5 5l14 14M19 5L5 19" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Full-screen mobile menu: nav links + a11y toggles. Ritu preview
          now lives entirely in the Seasonal Menu section, not the navbar. */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="fixed inset-x-0 top-0 z-40 flex h-dvh flex-col overflow-y-auto bg-washi px-6 pb-8 pt-24 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-line">
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3.5 text-2xl text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-line pt-6">
            <p className="mb-3 text-[11px] tracking-[0.14em] text-nezumi">
              Landing page
            </p>
            <ToggleRow
              label="Classic site"
              hint="Switch to the original Urasa landing page"
              checked={isClassic}
              onChange={toggleLandingTheme}
            />
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <p className="mb-3 text-[11px] tracking-[0.14em] text-nezumi">
              Accessibility
            </p>
            <ToggleRow
              label="Reduce motion"
              hint="Turns off scroll and hover animation"
              checked={reduceMotion}
              onChange={toggleReduceMotion}
            />
            <ToggleRow
              label="High contrast"
              hint="Maximizes text-to-background contrast"
              checked={highContrast}
              onChange={toggleHighContrast}
            />
          </div>
        </nav>
      )}
    </header>
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="mb-3 flex cursor-pointer items-start justify-between gap-3 last:mb-0">
      <span className="flex flex-col">
        <span className="text-sm text-ink">{label}</span>
        <span className="text-xs text-nezumi">{hint}</span>
      </span>
      <span className="relative mt-0.5 inline-flex h-5 w-9 shrink-0 items-center">
        <input
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <span className="h-5 w-9 rounded-full bg-nezumi-light transition-colors peer-checked:bg-brand" />
        <span className="absolute left-0.5 h-4 w-4 rounded-full bg-washi transition-transform peer-checked:translate-x-4" />
      </span>
    </label>
  );
}
