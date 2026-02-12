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
        { href: '/', label: 'Beranda', icon: <FiHome /> },
        { href: '/projects', label: 'Studi Kasus', icon: <FiCpu /> },
        { href: '/live', label: 'Aktivitas', icon: <FiPlay /> },
        { href: '/analytics', label: 'Analitik', icon: <FiBarChart2 /> },
        { href: '/try', label: 'Uji Coba', icon: <FiBox /> },
        { href: '/about', label: 'Tentang', icon: <FiUser /> },
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
            {/* Desktop Vertical Pill Navbar */}
            <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4 p-4 bg-background/40 backdrop-blur-md border border-white/5 rounded-3xl shadow-2xl min-w-[240px]">
                {/* Brand */}
                <div className="px-4 py-2 mb-2">
                    <Link href="/" className="text-xl font-bold text-primary tracking-tighter flex items-center gap-2">
                        <span>DN.</span>
                        <span className="text-[10px] text-text-muted font-mono opacity-50 font-normal tracking-widest uppercase">System_OS</span>
                    </Link>
                </div>

                {/* Navigation Items */}
                <div className="flex flex-col gap-2">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-4 group relative overflow-hidden",
                                    isActive
                                        ? "text-primary bg-primary/10 shadow-[0_0_20px_-5px_rgba(var(--primary-rgb),0.3)]"
                                        : "text-text-muted hover:text-white hover:bg-white/5"
                                )}
                            >
                                <span className={cn(
                                    "text-lg transition-transform duration-300",
                                    isActive ? "scale-110" : "group-hover:scale-110"
                                )}>
                                    {link.icon}
                                </span>

                                <span className={cn(
                                    "font-medium tracking-wide text-sm uppercase",
                                    isActive ? "font-bold" : ""
                                )}>
                                    {link.label}
                                </span>

                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full shadow-[0_0_10px_2px_rgba(var(--primary-rgb),0.5)]" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom Controls */}
                <div className="mt-4 px-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <button
                        onClick={toggleLanguage}
                        className="text-xs font-bold text-text-muted hover:text-primary transition-colors tracking-widest flex items-center gap-2"
                    >
                        <FiGlobe className="text-sm" />
                        {locale === 'en' ? 'EN' : 'ID'}
                    </button>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>
            </nav>

            {/* Mobile Header (Clean) */}
            <div className="fixed top-0 left-0 w-full p-6 z-50 lg:hidden flex items-center justify-between bg-gradient-to-b from-background to-transparent">
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

            {/* Mobile Overlay */}
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
                                            "text-4xl font-bold uppercase tracking-tighter flex items-center gap-4",
                                            pathname === link.href ? "text-primary" : "text-text-muted hover:text-white"
                                        )}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.icon}
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
