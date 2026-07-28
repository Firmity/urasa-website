import Image from "next/image";

/**
 * Decorative section boundary — one flower motif (extracted and
 * background-removed from the CTA embroidery sheet, public/cta_examples.png)
 * mirrored into a symmetric pair. Replaces the plain border-line rule
 * between landing-page sections.
 */
export function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="flex justify-center bg-washi-raised py-0.5"
    >
      <Image
        src="/flower-separator.webp"
        alt=""
        width={295}
        height={120}
        className="h-7 w-auto opacity-90 sm:h-9"
      />
    </div>
  );
}
