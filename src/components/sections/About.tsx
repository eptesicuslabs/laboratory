'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function About() {
    const { t } = useLanguage();

    return (
        <section id="about" className="section px-[var(--space-5)] relative">
            <div className="container-wide stack-xl max-w-[720px] mx-auto">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="text-center"
                >
                    <h2 className="text-label font-mono">
                        {t.about.label}
                    </h2>
                    <div className="text-[var(--border-default)] mb-[var(--space-7)] select-none font-mono" aria-hidden="true">{'─'.repeat(48)}</div>
                </motion.div>

                {/* The Problem */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * 0, ease: [0.14, 1, 0.34, 1] }}
                    viewport={{ once: true }}
                    className="text-center stack-sm"
                >
                    <h4 className="text-label-accent">
                        {t.about.problemLabel}
                    </h4>
                    <p className="text-body max-w-[var(--container-content)] mx-auto">
                        {t.about.problemBody}
                    </p>
                </motion.div>

                {/* Our Solution */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * 1, ease: [0.14, 1, 0.34, 1] }}
                    viewport={{ once: true }}
                    className="text-center stack-sm"
                >
                    <h4 className="text-label-accent">
                        {t.about.solutionLabel}
                    </h4>
                    <p className="text-body max-w-[var(--container-content)] mx-auto">
                        {t.about.visionBody}
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
