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
        <section className="relative py-24 bg-background overflow-hidden border-y border-white/5">
            <div className="container mx-auto px-6">
                {/* Section Header - Terminal Style */}
                <div className="flex items-center justify-between mb-12 border-b border-primary/20 pb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-primary">
                            System_Log // detailed_bio.log
                        </h2>
                    </div>
                    <div className="flex gap-2 text-primary/40">
                        <FiMinimize2 size={14} />
                        <FiMaximize2 size={14} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    {/* Left: Bio Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-7 space-y-8"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold leading-tight text-white">
                            {t('heading_main')}
                        </h3>
                        <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed space-y-6">
                            <p>{t('paragraph_1')}</p>
                            <p>{t('paragraph_2')}</p>
                            <p className="pl-4 border-l-2 border-primary/30 italic text-white/80">
                                "{t('quote')}"
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: Data Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-5"
                    >
                        <div className="bg-surface/30 border border-white/10 p-6 rounded-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
                            {/* Decorative Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

                            <h4 className="text-xs font-mono uppercase text-text-muted mb-6 relative z-10 border-b border-white/5 pb-2">
                                Operator_Manifesto
                            </h4>

                            <div className="space-y-6 relative z-10">
                                {backgroundData.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between group/item">
                                        <div className="flex items-center gap-3">
                                            <span className="text-primary/60 group-hover/item:text-primary transition-colors">
                                                {item.icon}
                                            </span>
                                            <span className="text-sm font-mono text-text-muted">{item.label}</span>
                                        </div>
                                        <span className="text-sm font-bold text-white tracking-wide">{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Animated Scanner Bar */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary/20 animate-scanline opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Additional Abstract Data Visual */}
                        <div className="mt-6 p-4 border border-dashed border-white/10 rounded-sm">
                            <div className="flex justify-between text-[10px] font-mono text-text-muted mb-2">
                                <span>SYS_LOAD</span>
                                <span>98%</span>
                            </div>
                            <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: "0%" }}
                                    whileInView={{ width: "98%" }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
