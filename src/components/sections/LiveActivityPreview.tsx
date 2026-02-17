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
        <section className="py-32 relative overflow-hidden bg-primary/20 border-y-[30px] border-error">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto bg-white p-20 border-[20px] border-black rotate-1">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 px-4 bg-error text-white p-10 animate-jitter">
                        <div>
                            <h2 className="text-6xl font-black tracking-tighter mb-4 uppercase italic">
                                {t.rich('title', {
                                    span: (chunks) => <span className="text-background bg-white p-2">{chunks}</span>
                                })}
                            </h2>
                            <p className="text-white text-3xl font-black line-through decoration-white">
                                {t('subtitle')}
                            </p>
                        </div>
                        <Link href="/live" className="mt-6 md:mt-0">
                            <Button variant="primary" className="animate-spin-chaos text-4xl p-10">
                                !!! DATA_HACK !!!
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-10">
                        {loading ? (
                            <div className="space-y-12 px-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="flex items-start gap-8 animate-blink text-8xl text-error">
                                        LOADING_HACK_...
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-10 px-4">
                                <AnimatePresence mode="popLayout" initial={false}>
                                    {events.map((event, index) => (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 1, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1, rotate: index % 2 === 0 ? 2 : -2 }}
                                            className="flex items-start gap-8 py-10 transition-all group bg-background p-10 border-[10px] border-dashed border-primary"
                                        >
                                            <div className="flex flex-col items-center shrink-0 pt-1">
                                                <div className="w-20 h-20 rounded-none border-[10px] border-error flex items-center justify-center bg-white text-4xl animate-jitter">
                                                    {getEventIcon(event.type)}
                                                </div>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="mb-4 bg-white p-6 border-l-[30px] border-error">
                                                    {renderEventContent(event)}
                                                </div>

                                                <div className="flex flex-col gap-6 text-2xl text-error font-black uppercase italic bg-text-primary p-4">
                                                    <span className="flex items-center gap-2">
                                                        !!! {formatRelativeTime(event.created_at)} !!!
                                                    </span>
                                                    <a
                                                        href={`https://github.com/${event.repo.name}/commit/${event.payload.commits?.[0]?.sha || ''}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="bg-error text-white p-4 text-center animate-blink"
                                                    >
                                                        VIEW_THE_CRIME
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
