/**
 * Decorative strip cropped from public/border-strip.webp (source:
 * border_footer.png), always tinted with --season-accent via
 * mix-blend-mode "color" so it shifts hue with the active/previewed ritu
 * without needing a re-colored image per season. Used top and bottom of
 * the Hero section, and top and bottom of the footer — the navbar no
 * longer carries a decorative border, just its plain border-line.
 */
export function BorderStrip({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-6 w-full overflow-hidden opacity-65 sm:h-7 ${className}`}
    >
      <div
        className="absolute inset-0 bg-repeat-x"
        style={{
          backgroundImage: "url('/border-strip.webp')",
          backgroundSize: "auto 100%",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--season-accent)", mixBlendMode: "color" }}
      />
    </div>
  );
}
