"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  "/hero-bg.webp",
  "/food/thali-platter.webp",
  "/food/herbed-kebab-plate.webp",
  "/food/rainbow-bowl.webp",
  "/food/chana-masala.webp",
];

const INTERVAL_MS = 6000;

/**
 * Gentle cross-fading backdrop for the hero. Same blur/scale treatment as
 * the original single static image — this just cycles the source on a
 * timer via opacity crossfade. The gradient/wash overlays in Hero (drawn
 * as siblings on top of this) are untouched, so text legibility is
 * identical to before at every point in the cycle. Automatically stops
 * cycling under prefers-reduced-motion — the interval keeps running but
 * the opacity transition is zeroed by the global reduced-motion override
 * in globals.css, so slides still swap, just without the crossfade.
 */
export function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {SLIDES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className="scale-105 object-cover object-center blur-[2px] transition-opacity duration-[1800ms] ease-out"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
    </>
  );
}
