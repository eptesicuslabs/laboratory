'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { Cpu, Server, Zap, Bot, ExternalLink } from 'lucide-react';

const projectIcons = {
    todorov: Cpu,
    emcp: Server,
    eskill: Zap,
    eagent: Bot,
};

interface Project {
    id: string;
    name: string;
    tagline: string;
    description: string;
    url: string;
}

export default function ResearchSection() {
    const { t } = useLanguage();

    const projects: Project[] = t.research?.projects || [
        {
            id: 'todorov',
            name: 'todorov',
            tagline: 'Unified Neural Architecture',
            description: '312M params combining KDA, Mamba-3, and MLA. Outperforms same-size transformers by 16%.',
            url: 'https://github.com/eptesicuslabs/todorov',
        },
        {
            id: 'emcp',
            name: 'eMCP',
            tagline: 'Open-Source MCP Servers',
            description: '34 local MCP servers exposing 130+ tools for desktop AI workflows.',
            url: 'https://github.com/eptesicuslabs/eMCP',
        },
        {
            id: 'eskill',
            name: 'eSkill',
            tagline: 'Claude Code Skills',
            description: '44 skills and 6 agents that orchestrate MCP tools into higher-level workflows.',
            url: 'https://github.com/eptesicuslabs/eSkill',
        },
        {
            id: 'eagent',
            name: 'eAgent',
            tagline: 'AI Agent Platform',
            description: 'Rust/Tauri desktop app for multi-agent orchestration. Provider-agnostic.',
            url: 'https://github.com/eptesicuslabs/eAgent',
        },
    ];

    return (
        <section id="research" className="section px-[var(--space-5)] relative">
            <div className="container-wide stack-xl">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="text-center stack-sm"
                >
                    <h2 className="text-label">
                        {t.research?.label || 'RESEARCH'}
                    </h2>
                    <h3 className="text-h1">
                        {t.research?.headline || 'Open-source AI research and tooling.'}
                    </h3>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 gap-[var(--space-5)]">
                    {projects.map((project, index) => {
                        const IconComponent = projectIcons[project.id as keyof typeof projectIcons] || Cpu;
                        return (
                            <motion.a
                                key={project.id}
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                                className="card-glass card-interactive group"
                            >
                                <div className="flex items-start justify-between mb-[var(--space-4)]">
                                    <div className="icon-box">
                                        <IconComponent size={20} />
                                    </div>
                                    <ExternalLink
                                        size={16}
                                        className="text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors"
                                    />
                                </div>

                                <h4 className="text-h2 mb-[var(--space-1)] group-hover:text-[var(--accent)] transition-colors">
                                    {project.name}
                                </h4>
                                <p className="text-label-accent mb-[var(--space-3)]">
                                    {project.tagline}
                                </p>
                                <p className="text-body-sm">
                                    {project.description}
                                </p>
                            </motion.a>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
