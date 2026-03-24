'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

const BlockMorph = dynamic(() => import('./BlockMorph'), { ssr: false });

export default function StartupOverlay() {
  const [shouldPlay, setShouldPlay] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem('startup-played');
    if (hasPlayed) {
      setShouldPlay(false);
      setDone(true);
    }
  }, []);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem('startup-played', 'true');
    setDone(true);
  }, []);

  if (done) return null;

  return shouldPlay ? <BlockMorph onComplete={handleComplete} /> : null;
}
