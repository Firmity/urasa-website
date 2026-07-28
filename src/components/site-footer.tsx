import Image from "next/image";
import { BorderStrip } from "./border-strip";

export function SiteFooter() {
  return (
    <footer>
      <BorderStrip />
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 sm:gap-6 sm:py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-full.webp"
            alt="Urasa — We care about warmth"
            width={520}
            height={648}
            className="h-14 w-auto sm:h-16"
          />
          <p className="text-xs text-nezumi">
            &copy; {new Date().getFullYear()} Urasa.
            <br />
            All rights reserved.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="/about" className="brush-underline text-xs tracking-[0.1em] text-nezumi">
            About
          </a>
          <a href="/#philosophy" className="brush-underline text-xs tracking-[0.1em] text-nezumi">
            Philosophy
          </a>
          <a href="/#menu" className="brush-underline text-xs tracking-[0.1em] text-nezumi">
            Menu
          </a>
          <a href="/careers" className="brush-underline text-xs tracking-[0.1em] text-nezumi">
            Careers
          </a>
          <a href="/responsibility" className="brush-underline text-xs tracking-[0.1em] text-nezumi">
            Responsibility
          </a>
          <a href="/enquire" className="brush-underline text-xs tracking-[0.1em] text-nezumi">
            Enquire
          </a>
          <a href="/accessibility" className="brush-underline text-xs tracking-[0.1em] text-nezumi">
            Accessibility statement
          </a>
        </nav>
      </div>
      <BorderStrip />
    </footer>
  );
}
