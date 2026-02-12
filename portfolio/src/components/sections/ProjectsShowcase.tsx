'use client';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Link } from '@/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const projects = [
    {
        id: 1,
        title: 'LPK Management System',
        description: 'Full-stack platform for managing vocational training centers with student tracking, certification, and reporting.',
        tech: ['Laravel', 'React', 'PostgreSQL', 'Tailwind'],
        category: 'Web Application',
        image: '/projects/lpk.jpg',
        slug: 'lpk-management-system'
    },
    {
        id: 2,
        title: 'Real-time Analytics Dashboard',
        description: 'Interactive dashboard for visualizing GitHub activity and coding patterns with live updates.',
        tech: ['Next.js', 'TypeScript', 'Recharts', 'GitHub API'],
        category: 'Data Visualization',
        image: '/projects/analytics.jpg',
        slug: 'analytics-dashboard'
    },
    {
        id: 3,
        title: 'CRM System',
        description: 'Customer relationship management system with pipeline tracking, automation, and reporting.',
        tech: ['Next.js', 'Prisma', 'PostgreSQL', 'tRPC'],
        category: 'Enterprise',
        image: '/projects/crm.jpg',
        slug: 'crm-system'
    }
];

export default function ProjectsShowcase() {
    const t = useTranslations('Projects');

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col items-center text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 border border-primary/20 mb-4">
                            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-primary uppercase">Portfolio_Access // v2.4</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
                            {t.rich('title', {
                                span: (chunks) => <span className="text-primary">{chunks}</span>
                            })}
                        </h2>
                        <p className="text-text-secondary max-w-2xl">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => {
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const tProject = useTranslations(`ProjectDetail.projects.${project.slug}`);

                            return (
                                <Link key={project.id} href={`/projects/${project.slug}`}>
                                    <Card hover className="p-0 overflow-hidden group cursor-pointer h-full border-primary/5 bg-surface/40 flex flex-col relative">
                                        {/* Project Image Placeholder */}
                                        <div className="h-48 bg-surface-elevated relative overflow-hidden flex-shrink-0">
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent group-hover:from-primary/30 transition-all duration-300" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="text-5xl font-mono font-bold text-primary/10 group-hover:scale-110 transition-transform">
                                                    PRJ_{project.id.toString().padStart(3, '0')}
                                                </div>
                                            </div>

                                            {/* Verified Badge Overlay */}
                                            <div className="absolute top-4 left-4 z-20">
                                                <div className="flex items-center gap-2 px-2 py-1 bg-background/80 backdrop-blur-md border border-primary/30 rounded-sm shadow-sm">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                                    <span className="text-[9px] font-mono font-bold text-primary uppercase tracking-wider">
                                                        {tProject('legal')}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="absolute bottom-4 right-4 opacity-40">
                                                <span className="text-[10px] font-mono text-primary uppercase">ENC_STATUS: OK</span>
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="mb-4 flex flex-col gap-2">
                                                <Badge variant="default" className="self-start">
                                                    {project.category}
                                                </Badge>
                                                <span className="text-xs text-text-muted font-mono uppercase tracking-widest opacity-70">
                                                    Client: <span className="text-text-primary font-bold">{tProject('client')}</span>
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold mb-3 text-text-primary group-hover:text-primary transition-colors flex items-center gap-2">
                                                {project.title}
                                                <span className="text-[10px] font-mono opacity-0 group-hover:opacity-40 transition-opacity">//0x{project.id}</span>
                                            </h3>

                                            <p className="text-text-secondary text-sm mb-6 line-clamp-2 leading-relaxed h-10">
                                                {project.description}
                                            </p>

                                            <div className="mt-auto flex flex-wrap gap-2">
                                                {project.tech.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="text-[9px] font-mono uppercase tracking-wider px-2 py-1 bg-surface-elevated text-text-muted border border-border group-hover:border-primary/20 transition-colors"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/projects">
                            <Button size="lg" className="min-w-[200px] font-mono text-xs uppercase tracking-[0.2em]">
                                {t('view_all')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
