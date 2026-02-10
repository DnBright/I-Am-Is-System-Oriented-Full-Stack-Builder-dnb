'use client';

import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { FaGraduationCap, FaBrain, FaDraftingCompass, FaTools, FaQuoteLeft } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
    const t = useTranslations('About');

    const values = [
        {
            title: t('values.system_first.title'),
            icon: <FaBrain />,
            desc: t('values.system_first.desc')
        },
        {
            title: t('values.decomposition.title'),
            icon: <FaDraftingCompass />,
            desc: t('values.decomposition.desc')
        },
        {
            title: t('values.measurability.title'),
            icon: <FaTools />,
            desc: t('values.measurability.desc')
        },
    ];

    return (
        <div className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                {/* Header section with quote */}
                <div className="max-w-4xl mx-auto mb-24 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 border border-primary/20 mb-8">
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-primary uppercase">Personal_Intel // Core_Directives</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative p-10 border border-primary/10 bg-primary/5 rounded-sm mb-16 overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/30" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/30" />

                        <FaQuoteLeft className="text-primary/20 mb-6 mx-auto group-hover:text-primary/40 transition-colors" size={40} />
                        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-text-primary leading-tight px-4 md:px-12 italic">
                            {t('quote')}
                        </h2>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase"
                    >
                        {t.rich('title', {
                            span: (children) => <span className="text-primary">{children}</span>
                        })}
                    </motion.h1>
                </div>

                {/* Narrative Section */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center space-y-8"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-[1px] bg-primary" />
                            <h3 className="text-xs font-mono font-bold text-primary uppercase tracking-[0.3em]">{t('mindset.title')}</h3>
                        </div>
                        <div className="space-y-6">
                            <p className="text-lg text-text-muted leading-relaxed font-mono uppercase tracking-wider opacity-80">
                                {t('mindset.desc1')}
                            </p>
                            <p className="text-lg text-text-muted leading-relaxed font-mono uppercase tracking-wider opacity-80">
                                {t.rich('mindset.desc2', {
                                    strong: (children) => <strong className="text-text-primary underline underline-offset-4 decoration-primary/30">{children}</strong>
                                })}
                            </p>
                        </div>
                        <div className="pt-6 flex flex-wrap gap-3">
                            {[t('badges.full_stack'), t('badges.architect'), t('badges.specialist')].map(tag => (
                                <div key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
                                    <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-[0.2em]">{tag}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="p-12 h-full border-primary/10 bg-surface/40 relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all" />
                            <div className="relative z-10 space-y-12">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                                        <FaGraduationCap size={32} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-mono text-text-muted uppercase tracking-[0.3em] mb-2">{t('academic.label')}</p>
                                        <p className="text-2xl font-black uppercase tracking-tighter">{t('academic.title')}</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <p className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-text-muted opacity-40 py-2 border-y border-white/5">{t('focus.label')} // SYSTEM_DOMAIN</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                        {(t.raw('focus.items') as string[]).map(f => (
                                            <li key={f} className="flex items-center gap-3 group/item">
                                                <div className="w-1.5 h-1.5 bg-primary/40 group-hover/item:bg-primary transition-colors" />
                                                <span className="text-xs font-mono text-text-muted uppercase tracking-widest group-hover/item:text-text-primary transition-colors">{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>

                {/* Values Section */}
                <div className="max-w-6xl mx-auto mb-32">
                    <div className="flex flex-col items-center text-center mb-20">
                        <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{t('values.title')}</h3>
                        <p className="text-text-muted font-mono text-xs uppercase tracking-widest opacity-60">{t('values.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((v, i) => (
                            <motion.div
                                key={v.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="p-10 h-full flex flex-col items-center text-center group border-primary/5 hover:border-primary/20 bg-surface/30">
                                    <div className="w-20 h-20 rounded-sm bg-white/5 flex items-center justify-center text-3xl text-text-muted group-hover:text-primary group-hover:bg-primary/10 transition-all border border-white/5 group-hover:border-primary/30 mb-8 relative">
                                        {v.icon}
                                        <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-primary/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <h4 className="text-xl font-bold uppercase tracking-tighter mb-6 group-hover:text-primary transition-colors">{v.title}</h4>
                                    <p className="text-text-muted text-xs font-mono uppercase tracking-widest leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">{v.desc}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
