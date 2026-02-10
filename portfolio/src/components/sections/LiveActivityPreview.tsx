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
import { FaGithub, FaCodeBranch, FaGitAlt, FaHistory } from 'react-icons/fa';
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
            const filteredEvents = (data.events as GitHubEvent[]).filter(event => {
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

        if (event.type === 'PushEvent') {
            const commits = event.payload.commits || [];
            const branch = event.payload.ref?.replace('refs/heads/', '') || 'main';

            return (
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-primary font-bold uppercase tracking-tighter">{repoName}</span>
                        <span className="text-[10px] text-text-muted font-mono">{branch}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-primary/10 pl-3">
                        {commits.slice(0, 2).map((commit, i) => (
                            <p key={i} className="text-sm text-text-secondary line-clamp-1 italic font-mono group-hover:text-white transition-colors">
                                <span className="text-primary/40 mr-2">»</span>
                                {commit.message}
                            </p>
                        ))}
                        {commits.length > 2 && (
                            <p className="text-[10px] text-text-muted uppercase tracking-widest mt-1">
                                + {commits.length - 2} more commits
                            </p>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-1">
                <p className="text-text-primary font-medium group-hover:text-primary transition-colors">
                    {event.type === 'PullRequestEvent'
                        ? `${event.payload.action} PR in ${repoName}`
                        : event.type === 'CreateEvent'
                            ? `Created ${event.payload.ref_type} ${event.payload.ref || ''} in ${repoName}`
                            : t('fallback_desc', { repo: repoName })}
                </p>
            </div>
        );
    };

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div className="relative">
                            <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-primary/20" />
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em]">DataStream // Active</span>
                                <div className="h-[1px] w-8 bg-primary/20" />
                                <motion.span
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-[8px] font-mono text-primary uppercase ml-2"
                                >
                                    ● Live_Sync
                                </motion.span>
                                {isPolling && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-[8px] font-mono text-info uppercase"
                                    >
                                        [Updating...]
                                    </motion.span>
                                )}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
                                {t.rich('title', {
                                    span: (chunks) => <span className="text-primary">{chunks}</span>
                                })}
                            </h2>
                            <p className="text-text-secondary mt-2 max-w-lg">{t('subtitle')}</p>
                        </div>
                        <Link href="/live">
                            <Button variant="ghost" className="group">
                                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
                                    {t('view_all')}
                                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                                </span>
                            </Button>
                        </Link>
                    </div>

                    <Card className="border-primary/10 bg-surface/30 backdrop-blur-sm overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                        {loading ? (
                            <div className="space-y-6 p-6">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex items-start gap-4 opacity-50">
                                        <Skeleton variant="circular" className="w-10 h-10 bg-primary/10" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-3/4 bg-primary/5" />
                                            <Skeleton className="h-3 w-1/2 bg-primary/5" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="divide-y divide-primary/5">
                                <AnimatePresence mode="popLayout">
                                    {events.map((event, index) => (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-center gap-5 p-6 hover:bg-primary/[0.04] transition-all group relative overflow-hidden"
                                        >
                                            <div className="absolute inset-y-0 left-0 w-[1px] bg-primary/0 group-hover:bg-primary/40 transition-all" />
                                            <div className="w-12 h-12 rounded-sm border border-primary/10 bg-surface flex items-center justify-center flex-shrink-0 group-hover:border-primary/40 transition-colors relative z-10">
                                                {getEventIcon(event.type)}
                                                <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-primary/40" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-4 mb-2">
                                                    {renderEventContent(event)}
                                                    <span className="text-[10px] font-mono text-text-muted shrink-0 bg-surface/50 px-2 py-0.5 rounded border border-border group-hover:border-primary/20 transition-colors uppercase">
                                                        {event.type.replace('Event', '')}
                                                    </span>
                                                </div>
                                                <p className="text-text-muted text-[11px] font-mono uppercase tracking-wider flex items-center gap-2">
                                                    <span className="w-1 h-3 bg-primary/10" />
                                                    TIMESTAMP: {formatRelativeTime(event.created_at)}
                                                    <span className="opacity-20">//</span>
                                                    ID: 0x{event.id.slice(-4)}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </section>
    );
}
