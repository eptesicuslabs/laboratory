'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';

const team = [
    { name: 'Deyan Todorov', role: 'Founder & Researcher' },
    { name: 'Iliyan Bozhanov', role: 'Co-Founder' },
];

export default function TeamSection() {
    const { t } = useLanguage();

    return (
        <section id="team" className="section px-[var(--space-5)]">
            <div className="max-w-[720px] mx-auto font-mono">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-[var(--space-3)]">
                        {t.team?.label || 'TEAM'}
                    </h2>
                    <div className="text-[var(--border-default)] mb-[var(--space-7)] select-none" aria-hidden="true">
                        {'─'.repeat(48)}
                    </div>
                </motion.div>

                {/* Team List */}
                <div className="space-y-[var(--space-3)]">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1, ease: [0.14, 1, 0.34, 1] }}
                            className="flex justify-between items-baseline"
                        >
                            <span className="text-[var(--text-primary)] text-base">
                                {member.name}
                            </span>
                            <span className="text-[var(--text-tertiary)] text-xs">
                                {t.about?.roles?.[index === 0 ? 'deyan' : 'iliyan'] || member.role}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
