'use client';

import { Link, usePathname, useRouter } from '@/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useTranslations, useLocale } from 'next-intl';
import { FaGlobe } from 'react-icons/fa';

export default function Navbar() {
    const t = useTranslations('Navbar');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: '/', label: t('home') },
        { href: '/projects', label: t('projects') },
        { href: '/live', label: t('live') },
        { href: '/analytics', label: t('analytics') },
        { href: '/try', label: t('try') },
        { href: '/about', label: t('about') },
    ];

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const toggleLanguage = () => {
        const nextLocale = locale === 'en' ? 'id' : 'en';
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-border">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        </div>
                        <div className="flex flex-col -gap-1">
                            <span className="text-primary text-sm leading-none font-black tracking-tighter uppercase">System</span>
                            <span className="text-text-primary text-xs leading-none font-bold tracking-widest uppercase">Engineer</span>
                        </div>
                    </Link>

                    {/* Navigation Links (Desktop) */}
                    <div className="hidden md:flex items-center gap-1">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                                    pathname === link.href
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {/* Language Switcher */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-text-secondary hover:text-primary hover:bg-primary/5 border border-border transition-all uppercase tracking-widest"
                        >
                            <FaGlobe />
                            {locale === 'en' ? 'EN' : 'ID'}
                        </button>

                        {/* CTA Button (Desktop) */}
                        <Link
                            href="/try"
                            className="inline-flex px-6 py-2 bg-primary text-background rounded-lg text-sm font-bold hover:bg-primary-hover transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                        >
                            {t('cta')}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={toggleLanguage}
                            className="p-2 text-text-secondary hover:text-primary transition-colors uppercase font-bold text-xs"
                        >
                            {locale === 'en' ? 'EN' : 'ID'}
                        </button>
                        <button
                            className="text-text-primary p-2 focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 top-[73px] bg-background z-40 md:hidden flex flex-col p-6 h-[calc(100vh-73px)]"
                    >
                        <div className="flex flex-col gap-2">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'px-6 py-4 rounded-xl text-lg font-bold transition-all',
                                        pathname === link.href
                                            ? 'bg-primary/10 text-primary border border-primary/20'
                                            : 'text-text-secondary hover:text-text-primary hover:bg-surface border border-transparent'
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-auto pb-10">
                            <Link href="/try" className="w-full">
                                <button className="w-full py-4 bg-primary text-background rounded-xl font-black text-lg uppercase tracking-widest shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                    {t('cta')}
                                </button>
                            </Link>
                            <p className="text-center text-text-muted text-[10px] mt-6 tracking-widest uppercase opacity-50 font-mono">
                                root@system://navigation_v2.0.4
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
