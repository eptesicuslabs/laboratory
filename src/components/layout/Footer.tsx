'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { Mail, Twitter, Instagram, Github } from 'lucide-react';
import { useContactModal } from '@/components/providers/ContactModalProvider';

export default function Footer() {
    const { t } = useLanguage();
    const { open } = useContactModal();

    return (
        <footer
            id="contact"
            className="relative py-[var(--space-9)] px-[var(--space-5)] border-t border-[var(--border-default)]"
            style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
            }}
        >
            <div className="container-wide">
                {/* Brand Name */}
                <div className="text-center mb-[var(--space-8)]">
                    <h2 className="text-display">
                        Eptesicus Laboratories
                    </h2>
                </div>

                {/* Links and Social */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-[var(--space-5)] mb-[var(--space-8)]">
                    <div className="flex items-center gap-[var(--space-5)] text-sm">
                        <a href="#about" className="link">
                            {t.nav?.about || 'About'}
                        </a>
                        <a href="#research" className="link">
                            {t.nav?.research || 'Research'}
                        </a>
                        <a href="#team" className="link">
                            {t.nav?.team || 'Team'}
                        </a>
                        <a
                            href="https://github.com/eptesicuslabs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link"
                        >
                            {t.footer?.github || 'GitHub'}
                        </a>
                    </div>

                    <span className="divider-vertical hidden sm:block" />

                    <div className="flex items-center gap-[var(--space-2)]">
                        <a
                            href="mailto:eptesicuslabs@gmail.com"
                            className="social-link"
                            aria-label="Email"
                        >
                            <Mail size={18} />
                        </a>
                        <a
                            href="https://github.com/eptesicuslabs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            aria-label="GitHub"
                        >
                            <Github size={18} />
                        </a>
                        <a
                            href="https://x.com/eptesicuslabs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            aria-label="X (Twitter)"
                        >
                            <Twitter size={18} />
                        </a>
                        <a
                            href="https://www.instagram.com/eptesicuslabs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            aria-label="Instagram"
                        >
                            <Instagram size={18} />
                        </a>
                    </div>
                </div>

                {/* Legal */}
                <div className="text-center stack-sm">
                    <p className="text-xs text-[var(--text-tertiary)]">
                        &copy; {new Date().getFullYear()} Eptesicus Laboratories. {t.footer?.rights || 'All rights reserved.'}
                    </p>
                    <p className="text-xs text-[var(--text-tertiary)]">
                        {t.footer?.legal || 'Not yet incorporated. Operated by Deyan Todorov and Iliyan Bozhanov.'}
                    </p>
                </div>
            </div>
        </footer>
    );
}
