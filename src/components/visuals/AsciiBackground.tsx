'use client';

import { useEffect, useRef } from 'react';

const CHARS = '│─┌┐└┘·.╱╲+*◦░▒▓█░·.·░·';

export default function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fontSize = 14;
    const charWidth = fontSize * 0.6;
    const charHeight = fontSize * 1.2;
    let columns: number;
    let drops: number[];
    let speeds: number[];
    let animId: number;
    let lastTime = 0;
    const frameInterval = 1000 / 20; // ~20fps for performance

    const isMobile = window.innerWidth < 768;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      columns = Math.floor(canvas!.width / charWidth);
      // Initialize drops at random positions
      drops = Array.from({ length: columns }, () => Math.random() * -100);
      speeds = Array.from({ length: columns }, () => 0.3 + Math.random() * 0.7);
    }

    resize();
    window.addEventListener('resize', resize);

    function draw(timestamp: number) {
      if (timestamp - lastTime < frameInterval) {
        animId = requestAnimationFrame(draw);
        return;
      }
      lastTime = timestamp;

      // Semi-transparent black overlay for trail effect
      ctx!.fillStyle = 'rgba(10, 10, 11, 0.15)';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      ctx!.font = `${fontSize}px monospace`;

      for (let i = 0; i < columns; i++) {
        // On mobile, skip every other column
        if (isMobile && i % 2 !== 0) continue;

        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * charWidth;
        const y = drops[i] * charHeight;

        // Occasionally use blue tint
        if (Math.random() > 0.95) {
          ctx!.fillStyle = 'rgba(59, 130, 246, 0.07)';
        } else {
          // Fade based on position — dimmer toward bottom
          const fade = Math.max(0.02, 0.06 - (drops[i] / (canvas!.height / charHeight)) * 0.04);
          ctx!.fillStyle = `rgba(255, 255, 255, ${fade})`;
        }

        ctx!.fillText(char, x, y);

        // Reset drop when it goes off screen, with random reset
        if (y > canvas!.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += speeds[i];
      }

      animId = requestAnimationFrame(draw);
    }

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
