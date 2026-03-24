'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/components/providers/LanguageProvider';

const ASCII_BAT = `
    /\\    /\\
   {  \`--\`  }
    \\      /
     \`>  <\`
     /    \\
    {      }
     \\    /
      \`--\`
`;

export default function Hero() {
    const { t } = useLanguage();

    const quickLinks = [
        { label: 'Works', href: '#works' },
        { label: 'Research', href: '#research' },
        { label: 'Team', href: '#team' },
        { label: 'Contact', href: '#contact' },
    ];

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const id = href.slice(1);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center px-[var(--space-5)]">
            {/* ASCII Bat */}
            <motion.pre
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3.0 }}
                className="font-mono text-[var(--text-tertiary)] text-[0.5rem] md:text-xs leading-none mb-[var(--space-6)] select-none opacity-30"
                aria-hidden="true"
            >
                {ASCII_BAT}
            </motion.pre>

            <div className="flex flex-col items-center text-center">
                {/* Main Title */}
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

                {/* Quick Nav Links */}
                <motion.nav
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 3.8 }}
                    className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-sm"
                >
                    {quickLinks.map((link, i) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                            className="text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors"
                        >
                            {link.label}
                            {i < quickLinks.length - 1 && (
                                <span className="ml-6 text-[var(--border-default)]">·</span>
                            )}
                        </a>
                    ))}
                </motion.nav>
            </div>
        </section>
    );
}
