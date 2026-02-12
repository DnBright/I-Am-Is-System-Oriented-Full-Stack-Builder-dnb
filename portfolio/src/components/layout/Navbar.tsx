'use client';

import { Link, usePathname, useRouter } from '@/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useTranslations, useLocale } from 'next-intl';
import { FiHome, FiCpu, FiPlay, FiBarChart2, FiBox, FiUser, FiGlobe, FiBriefcase, FiAward } from 'react-icons/fi';

export default function Navbar() {
    const t = useTranslations('Navbar');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: '/', label: 'Beranda', icon: <FiHome /> },
        { href: '/experience', label: 'Pengalaman', icon: <FiBriefcase /> },
        { href: '/certificates', label: 'Sertifikat', icon: <FiAward /> },
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
            {/* Desktop Vertical Navbar - Clean & Large */}
            <nav className="fixed left-0 top-0 h-screen z-50 hidden lg:flex flex-col justify-center gap-12 w-[320px] bg-background/20 backdrop-blur-sm border-r border-white/5">
                {/* Brand */}
                <div className="px-10 mb-4">
                    <Link href="/" className="text-3xl font-bold text-primary tracking-tighter flex flex-col">
                        <span>DN.</span>
                        <span className="text-[10px] text-text-muted font-mono opacity-50 font-normal tracking-[0.3em] uppercase mt-1">System_OS</span>
                    </Link>
                </div>

                {/* Navigation Items */}
                <div className="flex flex-col w-full px-6 gap-3">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "relative px-6 py-4 flex items-center gap-5 group transition-all duration-300 z-10 w-full",
                                    isActive ? "text-black" : "text-text-muted hover:text-white"
                                )}
                            >
                                {/* Active Background Capsule - Asymmetric Tech Shape */}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-nav-pill"
                                        className="absolute inset-0 bg-primary shadow-[0_0_20px_-5px_rgba(var(--primary-rgb),0.6)] z-[-1]"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        style={{
                                            borderRadius: "16px 4px 16px 4px" // Tech/Cyber Shape
                                        }}
                                    />
                                )}

                                <span className={cn(
                                    "text-2xl transition-transform duration-300 relative z-10",
                                    isActive ? "scale-110 translate-x-1" : "group-hover:scale-110"
                                )}>
                                    {link.icon}
                                </span>

                                <span className={cn(
                                    "text-lg tracking-wide uppercase font-mono font-bold relative z-10",
                                )}>
                                    {link.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>

                {/* Bottom Controls */}
                <div className="px-10 mt-8">
                    <button
                        onClick={toggleLanguage}
                        className="text-xs font-bold text-text-muted hover:text-primary transition-colors tracking-widest flex items-center gap-3 uppercase font-mono"
                    >
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        {locale === 'en' ? 'EN_US' : 'ID_ID'}
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
