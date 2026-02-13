'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Badge from '@/components/ui/Badge';
import ImageCarousel from '@/components/ui/ImageCarousel';

const featuredProjects = [
    {
        id: 'lpk_saitama',
        image: '/projects/lpk-saitama.jpg',
        tech: ['Laravel', 'React', 'MySQL', 'Redis', 'Tailwind CSS'],
        colors: {
            primary: 'text-red-700',
            bg: 'bg-red-50',
            border: 'border-red-200',
            hover: 'group-hover:text-red-600',
            gradient: 'from-red-100 to-white'
        }
    },
    {
        id: 'lpk_ayaka',
        image: '/projects/ayaka-screenshots/home.jpg',
        tech: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'SEO Optimization'],
        screenshots: [
            '/projects/ayaka-screenshots/home.jpg',
            '/projects/ayaka-screenshots/program.jpg',
            '/projects/ayaka-screenshots/gallery.jpg',
            '/projects/ayaka-screenshots/alumni.jpg',
            '/projects/ayaka-screenshots/contact.jpg'
        ],
        colors: {
            primary: 'text-pink-700',
            bg: 'bg-pink-50',
            border: 'border-pink-200',
            hover: 'group-hover:text-pink-600',
            gradient: 'from-pink-100 to-white'
        }
    },
    {
        id: 'ai_dashboard',
        image: '/projects/ai-dashboard-screenshots/form-1.png',
        tech: ['Next.js', 'OpenAI API', 'PostgreSQL', 'tRPC', 'Prisma'],
        screenshots: [
            '/projects/ai-dashboard-screenshots/form-1.png',
            '/projects/ai-dashboard-screenshots/form-2.png'
        ],
        colors: {
            primary: 'text-indigo-700',
            bg: 'bg-indigo-50',
            border: 'border-indigo-200',
            hover: 'group-hover:text-indigo-600',
            gradient: 'from-indigo-100 to-white'
        }
    },
    {
        id: 'japan_course',
        image: '/projects/japan-course.jpg',
        tech: ['React', 'Node.js', 'WebRTC', 'MongoDB', 'Socket.io'],
        colors: {
            primary: 'text-teal-700',
            bg: 'bg-teal-50',
            border: 'border-teal-200',
            hover: 'group-hover:text-teal-600',
            gradient: 'from-teal-100 to-white'
        }
    }
];

export default function ProjectIntro() {
    const t = useTranslations('ProjectIntro');

    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-purple-900/20 via-background to-background">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
                            {t('text_1')}
                            <br />
                            <span className="text-primary">{t('text_2')}</span>
                        </h2>
                    </motion.div>

                    {/* Project Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProjects.map((project, index) => {
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const tProject = useTranslations(`ProjectIntro.projects.${project.id}`);

                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="group"
                                >
                                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                                        {/* Project Image or Carousel */}
                                        <div className={`h-48 bg-gradient-to-br ${project.colors.gradient} relative overflow-hidden`}>
                                            {(project.id === 'lpk_ayaka' || project.id === 'ai_dashboard') && project.screenshots ? (
                                                <ImageCarousel
                                                    images={project.screenshots}
                                                    alt={tProject('title')}
                                                />
                                            ) : (
                                                <>
                                                    <div className="absolute inset-0 bg-black/5" />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className={`text-6xl font-bold ${project.colors.primary} opacity-10 group-hover:scale-110 transition-transform`}>
                                                            {(index + 1).toString().padStart(2, '0')}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Project Info */}
                                        <div className="p-6 flex flex-col flex-1">
                                            <h3 className={`text-lg font-bold text-gray-900 mb-2 ${project.colors.hover} transition-colors`}>
                                                {tProject('title')}
                                            </h3>

                                            <p className="text-xs text-gray-500 mb-3">
                                                {tProject('location')}
                                            </p>

                                            <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                                                {tProject('description')}
                                            </p>

                                            {/* Tech Stack */}
                                            <div className="flex flex-wrap gap-1.5 mt-auto">
                                                {project.tech.map((tech: string) => (
                                                    <Badge
                                                        key={tech}
                                                        variant="outline"
                                                        className={`text-[9px] px-2 py-0.5 ${project.colors.border} ${project.colors.primary} ${project.colors.bg}`}
                                                    >
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Minimalist divider */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-primary/10 to-transparent opacity-20" />
        </section>
    );
}
