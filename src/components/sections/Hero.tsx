'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function Hero() {
    const { t } = useLanguage();

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

                {/* Project Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 3.8 }}
                    className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-mono text-sm"
                >
                    {[
                        { name: 'todorov', url: 'https://github.com/eptesicuslabs/todorov' },
                        { name: 'eMCP', url: 'https://github.com/eptesicuslabs/eMCP' },
                        { name: 'eSkill', url: 'https://github.com/eptesicuslabs/eSkill' },
                        { name: 'eAgent', url: 'https://github.com/eptesicuslabs/eAgent' },
                        { name: 'eARA', url: 'https://github.com/eptesicuslabs/eARA' },
                    ].map((project, i) => (
                        <a
                            key={project.name}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors"
                        >
                            {project.name}
                            {i < 4 && <span className="ml-4 text-[var(--border-default)]">·</span>}
                        </a>
                    ))}
                </motion.div>
            </div>

        </section>
    );
}
