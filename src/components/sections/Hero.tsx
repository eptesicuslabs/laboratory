'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function Hero() {
    const { t } = useLanguage();

    const handleScrollDown = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center px-[var(--space-5)]">
            <div className="relative z-10 flex flex-col items-center text-center mt-[var(--space-8)]">
                {/* Main Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="text-display mb-[var(--space-4)] md:mb-[var(--space-5)] px-[var(--space-2)]"
                >
                    {t.hero.title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
                    className="text-body max-w-[var(--container-content)] mb-[var(--space-7)] md:mb-[var(--space-9)] px-[var(--space-4)]"
                >
                    {t.hero.subtitle}
                </motion.p>

                {/* CTA Button */}
                <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                    href="https://github.com/eptesicuslabs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg"
                >
                    {t.hero?.cta?.primary || 'View on GitHub'}
                </motion.a>
            </div>

            {/* Scroll Indicator */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                onClick={handleScrollDown}
                className="absolute bottom-[var(--space-8)] left-1/2 -translate-x-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer"
                aria-label="Scroll down"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: [0.45, 0, 0.55, 1]
                    }}
                >
                    <ChevronDown size={28} strokeWidth={1} />
                </motion.div>
            </motion.button>
        </section>
    );
}
