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
    const [isScrolled, setIsScrolled] = useState(false);

    const links = [
        { href: '/', label: t('home') },
        { href: '/projects', label: t('projects') },
        { href: '/live', label: t('live') },
        { href: '/analytics', label: t('analytics') },
        { href: '/try', label: t('try') },
        { href: '/about', label: t('about') },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

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

    const CornerGuard = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
        const styles = {
            tl: "top-0 left-0 border-t border-l",
            tr: "top-0 right-0 border-t border-r",
            bl: "bottom-0 left-0 border-b border-l",
            br: "bottom-0 right-0 border-b border-r"
        };
        return (
            <div className={cn(
                "absolute w-1.5 h-1.5 border-primary/40 pointer-events-none z-20",
                styles[position]
            )} />
        );
    };

    return (
        <>
            {/* Desktop Vertical Command Sidebar */}
            <nav className="fixed left-0 top-0 h-screen w-20 xl:w-24 z-50 hidden lg:flex flex-col items-center py-8 pointer-events-none">
                <div className="flex flex-col h-full w-full items-center justify-between gap-8 pointer-events-auto">

                    {/* Header Segment: Brand ID */}
                    <motion.div
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative group"
                    >
                        <Link href="/" className="flex flex-col items-center gap-4 bg-surface/20 backdrop-blur-xl border border-primary/10 py-5 w-14 xl:w-16 rounded-sm relative overflow-hidden group">
                            <CornerGuard position="tl" />
                            <CornerGuard position="br" />

                            <div className="relative w-6 h-6 flex items-center justify-center">
                                <div className="absolute inset-0 bg-primary/20 animate-pulse rounded-sm" />
                                <div className="w-1 h-1 bg-primary group-hover:scale-150 transition-transform" />
                            </div>

                            <div className="writing-vertical-lr rotate-180 flex items-center gap-2">
                                <span className="text-primary text-[8px] font-mono font-bold tracking-[0.4em] uppercase">NEXUS_CORE</span>
                                <span className="text-text-muted text-[6px] font-mono uppercase tracking-widest opacity-40 italic">0xFC_SYS</span>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Middle Segment: Operations Rail */}
                    <div className="flex-1 flex flex-col justify-center items-center w-full">
                        <div className="bg-surface/10 backdrop-blur-sm border-x border-primary/5 py-8 flex flex-col items-center gap-1 relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-primary/20" />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-primary/20" />

                            {links.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            'w-14 xl:w-16 aspect-square flex items-center justify-center relative group transition-all',
                                            isActive ? 'text-white' : 'text-text-muted hover:text-primary'
                                        )}
                                    >
                                        <div className="relative z-10 writing-vertical-lr h-full flex items-center justify-center">
                                            <span className="text-[9px] font-mono uppercase tracking-[0.3em] group-hover:tracking-[0.5em] transition-all duration-300 whitespace-nowrap">
                                                {link.label}
                                            </span>
                                        </div>

                                        {isActive && (
                                            <motion.div
                                                layoutId="sidebar-active"
                                                className="absolute inset-0 bg-primary/10 border-r-2 border-primary z-0"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}

                                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors z-0" />

                                        {/* Hover Tooltip/Detail Popout */}
                                        <div className="absolute left-full ml-4 px-3 py-1 bg-primary text-black font-mono text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap">
                                            Execute_{link.label}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bottom Segment: Telemetry & Controls */}
                    <div className="flex flex-col items-center gap-6">
                        {/* Status Vertical Bar */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-[2px] h-12 bg-primary/10 relative overflow-hidden">
                                <motion.div
                                    animate={{ y: ["-100%", "100%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-primary/60 shadow-[0_0_8px_rgba(var(--primary-rgb),0.8)]"
                                />
                            </div>
                            <span className="text-[7px] font-mono text-primary uppercase vertical-lr tracking-widest opacity-60">Uptime_Stable</span>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <button
                                onClick={toggleLanguage}
                                className="w-10 xl:w-12 h-10 xl:h-12 border border-primary/20 rounded-full flex items-center justify-center text-[10px] font-mono font-bold text-text-muted hover:text-primary hover:border-primary transition-all group relative overflow-hidden"
                            >
                                <span className="relative z-10">{locale === 'en' ? 'EN' : 'ID'}</span>
                                <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform" />
                            </button>

                            <Link href="/try">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="w-10 xl:w-12 h-10 xl:h-12 bg-primary flex items-center justify-center text-black relative group cursor-pointer shadow-lg shadow-primary/20"
                                >
                                    <HiMenuAlt3 className="w-5 h-5" />
                                    <div className="absolute right-full mr-4 px-3 py-1 bg-surface-elevated border border-primary/20 text-primary font-mono text-[8px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-[10px] group-hover:translate-x-0 transition-all whitespace-nowrap">
                                        System_Trial
                                    </div>
                                </motion.div>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Header (Floating Mini Console) */}
            <div className="fixed top-0 left-0 w-full p-6 z-50 lg:hidden flex items-center justify-between pointer-events-none">
                <Link href="/" className="pointer-events-auto bg-surface/40 backdrop-blur-md border border-primary/10 p-3 rounded-sm flex items-center gap-3 relative overflow-hidden group">
                    <CornerGuard position="tl" />
                    <CornerGuard position="br" />
                    <div className="w-1.5 h-1.5 bg-primary animate-pulse" />
                    <span className="text-primary text-[10px] font-mono font-bold tracking-[0.2em]">NEXUS.V6</span>
                </Link>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="pointer-events-auto text-primary p-3 border border-primary/30 bg-surface/40 backdrop-blur-md rounded-sm relative"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <CornerGuard position="tl" />
                    <CornerGuard position="br" />
                    {isOpen ? <HiX size={18} /> : <HiMenuAlt3 size={18} />}
                </motion.button>
            </div>

            {/* Mobile Overlay (Fullscreen Terminal Mask) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-40 lg:hidden flex flex-col pointer-events-auto overflow-y-auto"
                    >
                        <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />

                        <div className="flex-1 flex flex-col justify-center px-10 relative z-50 pt-32 pb-20">
                            <div className="flex items-center gap-4 mb-12 opacity-40">
                                <div className="h-[1px] flex-1 bg-primary/30" />
                                <span className="text-[10px] font-mono tracking-[0.5em] text-primary lowercase">root_access_authenticated</span>
                                <div className="h-[1px] flex-1 bg-primary/30" />
                            </div>

                            <div className="space-y-4">
                                {links.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ x: -30, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.08 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                'group flex items-center justify-between py-2 relative',
                                                pathname === link.href ? 'text-primary' : 'text-text-muted hover:text-white'
                                            )}
                                        >
                                            <div className="flex items-baseline gap-4">
                                                <span className="text-[10px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                                                <span className="text-4xl md:text-6xl font-sans font-bold uppercase tracking-tighter group-hover:tracking-normal transition-all duration-500">
                                                    {link.label}
                                                </span>
                                            </div>
                                            {pathname === link.href && (
                                                <motion.div
                                                    layoutId="mobile-link-scanner"
                                                    className="h-1 flex-1 mx-8 bg-primary/20 relative overflow-hidden hidden sm:block"
                                                >
                                                    <motion.div
                                                        animate={{ x: ["-100%", "100%"] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                        className="absolute inset-0 bg-primary/60"
                                                    />
                                                </motion.div>
                                            )}
                                            <span className="text-[10px] font-mono opacity-0 group-hover:opacity-40 transition-opacity">/EXECUTE</span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="p-10 bg-surface/10 border-t border-primary/5">
                            <div className="max-w-md mx-auto flex flex-col gap-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={toggleLanguage}
                                        className="h-12 border border-primary/20 text-primary font-mono text-[9px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 bg-primary/5"
                                    >
                                        <FaGlobe />
                                        {locale === 'en' ? 'LOC_US_EN' : 'LOC_ID_ID'}
                                    </button>
                                    <Link href="/try" className="h-12 bg-primary text-black flex items-center justify-center font-mono text-[9px] uppercase tracking-[0.3em] font-bold">
                                        INIT_TRIAL
                                    </Link>
                                </div>
                                <div className="flex items-center justify-between opacity-20">
                                    <div className="flex flex-col">
                                        <span className="text-[7px] font-mono text-white uppercase tracking-[0.4em]">SYSTEM_STABLE</span>
                                        <span className="text-[7px] font-mono text-white tracking-[0.2em]">02.12.26_15:30</span>
                                    </div>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4].map(i => <div key={i} className="w-0.5 h-4 bg-primary" />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
