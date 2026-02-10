'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { formatRelativeTime } from '@/lib/utils';
import { GitHubEvent } from '@/types/github';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';
import { FaGithub, FaCodeBranch, FaGitAlt } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function LiveActivityPreview() {
    const t = useTranslations('LiveActivity');
    const [events, setEvents] = useState<GitHubEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchActivity() {
            try {
                const response = await fetch('/api/github/activity');
                const data = await response.json();
                setEvents(data.events.slice(0, 5)); // Show only 5 latest
            } catch (error) {
                console.error('Failed to fetch activity:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchActivity();
    }, []);

    const getEventIcon = (type: string) => {
        switch (type) {
            case 'PushEvent':
                return <FaGitAlt className="text-primary" />;
            case 'PullRequestEvent':
                return <FaCodeBranch className="text-info" />;
            default:
                return <FaGithub className="text-text-secondary" />;
        }
    };

    const getEventDescription = (event: GitHubEvent) => {
        switch (event.type) {
            case 'PushEvent':
                const commitCount = event.payload.commits?.length || 0;
                return `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to ${event.repo.name}`;
            case 'PullRequestEvent':
                return `${event.payload.action} pull request in ${event.repo.name}`;
            case 'CreateEvent':
                return `Created ${event.payload.ref_type} in ${event.repo.name}`;
            default:
                return t('fallback_desc', { repo: event.repo.name });
        }
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

                    <Card className="border-primary/10 bg-surface/30 backdrop-blur-sm">
                        {loading ? (
                            <div className="space-y-6 p-4">
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
                                {events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex items-center gap-5 p-5 hover:bg-primary/[0.02] transition-all group"
                                    >
                                        <div className="w-12 h-12 rounded-sm border border-primary/10 bg-surface flex items-center justify-center flex-shrink-0 group-hover:border-primary/40 transition-colors relative">
                                            {getEventIcon(event.type)}
                                            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-primary/40" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <p className="text-text-primary font-medium truncate group-hover:text-primary transition-colors">
                                                    {getEventDescription(event)}
                                                </p>
                                                <span className="text-[10px] font-mono text-text-muted shrink-0 bg-surface/50 px-2 py-0.5 rounded border border-border">
                                                    {event.type.replace('Event', '')}
                                                </span>
                                            </div>
                                            <p className="text-text-muted text-[11px] font-mono uppercase tracking-wider">
                                                TIMESTAMP: {formatRelativeTime(event.created_at)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </section>
    );
}
