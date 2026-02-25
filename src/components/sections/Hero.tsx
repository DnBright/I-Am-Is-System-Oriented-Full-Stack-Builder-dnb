'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Link } from '@/navigation';
import { FaGithub, FaCode, FaChartLine } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

export default function Hero() {
    const t = useTranslations('Hero');

    return (
        <section className="min-h-[90vh] flex items-center pt-24 pb-20 relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 tech-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] animate-grid-pulse" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="col-span-1 lg:col-span-5 relative order-2 lg:order-1"
                    >
                        <div className="relative w-full max-w-md mx-auto lg:mx-0 aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-surface-elevated group shadow-2xl">
                            {/* Glass Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                            {/* Scanline */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary/40 shadow-[0_0_15px_var(--primary)] animate-scanline z-30 opacity-40 dark:opacity-100" />

                            <img
                                src="/images/profile.png"
                                alt="System Architect"
                                className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                            />

                            {/* Tech Borders */}
                            <div className="absolute inset-4 border border-border rounded-xl z-20 pointer-events-none" />
                        </div>

                        {/* Status Label */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="absolute -bottom-6 -right-6 lg:-right-10 bg-surface-elevated/90 backdrop-blur-xl border border-border p-6 rounded-2xl shadow-2xl z-40 max-w-[200px]"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                                <span className="text-[10px] font-mono font-bold tracking-widest text-text-secondary uppercase">SystemStatus</span>
                            </div>
                            <p className="text-sm font-bold text-text-primary leading-tight">FULL_STACK_DEV // AI_ENTHUSIAST</p>
                        </motion.div>
                    </motion.div>

                    <div className="col-span-1 lg:col-span-7 order-1 lg:order-2">
                        <div className="max-w-3xl space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span className="text-xs font-mono font-bold tracking-[0.2em] text-primary uppercase">Available_for_New_Sprints</span>
                            </motion.div>

                            <div className="space-y-6">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-6xl md:text-8xl lg:text-9xl font-extrabold leading-[0.85] tracking-tighter text-text-primary"
                                >
                                    {t.rich('title', {
                                        span: (chunks) => <span className="text-primary">{chunks}</span>
                                    })}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-2xl font-sans font-light"
                                >
                                    {t('intro_short')}
                                </motion.p>
                            </div>

                            {/* Messaging Anchors */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4"
                            >
                                <div className="space-y-2 border-l border-primary/20 pl-6">
                                    <p className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.2em]">Strategy_Focus</p>
                                    <p className="text-sm font-sans text-text-muted leading-snug">{t('subtitle_1')}</p>
                                </div>
                                <div className="space-y-2 border-l border-border pl-6">
                                    <p className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-[0.2em]">Execution_Identity</p>
                                    <p className="text-sm font-sans text-text-muted leading-snug">{t('subtitle_2')}</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="flex flex-wrap gap-6 pt-4"
                            >
                                <Link href="/about">
                                    <Button size="lg" className="min-w-[180px]">
                                        {t('cta_bio')}
                                    </Button>
                                </Link>
                                <Link href="/projects">
                                    <Button variant="outline" size="lg" className="min-w-[180px]">
                                        {t('cta_projects')}
                                    </Button>
                                </Link>
                                <a href="/documents/cv-ats-dn.pdf" target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" size="lg" className="min-w-[180px] bg-primary/5 border-primary/20 hover:bg-primary/10 flex items-center justify-center gap-2">
                                        <FiDownload className="text-lg" />
                                        {t('cta_cv')}
                                    </Button>
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
