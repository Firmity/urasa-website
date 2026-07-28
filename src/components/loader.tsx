import Image from "next/image";

/** Embroidered dot-ring loader — spins via CSS; the global reduce-motion
 *  rules in globals.css already zero out animation-duration when the
 *  user has motion reduced, so no extra guard is needed here. */
export function Loader({
  size = 28,
  label = "Loading",
  className = "",
}: {
  size?: number;
  label?: string;
  className?: string;
}) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-flex items-center justify-center ${className}`}
    >
      <Image
        src="/cursors/loader.png"
        alt=""
        aria-hidden="true"
        width={96}
        height={93}
        style={{ width: size, height: "auto" }}
        className="animate-spin"
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
