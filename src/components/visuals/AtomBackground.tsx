'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

const AtomVisualization = dynamic(
  () => import('@/components/visuals/AtomVisualization'),
  { ssr: false }
);

export default function AtomBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0);
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    requestAnimationFrame(() => setMounted(true));

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        opacity: mounted ? 1 : 0,
        transition: 'opacity 1.5s ease-in-out',
      }}
    >
      <AtomVisualization isMobile={isMobile} scrollProgress={scrollProgress} />
    </div>
  );
}
