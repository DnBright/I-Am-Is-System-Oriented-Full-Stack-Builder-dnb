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
        const repoUrl = `https://github.com/${event.repo.name}`;

        if (event.type === 'PushEvent') {
            const commits = event.payload.commits || [];
            const branch = event.payload.ref?.replace('refs/heads/', '') || 'main';

            return (
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <a
                            href={repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary font-black uppercase tracking-tighter hover:underline flex items-center gap-2 group/repo"
                        >
                            {repoName}
                            <span className="text-[10px] text-text-muted font-mono opacity-40 group-hover/repo:opacity-100 italic transition-opacity">
                                @{event.repo.name.split('/')[0]}
                            </span>
                        </a>
                        <span className="px-2 py-0.5 rounded-full bg-primary/5 border border-primary/20 text-[9px] font-mono text-primary/80 uppercase">
                            {branch}
                        </span>
                    </div>
                    <div className="flex flex-col gap-2 border-l-2 border-primary/10 pl-4 py-1">
                        {commits.slice(0, 3).map((commit, i) => (
                            <div key={i} className="flex flex-col gap-0.5 group/commit">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-mono text-primary/40">[{commit.sha.slice(0, 7)}]</span>
                                    <p className="text-sm text-text-secondary line-clamp-1 font-mono group-hover/commit:text-white transition-colors italic">
                                        {commit.message}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {commits.length > 3 && (
                            <p className="text-[10px] text-text-muted uppercase tracking-widest mt-1 animate-pulse">
                                + {commits.length - 3} more primitives pushed...
                            </p>
                        )}
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
                    className="text-primary font-bold uppercase tracking-tighter hover:underline inline-block mb-1"
                >
                    {repoName}
                </a>
                <p className="text-text-primary text-sm font-medium group-hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-info/40 animate-pulse" />
                    {event.type === 'PullRequestEvent'
                        ? `${event.payload.action} PULL_REQUEST`
                        : event.type === 'CreateEvent'
                            ? `INITIALIZED ${event.payload.ref_type}: ${event.payload.ref || 'ROOT'}`
                            : t('fallback_desc', { repo: '' })}
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
                                <span className="text-[10px] font-mono text-primary/60 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    DataStream // System_Active
                                </span>
                                <div className="h-[1px] w-8 bg-primary/20" />
                                <motion.span
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-[8px] font-mono text-primary uppercase ml-2 px-1 border border-primary/20"
                                >
                                    AUTO_SYNC: 60s
                                </motion.span>
                                {isPolling && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-[8px] font-mono text-info uppercase animate-pulse"
                                    >
                                        [FETCHING_UPDATES...]
                                    </motion.span>
                                )}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
                                {t.rich('title', {
                                    span: (chunks) => <span className="text-primary">{chunks}</span>
                                })}
                            </h2>
                            <p className="text-text-secondary mt-2 max-w-lg font-mono text-xs uppercase opacity-60 tracking-wider">
                                {t('subtitle')}
                            </p>
                        </div>
                        <Link href="/live">
                            <Button variant="ghost" className="group border border-white/5 hover:border-primary/20">
                                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary/80 group-hover:text-primary transition-colors">
                                    Full_Log_Terminal
                                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                                </span>
                            </Button>
                        </Link>
                    </div>

                    <Card className="border-primary/10 bg-surface/30 backdrop-blur-md overflow-hidden relative">
                        {/* Technical accents */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 w-full h-[4px] bg-grid-white/[0.02]" />

                        {loading ? (
                            <div className="space-y-8 p-8">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex items-start gap-6 opacity-30">
                                        <Skeleton variant="circular" className="w-12 h-12 bg-primary/10" />
                                        <div className="flex-1 space-y-3">
                                            <Skeleton className="h-5 w-1/3 bg-primary/5" />
                                            <Skeleton className="h-12 w-full bg-primary/5" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="divide-y divide-white/5">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    {events.map((event, index) => (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: index * 0.05,
                                                ease: [0.23, 1, 0.32, 1]
                                            }}
                                            className="flex items-start gap-6 p-8 hover:bg-primary/[0.03] transition-all group relative"
                                        >
                                            <div className="absolute inset-y-0 left-0 w-[2px] bg-primary/0 group-hover:bg-primary/60 transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />

                                            <div className="flex flex-col items-center gap-3 shrink-0">
                                                <div className="w-12 h-12 rounded-sm border border-primary/20 bg-background/50 flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all relative z-10 overflow-hidden">
                                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    {getEventIcon(event.type)}
                                                    <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-primary/40 group-hover:border-primary" />
                                                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-primary/40 group-hover:border-primary" />
                                                </div>
                                                <img
                                                    src={event.actor.avatar_url}
                                                    alt={event.actor.login}
                                                    className="w-6 h-6 rounded-full border border-white/10 opacity-40 group-hover:opacity-100 transition-opacity"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0 pt-1">
                                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                                    {renderEventContent(event)}
                                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                                        <span className="text-[9px] font-mono text-primary font-bold tracking-[0.2em] bg-primary/5 px-2 py-1 border border-primary/10 rounded-xs uppercase">
                                                            {event.type.replace('Event', '')}
                                                        </span>
                                                        <span className="text-[10px] font-mono text-text-muted opacity-30 italic">
                                                            REF: 0x{event.id.slice(-6)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-6 text-[10px] font-mono text-text-muted uppercase tracking-widest opacity-40 group-hover:opacity-80 transition-opacity">
                                                        <span className="flex items-center gap-2">
                                                            <span className="w-1 h-1 bg-primary rounded-full" />
                                                            {formatRelativeTime(event.created_at)}
                                                        </span>
                                                        <span className="hidden sm:inline opacity-20">//</span>
                                                        <span className="hidden sm:inline">STAMP: {new Date(event.created_at).toLocaleTimeString()}</span>
                                                    </div>

                                                    <a
                                                        href={`https://github.com/${event.repo.name}/commit/${event.payload.commits?.[0]?.sha || ''}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[9px] font-mono text-primary/40 hover:text-primary uppercase tracking-tighter flex items-center gap-1 transition-colors"
                                                    >
                                                        [SOURCE_CTRL]
                                                        <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>_</motion.span>
                                                    </a>
                                                </div>
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
