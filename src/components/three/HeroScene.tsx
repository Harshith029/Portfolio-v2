"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Neural constellation: a point field with proximity connections and a
 * slowly-breathing wireframe core. Three draw calls total — points, lines,
 * core — so it holds 60fps comfortably. Pointer parallax is tracked on
 * window (the hero copy sits above the canvas and would swallow events).
 */
function NeuralField({ count, animate }: { count: number; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const { positions, linePositions } = useMemo(() => {
    const rng = (() => {
      // deterministic layout so hydration/dev reloads look identical
      let s = 42;
      return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
      };
    })();

    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const r = 2.1 + rng() * 2.7;
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      pts.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi) * 0.62,
          r * Math.sin(phi) * Math.sin(theta),
        ),
      );
    }

    const positions = new Float32Array(count * 3);
    pts.forEach((p, i) => positions.set([p.x, p.y, p.z], i * 3));

    const maxDist = 1.05;
    const maxSegments = 850;
    const line: number[] = [];
    outer: for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        if (pts[i].distanceTo(pts[j]) < maxDist) {
          line.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
          if (line.length / 6 >= maxSegments) break outer;
        }
      }
    }
    return { positions, linePositions: new Float32Array(line) };
  }, [count]);

  useFrame((state, delta) => {
    if (!animate || !group.current) return;
    const g = group.current;
    g.rotation.y += delta * 0.045;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, mouse.current.y * 0.14, 0.04);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, mouse.current.x * 0.06, 0.04);
    if (core.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.05;
      core.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.042}
          color="#60a5fa"
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.11} depthWrite={false} />
      </lineSegments>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial wireframe color="#22d3ee" transparent opacity={0.13} depthWrite={false} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const [config] = useState(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 768px)").matches;
    return { animate: !reduced, count: small ? 340 : 640 };
  });

  // Some engines miss the initial ResizeObserver tick, leaving the canvas at
  // its 300×150 default. One resize event after mount guarantees a measure.
  useEffect(() => {
    const t = setTimeout(() => window.dispatchEvent(new Event("resize")), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={config.animate ? "always" : "demand"}
      >
        <NeuralField count={config.count} animate={config.animate} />
      </Canvas>
    </div>
  );
}
