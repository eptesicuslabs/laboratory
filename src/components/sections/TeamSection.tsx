'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Github, Globe, Instagram, Mail } from 'lucide-react';

const team = [
    {
        name: 'Deyan Todorov',
        role: 'Founder & Researcher',
        links: [
            { icon: Github, url: 'https://github.com/dttdrv', label: 'GitHub' },
            { icon: Globe, url: 'https://dttdrv.xyz', label: 'Website' },
            { icon: Mail, url: 'mailto:eptesicuslabs@gmail.com', label: 'Email' },
        ],
    },
    {
        name: 'Iliyan Bozhanov',
        role: 'Co-Founder',
        links: [
            { icon: Instagram, url: 'https://instagram.com/iliyan.bozhanov', label: 'Instagram' },
            { icon: Mail, url: 'mailto:eptesicuslabs@gmail.com', label: 'Email' },
        ],
    },
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
                <div className="space-y-[var(--space-4)]">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1, ease: [0.14, 1, 0.34, 1] }}
                            className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2"
                        >
                            <div className="flex items-baseline gap-[var(--space-4)]">
                                <span className="text-[var(--text-primary)] text-base">
                                    {member.name}
                                </span>
                                <span className="text-[var(--text-tertiary)] text-xs">
                                    {t.about?.roles?.[index === 0 ? 'deyan' : 'iliyan'] || member.role}
                                </span>
                            </div>
                            <div className="flex items-center gap-[var(--space-3)]">
                                {member.links.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.url}
                                        target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                                        rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                                        aria-label={link.label}
                                        className="text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors p-1 rounded-sm border border-transparent hover:border-[var(--border-default)]"
                                    >
                                        <link.icon size={14} strokeWidth={1.5} />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
