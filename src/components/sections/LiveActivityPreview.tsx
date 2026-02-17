'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { formatRelativeTime } from '@/lib/utils';
import { GitHubEvent } from '@/types/github';
import { Link } from '@/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaCodeBranch, FaGitAlt, FaHistory, FaArrowRight } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function LiveActivityPreview() {
    const t = useTranslations('LiveActivity');
    const [events, setEvents] = useState<GitHubEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPolling, setIsPolling] = useState(false);

    const fetchActivity = async () => {
        setIsPolling(true);
        try {
            const response = await fetch('/api/github/activity');
            const data = await response.json();

            // Filter out PushEvents with 0 commits
            const rawEvents = data?.events || [];
            const filteredEvents = (rawEvents as GitHubEvent[]).filter(event => {
                if (event.type === 'PushEvent') {
                    return (event.payload.commits?.length || 0) > 0;
                }
                return true;
            });

            setEvents(filteredEvents.slice(0, 5)); // Show only 5 latest
        } catch (error) {
            console.error('Failed to fetch activity:', error);
        } finally {
            setLoading(false);
            setTimeout(() => setIsPolling(false), 2000); // Visual feedback
        }
    };

    useEffect(() => {
        fetchActivity();
        const interval = setInterval(fetchActivity, 60000); // Poll every 60s
        return () => clearInterval(interval);
    }, []);

    const getEventIcon = (type: string) => {
        switch (type) {
            case 'PushEvent':
                return <FaGitAlt className="text-primary" />;
            case 'PullRequestEvent':
                return <FaCodeBranch className="text-info" />;
            case 'CreateEvent':
                return <FaHistory className="text-warning" />;
            default:
                return <FaGithub className="text-text-secondary" />;
        }
    };

    const renderEventContent = (event: GitHubEvent) => {
        const repoName = event.repo.name.split('/').pop() || event.repo.name;
        const repoUrl = `https://github.com/${event.repo.name}`;

        if (event.type === 'PushEvent') {
            const commits = event.payload.commits || [];

            return (
                <div className="space-y-4">
                    <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-bold text-xl hover:underline group/repo"
                    >
                        {repoName}
                    </a>
                    <div className="space-y-3">
                        {commits.slice(0, 3).map((commit, i) => (
                            <p key={i} className="text-text-secondary line-clamp-2 text-base leading-relaxed">
                                {commit.message}
                            </p>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-2">
                <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-bold text-xl hover:underline"
                >
                    {repoName}
                </a>
                <p className="text-text-secondary text-base">
                    {event.type === 'PullRequestEvent'
                        ? `${event.payload.action} Pull Request`
                        : event.type === 'CreateEvent'
                            ? `Created ${event.payload.ref_type}: ${event.payload.ref || 'Root'}`
                            : t('fallback_desc', { repo: '' })}
                </p>
            </div>
        );
    };

    return (
        <section className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-px w-12 bg-primary/50" />
                                <span className="text-xs font-mono font-bold tracking-[0.3em] text-primary uppercase">Live_System_Telemetry</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-text-primary">
                                {t.rich('title', {
                                    span: (chunks) => <span className="text-primary">{chunks}</span>
                                })}
                            </h2>
                            <p className="text-text-secondary text-lg font-light max-w-xl">
                                {t('subtitle')}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft border border-border">
                                <span className={`w-2 h-2 rounded-full ${isPolling ? 'bg-primary animate-pulse' : 'bg-success'}`} />
                                <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-widest leading-none">
                                    {isPolling ? 'Syncing_Node' : 'System_Stable'}
                                </span>
                            </div>
                            <Link href="/live">
                                <Button variant="outline" size="sm">
                                    {t('view_all_activity')}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {loading ? (
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <Skeleton key={i} className="h-40 w-full rounded-2xl" />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    {events.map((event, index) => (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Card className="p-0 border-border bg-surface/30 group hover:bg-surface/50">
                                                <div className="flex items-stretch">
                                                    <div className="w-1.5 bg-primary/20 group-hover:bg-primary transition-colors" />
                                                    <div className="flex-1 p-8 flex items-start gap-8">
                                                        <div className="w-14 h-14 rounded-xl bg-primary-soft border border-border flex items-center justify-center text-xl shrink-0 group-hover:border-primary/50 transition-colors">
                                                            {getEventIcon(event.type)}
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <div className="mb-4">
                                                                {renderEventContent(event)}
                                                            </div>

                                                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                                                                <div className="flex items-center gap-4 text-[10px] font-mono text-text-muted uppercase tracking-widest font-bold">
                                                                    <span className="flex items-center gap-2">
                                                                        <FaHistory className="text-[12px]" />
                                                                        {formatRelativeTime(event.created_at)}
                                                                    </span>
                                                                </div>
                                                                <a
                                                                    href={`https://github.com/${event.repo.name}/commit/${event.payload.commits?.[0]?.sha || ''}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-primary font-bold text-[10px] font-mono tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
                                                                >
                                                                    INSPECT_REVISION_LINK_DATA <FaArrowRight />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* More Activity Link */}
                        <div className="mt-12 text-center">
                            <Link href="/live" className="text-text-muted hover:text-primary transition-colors font-mono text-xs tracking-[0.2em] font-bold">
                                VIEW_FULL_TRAJECTORY_LOGS_ -&gt;
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
