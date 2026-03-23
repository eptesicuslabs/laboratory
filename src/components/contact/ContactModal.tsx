'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, X, CheckCircle, Loader2 } from 'lucide-react';

const CONTACT_EMAIL = 'eptesicuslabs@gmail.com';

interface ContactModalProps {
    isOpen: boolean;
    initialSubject?: string;
    onClose: () => void;
}

type FormStatus = 'idle' | 'submitting' | 'success';

export default function ContactModal({ isOpen, initialSubject, onClose }: ContactModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<FormStatus>('idle');

    useEffect(() => {
        if (!isOpen) return;
        setName('');
        setEmail('');
        setSubject(initialSubject || '');
        setMessage('');
        setStatus('idle');
    }, [isOpen, initialSubject]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('submitting');

        const subjectLine = subject.trim() || 'Contact Request';
        const body = [
            `Name: ${name.trim() || '-'}`,
            `Email: ${email.trim() || '-'}`,
            '',
            message.trim(),
        ].join('\n');

        // Open email client with pre-filled content
        const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;

        setStatus('success');
        setTimeout(() => onClose(), 1500);
    };

    const inputClass = "mt-[var(--space-2)] w-full rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-primary)] px-[var(--space-4)] py-[var(--space-3)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all";

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-[var(--space-4)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-[var(--text-primary)]/10 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        className="relative w-full max-w-lg card-glass"
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                        onClick={(event) => event.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-[var(--space-4)] mb-[var(--space-5)]">
                            <div>
                                <span className="text-label-accent mb-[var(--space-2)] block">CONTACT</span>
                                <h3 className="text-h2">Get in Touch</h3>
                            </div>
                            <button
                                type="button"
                                onClick={onClose}
                                className="p-[var(--space-2)] -m-[var(--space-2)] rounded-full hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <p className="text-body-sm text-[var(--text-secondary)] mb-[var(--space-6)]">
                            Tell us about a collaboration or research inquiry.
                        </p>

                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center py-[var(--space-8)]"
                            >
                                <CheckCircle size={48} className="mx-auto mb-[var(--space-4)] text-[var(--success)]" />
                                <p className="text-h3 mb-[var(--space-2)]">Opening Email</p>
                                <p className="text-body-sm text-[var(--text-secondary)]">
                                    Your email client should open with the message ready to send.
                                </p>
                            </motion.div>
                        ) : (
                            <form className="space-y-[var(--space-4)]" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-4)]">
                                    <div>
                                        <label className="text-label block">Name</label>
                                        <input
                                            type="text"
                                            autoComplete="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className={inputClass}
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-label block">Email</label>
                                        <input
                                            type="email"
                                            autoComplete="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={inputClass}
                                            placeholder="you@company.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-label block">Subject</label>
                                    <input
                                        type="text"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className={inputClass}
                                        placeholder="Partnership inquiry"
                                    />
                                </div>

                                <div>
                                    <label className="text-label block">Message</label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className={`${inputClass} min-h-[120px] resize-none`}
                                        placeholder="Tell us about your project..."
                                        required
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[var(--space-4)] pt-[var(--space-3)]">
                                    <p className="text-xs text-[var(--text-tertiary)]">
                                        Or email us at {CONTACT_EMAIL}
                                    </p>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={status === 'submitting'}
                                    >
                                        {status === 'submitting' ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={16} />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
