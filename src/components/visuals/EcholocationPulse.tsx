'use client';

import { useEffect, useRef } from 'react';

interface Ring {
  born: number;
  isBlue: boolean;
}

const RING_LIFESPAN = 10000; // ms — time for ring to expand fully and fade
const SPAWN_INTERVAL = 4000; // ms between new rings
const SPAWN_INTERVAL_MOBILE = 5000;
const MAX_OPACITY = 0.03;
const BLUE_CHANCE = 0.2;

export default function EcholocationPulse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const interval = isMobile ? SPAWN_INTERVAL_MOBILE : SPAWN_INTERVAL;

    let rings: Ring[] = [];
    let lastSpawn = 0;
    let animId: number;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    function draw(now: number) {
      const w = canvas!.width;
      const h = canvas!.height;
      const cx = w / 2;
      const cy = h / 2;
      const maxRadius = Math.sqrt(cx * cx + cy * cy);

      // Clear
      ctx!.clearRect(0, 0, w, h);

      // Spawn new ring
      if (now - lastSpawn > interval) {
        rings.push({
          born: now,
          isBlue: Math.random() < BLUE_CHANCE,
        });
        lastSpawn = now;
      }

      // Draw rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        const age = now - ring.born;
        const progress = age / RING_LIFESPAN; // 0 → 1

        if (progress > 1) {
          rings.splice(i, 1);
          continue;
        }

        const radius = progress * maxRadius;
        // Ease out the opacity: strong start, gentle fade
        const opacity = MAX_OPACITY * (1 - progress) * (1 - progress);

        ctx!.beginPath();
        ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx!.closePath();

        if (ring.isBlue) {
          ctx!.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.8})`;
        } else {
          ctx!.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        }

        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      animId = requestAnimationFrame(draw);
    }

    // Start first ring immediately
    lastSpawn = performance.now() - interval;
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
