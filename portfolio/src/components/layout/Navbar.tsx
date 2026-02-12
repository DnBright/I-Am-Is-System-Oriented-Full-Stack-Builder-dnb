'use client';

import { Link, usePathname, useRouter } from '@/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useTranslations, useLocale } from 'next-intl';
import { FiHome, FiCpu, FiPlay, FiBarChart2, FiBox, FiUser, FiGlobe } from 'react-icons/fi';

export default function Navbar() {
    const t = useTranslations('Navbar');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: '/', label: t('home'), icon: <FiHome /> },
        { href: '/projects', label: t('projects'), icon: <FiCpu /> },
        { href: '/live', label: t('live'), icon: <FiPlay /> },
        { href: '/analytics', label: t('analytics'), icon: <FiBarChart2 /> },
        { href: '/try', label: t('try'), icon: <FiBox /> },
        { href: '/about', label: t('about'), icon: <FiUser /> },
    ];

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const toggleLanguage = () => {
        const nextLocale = locale === 'en' ? 'id' : 'en';
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <>
            <nav className="fixed left-0 top-0 h-screen w-16 xl:w-20 z-50 hidden lg:flex flex-col items-center py-10 bg-background/20 backdrop-blur-sm">
                {/* Brand Logo - Plain Text */}
                <Link href="/" className="mb-12 text-2xl font-bold text-primary tracking-tighter hover:opacity-80 transition-opacity">
                    DN.
                </Link>

                {/* Navigation Items */}
                <div className="flex-1 flex flex-col items-center gap-6">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                title={link.label}
                                className={cn(
                                    "p-2.5 rounded-full transition-all relative group",
                                    isActive ? "text-primary bg-primary/5" : "text-text-muted hover:text-white"
                                )}
                            >
                                <span className="text-xl relative z-10">{link.icon}</span>

                                {isActive && (
                                    <motion.div
                                        layoutId="nav-active-bg"
                                        className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom Controls */}
                <div className="flex flex-col items-center gap-6">
                    <button
                        onClick={toggleLanguage}
                        className="text-[10px] font-bold text-text-muted hover:text-primary transition-colors tracking-widest"
                    >
                        {locale === 'en' ? 'EN' : 'ID'}
                    </button>
                    <div className="w-4 h-[1px] bg-primary/20" />
                </div>
            </nav>

            {/* Mobile Header (Clean) */}
            <div className="fixed top-0 left-0 w-full p-6 z-50 lg:hidden flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-primary tracking-tighter">
                    DN.
                </Link>

                <button
                    className="text-white p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
                </button>
            </div>

            {/* Mobile Overlay (Minimalist) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-background/98 backdrop-blur-3xl z-40 lg:hidden flex flex-col p-10 pt-32"
                    >
                        <div className="flex flex-col gap-8">
                            {links.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "text-4xl font-bold uppercase tracking-tighter",
                                            pathname === link.href ? "text-primary" : "text-text-muted hover:text-white"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-auto pt-10 border-t border-border flex items-center justify-between">
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-2 text-primary font-bold text-sm"
                            >
                                <FiGlobe />
                                {locale === 'en' ? 'ENGLISH' : 'INDONESIA'}
                            </button>
                            <span className="text-[10px] font-mono text-text-muted">© 2026 DN.</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
