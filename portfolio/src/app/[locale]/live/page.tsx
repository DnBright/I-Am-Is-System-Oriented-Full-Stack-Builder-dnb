'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Skeleton from '@/components/ui/Skeleton';
import ContributionHeatmap from '@/components/charts/ContributionHeatmap';
import { formatRelativeTime, formatDate } from '@/lib/utils';
import { GitHubEvent } from '@/types/github';
import { ContributionDay } from '@/types/analytics';
import { FaGithub, FaGitAlt, FaCodeBranch, FaHistory, FaSyncAlt, FaClock } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function LivePage() {
    const t = useTranslations('LiveActivity');
    const [events, setEvents] = useState<GitHubEvent[]>([]);
    const [heatmap, setHeatmap] = useState<ContributionDay[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<string>('');

    const fetchData = useCallback(async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        try {
            const [activityRes, analyticsRes] = await Promise.all([
                fetch('/api/github/activity'),
                fetch('/api/analytics')
            ]);

            const activityData = await activityRes.json();
            const analyticsData = await analyticsRes.json();

            setEvents(activityData.events);
            setHeatmap(analyticsData.contributionHeatmap);
            setLastUpdated(new Date().toISOString());
        } catch (error) {
            console.error('Failed to fetch live data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        // Auto-refresh every 60 seconds
        const interval = setInterval(() => fetchData(true), 60000);
        return () => clearInterval(interval);
    }, [fetchData]);

    const getEventIcon = (type: string) => {
        switch (type) {
            case 'PushEvent': return <FaGitAlt className="text-primary" />;
            case 'PullRequestEvent': return <FaCodeBranch className="text-info" />;
            default: return <FaGithub className="text-text-secondary" />;
        }
    };

    return (
        <div className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 border border-primary/20 mb-4">
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-primary uppercase">Command_Center // Live_Stream_Active</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between w-full max-w-6xl gap-8">
                        <div className="text-left">
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase"
                            >
                                {t.rich('title', {
                                    span: (children) => <span className="text-primary">{children}</span>
                                })}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-text-muted text-lg font-mono uppercase tracking-widest opacity-60"
                            >
                                {t('subtitle')}
                            </motion.p>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="text-right hidden sm:block">
                                <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] mb-1 opacity-40">System_Clock</p>
                                <p className="text-sm font-mono text-primary font-bold">
                                    {lastUpdated ? formatDate(lastUpdated) : 'NOT_SYNCED'}
                                </p>
                            </div>
                            <button
                                onClick={() => fetchData(true)}
                                disabled={refreshing}
                                className={cn(
                                    "px-6 py-3 rounded-sm border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-all flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em]",
                                    refreshing && "opacity-50"
                                )}
                            >
                                <FaSyncAlt className={cn("text-primary", refreshing && "animate-spin")} />
                                <span>{refreshing ? 'Refreshing...' : t('auto_refresh.on')}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Timeline */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="p-0 overflow-hidden border-primary/5 bg-surface/40">
                            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <FaHistory className="text-primary text-sm" />
                                    <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em]">Activity_Stream</h2>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-mono text-text-muted opacity-40">AUTO_LOG: ON</span>
                                    <div className="flex gap-1">
                                        {[...Array(3)].map((_, i) => (
                                            <div key={i} className="w-1 h-3 bg-primary/20" />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                {loading ? (
                                    <div className="space-y-8">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="flex gap-6">
                                                <Skeleton variant="circular" className="w-10 h-10 flex-shrink-0" />
                                                <div className="flex-1 space-y-3">
                                                    <Skeleton className="h-4 w-1/3" />
                                                    <Skeleton className="h-10 w-full" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="relative space-y-10 before:absolute before:inset-0 before:left-5 before:w-[1px] before:bg-primary/10">
                                        <AnimatePresence mode="popLayout">
                                            {events.map((event, index) => (
                                                <motion.div
                                                    key={event.id}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className="relative flex gap-8 group"
                                                >
                                                    <div className="relative z-10 w-10 h-10 rounded-sm bg-background border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:border-primary transition-all shadow-[0_0_15px_rgba(16,185,129,0)] group-hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                                                        {getEventIcon(event.type)}
                                                        <div className="absolute -inset-1 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                                                    </div>

                                                    <div className="flex-1 pb-10 border-b border-white/5 last:border-0 last:pb-0">
                                                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                                            <div className="flex items-center gap-3">
                                                                <h3 className="font-mono font-black text-text-primary tracking-tighter uppercase group-hover:text-primary transition-colors">
                                                                    {event.repo.name.split('/')[1]}
                                                                </h3>
                                                                <span className="text-[10px] font-mono text-text-muted opacity-30">0x{event.id.slice(-4)}</span>
                                                            </div>
                                                            <div className="px-2 py-0.5 rounded-sm bg-primary/5 border border-primary/10 text-[9px] font-mono font-bold text-primary tracking-widest uppercase">
                                                                {event.type.replace('Event', '')}
                                                            </div>
                                                        </div>

                                                        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-sm mb-4 group-hover:bg-white/[0.04] transition-colors">
                                                            <p className="text-text-muted text-sm leading-relaxed font-mono opacity-80 italic">
                                                                {event.type === 'PushEvent'
                                                                    ? event.payload.commits?.[0]?.message || t('fallback_desc', { repo: event.repo.name.split('/')[1] })
                                                                    : `Activity: ${event.type.replace('Event', '')}`}
                                                            </p>
                                                        </div>

                                                        <div className="flex items-center gap-4 text-[9px] font-mono text-text-muted uppercase tracking-widest opacity-40">
                                                            <span className="flex items-center gap-2">
                                                                <FaClock className="text-info/50" />
                                                                {formatRelativeTime(event.created_at)}
                                                            </span>
                                                            <span>//</span>
                                                            <span>STAMP: {formatDate(event.created_at)}</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-8">
                        <Card className="p-0 border-primary/5 bg-surface/40 overflow-hidden">
                            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em]">{t('heatmap.title')}</h3>
                                </div>
                                <span className="text-[9px] font-mono text-text-muted px-2 py-1 bg-white/5">FREQ_MAP</span>
                            </div>
                            <div className="p-6 overflow-hidden">
                                {loading ? (
                                    <Skeleton className="h-40 w-full" />
                                ) : (
                                    <ContributionHeatmap data={heatmap} />
                                )}
                                <p className="text-[10px] font-mono text-text-muted mt-8 leading-relaxed uppercase tracking-wider opacity-60">
                                    {t('heatmap.description')}
                                </p>
                            </div>
                        </Card>

                        <Card className="p-10 border-primary/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <FaGitAlt className="text-4xl text-primary" />
                            </div>
                            <h3 className="text-xl font-black mb-8 uppercase tracking-tighter">Work_Primitives</h3>
                            <ul className="space-y-6">
                                {[
                                    { title: "Transparency", desc: "Every commit is visible activity.", code: "TRP_01" },
                                    { title: "Consistency", desc: "Long-term output > Short-term bursts.", code: "CNS_02" },
                                    { title: "Atomicity", desc: "Small, meaningful system updates.", code: "ATM_03" }
                                ].map((p, i) => (
                                    <li key={i} className="flex gap-4 group/item">
                                        <div className="w-1 h-10 bg-primary/10 group-hover/item:bg-primary transition-all flex-shrink-0" />
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="text-xs font-mono font-bold text-text-primary uppercase tracking-widest">{p.title}</p>
                                                <span className="text-[8px] font-mono text-text-muted opacity-30">{p.code}</span>
                                            </div>
                                            <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider opacity-60">{p.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { cn } from '@/lib/utils';
