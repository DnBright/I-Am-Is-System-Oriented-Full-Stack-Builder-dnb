'use client';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Link } from '@/navigation';
import ImageCarousel from '@/components/ui/ImageCarousel';
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
        <section className="py-24 relative overflow-hidden bg-error/40">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto border-[20px] border-primary p-10 bg-white">
                    <div className="flex flex-col items-center text-center mb-16 rotate-1">
                        <div className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-error border-[10px] border-black mb-4 animate-jitter">
                            <span className="text-4xl font-mono font-bold tracking-[0.2em] text-white uppercase italic">!!! PROJECTS_ZONE !!!</span>
                        </div>
                        <h2 className="text-6xl md:text-[8rem] font-bold text-text-primary tracking-tighter mb-4 uppercase bg-primary p-6 border-4 border-dashed border-error">
                            {t.rich('title', {
                                span: (chunks) => <span className="text-white underline decoration-wavy decoration-error">{chunks}</span>
                            })}
                        </h2>
                        <p className="text-error text-3xl font-black italic bg-text-primary p-4 -rotate-1">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="flex flex-col gap-20">
                        {projects.map((project, index) => {
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const tProject = useTranslations(`ProjectDetail.projects.${project.slug}`);

                            return (
                                <Link key={project.id} href={`/projects/${project.slug}`} className={index % 2 === 0 ? "rotate-2" : "-rotate-3"}>
                                    <Card hover className="p-0 overflow-visible group cursor-crosshair border-black bg-white flex flex-col md:flex-row relative">
                                        {/* Project Image Placeholder */}
                                        <div className="w-full md:w-1/2 h-80 bg-error relative overflow-hidden">
                                            {project.screenshots ? (
                                                <ImageCarousel
                                                    images={project.screenshots}
                                                    alt={project.title}
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center bg-primary animate-jitter">
                                                    <div className="text-8xl font-black text-white">??</div>
                                                </div>
                                            )}

                                            {/* Verified Badge Overlay */}
                                            <div className="absolute -top-10 -left-10 z-20 scale-150 rotate-12">
                                                <div className="flex items-center gap-2 px-10 py-5 bg-error border-[10px] border-white">
                                                    <span className="text-4xl font-black text-white uppercase italic">
                                                        !!! {tProject('legal')} !!!
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-10 flex flex-col flex-1 bg-primary/20">
                                            <div className="mb-4 flex flex-col gap-2">
                                                <div className="flex justify-between items-start">
                                                    <Badge variant="default" className="text-3xl bg-error text-white p-4 animate-jitter">
                                                        {tProject('category')}
                                                    </Badge>
                                                </div>
                                                <span className="text-2xl text-text-primary font-black uppercase underline">
                                                    Client: {tProject('client')}
                                                </span>
                                            </div>

                                            <h3 className="text-5xl font-black mb-3 text-error uppercase group-hover:animate-jitter">
                                                {tProject('title')}
                                            </h3>

                                            <p className="text-text-primary text-2xl mb-6 bg-white p-6 border-l-[20px] border-error font-bold italic">
                                                {tProject('system')}
                                            </p>

                                            <div className="mt-auto space-y-3">
                                                <div className="flex flex-wrap gap-4">
                                                    {(tProject.raw('architecture') as string[]).map((arch) => (
                                                        <span
                                                            key={arch}
                                                            className="text-lg font-black uppercase bg-text-primary text-background p-3 border-4 border-white animate-blink"
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
                </div>
            </div>
        </section>
    );
}
