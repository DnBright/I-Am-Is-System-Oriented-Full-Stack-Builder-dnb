'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Link } from '@/navigation';
import { FaArrowLeft, FaCogs, FaProjectDiagram, FaCheckCircle, FaExternalLinkAlt } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const t = useTranslations('ProjectDetail');

    // Attempt to get project data from translations, fallback to system prototype
    const hasProject = t.has(`projects.${slug}`);
    const projectKey = hasProject ? `projects.${slug}` : 'projects.fallback';

    const project = {
        title: t(`${projectKey}.title`),
        category: t(`${projectKey}.category`),
        problem: t(`${projectKey}.problem`),
        system: t(`${projectKey}.system`),
        solution: t(`${projectKey}.solution`),
        // We'll use the raw architecture list from the translations
        architecture: t.raw(`${projectKey}.architecture`) as string[]
    };

    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Back button */}
                    <Link href="/projects" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8 text-sm group">
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        {t('back_link')}
                    </Link>

                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-4">
                            <Badge variant="default" className="uppercase text-[10px] tracking-widest">{project.category}</Badge>
                            <span className="text-text-muted text-xs font-mono">{t('id_label')}: {slug.toUpperCase()}</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">{project.title}</h1>
                        <div className="flex flex-wrap gap-2">
                            {/* Assuming tags might remain technical or are part of project data if needed */}
                            {['System', 'Architecture', 'Logic'].map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-surface-elevated rounded-full text-xs font-medium text-text-secondary border border-border">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-12">
                        {/* Visual Placeholder */}
                        <Card className="p-0 overflow-hidden aspect-video relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-info/20 opacity-50 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <FaCogs className="text-8xl text-primary/10 animate-spin-slow" />
                            </div>
                            <div className="absolute bottom-6 right-6">
                                <Button size="sm" variant="outline" className="gap-2">
                                    <FaExternalLinkAlt size={12} />
                                    {t('live_preview')}
                                </Button>
                            </div>
                        </Card>

                        {/* Content Decomposition */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="md:col-span-2 space-y-12">
                                <section>
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                                        {t('sections.problem')}
                                    </h2>
                                    <p className="text-text-secondary leading-relaxed text-lg">
                                        {project.problem}
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                                        {t('sections.system')}
                                    </h2>
                                    <p className="text-text-secondary leading-relaxed text-lg">
                                        {project.system}
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                                        {t('sections.solution')}
                                    </h2>
                                    <p className="text-text-secondary leading-relaxed text-lg italic border-l-2 border-primary pl-6 py-2 bg-primary/5">
                                        {project.solution}
                                    </p>
                                </section>
                            </div>

                            <div className="space-y-8">
                                <Card className="p-8">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6 flex items-center gap-2">
                                        <FaProjectDiagram className="text-primary" />
                                        {t('sections.architecture')}
                                    </h3>
                                    <ul className="space-y-4">
                                        {project.architecture.map((item: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <FaCheckCircle className="text-primary mt-1 flex-shrink-0" />
                                                <span className="text-sm text-text-secondary">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Card>

                                <Card className="p-8 bg-primary/10 border-primary/20">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">{t('status')}</h3>
                                    <div className="flex items-center gap-3 text-text-primary">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        <span className="text-sm font-bold uppercase">{t('production_ready')}</span>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
