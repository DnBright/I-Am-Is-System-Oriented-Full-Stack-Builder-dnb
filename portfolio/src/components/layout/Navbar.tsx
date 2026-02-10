'use client';

import { Link, usePathname, useRouter } from '@/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useTranslations, useLocale } from 'next-intl';
import { FaGlobe } from 'react-icons/fa';
import Button from '@/components/ui/Button';

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
        <nav className="fixed top-0 w-full z-50 glass border-b border-primary/10">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-sm border border-primary/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary">
                            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                            <div className="w-2 h-2 bg-primary group-hover:scale-150 transition-transform animate-pulse" />
                            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-primary/60" />
                            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-primary/60" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-primary text-xs leading-none font-mono font-bold tracking-[0.3em] uppercase group-hover:text-white transition-colors">Nexus_OS</span>
                            <span className="text-text-muted text-[10px] leading-tight font-mono uppercase tracking-widest opacity-60">System_Engineer</span>
                        </div>
                    </Link>

                    {/* Navigation Links (Desktop) */}
                    <div className="hidden lg:flex items-center gap-1">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'px-4 py-2 text-[11px] font-mono uppercase tracking-[0.2em] transition-all relative group',
                                    pathname === link.href
                                        ? 'text-primary'
                                        : 'text-text-muted hover:text-white'
                                )}
                            >
                                {link.label}
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute -bottom-1 left-4 right-4 h-[1px] bg-primary"
                                    />
                                )}
                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors rounded-sm -z-10" />
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                                <span className="text-[9px] font-mono text-primary uppercase tracking-tighter">System_Active</span>
                            </div>
                            <span className="text-[8px] font-mono text-text-muted uppercase opacity-40">Uptime: 99.9%</span>
                        </div>

                        {/* Language Switcher */}
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-[10px] font-mono font-bold text-text-muted hover:text-primary hover:bg-primary/5 border border-primary/10 transition-all uppercase tracking-[0.2em]"
                        >
                            <FaGlobe className="text-[10px]" />
                            {locale === 'en' ? 'EN' : 'ID'}
                        </button>

                        {/* CTA Button (Desktop) */}
                        <Link href="/try">
                            <Button size="sm" className="font-mono text-[10px] uppercase tracking-[0.2em] px-6 h-9">
                                {t('cta')}
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <div className="flex flex-col items-end">
                            <span className="text-[8px] font-mono text-primary uppercase">v4.2.0</span>
                        </div>
                        <button
                            className="text-text-primary p-2 focus:outline-none border border-primary/10 rounded-sm"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isOpen ? <HiX size={20} className="text-primary" /> : <HiMenuAlt3 size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 top-[65px] bg-background/95 backdrop-blur-xl z-40 md:hidden flex flex-col p-6 border-t border-primary/10"
                    >
                        <div className="relative mb-8 p-4 border border-primary/10 bg-primary/5 rounded-sm">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">User_Access // Authentication_Ready</span>
                                <div className="flex gap-1">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="w-1 h-3 bg-primary/20" />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                {links.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            'px-4 py-3 text-sm font-mono uppercase tracking-[0.2em] transition-all border-l-2',
                                            pathname === link.href
                                                ? 'text-primary border-primary bg-primary/5'
                                                : 'text-text-muted border-transparent hover:text-white'
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto space-y-6">
                            <button
                                onClick={toggleLanguage}
                                className="w-full py-3 border border-primary/20 text-primary font-mono text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3"
                            >
                                <FaGlobe />
                                {locale === 'en' ? 'English_US' : 'Bahasa_ID'}
                            </button>
                            <Link href="/try" className="block">
                                <Button className="w-full py-6 font-mono text-sm uppercase tracking-[0.3em]">
                                    {t('cta')}
                                </Button>
                            </Link>
                            <div className="flex justify-between items-center px-2">
                                <span className="text-[8px] font-mono text-text-muted uppercase tracking-[0.3em]">Terminal_Active</span>
                                <span className="text-[8px] font-mono text-primary uppercase tracking-[0.3em]">0x7F2_READY</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
