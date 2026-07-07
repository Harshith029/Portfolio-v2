"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * The hero's single 3D object: a provenance graph. A central identity node,
 * six system nodes (the projects) on a ring, each linked outward to a source
 * node (its receipt), plus an award node. Colour encodes node type — nothing
 * here is decorative; the shape is the thesis (claims backed by linked sources).
 * Deterministic layout (no physics sim) keeps it a steady 3 draw calls.
 */
type Node = { pos: [number, number, number]; type: "system" | "source" | "award" };

const COLORS = {
  system: new THREE.Color("#3b82f6"),
  source: new THREE.Color("#6b7280"),
  award: new THREE.Color("#f59e0b"),
};

function buildGraph() {
  const nodes: Node[] = [];
  const edges: number[] = [];
  const centerV = new THREE.Vector3(0, 0, 0);
  const flat: THREE.Vector3[] = [];

  const systems = 6;
  for (let i = 0; i < systems; i++) {
    const a = (i / systems) * Math.PI * 2;
    const y = Math.sin(a * 2) * 0.7;
    const sysPos = new THREE.Vector3(Math.cos(a) * 2.6, y, Math.sin(a) * 2.6);
    nodes.push({ pos: [sysPos.x, sysPos.y, sysPos.z], type: "system" });
    flat.push(sysPos);
    const sysIdx = nodes.length - 1;

    // center → system edge
    edges.push(centerV.x, centerV.y, centerV.z, sysPos.x, sysPos.y, sysPos.z);

    // system → source (its receipt)
    const srcPos = new THREE.Vector3(Math.cos(a) * 3.9, y * 1.25 + 0.2, Math.sin(a) * 3.9);
    const type = i === 2 ? "award" : "source";
    nodes.push({ pos: [srcPos.x, srcPos.y, srcPos.z], type });
    flat.push(srcPos);
    edges.push(sysPos.x, sysPos.y, sysPos.z, srcPos.x, srcPos.y, srcPos.z);
  }

  const positions = new Float32Array(nodes.length * 3);
  const colors = new Float32Array(nodes.length * 3);
  nodes.forEach((n, i) => {
    positions.set(n.pos, i * 3);
    const c = COLORS[n.type];
    colors.set([c.r, c.g, c.b], i * 3);
  });

  return { positions, colors, edges: new Float32Array(edges) };
}

function Graph({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { positions, colors, edges } = useMemo(buildGraph, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (!animate || !group.current) return;
    const g = group.current;
    g.rotation.y += delta * 0.08;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, mouse.current.y * 0.18, 0.05);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, mouse.current.x * 0.08, 0.05);
    if (core.current) core.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.06);
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edges, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.28} depthWrite={false} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.28} vertexColors transparent opacity={1} sizeAttenuation depthWrite={false} />
      </points>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.62, 0]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.75} />
      </mesh>
    </group>
  );
}

export default function EvidenceGraph() {
  const [animate] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const t = setTimeout(() => window.dispatchEvent(new Event("resize")), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.4, 6.6], fov: 54 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: true }}
        frameloop={animate ? "always" : "demand"}
      >
        <Graph animate={animate} />
      </Canvas>
    </div>
  );
}
