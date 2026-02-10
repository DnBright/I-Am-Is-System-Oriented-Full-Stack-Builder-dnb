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
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="max-w-6xl mx-auto mb-12">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl font-bold mb-4"
                    >
                        {t.rich('title', {
                            span: (children) => <span className="text-primary">{children}</span>
                        })}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-text-secondary text-lg max-w-2xl"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Station Selector */}
                    <div className="lg:col-span-1 space-y-4">
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
                                        "w-full text-left p-6 rounded-xl border transition-all flex flex-col gap-2",
                                        activeId === demo.id
                                            ? "bg-surface border-primary glow-primary ring-1 ring-primary/20"
                                            : "bg-surface/50 border-border hover:border-text-muted"
                                    )}
                                >
                                    <div className="flex items-center justify-between">
                                        <Badge variant={d.status === 'Restricted' || d.status === 'Dibatasi' ? 'error' : 'success'} className="text-[10px] py-0 px-2">
                                            {d.status}
                                        </Badge>
                                        <FaTerminal className={activeId === demo.id ? "text-primary" : "text-text-muted"} size={12} />
                                    </div>
                                    <h3 className={cn("font-bold text-sm", activeId === demo.id ? "text-primary" : "text-text-primary")}>
                                        {d.title}
                                    </h3>
                                    <p className="text-[10px] text-text-muted uppercase tracking-widest">{d.type}</p>
                                </button>
                            );
                        })}

                        <Card className="p-6 bg-surface-elevated/50 mt-8">
                            <div className="flex items-center gap-3 text-warning mb-3">
                                <FaShieldAlt />
                                <span className="text-xs font-bold uppercase">{t('security_note.title')}</span>
                            </div>
                            <p className="text-[10px] text-text-secondary leading-relaxed">
                                {t('security_note.desc')}
                            </p>
                        </Card>
                    </div>

                    {/* Interactive Console */}
                    <div className="lg:col-span-3">
                        <Card className="p-0 border-border/60 bg-black overflow-hidden aspect-video flex flex-col relative">
                            {/* Terminal Header */}
                            <div className="bg-surface-elevated/80 px-4 py-3 border-b border-border flex items-center justify-between">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-error/50" />
                                    <div className="w-3 h-3 rounded-full bg-warning/50" />
                                    <div className="w-3 h-3 rounded-full bg-success/50" />
                                </div>
                                <div className="text-[10px] font-mono text-text-muted uppercase tracking-tighter">
                                    {t('terminal.root_at')}:~/{activeDemo.id}
                                </div>
                            </div>

                            {/* Console Body */}
                            <div className="flex-1 p-8 font-mono text-sm overflow-hidden flex flex-col items-center justify-center text-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeDemo.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="max-w-md"
                                    >
                                        {activeDemo.status === 'Restricted' || activeDemo.status === 'Dibatasi' ? (
                                            <div className="flex flex-col items-center gap-6">
                                                <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center border border-error/50">
                                                    <FaLock className="text-error text-3xl" />
                                                </div>
                                                <div>
                                                    <p className="text-error font-bold mb-2">{t('terminal.access_rejected')}</p>
                                                    <p className="text-text-secondary text-xs">{t('terminal.pii_warning')}</p>
                                                </div>
                                                <Button variant="outline" size="sm" className="border-error/50 text-error hover:bg-error/10">
                                                    {t('terminal.request_access')}
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-6">
                                                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/50">
                                                    <FaPlay className="text-primary text-3xl translate-x-1" />
                                                </div>
                                                <div>
                                                    <p className="text-primary font-bold mb-2">{t('terminal.connected_ready')}</p>
                                                    <p className="text-text-secondary text-xs">{activeDemo.description}</p>
                                                </div>
                                                <Button size="sm" className="gap-2">
                                                    <FaExternalLinkAlt size={12} />
                                                    {t('terminal.open_preview')}
                                                </Button>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Status Bar */}
                            <div className="bg-surface-elevated/40 px-6 py-2 border-t border-border flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-2 text-[10px] text-text-muted">
                                        <div className="w-1.5 h-1.5 rounded-full bg-success" />
                                        {t('terminal.latency')}: 24ms
                                    </span>
                                    <span className="flex items-center gap-2 text-[10px] text-text-muted">
                                        <div className="w-1.5 h-1.5 rounded-full bg-info" />
                                        {t('terminal.buffer')}: 100%
                                    </span>
                                </div>
                                <div className="text-[10px] text-primary font-bold font-mono">
                                    {t('terminal.secure_layer')}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

