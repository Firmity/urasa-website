"use client";

import { useEffect, useRef, type RefObject } from "react";
import { Clock, Color, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { useA11y, useSeason } from "@/components/app-provider";

export type AmbientTickCtx = {
  dt: number;
  elapsed: number;
  pointer: { x: number; y: number };
  scrollT: number;
};

export type AmbientSetup = {
  /** Color instances actually referenced by materials/uniforms — mutated
   *  in place on ritu change, so no material needs to be rebuilt. */
  tintColors: Color[];
  tick?: (ctx: AmbientTickCtx) => void;
  dispose?: () => void;
};

/**
 * Shared engine for the small ambient Three.js scenes used across the site
 * (hero decor, hero concept demos). Owns the renderer/camera lifecycle,
 * resize, IntersectionObserver pause, reduced-motion gating, and pointer +
 * scroll tracking — callers only describe *what* to build and how a frame
 * should evolve. Centralizing this means a fix to (e.g.) the resize or
 * cleanup logic lands once for every scene instead of N times.
 */
export function useAmbientScene(
  containerRef: RefObject<HTMLDivElement | null>,
  build: (ctx: { scene: Scene; camera: PerspectiveCamera; accent: Color }) => AmbientSetup,
) {
  const tintColorsRef = useRef<Color[]>([]);
  const { ritu } = useSeason();
  const { reduceMotion } = useA11y();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // No WebGL — caller's static fallback (if any) stands alone.
    }

    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 5.2);
    camera.lookAt(0, 0, 0);

    const accent = new Color(ritu.accent);
    const setup = build({ scene, camera, accent });
    tintColorsRef.current = setup.tintColors;

    const systemPrefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shouldAnimate = !reduceMotion && !systemPrefersReduced;

    const pointer = { x: 0, y: 0 };
    const pointerTarget = { x: 0, y: 0 };
    let scrollT = 0.5;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerTarget.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerTarget.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      scrollT = 1 - Math.min(1, Math.max(0, (rect.top + rect.height / 2) / (vh + rect.height)));
    };

    let frameId = 0;
    let isVisible = true;
    const clock = new Clock();
    const renderFrame = () => renderer.render(scene, camera);

    const tickFrame = () => {
      frameId = requestAnimationFrame(tickFrame);
      if (!isVisible) return;
      const dt = Math.min(clock.getDelta(), 0.1);
      // Smooth, non-snapping approach toward the latest pointer sample.
      pointer.x += (pointerTarget.x - pointer.x) * Math.min(1, dt * 4);
      pointer.y += (pointerTarget.y - pointer.y) * Math.min(1, dt * 4);
      setup.tick?.({ dt, elapsed: clock.elapsedTime, pointer, scrollT });
      renderFrame();
    };

    let io: IntersectionObserver | undefined;
    if (shouldAnimate) {
      io = new IntersectionObserver(([entry]) => (isVisible = entry.isIntersecting), { threshold: 0 });
      io.observe(container);
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      tickFrame();
    } else {
      renderFrame();
    }

    const handleResize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (!shouldAnimate) renderFrame();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      io?.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      setup.dispose?.();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  useEffect(() => {
    const color = new Color(ritu.accent);
    tintColorsRef.current.forEach((c) => c.set(color));
  }, [ritu.accent]);
}
