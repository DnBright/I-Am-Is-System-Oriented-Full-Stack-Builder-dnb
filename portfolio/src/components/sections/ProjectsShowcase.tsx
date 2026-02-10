'use client';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Link } from '@/navigation';
import Image from 'next/image';
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
        <section className="py-20 bg-surface">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 text-text-primary">{t('title')}</h2>
                        <p className="text-text-secondary">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <Link key={project.id} href={`/projects/${project.slug}`}>
                                <Card hover className="p-0 overflow-hidden group cursor-pointer h-full">
                                    {/* Project Image Placeholder */}
                                    <div className="h-48 bg-surface-elevated relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent group-hover:from-primary/30 transition-all duration-300" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-6xl font-bold text-primary/20">
                                                {project.id}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="mb-3">
                                            <Badge variant="default" className="text-xs">
                                                {project.category}
                                            </Badge>
                                        </div>

                                        <h3 className="text-xl font-bold mb-2 text-text-primary group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>

                                        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="text-xs px-2 py-1 bg-surface-elevated text-text-secondary rounded"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-background rounded-lg font-medium hover:bg-primary-hover transition-all duration-200 glow-primary"
                        >
                            {t('view_all')}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
