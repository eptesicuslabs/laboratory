'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

const BlockMorph = dynamic(() => import('./BlockMorph'), { ssr: false });

export default function StartupOverlay() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    // Only play animation once per session
    const hasPlayed = sessionStorage.getItem('startup-played');
    if (hasPlayed) {
      setAnimationDone(true);
    } else {
      setShowAnimation(true);
    }
  }, []);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem('startup-played', 'true');
    setAnimationDone(true);
    setShowAnimation(false);
  }, []);

  if (animationDone && !showAnimation) return null;

  return showAnimation ? <BlockMorph onComplete={handleComplete} /> : null;
}
