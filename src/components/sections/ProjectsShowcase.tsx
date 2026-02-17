'use client';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Link } from '@/navigation';
import ImageCarousel from '@/components/ui/ImageCarousel';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const projects = [
    {
        id: 1,
        title: 'Dashboard LPK Saitama',
        description: 'Comprehensive management system for PT. Saitama Juara Mendunia, handling student data, payroll, and reporting.',
        tech: ['Laravel', 'React', 'MySQL', 'Redis'],
        category: 'Management System',
        image: '/projects/saitama-screenshots/Screenshot 2026-02-15 at 22.16.55.png',
        slug: 'lpk-saitama-dashboard',
        screenshots: [
            '/projects/saitama-screenshots/Screenshot 2026-02-15 at 22.14.37.png',
            '/projects/saitama-screenshots/Screenshot 2026-02-15 at 22.16.55.png',
            '/projects/saitama-screenshots/Screenshot 2026-02-15 at 22.17.05.png',
            '/projects/saitama-screenshots/Screenshot 2026-02-15 at 22.17.09.png',
            '/projects/saitama-screenshots/Screenshot 2026-02-15 at 22.17.12.png'
        ]
    },
    {
        id: 2,
        title: 'Website Company LPK Ayaka',
        description: 'Corporate profile and enrollment portal for PT. Saitama Juara Mendunia with SEO optimization.',
        tech: ['Next.js', 'Tailwind', 'Framing Motion'],
        category: 'Corporate Web',
        image: '/projects/ayaka-screenshots/home.jpg',
        slug: 'lpk-ayaka-website',
        screenshots: [
            '/projects/ayaka-screenshots/home.jpg',
            '/projects/ayaka-screenshots/program.jpg',
            '/projects/ayaka-screenshots/gallery.jpg',
            '/projects/ayaka-screenshots/alumni.jpg',
            '/projects/ayaka-screenshots/contact.jpg'
        ]
    },
    {
        id: 3,
        title: 'AI Integrated Admin Dashboard',
        description: 'Advanced admin dashboard with AI integration for operational efficiency and automated daily management.',
        tech: ['Next.js', 'OpenAI API', 'PostgreSQL', 'tRPC'],
        category: 'Enterprise AI',
        image: '/projects/ai-dashboard-screenshots/form-1.png',
        slug: 'ai-admin-dashboard',
        screenshots: [
            '/projects/ai-dashboard-screenshots/form-1.png',
            '/projects/ai-dashboard-screenshots/form-2.png',
            '/projects/ai-dashboard-screenshots/form-3.png',
            '/projects/ai-dashboard-screenshots/form-4.png'
        ]
    },
    {
        id: 4,
        title: 'Japan Hybrid Course Platform',
        description: 'Modern LMS for Japanese language learning featuring hybrid and bypass learning methodologies.',
        tech: ['React', 'Node.js', 'WebRTC', 'MongoDB'],
        category: 'EdTech Platform',
        image: '/projects/kursus-jepang-online-hybrid/1.png',
        slug: 'japan-online-course',
        screenshots: [
            '/projects/kursus-jepang-online-hybrid/1.png',
            '/projects/kursus-jepang-online-hybrid/2.png',
            '/projects/kursus-jepang-online-hybrid/3.png',
            '/projects/kursus-jepang-online-hybrid/4.png',
            '/projects/kursus-jepang-online-hybrid/5.png',
            '/projects/kursus-jepang-online-hybrid/6.png',
            '/projects/kursus-jepang-online-hybrid/7.png'
        ]
    }
];

export default function ProjectsShowcase() {
    const t = useTranslations('Projects');

    return (
        <section className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-20 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-px w-12 bg-primary/50" />
                            <span className="text-xs font-mono font-bold tracking-[0.3em] text-primary uppercase">Portfolio_V2.0</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
                            {t.rich('title', {
                                span: (chunks) => <span className="text-primary">{chunks}</span>
                            })}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((project, index) => {
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const tProject = useTranslations(`ProjectDetail.projects.${project.slug}`);

                            return (
                                <Link key={project.id} href={`/projects/${project.slug}`}>
                                    <Card hover className="p-0 flex flex-col h-full bg-surface/30">
                                        {/* Project Graphic Header */}
                                        <div className="h-64 relative overflow-hidden group/img">
                                            {project.screenshots ? (
                                                <ImageCarousel
                                                    images={project.screenshots}
                                                    alt={project.title}
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-surface-elevated/20 flex items-center justify-center">
                                                    <span className="text-6xl font-mono font-bold text-primary/5">PRJ_{project.id}</span>
                                                </div>
                                            )}

                                            {/* Category Tag */}
                                            <div className="absolute top-6 left-6 z-20">
                                                <div className="px-3 py-1 bg-background/80 backdrop-blur-md border border-white/5 rounded-full">
                                                    <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">{tProject('category')}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-8 flex flex-col flex-1 space-y-6">
                                            <div className="space-y-4">
                                                <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                                                    {project.title}
                                                </h3>
                                                <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                                                    {tProject('descriptionBrief')}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {project.tech.map((tech) => (
                                                    <Badge key={tech} variant="outline" className="bg-white/5 border-white/5 text-[10px] uppercase font-mono tracking-wider">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <div className="pt-6 mt-auto flex items-center justify-between border-t border-white/5">
                                                <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">{tProject('role')}</span>
                                                <div className="flex items-center gap-2 text-primary font-bold text-xs group-hover:translate-x-1 transition-transform">
                                                    EXPLORE_SYSTEM <FaArrowRight className="text-[10px]" />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
