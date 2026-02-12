'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Link } from '@/navigation';
import { FaGithub, FaCode, FaChartLine } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function Hero() {
    const t = useTranslations('Hero');

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Structural UI Accents */}
            <div className="absolute top-40 left-10 hidden xl:block opacity-20 transform -rotate-90 origin-left">
                <span className="text-[10px] font-mono tracking-[0.5em] text-primary uppercase">System_Initialized // v4.2.0</span>
            </div>
            <div className="absolute bottom-40 right-10 hidden xl:block opacity-20 transform rotate-90 origin-right">
                <span className="text-[10px] font-mono tracking-[0.5em] text-primary uppercase">Observability_Active // 0xFC7</span>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col items-center text-center">
                        {/* Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <div className="flex items-center gap-3 px-4 py-2 bg-surface border border-primary/20 rounded-md relative group overflow-hidden">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                                </span>
                                <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase">
                                    {t('badge')}
                                </span>
                                <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            </div>
                        </motion.div>

                        {/* Main Heading with Scan Effect */}
                        <div className="relative mb-6">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-6xl md:text-8xl font-bold leading-tight"
                            >
                                <span className="relative inline-block">
                                    <span className="text-primary">{t('title_primary')}</span>
                                    <motion.div
                                        animate={{ top: ["0%", "100%", "0%"] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        className="absolute left-0 w-full h-[2px] bg-primary/30 z-20 blur-[1px]"
                                    />
                                </span>
                                <br />
                                <span className="text-white relative inline-block">
                                    {t('title_secondary')}
                                    <span className="absolute -right-4 -top-4 text-[12px] font-mono text-primary/40 font-normal">ROOT_ENGINE</span>
                                </span>
                            </motion.h1>
                        </div>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl font-sans leading-relaxed"
                        >
                            {t('subtitle_1')} {t('subtitle_2')}
                        </motion.p>

                        {/* Stats Dashboard */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-border/20 border border-border p-1 rounded-lg mb-12 w-full max-w-3xl overflow-hidden"
                        >
                            {[
                                { label: t('stats.commits'), value: '381+', icon: <FaGithub />, color: 'text-primary' },
                                { label: t('stats.repositories'), value: '6', icon: <FaCode />, color: 'text-info' },
                                { label: t('stats.experience'), value: '8+', icon: <FaChartLine />, color: 'text-warning' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-surface p-6 flex flex-col items-center justify-center relative hover:bg-surface-elevated transition-colors">
                                    <div className={`${stat.color} text-xl mb-3 opacity-80`}>{stat.icon}</div>
                                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-[10px] font-mono uppercase tracking-widest text-text-muted">{stat.label}</div>
                                    {i < 2 && <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-border hidden md:block" />}
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center"
                        >
                            <Link href="/projects">
                                <Button size="lg" className="min-w-[200px] relative group overflow-hidden">
                                    <span className="relative z-10 flex items-center gap-2">
                                        {t('buttons.projects')}
                                        <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                                    </span>
                                </Button>
                            </Link>
                            <Link href="/live">
                                <Button variant="outline" size="lg" className="min-w-[200px]">
                                    {t('buttons.live')}
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Matrix-like decorative elements */}
            <div className="absolute bottom-10 left-10 hidden lg:block opacity-5">
                <div className="font-mono text-[8px] leading-tight space-y-1">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i}>0xFA{i}B7_S_INIT_SEQ_SUCCESS</div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-[0.3em]">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
            </motion.div>
        </section>
    );
}
