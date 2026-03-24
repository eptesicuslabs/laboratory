'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function TeamSection() {
    const { t } = useLanguage();

    return (
        <section id="team" className="section px-[var(--space-5)] relative">
            <div className="container-wide">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="stack-lg"
                >
                    <div className="text-center stack-sm">
                        <h2 className="text-label">
                            {t.team?.label || 'Our Team'}
                        </h2>
                        <h3 className="text-h1">
                            {t.team?.headline || 'Leadership'}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-4)] max-w-md mx-auto">
                        {/* Deyan Todorov */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0 * 0.15, ease: [0.14, 1, 0.34, 1] }}
                            viewport={{ once: true }}
                            className="card-glass flex items-center justify-center"
                        >
                            <div className="flex items-center gap-[var(--space-3)]">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--border-default)] flex-shrink-0">
                                    <Image
                                        src="/images/team/deyan-todorov.jpg"
                                        alt="Deyan Todorov"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="text-left">
                                    <h5 className="text-[var(--text-primary)] font-medium text-sm">
                                        Deyan Todorov
                                    </h5>
                                    <p className="text-xs text-[var(--text-secondary)]">
                                        {t.about?.roles?.deyan || 'Founder & Researcher'}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Iliyan Bozhanov */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 1 * 0.15, ease: [0.14, 1, 0.34, 1] }}
                            viewport={{ once: true }}
                            className="card-glass flex items-center justify-center"
                        >
                            <div className="flex items-center gap-[var(--space-3)]">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[var(--border-default)] flex-shrink-0">
                                    <Image
                                        src="/images/team/iliyan-bozhanov.jpg"
                                        alt="Iliyan Bozhanov"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="text-left">
                                    <h5 className="text-[var(--text-primary)] font-medium text-sm">
                                        Iliyan Bozhanov
                                    </h5>
                                    <p className="text-xs text-[var(--text-secondary)]">
                                        {t.about?.roles?.iliyan || 'Co-Founder'}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
