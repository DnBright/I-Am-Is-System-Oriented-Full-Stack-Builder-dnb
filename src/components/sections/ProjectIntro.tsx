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
        <section className="py-32 relative overflow-hidden bg-white border-y-[40px] border-primary">
            {/* System Grid Background REMOVED for chaos */}
            <div className="absolute inset-0 bg-error/10 animate-jitter" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col items-center mb-20 text-center bg-background p-10 border-[15px] border-dashed border-text-primary rotate-1">
                        <motion.div
                            className="mb-4 bg-error p-6 animate-spin-chaos"
                        >
                            <Badge variant="outline" className="text-white border-white border-8 uppercase tracking-[0.5em] font-black text-4xl px-10 py-5">
                                [ !!! DANGER ZONE !!! ]
                            </Badge>
                        </motion.div>

                        <motion.h2
                            className="text-6xl md:text-9xl font-black text-white tracking-widest leading-none bg-error p-8 border-b-[20px] border-white"
                        >
                            {t('text_1')}
                            <br />
                            <span className="text-primary animate-jitter block bg-background mt-4 p-4 italic underline decoration-white">{t('text_2')}</span>
                        </motion.h2>

                        <div className="mt-8 flex flex-col items-center gap-4 text-primary font-black text-5xl tracking-tighter uppercase">
                            <div className="w-full h-4 bg-error animate-blink" />
                            <span>### SYSTEM_CASE_HACKS ###</span>
                            <div className="w-full h-4 bg-error animate-blink" />
                        </div>
                    </div>

                    {/* Project Cards Grid (Misaligned Layout) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-20">
                        {projectsData.map((project, index) => {
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const tProject = useTranslations(`ProjectIntro.projects.${project.introKey}`);

                            return (
                                <div key={project.id} className={index % 2 === 0 ? "-rotate-6 scale-110" : "rotate-6 scale-90"}>
                                    <ProjectCard
                                        project={project}
                                        index={index}
                                        title={tProject('title')}
                                        location={tProject('location')}
                                        description={tProject('description')}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* divider */}
            <div className="w-full h-20 bg-error animate-jitter" />
        </section>
    );
}
