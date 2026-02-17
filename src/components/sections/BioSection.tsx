'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FiMinimize2, FiMaximize2, FiTerminal, FiCpu, FiDatabase, FiServer } from 'react-icons/fi';

export default function BioSection() {
    const t = useTranslations('BioSection');

    const backgroundData = [
        { label: 'Origin', value: 'Jakarta, Indonesia', icon: <FiServer /> },
        { label: 'Education', value: 'Computer Science', icon: <FiCpu /> },
        { label: 'Focus', value: 'System Architecture', icon: <FiDatabase /> },
        { label: 'Status', value: 'Active / Building', icon: <FiTerminal /> },
    ];

    return (
        <section className="relative py-32 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
                    {/* Left: Section Header & Background Cards */}
                    <div className="md:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-px w-12 bg-primary/50" />
                                <span className="text-xs font-mono font-bold tracking-[0.3em] text-primary uppercase">Bio_Manifesto</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-text-primary leading-tight">
                                {t.rich('title', {
                                    span: (chunks) => <span className="text-primary">{chunks}</span>
                                })}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {backgroundData.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-6 p-6 rounded-2xl bg-surface-elevated/40 border border-border hover:border-primary/50 transition-all group"
                                >
                                    <div className="text-3xl text-primary/60 group-hover:text-primary transition-colors">
                                        {item.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-widest">{item.label}</p>
                                        <p className="text-sm font-bold text-text-primary uppercase tracking-tight">{item.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Bio Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:col-span-7 space-y-10"
                    >
                        <div className="relative">
                            <h3 className="text-4xl md:text-5xl font-bold leading-tight text-text-primary mb-10">
                                {t('heading_main')}
                            </h3>
                            <div className="prose dark:prose-invert max-w-none space-y-8">
                                <p className="text-xl text-text-secondary leading-relaxed font-light">
                                    {t('paragraph_1')}
                                </p>
                                <p className="text-xl text-text-secondary leading-relaxed font-light">
                                    {t('paragraph_2')}
                                </p>
                            </div>
                        </div>

                        {/* Quote Box */}
                        <div className="relative p-10 rounded-2xl bg-primary/5 border border-primary/20 overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <FiTerminal className="text-6xl text-primary" />
                            </div>
                            <div className="relative z-10">
                                <p className="text-2xl font-light italic text-text-primary leading-relaxed">
                                    "{t('quote')}"
                                </p>
                                <div className="mt-6 flex items-center gap-3">
                                    <div className="w-8 h-px bg-primary" />
                                    <span className="text-xs font-mono font-bold text-primary uppercase tracking-[0.2em]">System_Philosophy</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
