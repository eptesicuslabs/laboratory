'use client';

import { motion } from 'framer-motion';

export default function ResearchPosts() {
    return (
        <section id="research" className="section px-[var(--space-5)]">
            <div className="max-w-[720px] mx-auto font-mono">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-[var(--space-3)]">
                        RESEARCH
                    </h2>
                    <div className="text-[var(--border-default)] mb-[var(--space-7)] select-none" aria-hidden="true">
                        {'─'.repeat(48)}
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-[var(--text-tertiary)] text-sm"
                >
                    Coming soon.
                </motion.p>
            </div>
        </section>
    );
}
