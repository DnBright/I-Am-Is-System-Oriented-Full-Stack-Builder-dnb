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
        <section className="relative py-24 bg-surface border-y-[20px] border-error overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Section Header - Terminal Style */}
                <div className="flex items-center justify-between mb-12 border-b-[10px] border-text-primary pb-4 bg-white animate-jitter">
                    <div className="flex items-center gap-4 p-4">
                        <div className="w-10 h-10 rounded-none bg-error animate-blink" />
                        <h2 className="text-4xl font-mono uppercase tracking-[0.2em] text-background bg-text-primary p-2">
                            !!! MY_STORY_HACKED !!!
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    {/* Left: Bio Text */}
                    <motion.div
                        className="md:col-span-12 space-y-8 bg-primary/30 p-10 rotate-1 border-[10px] border-dashed border-error"
                    >
                        <h3 className="text-6xl md:text-8xl font-black leading-tight text-white uppercase italic bg-error inline-block p-4">
                            {t('heading_main')}
                        </h3>
                        <div className="prose prose-invert max-w-none text-background text-3xl font-black leading-relaxed space-y-10">
                            <p className="bg-white p-6 border-r-[30px] border-text-primary">{t('paragraph_1')}</p>
                            <p className="bg-text-primary text-white p-6 border-l-[30px] border-error italic">{t('paragraph_2')}</p>
                            <p className="pl-4 border-l-[30px] border-primary/30 italic text-error bg-background p-10 animate-blink">
                                "{t('quote')}"
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: Data Card (Chaos Style) */}
                    <motion.div
                        className="md:col-span-12 bg-white p-20 border-[40px] border-error -rotate-2"
                    >
                        <div className="bg-background p-10 border-[10px] border-primary relative overflow-visible flex flex-col items-center">
                            <h4 className="text-6xl font-black uppercase text-error mb-10 border-b-[10px] border-white pb-2 animate-jitter">
                                MANIFESTO_CHAOS
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 w-full relative z-10">
                                {backgroundData.map((item, index) => (
                                    <div key={index} className="flex flex-col items-center p-10 bg-surface-elevated border-[10px] border-text-primary hover:animate-spin-chaos">
                                        <span className="text-8xl text-primary animate-blink mb-4">
                                            {item.icon}
                                        </span>
                                        <span className="text-2xl font-mono text-white bg-error p-2 mb-4">{item.label}</span>
                                        <span className="text-4xl font-black text-background bg-white p-4 tracking-tighter uppercase">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
