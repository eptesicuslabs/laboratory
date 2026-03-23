'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// ── Shared utilities ────────────────────────────────────────────────

function spherePoint(radius: number): [number, number, number] {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * (0.4 + Math.random() * 0.6);
    return [
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
    ];
}

// ── Core particle cloud ─────────────────────────────────────────────

function CoreParticles({ count }: { count: number }) {
    const ref = useRef<THREE.Points>(null);
    const basePositions = useRef<Float32Array | null>(null);

    const positions = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const [x, y, z] = spherePoint(3.2);
            p[i * 3] = x;
            p[i * 3 + 1] = y;
            p[i * 3 + 2] = z;
        }
        basePositions.current = new Float32Array(p);
        return p;
    }, [count]);

    useFrame(({ clock }) => {
        if (!ref.current || !basePositions.current) return;
        const t = clock.getElapsedTime();
        const pos = ref.current.geometry.attributes.position.array as Float32Array;
        const base = basePositions.current;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const phase = i * 0.37;
            const breathe = 1 + Math.sin(t * 0.4 + phase) * 0.04;
            pos[i3] = base[i3] * breathe + Math.sin(t * 0.2 + phase) * 0.03;
            pos[i3 + 1] = base[i3 + 1] * breathe + Math.cos(t * 0.25 + phase) * 0.03;
            pos[i3 + 2] = base[i3 + 2] * breathe + Math.sin(t * 0.15 + phase * 0.7) * 0.03;
        }
        ref.current.geometry.attributes.position.needsUpdate = true;
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
                opacity={0.85}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

// ── Connection lines between nearby core particles ──────────────────

function ConnectionLines({ positions, count }: { positions: Float32Array; count: number }) {
    const linePositions = useMemo(() => {
        const segments: number[] = [];
        const threshold = 1.8;
        const thresholdSq = threshold * threshold;

        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const distSq = dx * dx + dy * dy + dz * dz;
                if (distSq < thresholdSq) {
                    segments.push(
                        positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                        positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2],
                    );
                }
            }
        }
        return new Float32Array(segments);
    }, [positions, count]);

    if (linePositions.length === 0) return null;

    return (
        <lineSegments>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[linePositions, 3]}
                />
            </bufferGeometry>
            <lineBasicMaterial
                color="#2563EB"
                transparent
                opacity={0.1}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </lineSegments>
    );
}

// ── Orbital ring with traveling particles ───────────────────────────

function OrbitalRing({
    particleCount,
    radius,
    rotationX,
    rotationZ,
    speed,
    eccentricity = 0.15,
}: {
    particleCount: number;
    radius: number;
    rotationX: number;
    rotationZ: number;
    speed: number;
    eccentricity?: number;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const pointsRef = useRef<THREE.Points>(null);

    const ringLinePositions = useMemo(() => {
        const segments = 128;
        const p = new Float32Array((segments + 1) * 3);
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            p[i * 3] = Math.cos(angle) * radius * (1 + eccentricity);
            p[i * 3 + 1] = 0;
            p[i * 3 + 2] = Math.sin(angle) * radius * (1 - eccentricity);
        }
        return p;
    }, [radius, eccentricity]);

    const phases = useMemo(() => {
        const p = new Float32Array(particleCount);
        for (let i = 0; i < particleCount; i++) {
            p[i] = (i / particleCount) * Math.PI * 2 + Math.random() * 0.3;
        }
        return p;
    }, [particleCount]);

    const positions = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);

    useFrame(({ clock }) => {
        if (!pointsRef.current) return;
        const t = clock.getElapsedTime() * speed;
        const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
            const angle = phases[i] + t;
            const wobble = Math.sin(t * 2 + phases[i] * 3) * 0.08;
            pos[i * 3] = Math.cos(angle) * radius * (1 + eccentricity);
            pos[i * 3 + 1] = wobble;
            pos[i * 3 + 2] = Math.sin(angle) * radius * (1 - eccentricity);
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <group ref={groupRef} rotation={[rotationX, 0, rotationZ]}>
            {/* Faint orbit line */}
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[ringLinePositions, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    color="#3B82F6"
                    transparent
                    opacity={0.06}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </line>

            {/* Traveling particles */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    color="#60A5FA"
                    size={0.045}
                    sizeAttenuation
                    transparent
                    opacity={0.9}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>
        </group>
    );
}

// ── Inner glow sphere (subtle blue glow at the center) ──────────────

function InnerGlow() {
    const ref = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const t = clock.getElapsedTime();
        // Pulse the glow opacity subtly
        (ref.current.material as THREE.MeshBasicMaterial).opacity =
            0.06 + Math.sin(t * 0.5) * 0.02;
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[2.0, 32, 32]} />
            <meshBasicMaterial
                color="#3B82F6"
                transparent
                opacity={0.06}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </mesh>
    );
}

// ── Main scene ──────────────────────────────────────────────────────

function AtomScene({ isMobile }: { isMobile: boolean }) {
    const groupRef = useRef<THREE.Group>(null);

    const coreCount = isMobile ? 150 : 300;
    const orbitalCount = isMobile ? 40 : 80;

    const corePositions = useMemo(() => {
        const p = new Float32Array(coreCount * 3);
        for (let i = 0; i < coreCount; i++) {
            const [x, y, z] = spherePoint(3.2);
            p[i * 3] = x;
            p[i * 3 + 1] = y;
            p[i * 3 + 2] = z;
        }
        return p;
    }, [coreCount]);

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        const t = clock.getElapsedTime();
        groupRef.current.rotation.y = t * 0.06;
        groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.15;
        const scale = 1 + Math.sin(t * 0.4) * 0.025;
        groupRef.current.scale.setScalar(scale);
    });

    return (
        <group ref={groupRef}>
            <InnerGlow />
            <CoreParticles count={coreCount} />
            <ConnectionLines positions={corePositions} count={coreCount} />

            <OrbitalRing
                particleCount={orbitalCount}
                radius={4.8}
                rotationX={0.4}
                rotationZ={0.2}
                speed={0.15}
                eccentricity={0.1}
            />
            <OrbitalRing
                particleCount={orbitalCount}
                radius={5.2}
                rotationX={1.1}
                rotationZ={0.8}
                speed={0.12}
                eccentricity={0.18}
            />
            <OrbitalRing
                particleCount={orbitalCount}
                radius={4.5}
                rotationX={-0.5}
                rotationZ={1.3}
                speed={0.18}
                eccentricity={0.12}
            />
        </group>
    );
}

// ── Exported component ──────────────────────────────────────────────

export default function AtomVisualization({ isMobile = false }: { isMobile?: boolean }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 12], fov: 50 }}
            gl={{
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance',
            }}
            dpr={isMobile ? 1 : [1, 2]}
            style={{ background: 'transparent' }}
        >
            <AtomScene isMobile={isMobile} />
            <EffectComposer>
                <Bloom
                    intensity={isMobile ? 0.6 : 1.0}
                    luminanceThreshold={0.15}
                    luminanceSmoothing={0.9}
                    mipmapBlur
                />
            </EffectComposer>
        </Canvas>
    );
}
