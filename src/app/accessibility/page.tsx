import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/json-ld";
import { accessibilitySchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Accessibility Statement — Urasa",
  description:
    "How the Urasa website is built to be usable for everyone, and how to report an accessibility issue.",
  alternates: { canonical: "/accessibility" },
  openGraph: {
    type: "website",
    url: "/accessibility",
    title: "Accessibility Statement — Urasa",
    description:
      "How the Urasa website is built to be usable for everyone, and how to report an accessibility issue.",
  },
};

export default function AccessibilityPage() {
  return (
    <section aria-labelledby="a11y-heading" className="border-b border-line">
      <JsonLd data={accessibilitySchema()} />
      <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="mb-4 text-[13px] tracking-[0.25em] text-brand">
            Accessibility
          </p>
          <h1 id="a11y-heading" className="font-display text-3xl leading-tight text-ink sm:text-5xl">
            Accessibility statement.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            We want this site usable regardless of how you browse it —
            keyboard only, with a screen reader, at higher contrast, or
            with motion reduced. This page describes what's built in today
            and how to tell us if something isn't working.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-10 space-y-8 border-t border-line pt-10">
          <div>
            <h2 className="font-display text-xl text-ink">Built-in controls</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              The accessibility icon in the header opens two toggles that
              apply site-wide and are remembered on your next visit:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">
              <li>
                <strong className="text-ink">Reduce motion</strong> — turns
                off scroll reveals, hover animation, and the hero&rsquo;s
                animated illustration. Your operating system&rsquo;s
                &ldquo;reduce motion&rdquo; setting is honoured automatically
                even if you never open this menu.
              </li>
              <li>
                <strong className="text-ink">High contrast</strong> —
                pushes text and background pairs to near pure black and
                white and thickens dividing rules, without changing layout.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Keyboard &amp; screen readers</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              A &ldquo;skip to main content&rdquo; link is the first
              focusable element on every page. Every interactive control
              has a visible focus outline, decorative imagery and icons
              are marked so screen readers skip them, and functional
              images carry real alt text.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Decorative cursor set</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              On mouse and trackpad devices, the pointer, link, text-entry,
              and drag cursors are replaced with a set of embroidered
              icons. This is purely cosmetic — it&rsquo;s scoped to
              fine-pointer devices only, never applies on touchscreens, and
              never changes what a control does or how it&rsquo;s announced.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Known limitations</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              The hero&rsquo;s WebGL illustration is decorative and hidden
              from assistive technology, and is skipped entirely below the
              <code className="mx-1 rounded bg-washi-raised px-1 py-0.5 text-xs">sm</code>
              breakpoint and when motion is reduced. If you find a genuine
              barrier anywhere else on the site, please tell us — see below.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-ink">Report an issue</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Email{" "}
              <a href="mailto:events@urasa.example" className="brush-underline">
                events@urasa.example
              </a>{" "}
              with what you were trying to do and what happened — we treat
              accessibility reports as bugs, not feedback.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
