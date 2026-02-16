'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { FaTerminal, FaPlay, FaShieldAlt, FaExternalLinkAlt, FaLock } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const demoStations = [
    { id: 'lpk-demo' },
    { id: 'analytics-demo' },
    { id: 'crm-demo' }
];

export default function TryPage() {
    const t = useTranslations('Try');
    const [activeId, setActiveId] = useState(demoStations[0].id);

    const activeDemo = {
        id: activeId,
        title: t(`stations.${activeId}.title`),
        description: t(`stations.${activeId}.desc`),
        status: t(`stations.${activeId}.status`),
        type: t(`stations.${activeId}.type`),
        url: '#'
    };

    return (
        <div className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 border border-primary/20 mb-4">
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-primary uppercase">Simulation_Module // Sandbox_v0.8-Alpha</span>
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

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Station Selector */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-3 px-2 mb-4">
                            <div className="w-1 h-4 bg-primary" />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-text-muted opacity-40">STATION_SELECT</span>
                        </div>
                        {demoStations.map((demo) => {
                            const d = {
                                title: t(`stations.${demo.id}.title`),
                                status: t(`stations.${demo.id}.status`),
                                type: t(`stations.${demo.id}.type`)
                            };
                            return (
                                <button
                                    key={demo.id}
                                    onClick={() => setActiveId(demo.id)}
                                    className={cn(
                                        "w-full text-left p-6 rounded-sm border transition-all flex flex-col gap-4 group relative overflow-hidden",
                                        activeId === demo.id
                                            ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                            : "bg-surface/40 border-primary/10 hover:border-primary/40"
                                    )}
                                >
                                    <div className="flex items-center justify-between relative z-10">
                                        <div className={cn(
                                            "px-2 py-0.5 rounded-sm text-[8px] font-mono font-black uppercase tracking-widest",
                                            d.status === 'Restricted' || d.status === 'Dibatasi'
                                                ? "bg-error/20 text-error border border-error/20"
                                                : "bg-primary/20 text-primary border border-primary/20"
                                        )}>
                                            {d.status}
                                        </div>
                                        <FaTerminal className={cn("transition-colors", activeId === demo.id ? "text-primary" : "text-text-muted opacity-20")} size={14} />
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className={cn("font-black text-sm uppercase tracking-tighter transition-colors", activeId === demo.id ? "text-primary" : "text-text-primary")}>
                                            {d.title}
                                        </h3>
                                        <p className="text-[9px] font-mono text-text-muted uppercase tracking-[0.2em] opacity-40 mt-1">{d.type}</p>
                                    </div>
                                    {activeId === demo.id && (
                                        <motion.div
                                            layoutId="station-active"
                                            className="absolute left-0 top-0 w-1 h-full bg-primary"
                                        />
                                    )}
                                </button>
                            );
                        })}

                        <Card className="p-8 border-warning/10 bg-warning/[0.02] mt-12 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <FaShieldAlt className="text-3xl text-warning" />
                            </div>
                            <div className="flex items-center gap-3 text-warning mb-4">
                                <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em]">{t('security_note.title')}</span>
                            </div>
                            <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest leading-relaxed opacity-60">
                                {t('security_note.desc')}
                            </p>
                        </Card>
                    </div>

                    {/* Interactive Console */}
                    <div className="lg:col-span-3">
                        <Card className="p-0 border-primary/10 bg-background overflow-hidden aspect-video flex flex-col relative group">
                            {/* Terminal Header */}
                            <div className="bg-white/[0.02] px-6 py-4 border-b border-white/5 flex items-center justify-between">
                                <div className="flex gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-error/30 group-hover:bg-error/50 transition-colors" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-warning/30 group-hover:bg-warning/50 transition-colors" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-success/30 group-hover:bg-success/50 transition-colors" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-[9px] font-mono text-text-muted uppercase tracking-[0.2em] opacity-40">
                                        AUTH: SESSION_SYMMETRIC
                                    </div>
                                    <div className="text-[10px] font-mono font-bold text-primary group-hover:text-primary transition-colors tracking-tighter uppercase">
                                        {t('terminal.root_at')}:~/{activeDemo.id}
                                    </div>
                                </div>
                            </div>

                            {/* Console Body */}
                            <div className="flex-1 p-12 font-mono overflow-hidden flex flex-col items-center justify-center text-center relative">
                                {/* Grid Background inside terminal */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeDemo.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="max-w-md relative z-10"
                                    >
                                        {activeDemo.status === 'Restricted' || activeDemo.status === 'Dibatasi' ? (
                                            <div className="flex flex-col items-center gap-10">
                                                <div className="relative">
                                                    <div className="w-24 h-24 rounded-sm bg-error/5 flex items-center justify-center border border-error/30 group/lock">
                                                        <FaLock className="text-error text-4xl group-hover:scale-110 transition-transform" />
                                                    </div>
                                                    <div className="absolute -inset-4 border border-error/10 animate-pulse" />
                                                </div>
                                                <div className="space-y-4">
                                                    <p className="text-error font-black text-xl uppercase tracking-tighter">{t('terminal.access_rejected')}</p>
                                                    <p className="text-text-muted text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 leading-relaxed px-8">{t('terminal.pii_warning')}</p>
                                                </div>
                                                <Button variant="outline" size="sm" className="border-error/30 text-error hover:bg-error/10 font-mono text-[10px] uppercase tracking-[0.3em] px-8 rounded-sm">
                                                    {t('terminal.request_access')}
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-10">
                                                <div className="relative">
                                                    <div className="w-24 h-24 rounded-sm bg-primary/5 flex items-center justify-center border border-primary/30">
                                                        <FaPlay className="text-primary text-4xl translate-x-1" />
                                                    </div>
                                                    <div className="absolute -inset-4 border border-primary/10 animate-pulse" />
                                                </div>
                                                <div className="space-y-4">
                                                    <p className="text-primary font-black text-xl uppercase tracking-tighter">{t('terminal.connected_ready')}</p>
                                                    <p className="text-text-muted text-[10px] font-mono uppercase tracking-[0.2em] opacity-60 leading-relaxed px-8">{activeDemo.description}</p>
                                                </div>
                                                <Button size="sm" className="gap-3 font-mono text-[10px] uppercase tracking-[0.3em] px-8 rounded-sm shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                                                    <FaExternalLinkAlt size={12} />
                                                    {t('terminal.open_preview')}
                                                </Button>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>

                                {/* Scanline inside terminal */}
                                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent h-20 w-full top-[-100%] animate-[scan_4s_linear_infinite]" />
                            </div>

                            {/* Status Bar */}
                            <div className="bg-white/[0.03] px-8 py-3 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                        <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest opacity-60">
                                            {t('terminal.latency')}: 24ms
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-info" />
                                        <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest opacity-60">
                                            {t('terminal.buffer')}: 100%
                                        </span>
                                    </div>
                                </div>
                                <div className="text-[10px] text-primary font-black font-mono tracking-[0.2em] uppercase">
                                    {t('terminal.secure_layer')} // AES-256
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

