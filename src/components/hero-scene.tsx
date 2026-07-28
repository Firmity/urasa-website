"use client";

import { useRef } from "react";
import {
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  SphereGeometry,
  TorusGeometry,
} from "three";
import { useAmbientScene } from "@/lib/use-ambient-scene";

/**
 * A thin line-art bowl — rim + body only, low opacity, tinted to the
 * active/previewed ritu. Deliberately minimal: no fills, no shading, no
 * other geometry, so it reads as a quiet detail rather than competing
 * with whatever it's placed next to. Lives in the Seasonal Menu section.
 */
export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useAmbientScene(containerRef, ({ scene, accent }) => {
    const bowlGroup = new Group();
    bowlGroup.position.set(0, -0.3, 0);

    const rimGeo = new TorusGeometry(1.05, 0.02, 8, 44);
    const rimMat = new LineBasicMaterial({ color: accent.clone(), transparent: true, opacity: 0.22 });
    const rim = new LineSegments(new EdgesGeometry(rimGeo, 1), rimMat);
    rim.rotation.x = Math.PI / 2.35;
    bowlGroup.add(rim);

    const bodyGeo = new SphereGeometry(1.0, 20, 10, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const bodyMat = new LineBasicMaterial({ color: accent.clone(), transparent: true, opacity: 0.12 });
    const body = new LineSegments(new EdgesGeometry(bodyGeo, 1), bodyMat);
    body.rotation.x = Math.PI;
    body.position.y = -0.35;
    bowlGroup.add(body);

    scene.add(bowlGroup);

    return {
      tintColors: [rimMat.color, bodyMat.color],
      tick: ({ dt, pointer }) => {
        bowlGroup.rotation.y += dt * 0.08;
        bowlGroup.rotation.x += (pointer.y * 0.12 - bowlGroup.rotation.x) * Math.min(1, dt * 2);
      },
      dispose: () => {
        rimGeo.dispose();
        bodyGeo.dispose();
        rimMat.dispose();
        bodyMat.dispose();
      },
    };
  });

  return <div ref={containerRef} aria-hidden="true" className="absolute inset-0" />;
}
