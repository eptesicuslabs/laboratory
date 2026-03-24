'use client';

import { useLanguage } from '@/components/providers/LanguageProvider';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer id="contact" className="pt-[var(--space-10)] pb-[var(--space-7)] px-[var(--space-5)] overflow-hidden">
            {/* Giant EPTESICUS wordmark — the footer IS this */}
            <div className="select-none" aria-hidden="true">
                <p
                    className="font-mono font-bold uppercase text-center leading-none tracking-tighter"
                    style={{
                        fontSize: 'clamp(4rem, 15vw, 12rem)',
                        color: 'transparent',
                        WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.15)',
                    }}
                >
                    EPTESICUS
                </p>
            </div>

            {/* Company links + copyright — centered beneath the wordmark */}
            <div className="max-w-[720px] mx-auto font-mono text-center mt-[var(--space-7)]">
                <p className="text-xs text-[var(--text-secondary)] flex flex-wrap justify-center gap-x-1">
                    <a href="mailto:eptesicuslabs@gmail.com" className="hover:text-[var(--accent)] transition-colors">
                        {t.footer?.contact || 'Email'}
                    </a>
                    <span className="text-[var(--text-tertiary)]">&middot;</span>
                    <a
                        href="https://github.com/eptesicuslabs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--accent)] transition-colors"
                    >
                        GitHub
                    </a>
                    <span className="text-[var(--text-tertiary)]">&middot;</span>
                    <a
                        href="https://x.com/eptesicuslabs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--accent)] transition-colors"
                    >
                        X
                    </a>
                </p>

                <p className="mt-[var(--space-4)] text-xs text-[var(--text-tertiary)]">
                    &copy; 2026 Eptesicus Laboratories<span className="inline-block animate-pulse">_</span>
                </p>
            </div>
        </footer>
    );
}
