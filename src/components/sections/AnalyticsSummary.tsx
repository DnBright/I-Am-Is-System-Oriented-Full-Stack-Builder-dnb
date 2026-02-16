'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { Link } from '@/navigation';
import { FaClock, FaFire, FaCode, FaTrophy } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

interface AnalyticsSummary {
    totalCommits: number;
    averageCommitsPerDay: number;
    consistencyScore: number;
    currentStreak: number;
}

export default function AnalyticsSummary() {
    const t = useTranslations('Analytics');
    const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAnalytics() {
            try {
                const response = await fetch('/api/analytics');
                const data = await response.json();
                setAnalytics({
                    totalCommits: data.totalCommits,
                    averageCommitsPerDay: data.averageCommitsPerDay,
                    consistencyScore: data.consistencyScore,
                    currentStreak: data.currentStreak
                });
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchAnalytics();
    }, []);

    const stats = [
        {
            icon: <FaCode className="text-2xl" />,
            label: t('stats.totalCommits'),
            value: analytics?.totalCommits || 0,
            color: 'text-primary'
        },
        {
            icon: <FaClock className="text-2xl" />,
            label: t('stats.avgCommits'),
            value: analytics?.averageCommitsPerDay.toFixed(1) || '0',
            color: 'text-info'
        },
        {
            icon: <FaTrophy className="text-2xl" />,
            label: t('stats.consistency'),
            value: `${analytics?.consistencyScore || 0}%`,
            color: 'text-warning'
        },
        {
            icon: <FaFire className="text-2xl" />,
            label: t('stats.streak'),
            value: `${analytics?.currentStreak || 0} ${t('stats.days')}`,
            color: 'text-error'
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col items-center text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 border border-primary/20 mb-4">
                            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-primary uppercase">Analytics_Engine // Connected</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight mb-4">
                            {t.rich('title', {
                                span: (chunks) => <span className="text-primary">{chunks}</span>
                            })}
                        </h2>
                        <p className="text-text-secondary max-w-2xl">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, index) => (
                            <Card key={index} className="p-0 border-primary/5 bg-surface/40 overflow-hidden group">
                                {loading ? (
                                    <div className="p-8 space-y-4">
                                        <Skeleton variant="circular" className="w-12 h-12 mx-auto bg-primary/10" />
                                        <Skeleton className="h-8 w-20 mx-auto bg-primary/5" />
                                        <Skeleton className="h-4 w-24 mx-auto bg-primary/5" />
                                    </div>
                                ) : (
                                    <div className="p-8 relative">
                                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-30 transition-opacity">
                                            {stat.icon}
                                        </div>
                                        <div className={`${stat.color} mb-6 flex items-center gap-3`}>
                                            <div className="w-8 h-8 rounded-sm bg-current/10 flex items-center justify-center">
                                                <div className="scale-75">{stat.icon}</div>
                                            </div>
                                            <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">Metric_{index.toString().padStart(2, '0')}</span>
                                        </div>
                                        <div className="text-4xl font-bold text-white mb-2 tracking-tight group-hover:translate-x-1 transition-transform">
                                            {stat.value}
                                        </div>
                                        <div className="text-[11px] font-mono uppercase text-text-muted tracking-wider">
                                            {stat.label}
                                        </div>

                                        {/* Bottom Progress Bar Decoration */}
                                        <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full">
                                            <div className={`h-full ${stat.color.replace('text-', 'bg-')} opacity-40 w-1/3`} />
                                        </div>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/analytics">
                            <Button variant="outline" className="min-w-[200px] font-mono text-xs uppercase tracking-[0.2em]">
                                {t('view_detailed')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
