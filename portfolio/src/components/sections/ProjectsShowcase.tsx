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
        title: 'Dashboard LPK Saitama',
        description: 'Comprehensive management system for PT. Saitama Juara Mendunia, handling student data, payroll, and reporting.',
        tech: ['Laravel', 'React', 'MySQL', 'Redis'],
        category: 'Management System',
        image: '/projects/lpk-saitama.jpg',
        slug: 'lpk-saitama-dashboard'
    },
    {
        id: 2,
        title: 'Website Company LPK Ayaka',
        description: 'Corporate profile and enrollment portal for PT. Saitama Juara Mendunia with SEO optimization.',
        tech: ['Next.js', 'Tailwind', 'Framing Motion'],
        category: 'Corporate Web',
        image: '/projects/lpk-ayaka.jpg',
        slug: 'lpk-ayaka-website'
    },
    {
        id: 3,
        title: 'AI Integrated Admin Dashboard',
        description: 'Advanced admin dashboard with AI integration for operational efficiency and automated daily management.',
        tech: ['Next.js', 'OpenAI API', 'PostgreSQL', 'tRPC'],
        category: 'Enterprise AI',
        image: '/projects/ai-dashboard.jpg',
        slug: 'ai-admin-dashboard'
    },
    {
        id: 4,
        title: 'Japan Hybrid Course Platform',
        description: 'Modern LMS for Japanese language learning featuring hybrid and bypass learning methodologies.',
        tech: ['React', 'Node.js', 'WebRTC', 'MongoDB'],
        category: 'EdTech Platform',
        image: '/projects/japan-course.jpg',
        slug: 'japan-online-course'
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                <div className="flex justify-between items-start">
                                                    <Badge variant="default" className="self-start">
                                                        {tProject('category')}
                                                    </Badge>
                                                    <span className="text-[10px] font-mono text-primary/80 bg-primary/5 px-2 py-1 rounded border border-primary/10">
                                                        {tProject('role')}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-text-muted font-mono uppercase tracking-widest opacity-70">
                                                    Client: <span className="text-text-primary font-bold">{tProject('client')}</span>
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-bold mb-3 text-text-primary group-hover:text-primary transition-colors flex items-center gap-2">
                                                {tProject('title')}
                                            </h3>

                                            <p className="text-text-secondary text-sm mb-6 line-clamp-3 leading-relaxed">
                                                {tProject('system')}
                                            </p>

                                            <div className="mt-auto space-y-3">
                                                <div className="flex flex-wrap gap-2">
                                                    {(tProject.raw('architecture') as string[]).map((arch) => (
                                                        <span
                                                            key={arch}
                                                            className="text-[9px] font-mono uppercase tracking-wider px-2 py-1 bg-surface-elevated text-text-muted border border-border group-hover:border-primary/20 transition-colors"
                                                        >
                                                            {arch}
                                                        </span>
                                                    ))}
                                                </div>
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
