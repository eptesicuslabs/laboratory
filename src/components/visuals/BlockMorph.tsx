'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlockMorph({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'blocks' | 'text' | 'settle'>('blocks');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 1000);
    const t2 = setTimeout(() => setPhase('settle'), 2400);
    const t3 = setTimeout(() => onComplete(), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const fullText = 'Eptesicus Laboratories';

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0B] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {phase === 'blocks' && (
          <motion.div
            key="blocks"
            className="relative"
            style={{ width: 144, height: 200 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
          >
            {/* Vertical bar */}
            <motion.div
              className="absolute bg-white"
              style={{ left: 0, top: 0, width: 24, height: 200 }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0, ease: [0.14, 1, 0.34, 1] }}
            />
            {/* Top bar */}
            <motion.div
              className="absolute bg-white"
              style={{ left: 24, top: 0, width: 120, height: 24, transformOrigin: 'left' }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.15, ease: [0.14, 1, 0.34, 1] }}
            />
            {/* Middle bar */}
            <motion.div
              className="absolute bg-white"
              style={{ left: 24, top: 88, width: 96, height: 24, transformOrigin: 'left' }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3, ease: [0.14, 1, 0.34, 1] }}
            />
            {/* Bottom bar */}
            <motion.div
              className="absolute bg-white"
              style={{ left: 24, top: 176, width: 120, height: 24, transformOrigin: 'left' }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.45, ease: [0.14, 1, 0.34, 1] }}
            />
          </motion.div>
        )}

        {(phase === 'text' || phase === 'settle') && (
          <motion.div
            key="text"
            className="font-mono text-white whitespace-nowrap"
            initial={false}
            animate={{
              fontSize: phase === 'settle' ? '2.5rem' : '5rem',
              y: phase === 'settle' ? '-15vh' : 0,
            }}
            transition={{ duration: 0.8, ease: [0.14, 1, 0.34, 1] }}
          >
            {fullText.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.03,
                  ease: [0.14, 1, 0.34, 1],
                }}
                style={{ display: 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
