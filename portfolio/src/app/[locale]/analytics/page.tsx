'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Skeleton from '@/components/ui/Skeleton';
import CommitTrendChart from '@/components/charts/CommitTrendChart';
import CodingHoursChart from '@/components/charts/CodingHoursChart';
import FocusAreaChart from '@/components/charts/FocusAreaChart';
import ContributionHeatmap from '@/components/charts/ContributionHeatmap';
import { AnalyticsData, ContributionDay } from '@/types/analytics';
import { GitHubEvent } from '@/types/github';
import { formatRelativeTime, formatDate } from '@/lib/utils';
import { FaChartBar, FaBullseye, FaCalendarAlt, FaFire, FaClock, FaHistory, FaSyncAlt, FaGitAlt, FaCodeBranch, FaGithub } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export default function AnalyticsPage() {
    const t = useTranslations('Analytics');
    const tLive = useTranslations('LiveActivity');

    // State
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
    const [events, setEvents] = useState<GitHubEvent[]>([]);
    const [heatmap, setHeatmap] = useState<ContributionDay[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<string>('');

    // Fetch Data
    const fetchData = useCallback(async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        try {
            // Add cache-busting parameter to force fresh data
            const timestamp = new Date().getTime();
            const [analyticsRes, activityRes] = await Promise.all([
                fetch(`/api/analytics?t=${timestamp}`),
                fetch(`/api/github/activity?t=${timestamp}`)
            ]);

            const aData = await analyticsRes.json();
            const actData = await activityRes.json();

            setAnalyticsData(aData);
            setHeatmap(aData.contributionHeatmap);

            // Use events directly from API (already filtered server-side)
            setEvents(actData.events as GitHubEvent[]);

            setLastUpdated(new Date().toISOString());
        } catch (error) {
            console.error('Failed to fetch unified data:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => fetchData(true), 60000);
        return () => clearInterval(interval);
    }, [fetchData]);

    const getEventIcon = (type: string) => {
        switch (type) {
            case 'PushEvent': return <FaGitAlt className="text-primary" />;
            case 'PullRequestEvent': return <FaCodeBranch className="text-info" />;
            case 'IssuesEvent': return <FaGithub className="text-warning" />;
            case 'CreateEvent': return <FaCodeBranch className="text-success" />;
            case 'ReleaseEvent': return <FaFire className="text-error" />;
            case 'WatchEvent': return <FaGithub className="text-primary" />;
            case 'ForkEvent': return <FaCodeBranch className="text-info" />;
            default: return <FaGithub className="text-text-secondary" />;
        }
    };

    const statsCards = [
        { label: t('stats.consistency'), value: analyticsData ? `${analyticsData.consistencyScore}%` : '0%', icon: <FaBullseye />, color: 'text-primary' },
        { label: 'Avg Hours', value: analyticsData ? `${Math.round(analyticsData.totalCommits / 20 * 10) / 10}h` : '0h', icon: <FaClock />, color: 'text-info' },
        { label: t('stats.streak'), value: analyticsData ? `${analyticsData.currentStreak}d` : '0d', icon: <FaFire />, color: 'text-error' },
        { label: 'Activity', value: analyticsData ? `${analyticsData.totalCommits}` : '0', icon: <FaCalendarAlt />, color: 'text-warning' },
    ];

    return (
        <div className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 border border-primary/20 mb-4">
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-primary uppercase">Analytics_Engine // Live_Observability</span>
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black mb-6 tracking-tighter uppercase"
                    >
                        {t.rich('title', {
                            span: (children) => <span className="text-primary">{children}</span>
                        })} <span className="text-primary">&</span> {tLive.rich('title', {
                            span: (children) => <span className="text-primary">{children}</span>
                        })}
                    </motion.h1>

                    <div className="flex items-center gap-4 mt-4 text-xs font-mono text-text-muted">
                        <span className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${refreshing ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`} />
                            {refreshing ? 'SYNCING...' : 'LIVE_CONNECTION_ACTIVE'}
                        </span>
                        <span className="opacity-30">|</span>
                        <span>LAST_SYNC: {lastUpdated ? formatRelativeTime(lastUpdated) : '...'}</span>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto space-y-16">
                    {/* Top Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {statsCards.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                            >
                                <Card className="p-6 relative overflow-hidden group border-white/5 bg-surface/40 hover:border-primary/20 transition-colors">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`text-2xl ${stat.color}`}>{stat.icon}</div>
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-muted">{stat.label}</span>
                                    </div>
                                    <div className="text-3xl font-mono font-bold text-white tracking-tighter">
                                        {loading ? <Skeleton className="h-8 w-16" /> : stat.value}
                                    </div>
                                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary/50 to-transparent w-full opacity-30" />
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* LEFT COLUMN: Activity Stream & Heatmap (Live Aspect) */}
                        <div className="lg:col-span-8 space-y-10">
                            {/* Activity Stream */}
                            <Card className="p-0 overflow-hidden border-primary/5 bg-surface/30">
                                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
                                    <div className="flex items-center gap-3">
                                        <FaHistory className="text-primary text-sm" />
                                        <h2 className="text-xs font-mono font-bold uppercase tracking-[0.2em]">
                                            {tLive.rich('title', {
                                                span: (children) => <span className="text-primary">{children}</span>
                                            })}
                                        </h2>
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(3)].map((_, i) => <div key={i} className="w-1 h-3 bg-primary/20" />)}
                                    </div>
                                </div>
                                <div className="p-8 max-h-[600px] overflow-y-auto custom-scrollbar">
                                    {loading ? (
                                        <div className="space-y-6">
                                            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}
                                        </div>
                                    ) : (
                                        <div className="relative space-y-8 before:absolute before:top-2 before:bottom-2 before:left-5 before:w-[1px] before:bg-primary/10">
                                            <AnimatePresence>
                                                {events.map((event, index) => (
                                                    <motion.div
                                                        key={event.id}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        className="relative flex gap-6 group pl-2"
                                                    >
                                                        <div className="relative z-10 w-8 h-8 rounded-sm bg-background border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:border-primary transition-colors">
                                                            <div className="text-xs">{getEventIcon(event.type)}</div>
                                                        </div>
                                                        <div className="flex-1 pb-8 border-b border-white/5 last:border-0 last:pb-0">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-1.5 py-0.5 rounded-[2px] tracking-widest">
                                                                        {event.type.replace('Event', '')}
                                                                    </span>
                                                                    <a
                                                                        href={`https://github.com/${event.repo.name}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-xs font-mono text-white/80 hover:text-primary transition-colors hover:underline"
                                                                    >
                                                                        {event.repo.name.split('/')[1]}
                                                                    </a>
                                                                    {event.payload.ref && (
                                                                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white/5 rounded-full border border-white/10">
                                                                            <FaCodeBranch className="text-[8px] text-text-muted" />
                                                                            <span className="text-[9px] font-mono text-text-muted lowercase">
                                                                                {event.payload.ref.replace('refs/heads/', '')}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <span className="text-[9px] font-mono text-text-muted opacity-50 whitespace-nowrap uppercase tracking-tighter">
                                                                    {formatRelativeTime(event.created_at)}
                                                                </span>
                                                            </div>

                                                            <div className="space-y-2">
                                                                {event.type === 'PushEvent' && event.payload.commits ? (
                                                                    <div className="flex flex-col gap-2">
                                                                        {event.payload.commits.slice(0, 3).map((commit) => (
                                                                            <div key={commit.sha} className="group/commit flex items-start gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-sm hover:bg-white/[0.04] transition-colors">
                                                                                <div className="mt-1 w-1 h-3 bg-primary/20 group-hover/commit:bg-primary transition-colors" />
                                                                                <div className="flex-1">
                                                                                    <div className="flex items-center justify-between mb-0.5">
                                                                                        <a
                                                                                            href={`https://github.com/${event.repo.name}/commit/${commit.sha}`}
                                                                                            target="_blank"
                                                                                            rel="noopener noreferrer"
                                                                                            className="text-[10px] font-mono text-primary/60 hover:text-primary transition-colors"
                                                                                        >
                                                                                            {commit.sha.substring(0, 7)}
                                                                                        </a>
                                                                                    </div>
                                                                                    <p className="text-xs text-text-muted font-mono leading-relaxed line-clamp-2">
                                                                                        {commit.message}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                        {event.payload.commits.length > 3 && (
                                                                            <div className="text-[9px] font-mono text-text-muted pl-4 opacity-50 italic">
                                                                                + {event.payload.commits.length - 3} more commits...
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-sm">
                                                                        <p className="text-xs text-text-muted font-mono leading-relaxed italic opacity-70 uppercase tracking-widest text-[9px]">
                                                                            {(() => {
                                                                                switch (event.type) {
                                                                                    case 'PullRequestEvent':
                                                                                        return `PR ${event.payload.action || 'updated'}: ${event.payload.ref || 'System_Update'}`;
                                                                                    case 'IssuesEvent':
                                                                                        return `Issue ${event.payload.action || 'updated'}`;
                                                                                    case 'CreateEvent':
                                                                                        return `Created ${event.payload.ref_type}: ${event.payload.ref || 'new branch'}`;
                                                                                    case 'ReleaseEvent':
                                                                                        return `Released version ${event.payload.ref || 'new release'}`;
                                                                                    case 'WatchEvent':
                                                                                        return `⭐ Repository starred`;
                                                                                    case 'ForkEvent':
                                                                                        return `🍴 Repository forked`;
                                                                                    default:
                                                                                        return 'System_Activity_Logged';
                                                                                }
                                                                            })()}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    )}
                                </div>
                            </Card>

                            {/* Heatmap */}
                            <Card className="p-0 border-primary/5 bg-surface/30 overflow-hidden">
                                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
                                    <div className="flex items-center gap-3">
                                        <FaCalendarAlt className="text-primary text-sm" />
                                        <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em]">Contribution Map</h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    {loading ? <Skeleton className="h-40 w-full" /> : <ContributionHeatmap data={heatmap} />}
                                </div>
                            </Card>
                        </div>

                        {/* RIGHT COLUMN: Charts & Metrics (Analytics Aspect) */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Intensity Chart */}
                            <Card className="p-0 border-primary/5 bg-surface/30 overflow-hidden">
                                <div className="p-5 border-b border-white/5 flex items-center justify-between bg-black/20">
                                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                                        <FaFire className="text-warning" /> {t('charts.commits')}
                                    </h3>
                                </div>
                                <div className="p-6">
                                    {loading ? <Skeleton className="h-[200px]" /> : <CommitTrendChart data={analyticsData?.commitFrequency || []} />}
                                </div>
                            </Card>

                            {/* Hours Chart */}
                            <Card className="p-0 border-primary/5 bg-surface/30 overflow-hidden">
                                <div className="p-5 border-b border-white/5 flex items-center justify-between bg-black/20">
                                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                                        <FaClock className="text-info" /> {t('charts.hours')}
                                    </h3>
                                </div>
                                <div className="p-6">
                                    {loading ? <Skeleton className="h-[200px]" /> : <CodingHoursChart data={analyticsData?.codingHours || []} />}
                                </div>
                            </Card>

                            {/* Focus Area */}
                            <Card className="p-0 border-primary/5 bg-surface/30 overflow-hidden">
                                <div className="p-5 border-b border-white/5 flex items-center justify-between bg-black/20">
                                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                                        <FaBullseye className="text-success" /> {t('charts.focus')}
                                    </h3>
                                </div>
                                <div className="p-6">
                                    {loading ? <Skeleton className="h-[200px]" /> : <FocusAreaChart data={analyticsData?.focusAreas || []} />}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
