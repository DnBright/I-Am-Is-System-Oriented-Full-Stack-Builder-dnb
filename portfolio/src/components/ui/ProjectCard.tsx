'use client';

import { motion } from 'framer-motion';
import { FiCpu, FiActivity, FiArrowRight } from 'react-icons/fi';
import { Link } from '@/navigation';
import ImageCarousel from '@/components/ui/ImageCarousel';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
    project: any;
    title: string;
    location: string;
    description: string;
    index: number;
}

export default function ProjectCard({ project, title, location, description, index }: ProjectCardProps) {
    const systemId = `SYS-PRJ-${(index + 1).toString().padStart(2, '0')}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative flex flex-col h-full bg-surface-elevated/40 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 hover:bg-surface-elevated/60 transition-all duration-500 shadow-2xl shadow-black/20"
        >
            {/* System Diagnostic Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-white/5 font-mono text-[10px] tracking-widest text-text-muted">
                <div className="flex items-center gap-2">
                    <FiCpu className="text-primary animate-pulse" />
                    <span>{systemId}</span>
                </div>
                <div className="flex items-center gap-2">
                    <FiActivity size={10} className="text-green-500" />
                    <span className="text-green-500/80">STATUS: ONLINE</span>
                </div>
            </div>

            {/* Project Preview */}
            <div className="relative h-56 overflow-hidden">
                <div className={cn("absolute inset-0 bg-gradient-to-br transition-all duration-700 group-hover:scale-110 opacity-20", project.colors?.gradient)} />
                {project.screenshots ? (
                    <div className="h-full w-full">
                        <ImageCarousel
                            images={project.screenshots}
                            alt={title}
                        />
                    </div>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <div className="text-8xl font-black">{index + 1}</div>
                    </div>
                )}

                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated via-transparent to-transparent pointer-events-none" />

                {/* Bottom Edge Tech Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </div>

            {/* Project Content */}
            <div className="p-6 flex flex-col flex-1 relative">
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Deployment</span>
                        <div className="flex gap-1">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-1 h-1 rounded-full bg-primary/30" />
                            ))}
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
                        {title}
                    </h3>
                    <p className="text-[10px] font-mono text-text-muted mt-1 uppercase opacity-60">
                        {location}
                    </p>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3">
                    {description}
                </p>

                {/* Tech Stack Tokens */}
                <div className="mt-auto pt-4 flex flex-wrap gap-2 border-t border-white/5">
                    {project.tech.slice(0, 4).map((tech: string) => (
                        <div
                            key={tech}
                            className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-mono text-gray-300 uppercase letter-tight"
                        >
                            {tech}
                        </div>
                    ))}
                    {project.tech.length > 4 && (
                        <div className="text-[9px] font-mono text-primary/60 self-center">
                            +{project.tech.length - 4}
                        </div>
                    )}
                </div>

                {/* Interactive Action Area */}
                <Link href={`/projects/${project.slug}`} className="mt-6 block">
                    <div className="group/btn relative w-full h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center gap-2 overflow-hidden hover:bg-primary transition-all duration-300">
                        <span className="text-xs font-bold uppercase tracking-widest group-hover/btn:text-background transition-colors duration-300">
                            Process System
                        </span>
                        <FiArrowRight size={14} className="group-hover/btn:translate-x-1 group-hover/btn:text-background transition-all" />

                        {/* Button Glow Effect */}
                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />
                    </div>
                </Link>
            </div>

            {/* Corner Decorative Elements */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/20 pointer-events-none" />
        </motion.div>
    );
}
