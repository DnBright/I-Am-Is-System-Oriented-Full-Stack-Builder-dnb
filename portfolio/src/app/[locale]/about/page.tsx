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
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-4">
                {/* Header section with quote */}
                <div className="max-w-4xl mx-auto mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block p-4 border border-primary/20 bg-primary/5 rounded-2xl mb-12"
                    >
                        <FaQuoteLeft className="text-primary mb-4 mx-auto" size={32} />
                        <h2 className="text-3xl md:text-4xl font-bold italic text-text-primary leading-tight px-8">
                            {t('quote')}
                        </h2>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold mb-6"
                    >
                        {t.rich('title', {
                            span: (children) => <span className="text-primary">{children}</span>
                        })}
                    </motion.h1>
                </div>

                {/* Narrative Section */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h3 className="text-3xl font-bold text-text-primary">{t('mindset.title')}</h3>
                        <p className="text-lg text-text-secondary leading-relaxed">
                            {t('mindset.desc1')}
                        </p>
                        <p className="text-lg text-text-secondary leading-relaxed">
                            {t.rich('mindset.desc2', {
                                strong: (children) => <strong>{children}</strong>
                            })}
                        </p>
                        <div className="pt-4 flex flex-wrap gap-4">
                            <Badge variant="info">{t('badges.full_stack')}</Badge>
                            <Badge variant="success">{t('badges.architect')}</Badge>
                            <Badge variant="warning">{t('badges.specialist')}</Badge>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="p-12 border-primary/20 bg-gradient-to-br from-surface to-background relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all" />
                            <div className="relative z-10 space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                                        <FaGraduationCap size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-muted uppercase tracking-widest">{t('academic.label')}</p>
                                        <p className="text-lg font-bold">{t('academic.title')}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-sm font-bold uppercase tracking-widest text-text-muted">{t('focus.label')}</p>
                                    <ul className="grid grid-cols-2 gap-4">
                                        {(t.raw('focus.items') as string[]).map(f => (
                                            <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                {f}
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
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold mb-4">{t('values.title')}</h3>
                        <p className="text-text-secondary">{t('values.subtitle')}</p>
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
                                <Card glass className="p-8 h-full flex flex-col items-center text-center group">
                                    <div className="w-16 h-16 rounded-2xl bg-surface-elevated flex items-center justify-center text-2xl text-text-muted group-hover:text-primary group-hover:bg-primary/10 transition-all border border-border group-hover:border-primary/30 mb-6">
                                        {v.icon}
                                    </div>
                                    <h4 className="text-xl font-bold mb-4">{v.title}</h4>
                                    <p className="text-text-secondary text-sm leading-relaxed">{v.desc}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
