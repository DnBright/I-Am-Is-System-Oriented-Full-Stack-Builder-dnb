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
        <section className="py-32 relative overflow-hidden bg-background">
            {/* System Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-20 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="mb-4"
                        >
                            <Badge variant="outline" className="text-primary border-primary/30 uppercase tracking-[0.3em] font-mono text-[10px] px-4 py-1.5">
                                [ System Architect Portfolio ]
                            </Badge>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[1.1]"
                        >
                            {t('text_1')}
                            <br />
                            <span className="text-primary">{t('text_2')}</span>
                        </motion.h2>

                        <div className="mt-8 flex items-center gap-4 text-text-muted font-mono text-[10px] tracking-widest uppercase opacity-60">
                            <div className="w-12 h-px bg-white/20" />
                            <span>System Case Studies</span>
                            <div className="w-12 h-px bg-white/20" />
                        </div>
                    </div>

                    {/* Project Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {projectsData.map((project, index) => {
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const tProject = useTranslations(`ProjectIntro.projects.${project.introKey}`);

                            return (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    title={tProject('title')}
                                    location={tProject('location')}
                                    description={tProject('description')}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Minimalist divider */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </section>
    );
}
