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
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 px-4">
                        <div>
                            <h2 className="text-4xl font-bold text-text-primary tracking-tighter mb-4">
                                {t.rich('title', {
                                    span: (chunks) => <span className="text-primary">{chunks}</span>
                                })}
                            </h2>
                            <p className="text-text-secondary text-lg max-w-lg opacity-80">
                                {t('subtitle')}
                            </p>
                        </div>
                        <Link href="/live" className="mt-6 md:mt-0">
                            <Button variant="ghost" className="group p-0 hover:bg-transparent">
                                <span className="flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-primary/80 group-hover:text-primary transition-colors">
                                    {t('view_all_link') || 'View All Activity'}
                                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                                </span>
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-0">
                        {loading ? (
                            <div className="space-y-12 px-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="flex items-start gap-8 opacity-20">
                                        <Skeleton variant="circular" className="w-10 h-10 bg-primary/20" />
                                        <div className="flex-1 space-y-4">
                                            <Skeleton className="h-6 w-1/4 bg-primary/10" />
                                            <Skeleton className="h-16 w-full bg-primary/10" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="divide-y divide-white/5 px-4">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    {events.map((event, index) => (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{
                                                duration: 0.4,
                                                delay: index * 0.05,
                                                ease: "easeOut"
                                            }}
                                            className="flex items-start gap-8 py-10 transition-all group"
                                        >
                                            <div className="flex flex-col items-center shrink-0 pt-1">
                                                <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center bg-background/50 text-xl group-hover:border-primary group-hover:text-primary transition-colors">
                                                    {getEventIcon(event.type)}
                                                </div>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="mb-4">
                                                    {renderEventContent(event)}
                                                </div>

                                                <div className="flex items-center gap-6 text-xs text-text-muted font-medium">
                                                    <span className="flex items-center gap-2">
                                                        <span className="w-1 h-1 bg-primary rounded-full" />
                                                        {formatRelativeTime(event.created_at)}
                                                    </span>
                                                    <a
                                                        href={`https://github.com/${event.repo.name}/commit/${event.payload.commits?.[0]?.sha || ''}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:text-primary transition-colors hover:underline"
                                                    >
                                                        View Changes
                                                    </a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
