'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FiBriefcase, FiZap, FiTarget, FiAward } from 'react-icons/fi';
import Badge from '@/components/ui/Badge';

export default function ExperienceTimeline() {
    const t = useTranslations('Experience');

    const jobs = [
        { key: 'dark_and_bright', icon: <FiBriefcase /> },
        { key: 'bakmi_proci', icon: <FiTarget /> },
        { key: 'infra_dirga', icon: <FiBriefcase /> },
        { key: 'prima_printshop', icon: <FiZap /> },
        { key: 'fairy_queen', icon: <FiTarget /> },
        { key: 'seven_inc', icon: <FiAward /> },
    ];

    const edu = [
        { key: 'amikom', icon: <FiAward /> },
        { key: 'smk2', icon: <FiBriefcase /> },
    ];

    return (
        <section className="relative py-20 min-h-screen">
            <div className="container mx-auto px-6 max-w-5xl">

                {/* Header */}
                <div className="mb-16">
                    <h2 className="text-4xl font-bold mb-4 flex items-center gap-4">
                        <span className="w-2 h-8 bg-primary block" />
                        {t('title')}
                    </h2>
                    <p className="text-text-muted text-xl font-light pl-6 border-l border-white/10">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Work History */}
                    <div>
                        <h3 className="text-xl font-mono uppercase text-primary mb-8 flex items-center gap-2">
                            <FiZap /> {t('work_title')}
                        </h3>
                        <div className="space-y-12 relative border-l-2 border-white/5 ml-3 pl-8">
                            {jobs.map((job, index) => (
                                <motion.div
                                    key={job.key}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative group"
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-background border-2 border-primary/50 group-hover:border-primary group-hover:scale-125 transition-all z-10">
                                        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-0 group-hover:opacity-100" />
                                    </div>

                                    <div className="bg-surface/30 border border-white/5 p-6 rounded-sm hover:border-primary/30 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                                {t(`jobs.${job.key}.role`)}
                                            </h4>
                                            <Badge variant="outline" className="text-[10px]">
                                                {t(`jobs.${job.key}.period`)}
                                            </Badge>
                                        </div>
                                        <p className="text-sm font-mono text-primary/80 mb-4 uppercase tracking-wider">
                                            {t(`jobs.${job.key}.company`)}
                                        </p>
                                        <p className="text-text-muted leading-relaxed text-sm">
                                            {t(`jobs.${job.key}.desc`)}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <h3 className="text-xl font-mono uppercase text-primary mb-8 flex items-center gap-2">
                            <FiAward /> {t('edu_title')}
                        </h3>
                        <div className="space-y-12 relative border-l-2 border-white/5 ml-3 pl-8">
                            {edu.map((item, index) => (
                                <motion.div
                                    key={item.key}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative group"
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-background border-2 border-success/50 group-hover:border-success group-hover:scale-125 transition-all z-10" />

                                    <div className="bg-surface/30 border border-white/5 p-6 rounded-sm hover:border-success/30 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-xl font-bold text-white group-hover:text-success transition-colors">
                                                {t(`edu.${item.key}.degree`)}
                                            </h4>
                                            <Badge variant="outline" className="text-[10px] text-success border-success/30">
                                                {t(`edu.${item.key}.period`)}
                                            </Badge>
                                        </div>
                                        <p className="text-sm font-mono text-success/80 uppercase tracking-wider">
                                            {t(`edu.${item.key}.school`)}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
