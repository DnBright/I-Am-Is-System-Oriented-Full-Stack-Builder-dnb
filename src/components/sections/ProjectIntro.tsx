'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Badge from '@/components/ui/Badge';
import ImageCarousel from '@/components/ui/ImageCarousel';
import ProjectCard from '@/components/ui/ProjectCard';
import { projectsData } from '@/lib/project-data';

export default function ProjectIntro() {
    const t = useTranslations('ProjectIntro');

    return (
        <section className="py-32 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-24 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="mb-6 flex items-center gap-3"
                        >
                            <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary uppercase tracking-[0.3em] font-mono text-[10px] px-4 py-1.5">
                                [ System_Case_Studies ]
                            </Badge>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight"
                        >
                            {t('text_1')}
                            <br />
                            <span className="text-primary font-light italic">{t('text_2')}</span>
                        </motion.h2>

                        <div className="mt-8 flex items-center gap-4 text-text-muted font-mono text-[10px] tracking-[0.5em] uppercase">
                            <div className="w-12 h-px bg-border" />
                            <span>Selection_Root_Directory</span>
                            <div className="w-12 h-px bg-border" />
                        </div>
                    </div>

                    {/* Project Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                        {projectsData.map((project, index) => {
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const tProject = useTranslations(`ProjectIntro.projects.${project.introKey}`);

                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <ProjectCard
                                        project={project}
                                        index={index}
                                        title={tProject('title')}
                                        location={tProject('location')}
                                        description={tProject('description')}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
