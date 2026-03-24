'use client';

import { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useContactModal } from '@/components/providers/ContactModalProvider';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { open } = useContactModal();
    const pathname = usePathname();
    const router = useRouter();
    const isHomePage = pathname === '/';
    useIsomorphicLayoutEffect(() => {
        setIsScrolled(window.scrollY > 50);
    }, []);

    // Unified scroll detection (works for wheel, touch, and keyboard)
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        // Keyboard navigation support
        const handleKeyDown = (e: KeyboardEvent) => {
            const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '];
            if (scrollKeys.includes(e.key)) {
                // Defer check to after the scroll happens
                requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 50);
                });
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('keydown', handleKeyDown, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Scroll lock without position jump
    useEffect(() => {
        if (isMobileMenuOpen) {
            // Prevent scrolling without changing position
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            // Restore scrolling
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, [isMobileMenuOpen]);

    const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);

        // If not on home page, navigate to home with hash
        if (!isHomePage) {
            router.push(`/#${targetId}`);
            return;
        }

        // Small delay to allow menu close
        setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 50);
    }, [isHomePage, router]);

    const navLinks = [
        { href: '#about', label: 'About' },
        { href: '#research', label: 'Research' },
        { href: '#team', label: 'Team' },
    ];

    // Consistent easing curve site-wide
    const easeOut = [0.25, 0.1, 0.25, 1] as const;

    // Animation variants for mobile menu
    const menuBackdropVariants = {
        hidden: {
            opacity: 0,
            transition: { duration: 0.25, ease: easeOut }
        },
        visible: {
            opacity: 1,
            transition: { duration: 0.35, ease: easeOut }
        }
    };

    const menuItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.08 + i * 0.06,
                duration: 0.4,
                ease: easeOut
            }
        }),
        exit: {
            opacity: 0,
            y: -10,
            transition: { duration: 0.2, ease: easeOut }
        }
    };

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 right-0 z-50"
                initial={false}
                animate={{
                    paddingTop: isScrolled ? 12 : 0,
                    paddingLeft: isScrolled ? 16 : 0,
                    paddingRight: isScrolled ? 16 : 0,
                }}
                transition={{ duration: 0.5, ease: easeOut }}
            >
                <motion.nav
                    className={`mx-auto ${isScrolled ? 'nav-scrolled nav-scrolled-solid' : 'nav-default-shape'}`}
                    initial={false}
                    animate={{ maxWidth: isScrolled ? 900 : 1400 }}
                    transition={{ duration: 0.4, ease: easeOut }}
                >
                    <motion.div
                        className="flex items-center justify-between px-5 sm:px-6"
                        initial={false}
                        animate={{ height: isScrolled ? 52 : 64 }}
                        transition={{ duration: 0.5, ease: easeOut }}
                    >
                        {/* Brand */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <motion.div
                                className="relative overflow-hidden"
                                initial={false}
                                animate={{
                                    width: isScrolled ? 22 : 26,
                                    height: isScrolled ? 22 : 26,
                                }}
                                transition={{ duration: 0.5, ease: easeOut }}
                            >
                                <Image
                                    src="/images/logo.png"
                                    alt="Eptesicus Labs"
                                    fill
                                    className="object-contain group-hover:opacity-70 transition-opacity duration-200"
                                />
                            </motion.div>
                            <motion.span
                                className="font-mono font-medium text-[var(--text-primary)] whitespace-nowrap overflow-hidden"
                                initial={false}
                                animate={{
                                    opacity: isScrolled ? 1 : 0,
                                    width: isScrolled ? 'auto' : 0,
                                    marginLeft: isScrolled ? 0 : -8,
                                }}
                                transition={{ duration: 0.4, ease: easeOut, delay: isScrolled ? 0.1 : 0 }}
                            >
                                Eptesicus Laboratories
                            </motion.span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-[var(--space-7)]">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleSmoothScroll(e, link.href.slice(1))}
                                    className="link text-sm hover:underline underline-offset-4"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <button
                                type="button"
                                onClick={() => open()}
                                className="link text-sm hover:underline underline-offset-4"
                            >
                                Contact <span aria-hidden="true">&rarr;</span>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 transition-colors duration-200 relative w-10 h-10 flex items-center justify-center"
                            style={{ color: 'var(--mobile-menu-btn)' }}
                            aria-label="Toggle menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <div className="relative w-5 h-4">
                                <motion.span
                                    className="absolute left-0 w-5 h-0.5 bg-current rounded-full"
                                    animate={{
                                        top: isMobileMenuOpen ? '50%' : '0%',
                                        rotate: isMobileMenuOpen ? 45 : 0,
                                        translateY: isMobileMenuOpen ? '-50%' : 0,
                                    }}
                                    transition={{ duration: 0.25, ease: easeOut }}
                                />
                                <motion.span
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-0.5 bg-current rounded-full"
                                    animate={{
                                        opacity: isMobileMenuOpen ? 0 : 1,
                                        scaleX: isMobileMenuOpen ? 0 : 1,
                                    }}
                                    transition={{ duration: 0.2, ease: easeOut }}
                                />
                                <motion.span
                                    className="absolute left-0 w-5 h-0.5 bg-current rounded-full"
                                    animate={{
                                        bottom: isMobileMenuOpen ? '50%' : '0%',
                                        rotate: isMobileMenuOpen ? -45 : 0,
                                        translateY: isMobileMenuOpen ? '50%' : 0,
                                    }}
                                    transition={{ duration: 0.25, ease: easeOut }}
                                />
                            </div>
                        </button>
                    </motion.div>
                </motion.nav>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence mode="wait">
                {isMobileMenuOpen && (
                    <motion.div
                        key="mobile-menu"
                        variants={menuBackdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center"
                        style={{
                            backgroundColor: 'var(--mobile-menu-bg)',
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        }}
                    >
                        <div className="flex flex-col items-center gap-[var(--space-7)]">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleSmoothScroll(e, link.href.slice(1))}
                                    className="text-h2 text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors"
                                    custom={i}
                                    variants={menuItemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    {link.label}
                                </motion.a>
                            ))}

                            <motion.div
                                className="divider w-12 my-[var(--space-2)]"
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: 1, scaleX: 1, transition: { delay: 0.25, duration: 0.3 } }}
                                exit={{ opacity: 0, scaleX: 0, transition: { duration: 0.15 } }}
                            />

                            <motion.button
                                type="button"
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    open();
                                }}
                                className="btn btn-primary"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.4, ease: easeOut } }}
                                exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
                            >
                                Contact
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
