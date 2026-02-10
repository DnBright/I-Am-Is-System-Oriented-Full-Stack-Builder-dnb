'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Skeleton from '@/components/ui/Skeleton';
import { formatRelativeTime } from '@/lib/utils';
import { GitHubEvent } from '@/types/github';
import Link from 'next/link';
import { FaGithub, FaCodeBranch, FaGitAlt } from 'react-icons/fa';

export default function LiveActivityPreview() {
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
                return `Activity in ${event.repo.name}`;
        }
    };

    return (
        <section className="py-20 bg-surface">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-4xl font-bold mb-2 text-text-primary">Live GitHub Activity</h2>
                            <p className="text-text-secondary">Real-time updates from my repositories</p>
                        </div>
                        <Link href="/live">
                            <Badge variant="info">View All</Badge>
                        </Link>
                    </div>

                    <Card className="p-6">
                        {loading ? (
                            <div className="space-y-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <Skeleton variant="circular" className="w-10 h-10" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-3/4" />
                                            <Skeleton className="h-3 w-1/2" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-surface-elevated transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center flex-shrink-0">
                                            {getEventIcon(event.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-text-primary font-medium">
                                                {getEventDescription(event)}
                                            </p>
                                            <p className="text-text-secondary text-sm mt-1">
                                                {formatRelativeTime(event.created_at)}
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
