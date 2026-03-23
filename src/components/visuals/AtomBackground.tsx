'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const AtomVisualization = dynamic(
    () => import('./AtomVisualization'),
    { ssr: false }
);

export default function AtomBackground() {
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        setMounted(true);
    }, []);

    return (
        <div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
                opacity: mounted ? 1 : 0,
                transition: 'opacity 1.5s ease-out',
            }}
        >
            {mounted && <AtomVisualization isMobile={isMobile} />}
        </div>
    );
}
