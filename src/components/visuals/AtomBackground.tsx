'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const AtomVisualization = dynamic(
  () => import('@/components/visuals/AtomVisualization'),
  { ssr: false }
);

export default function AtomBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    // Small delay so the canvas initializes before fade-in starts
    requestAnimationFrame(() => setMounted(true));
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        opacity: mounted ? 1 : 0,
        transition: 'opacity 1.5s ease-in-out',
      }}
    >
      <AtomVisualization isMobile={isMobile} />
    </div>
  );
}
