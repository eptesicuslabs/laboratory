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
            <div className="flex flex-col items-center text-center">
                {/* Main Title — monospace */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 3.2 }}
                    className="font-mono text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-semibold text-[var(--text-primary)] tracking-tight mb-[var(--space-4)]"
                >
                    {t.hero.title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 3.5 }}
                    className="font-mono text-[var(--text-tertiary)] text-sm md:text-base tracking-wider uppercase mb-[var(--space-8)]"
                >
                    {t.hero.subtitle}
                </motion.p>

                {/* CTA — text link, not button */}
                <motion.a
                    href="#research"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 3.8 }}
                    className="font-mono text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors text-sm group"
                    onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    Explore our work{' '}
                    <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                </motion.a>
            </div>

            {/* Scroll Indicator */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 4.0 }}
                onClick={handleScrollDown}
                className="absolute bottom-[var(--space-8)] left-1/2 -translate-x-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer"
                aria-label="Scroll down"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
                >
                    <ChevronDown size={24} strokeWidth={1} />
                </motion.div>
            </motion.button>
        </section>
    );
}
