'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer id="contact" className="py-[var(--space-9)] px-[var(--space-5)]">
            <div className="max-w-[720px] mx-auto font-mono">
                {/* ASCII rule */}
                <div className="text-[var(--border-default)] select-none" aria-hidden="true">
                    {'─'.repeat(48)}
                </div>

                {/* Brand */}
                <p className="mt-[var(--space-6)] text-[var(--text-primary)] text-sm tracking-wide">
                    Eptesicus Laboratories
                </p>

                {/* Links */}
                <p className="mt-[var(--space-4)] text-xs text-[var(--text-secondary)]">
                    <a href="mailto:eptesicuslabs@gmail.com" className="hover:text-[var(--text-primary)] transition-colors">
                        {t.footer?.contact || 'Email'}
                    </a>
                    <span className="mx-2 text-[var(--text-tertiary)]">&middot;</span>
                    <a
                        href="https://github.com/eptesicuslabs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--text-primary)] transition-colors"
                    >
                        GitHub
                    </a>
                    <span className="mx-2 text-[var(--text-tertiary)]">&middot;</span>
                    <a
                        href="https://x.com/eptesicuslabs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--text-primary)] transition-colors"
                    >
                        X
                    </a>
                </p>

                {/* Copyright */}
                <p className="mt-[var(--space-6)] text-xs text-[var(--text-tertiary)]">
                    &copy; 2026 Eptesicus Laboratories<span className="inline-block animate-pulse">_</span>
                </p>
            </div>
        </footer>
    );
}
