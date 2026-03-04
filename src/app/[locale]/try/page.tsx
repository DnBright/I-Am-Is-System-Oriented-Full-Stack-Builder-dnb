'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { FaTerminal, FaPlay, FaExternalLinkAlt, FaRocket, FaInfoCircle } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { projectsData } from '@/lib/project-data';
import LPKSaitamaDemo from '@/components/demos/LPKSaitamaDemo';
import LPKAyakaDemo from '@/components/demos/LPKAyakaDemo';
import AIAdminDemo from '@/components/demos/AIAdminDemo';
import JapanLMSDemo from '@/components/demos/JapanLMSDemo';
import GROVisualDemo from '@/components/demos/GROVisualDemo';

export default function TryPage() {
    const t = useTranslations('Try');
    const [activeId, setActiveId] = useState(projectsData[0].slug);

    const activeProject = projectsData.find(p => p.slug === activeId) || projectsData[0];
    const tp = useTranslations(`Try.projects.${activeProject.slug}`);

    const renderDemo = () => {
        if (activeId === 'lpk-saitama-dashboard') return <LPKSaitamaDemo />;
        if (activeId === 'lpk-ayaka-website') return <LPKAyakaDemo />;
        if (activeId === 'ai-admin-dashboard') return <AIAdminDemo />;
        if (activeId === 'japan-online-course') return <JapanLMSDemo />;
        if (activeId === 'gro-visual-studio') return <GROVisualDemo />;
        return null;
    };

    const hasInternalDemo = ['lpk-saitama-dashboard', 'lpk-ayaka-website', 'ai-admin-dashboard', 'japan-online-course', 'gro-visual-studio'].includes(activeId);

    return (
        <div className="py-24 relative overflow-hidden bg-background">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 border border-primary/20 mb-6"
                    >
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-primary uppercase">{t('simulation_module')} // {t('sandbox')}</span>
                    </motion.div>

                    <motion.div
                        key={activeProject.slug}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
                            {tp('title')}
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        className="text-text-muted text-lg font-mono uppercase tracking-widest max-w-2xl"
                    >
                        {tp('desc')}
                    </motion.p>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Project Selector - Sticky */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-4">
                            <div className="flex items-center gap-3 px-2 mb-4">
                                <div className="w-1 h-4 bg-primary" />
                                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-text-muted opacity-40">{t('station_select')}</span>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                                {projectsData.map((project) => (
                                    <button
                                        key={project.slug}
                                        onClick={() => setActiveId(project.slug)}
                                        className={cn(
                                            "w-full text-left p-4 rounded-sm border transition-all flex flex-col gap-2 group relative overflow-hidden",
                                            activeId === project.slug
                                                ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                                : "bg-surface/40 border-primary/10 hover:border-primary/40"
                                        )}
                                    >
                                        <div className="flex items-center justify-between relative z-10">
                                            <div className={cn(
                                                "px-2 py-0.5 rounded-sm text-[8px] font-mono font-black uppercase tracking-widest",
                                                activeId === project.slug ? "bg-primary/20 text-primary border border-primary/10 text-primary" : "bg-slate-200/10 text-text-muted border border-transparent"
                                            )}>
                                                {t(`projects.${project.slug}.type`)}
                                            </div>
                                            <FaTerminal className={cn("transition-colors", activeId === project.slug ? "text-primary" : "text-text-muted opacity-20")} size={10} />
                                        </div>
                                        <h3 className={cn("font-black text-xs uppercase tracking-tighter transition-colors", activeId === project.slug ? "text-primary" : "text-text-primary")}>
                                            {t(`projects.${project.slug}.title`)}
                                        </h3>
                                        {activeId === project.slug && (
                                            <motion.div
                                                layoutId="project-active-indicator"
                                                className="absolute left-0 top-0 w-1 h-full bg-primary"
                                            />
                                        )}
                                    </button>
                                ))}
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
                    </div>

                    {/* Simulation Area */}
                    <div className="lg:col-span-3 min-h-[700px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, ease: "circOut" }}
                                className="h-full"
                            >
                                {hasInternalDemo ? (
                                    <div className="w-full max-w-6xl mx-auto flex flex-col h-full justify-center">
                                        <div className="bg-[#1e293b] rounded-t-2xl p-3 flex items-center gap-3 border-x border-t border-slate-800 shadow-2xl">
                                            <div className="flex gap-2 ml-2">
                                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                                            </div>
                                            <div className="mx-auto bg-slate-900/50 rounded-md px-16 py-1.5 text-[9px] text-slate-400 font-mono border border-white/5 tracking-[0.2em] uppercase">
                                                {activeProject?.title} - System Simulation // 16:9
                                            </div>
                                        </div>
                                        <div className="aspect-video w-full bg-white rounded-b-2xl shadow-2xl border-x border-b border-slate-200 overflow-hidden relative group">
                                            <div className="absolute inset-0">
                                                {renderDemo()}
                                            </div>
                                        </div>
                                        <div className="mt-6 flex justify-center">
                                            <div className="w-40 h-2 bg-slate-900/10 rounded-full blur-[1px]" />
                                        </div>
                                    </div>
                                ) : (
                                    <Card className="p-0 border-primary/10 bg-background overflow-hidden h-full flex flex-col relative group shadow-2xl">
                                        <div className="bg-surface-elevated/40 px-6 py-4 border-b border-border flex items-center justify-between">
                                            <div className="flex gap-2">
                                                <div className="w-2.5 h-2.5 rounded-full bg-error/30" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-warning/30" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-success/30" />
                                            </div>
                                            <div className="text-[10px] font-mono font-bold text-primary tracking-tighter uppercase">
                                                {t('terminal.root_at')}:~/{activeId}
                                            </div>
                                        </div>

                                        <div className="flex-1 p-12 flex flex-col items-center justify-center text-center relative">
                                            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />

                                            <div className="relative group/launch space-y-8">
                                                <div className="w-32 h-32 mx-auto rounded-sm bg-primary/5 flex items-center justify-center border border-primary/20 backdrop-blur-sm">
                                                    <FaRocket className="text-primary text-5xl group-hover/launch:animate-bounce transition-all" />
                                                </div>

                                                <div className="space-y-4">
                                                    <h2 className="text-primary font-black text-3xl uppercase tracking-tighter">{t('terminal.connected_ready')}</h2>
                                                    <p className="text-text-muted text-[10px] font-mono uppercase tracking-[0.2em] opacity-80 px-8">
                                                        {t('terminal.pii_warning')}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                    <a href={activeProject.demoUrl || '#'} target="_blank" rel="noopener noreferrer">
                                                        <Button size="lg" className="gap-4 font-mono text-[10px] uppercase tracking-[0.3em] px-10 rounded-sm shadow-[0_0_30px_rgba(16,185,129,0.3)] bg-primary text-background">
                                                            <FaExternalLinkAlt size={14} />
                                                            {t('terminal.open_preview')}
                                                        </Button>
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-primary/[0.05] to-transparent h-32 w-full top-[-100%] animate-[scan_6s_linear_infinite]" />
                                        </div>

                                        <div className="bg-surface-elevated/40 px-8 py-3 border-t border-border flex items-center justify-between">
                                            <div className="flex gap-8">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                    <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest opacity-60">{t('terminal.latency')}: 00ms</span>
                                                </div>
                                            </div>
                                            <div className="text-[10px] text-primary font-black font-mono tracking-[0.2em] uppercase opacity-60">
                                                {t('terminal.secure_layer')} // HYPER_LINK_ACTIVE
                                            </div>
                                        </div>
                                    </Card>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

