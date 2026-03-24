'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';

const projects = [
    {
        id: '01',
        name: 'todorov',
        stat: 'Flagship',
        description: 'Our core neural architecture',
        url: 'https://github.com/eptesicuslabs/todorov',
    },
    {
        id: '02',
        name: 'eMCP',
        stat: '34 servers',
        description: 'Local MCP servers, matching the best',
        url: 'https://github.com/eptesicuslabs/eMCP',
    },
    {
        id: '03',
        name: 'eSkill',
        stat: '44 skills',
        description: 'Our suite of Skills for Claude Code',
        url: 'https://github.com/eptesicuslabs/eSkill',
    },
    {
        id: '04',
        name: 'eAgent',
        stat: 'Desktop',
        description: 'Agentic platform — Claude Code and CoWork interfaces',
        url: 'https://github.com/eptesicuslabs/eAgent',
    },
    {
        id: '05',
        name: 'eARA',
        stat: 'Internal',
        description: 'Automated research agent for model training and prototyping',
        url: 'https://github.com/eptesicuslabs/eARA',
    },
];

export default function ResearchSection() {
    const { t } = useLanguage();

    return (
        <section id="research" className="section px-[var(--space-5)]">
            <div className="max-w-[720px] mx-auto font-mono">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-[var(--space-3)]">
                        {t.research?.label || 'RESEARCH'}
                    </h2>
                    <div className="text-[var(--border-default)] mb-[var(--space-7)] select-none" aria-hidden="true">
                        {'─'.repeat(48)}
                    </div>
                </motion.div>

                {/* Project List */}
                <div className="space-y-[var(--space-7)]">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.08, ease: [0.14, 1, 0.34, 1] }}
                        >
                            {/* Project header: number + name ... stat */}
                            <div className="flex justify-between items-baseline mb-[var(--space-1)]">
                                <span className="text-[var(--text-primary)] text-base">
                                    <span className="text-[var(--text-tertiary)] mr-[var(--space-3)]">{project.id}</span>
                                    {project.name}
                                </span>
                                <span className="text-[var(--text-tertiary)] text-xs">
                                    {project.stat}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-[var(--text-tertiary)] text-sm ml-[calc(var(--space-3)+1.5ch)] mb-[var(--space-1)]">
                                {project.description}
                            </p>

                            {/* Link */}
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors text-xs ml-[calc(var(--space-3)+1.5ch)]"
                            >
                                → {project.url.replace('https://', '')}
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
