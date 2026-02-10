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
import { FaGithub, FaGitAlt, FaCodeBranch, FaHistory, FaSyncAlt } from 'react-icons/fa';
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
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="max-w-6xl mx-auto mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-5xl font-bold mb-4"
                            >
                                {t.rich('title', {
                                    span: (children) => <span className="text-primary">{children}</span>
                                })}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-text-secondary text-lg"
                            >
                                {t('subtitle')}
                            </motion.p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-text-muted uppercase tracking-widest mb-1">Last Synced</p>
                                <p className="text-sm font-mono text-text-secondary">
                                    {lastUpdated ? formatRelativeTime(lastUpdated) : 'Never'}
                                </p>
                            </div>
                            <button
                                onClick={() => fetchData(true)}
                                disabled={refreshing}
                                className={cn(
                                    "p-3 rounded-lg border border-border bg-surface hover:bg-surface-elevated transition-all flex items-center gap-2 px-4",
                                    refreshing && "animate-spin"
                                )}
                            >
                                <FaSyncAlt className={refreshing ? "text-primary" : "text-text-secondary"} />
                                <span className="text-sm font-medium">
                                    {refreshing ? 'Refreshing...' : t('auto_refresh.on')}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Timeline */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="p-0 overflow-hidden">
                            <div className="p-6 border-b border-border flex items-center gap-3">
                                <FaHistory className="text-primary" />
                                <h2 className="text-xl font-bold">Activity Timeline</h2>
                            </div>

                            <div className="p-6">
                                {loading ? (
                                    <div className="space-y-6">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="flex gap-4">
                                                <Skeleton variant="circular" className="w-10 h-10 flex-shrink-0" />
                                                <div className="flex-1 space-y-2">
                                                    <Skeleton className="h-5 w-1/2" />
                                                    <Skeleton className="h-4 w-full" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="relative space-y-8 before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-border">
                                        <AnimatePresence mode="popLayout">
                                            {events.map((event, index) => (
                                                <motion.div
                                                    key={event.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className="relative flex gap-6 group"
                                                >
                                                    <div className="relative z-10 w-10 h-10 rounded-full bg-surface border-2 border-border flex items-center justify-center flex-shrink-0 group-hover:border-primary transition-colors">
                                                        {getEventIcon(event.type)}
                                                    </div>

                                                    <div className="flex-1 pb-8 border-b border-border last:border-0 last:pb-0">
                                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                                            <h3 className="font-bold text-text-primary">
                                                                {event.repo.name.split('/')[1]}
                                                            </h3>
                                                            <Badge variant="info" className="text-[10px] uppercase font-mono">
                                                                {event.type.replace('Event', '')}
                                                            </Badge>
                                                        </div>

                                                        <p className="text-text-secondary text-sm mb-3">
                                                            {event.type === 'PushEvent'
                                                                ? event.payload.commits?.[0]?.message || t('fallback_desc', { repo: event.repo.name.split('/')[1] })
                                                                : `Activity: ${event.type.replace('Event', '')}`}
                                                        </p>

                                                        <div className="flex items-center gap-4 text-xs text-text-muted">
                                                            <span>{formatDate(event.created_at)}</span>
                                                            <span>•</span>
                                                            <span>{formatRelativeTime(event.created_at)}</span>
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
                        <Card className="p-6">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                {t('heatmap.title')}
                            </h3>
                            <div className="overflow-hidden">
                                {loading ? (
                                    <Skeleton className="h-40 w-full" />
                                ) : (
                                    <ContributionHeatmap data={heatmap} />
                                )}
                            </div>
                            <p className="text-xs text-text-muted mt-6 leading-relaxed">
                                {t('heatmap.description')}
                            </p>
                        </Card>

                        <Card className="p-6">
                            <h3 className="text-lg font-bold mb-4">Work Principles</h3>
                            <ul className="space-y-4">
                                {[
                                    { title: "Transparency", desc: "Every commit is visible activity." },
                                    { title: "Consistency", desc: "Long-term output > Short-term bursts." },
                                    { title: "Atomicity", desc: "Small, meaningful system updates." }
                                ].map((p, i) => (
                                    <li key={i} className="flex gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-bold text-text-primary">{p.title}</p>
                                            <p className="text-xs text-text-secondary">{p.desc}</p>
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
