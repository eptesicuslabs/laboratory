'use client';

import { useRef, useMemo } from 'react';
import type React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  Vector3,
  LineBasicMaterial,
  Color,
  Points,
  Group,
  Mesh,
  MeshBasicMaterial,
  LineLoop,
} from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// ---------------------------------------------------------------------------
// ConnectionLines — precomputed segments between nearby core particles
// ---------------------------------------------------------------------------
function ConnectionLines({ count }: { count: number }) {
  const geometry = useMemo(() => {
    // generate same positions deterministically (same seed logic as CoreParticles)
    const pts: Vector3[] = [];
    // Use a simple seeded approach matching CoreParticles
    const tempPositions: number[] = [];
    const rng = mulberry32(42);
    for (let i = 0; i < count; i++) {
      let x: number, y: number, z: number;
      do {
        x = (rng() - 0.5) * 2;
        y = (rng() - 0.5) * 2;
        z = (rng() - 0.5) * 2;
      } while (x * x + y * y + z * z > 1);
      const r = 3.2;
      tempPositions.push(x * r, y * r, z * r);
      pts.push(new Vector3(x * r, y * r, z * r));
    }

    const linePositions: number[] = [];
    const threshold = 1.8;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < threshold) {
          linePositions.push(pts[i].x, pts[i].y, pts[i].z);
          linePositions.push(pts[j].x, pts[j].y, pts[j].z);
        }
      }
    }

    const geo = new BufferGeometry();
    geo.setAttribute(
      'position',
      new Float32BufferAttribute(linePositions, 3)
    );
    return geo;
  }, [count]);

  const material = useMemo(
    () =>
      new LineBasicMaterial({
        color: new Color('#2563EB'),
        transparent: true,
        opacity: 0.1,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  return <lineSegments geometry={geometry} material={material} />;
}

// ---------------------------------------------------------------------------
// Seeded RNG so CoreParticles and ConnectionLines share the same layout
// ---------------------------------------------------------------------------
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// We also need CoreParticles to use the same RNG — rebuild it with seeded positions
function CoreParticlesSeeded({ count }: { count: number }) {
  const ref = useRef<Points>(null!);

  const { positions, basePositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const rng = mulberry32(42);
    for (let i = 0; i < count; i++) {
      let x: number, y: number, z: number;
      do {
        x = (rng() - 0.5) * 2;
        y = (rng() - 0.5) * 2;
        z = (rng() - 0.5) * 2;
      } while (x * x + y * y + z * z > 1);
      const r = 3.2;
      pos[i * 3] = x * r;
      pos[i * 3 + 1] = y * r;
      pos[i * 3 + 2] = z * r;
      base[i * 3] = pos[i * 3];
      base[i * 3 + 1] = pos[i * 3 + 1];
      base[i * 3 + 2] = pos[i * 3 + 2];
    }
    return { positions: pos, basePositions: base };
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const attr = ref.current.geometry.attributes.position;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const breathe = Math.sin(t * 0.8 + i * 0.4) * 0.04;
      arr[idx] = basePositions[idx] * (1 + breathe);
      arr[idx + 1] = basePositions[idx + 1] * (1 + breathe);
      arr[idx + 2] = basePositions[idx + 2] * (1 + breathe);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#3B82F6"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.9}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// OrbitalRing — elliptical orbit path + traveling particles
// ---------------------------------------------------------------------------
const RING_CONFIGS = [
  { radiusX: 4.5, radiusZ: 4.0, tiltX: 0.4, tiltZ: 0.2, speed: 0.35, eccentricity: 0.15 },
  { radiusX: 5.2, radiusZ: 3.6, tiltX: -0.6, tiltZ: 0.5, speed: -0.25, eccentricity: 0.25 },
  { radiusX: 3.8, radiusZ: 5.0, tiltX: 0.8, tiltZ: -0.3, speed: 0.45, eccentricity: 0.1 },
];

function OrbitalRing({
  config,
  particleCount,
}: {
  config: (typeof RING_CONFIGS)[number];
  particleCount: number;
}) {
  const groupRef = useRef<Group>(null!);
  const particlesRef = useRef<Points>(null!);
  const { radiusX, radiusZ, tiltX, tiltZ, speed, eccentricity } = config;

  // Orbit line as a LineLoop (avoids JSX <line> / SVG collision)
  const orbitLine = useMemo(() => {
    const segments = 128;
    const positions = new Float32Array(segments * 3);
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radiusX * (1 - eccentricity * Math.cos(angle));
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = Math.sin(angle) * radiusZ;
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new Float32BufferAttribute(positions, 3));
    const mat = new LineBasicMaterial({
      color: new Color('#3B82F6'),
      transparent: true,
      opacity: 0.08,
      blending: AdditiveBlending,
      depthWrite: false,
    });
    return new LineLoop(geo, mat);
  }, [radiusX, radiusZ, eccentricity]);

  // Particle positions along the ellipse
  const particlePositions = useMemo(
    () => new Float32Array(particleCount * 3),
    [particleCount]
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const attr = particlesRef.current.geometry.attributes.position;
    const arr = attr.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const baseAngle = (i / particleCount) * Math.PI * 2;
      const angle = baseAngle + t * speed;
      arr[i * 3] = Math.cos(angle) * radiusX * (1 - eccentricity * Math.cos(angle));
      arr[i * 3 + 1] = 0;
      arr[i * 3 + 2] = Math.sin(angle) * radiusZ;
    }
    attr.needsUpdate = true;
  });

  return (
    <group ref={groupRef} rotation={[tiltX, 0, tiltZ]}>
      {/* Orbit line */}
      <primitive object={orbitLine} />

      {/* Traveling particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#60A5FA"
          size={0.045}
          sizeAttenuation
          transparent
          opacity={0.85}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// ---------------------------------------------------------------------------
// InnerGlow — pulsing translucent sphere
// ---------------------------------------------------------------------------
function InnerGlow() {
  const ref = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 0.06 + Math.sin(t * 0.5) * 0.02;
    (ref.current.material as MeshBasicMaterial).opacity = pulse;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.0, 32, 32]} />
      <meshBasicMaterial
        color="#3B82F6"
        transparent
        opacity={0.06}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// AtomScene — wrapper with rotation + breathing
// ---------------------------------------------------------------------------
function AtomScene({ isMobile, mouse, scrollProgress }: {
  isMobile: boolean;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scrollProgress: number;
}) {
  const groupRef = useRef<Group>(null!);
  const coreCount = isMobile ? 150 : 300;
  const orbitalParticles = isMobile ? 40 : 60;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mx = mouse.current.x;
    const my = mouse.current.y;

    // Base rotation + mouse influence (parallax tilt)
    groupRef.current.rotation.y = t * 0.06 + mx * 0.15;
    groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.15 + my * 0.1;

    // Scroll-responsive scale (1.0 → 1.15 as scroll progresses)
    const scrollScale = 1 + scrollProgress * 0.15;
    const breathe = 1 + Math.sin(t * 0.4) * 0.025;
    groupRef.current.scale.setScalar(breathe * scrollScale);
  });

  return (
    <group ref={groupRef}>
      <CoreParticlesSeeded count={coreCount} />
      <ConnectionLines count={coreCount} />
      {RING_CONFIGS.map((config, i) => (
        <OrbitalRing key={i} config={config} particleCount={orbitalParticles} />
      ))}
      <InnerGlow />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Main export — Canvas + post-processing
// ---------------------------------------------------------------------------
export default function AtomVisualization({ isMobile, scrollProgress }: { isMobile: boolean; scrollProgress: number }) {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
      camera={{ position: [0, 0, 12], fov: 50 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      onPointerMove={(e) => {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      }}
    >
      <AtomScene isMobile={isMobile} mouse={mouse} scrollProgress={scrollProgress} />
      <EffectComposer>
        <Bloom
          intensity={(isMobile ? 0.6 : 1.0) + scrollProgress * 0.4}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
