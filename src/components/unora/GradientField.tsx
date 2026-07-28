/**
 * Shared "aurora" background decoration — three blurred, slowly drifting
 * color blobs (see the unora-drift-* keyframes in globals.css). Dropped
 * in as the first child of any `relative overflow-hidden` Unora section,
 * with the section's real content wrapped in `relative z-10` to sit
 * above it. Kept purely decorative (aria-hidden, pointer-events: none)
 * and low-opacity so body text never loses contrast.
 */
export function GradientField({
  colors,
  className = "",
}: {
  colors: readonly [string, string, string?];
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="unora-drift-1 absolute -left-20 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl sm:h-96 sm:w-96"
        style={{ background: colors[0] }}
      />
      <div
        className="unora-drift-2 absolute -right-24 top-1/3 h-64 w-64 rounded-full opacity-35 blur-3xl sm:h-80 sm:w-80"
        style={{ background: colors[1] }}
      />
      {colors[2] && (
        <div
          className="unora-drift-3 absolute -bottom-16 left-1/3 h-56 w-56 rounded-full opacity-25 blur-3xl sm:h-72 sm:w-72"
          style={{ background: colors[2] }}
        />
      )}
    </div>
  );
}
