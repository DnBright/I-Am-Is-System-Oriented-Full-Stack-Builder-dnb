import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { FaTerminal, FaPlay, FaExternalLinkAlt, FaRocket, FaInfoCircle } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { projectsData } from '@/lib/project-data';

export default function TryPage() {
    const t = useTranslations('Try');
    const [activeId, setActiveId] = useState(projectsData[0].slug);

    const activeProject = projectsData.find(p => p.slug === activeId) || projectsData[0];

    // Translation for the active project
    const tp = useTranslations(`Try.projects.${activeProject.slug}`);

    return (
        <div className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 border border-primary/20 mb-4">
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-primary uppercase">{t('simulation_module')} // {t('sandbox')}</span>
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase"
                    >
                        {t.rich('title', {
                            span: (children) => <span className="text-primary">{children}</span>
                        })}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-text-muted text-lg font-mono uppercase tracking-widest opacity-60 max-w-2xl"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Project Selector */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="flex items-center gap-3 px-2 mb-4">
                            <div className="w-1 h-4 bg-primary" />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-text-muted opacity-40">{t('station_select')}</span>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {projectsData.map((project) => {
                                return (
                                    <button
                                        key={project.slug}
                                        onClick={() => setActiveId(project.slug)}
                                        className={cn(
                                            "w-full text-left p-5 rounded-sm border transition-all flex flex-col gap-3 group relative overflow-hidden",
                                            activeId === project.slug
                                                ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                                : "bg-surface/40 border-primary/10 hover:border-primary/40"
                                        )}
                                    >
                                        <div className="flex items-center justify-between relative z-10">
                                            <div className="px-2 py-0.5 rounded-sm text-[8px] bg-primary/20 text-primary border border-primary/10 font-mono font-black uppercase tracking-widest">
                                                {t(`projects.${project.slug}.type`)}
                                            </div>
                                            <FaTerminal className={cn("transition-colors", activeId === project.slug ? "text-primary" : "text-text-muted opacity-20")} size={12} />
                                        </div>
                                        <div className="relative z-10">
                                            <h3 className={cn("font-black text-sm uppercase tracking-tighter transition-colors", activeId === project.slug ? "text-primary" : "text-text-primary")}>
                                                {t(`projects.${project.slug}.title`)}
                                            </h3>
                                        </div>
                                        {activeId === project.slug && (
                                            <motion.div
                                                layoutId="project-active-indicator"
                                                className="absolute left-0 top-0 w-1 h-full bg-primary"
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        <Card className="p-6 border-primary/10 bg-primary/[0.02] mt-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <FaInfoCircle className="text-2xl text-primary" />
                            </div>
                            <div className="flex items-center gap-3 text-primary mb-3">
                                <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em]">{t('security_note.title')}</span>
                            </div>
                            <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest leading-relaxed opacity-60">
                                {t('security_note.desc')}
                            </p>
                        </Card>
                    </div>

                    {/* Interactive Showcase Area */}
                    <div className="lg:col-span-3">
                        <Card className="p-0 border-primary/10 bg-background overflow-hidden aspect-video flex flex-col relative group shadow-2xl">
                            {/* Browser Header */}
                            <div className="bg-surface-elevated/40 px-6 py-4 border-b border-border flex items-center justify-between pointer-events-none">
                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-error/30 group-hover:bg-error/50 transition-colors" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-warning/30 group-hover:bg-warning/50 transition-colors" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-success/30 group-hover:bg-success/50 transition-colors" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-[9px] font-mono text-text-muted uppercase tracking-[0.2em] opacity-40">
                                        {t('auth')}
                                    </div>
                                    <div className="text-[10px] font-mono font-bold text-primary group-hover:text-primary transition-colors tracking-tighter uppercase max-w-[200px] truncate">
                                        {t('terminal.root_at')}:~/{activeId}
                                    </div>
                                </div>
                            </div>

                            {/* Main Content Area */}
                            <div className="flex-1 p-12 font-mono overflow-hidden flex flex-col items-center justify-center text-center relative bg-surface-elevated/5">
                                {/* Technical Grid Overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeId}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05 }}
                                        transition={{ duration: 0.4, ease: "circOut" }}
                                        className="max-w-xl relative z-10 w-full"
                                    >
                                        <div className="flex flex-col items-center gap-8">
                                            {/* Preview Image / Placeholder */}
                                            <div className="relative group/launch">
                                                <div className="w-32 h-32 rounded-sm bg-primary/5 flex items-center justify-center border border-primary/20 backdrop-blur-sm">
                                                    <FaRocket className="text-primary text-5xl group-hover/launch:animate-bounce transition-all" />
                                                </div>
                                                <div className="absolute -inset-6 border border-primary/5 rounded-full animate-[spin_10s_linear_infinite]" />
                                                <div className="absolute -inset-10 border border-primary/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex flex-col items-center gap-2">
                                                    <h2 className="text-primary font-black text-3xl uppercase tracking-tighter">{t('terminal.connected_ready')}</h2>
                                                    <Badge variant="outline" className="text-[8px] px-3 py-0.5 border-primary/30 text-primary uppercase font-black font-mono tracking-[0.2em]">{tp('type')}</Badge>
                                                </div>
                                                <p className="text-text-muted text-xs font-mono uppercase tracking-widest leading-relaxed opacity-80 px-4">
                                                    {tp('desc')}
                                                </p>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                                                <a
                                                    href={activeProject.demoUrl || '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-block"
                                                >
                                                    <Button size="lg" className="w-full sm:w-auto gap-4 font-mono text-xs uppercase tracking-[0.3em] px-10 rounded-sm shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] bg-primary text-background">
                                                        <FaExternalLinkAlt size={14} />
                                                        {t('terminal.open_preview')}
                                                    </Button>
                                                </a>
                                                <Button
                                                    variant="outline"
                                                    size="lg"
                                                    className="w-full sm:w-auto gap-3 font-mono text-xs uppercase tracking-[0.3em] px-10 rounded-sm border-primary/20 hover:bg-primary/5"
                                                >
                                                    {t('terminal.request_access')}
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>

                                {/* System Scanline */}
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-primary/[0.05] to-transparent h-32 w-full top-[-100%] animate-[scan_6s_linear_infinite]" />
                            </div>

                            {/* Status Bar */}
                            <div className="bg-surface-elevated/40 px-8 py-3 border-t border-border flex items-center justify-between">
                                <div className="flex items-center gap-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                                        <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest opacity-60">
                                            {t('terminal.latency')}: 00ms
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest opacity-60">
                                            {t('terminal.buffer')}: {activeProject.slug.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div className="hidden sm:block text-[10px] text-primary font-black font-mono tracking-[0.2em] uppercase opacity-60">
                                    {t('terminal.secure_layer')} // HYPER_LINK_ACTIVE
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

