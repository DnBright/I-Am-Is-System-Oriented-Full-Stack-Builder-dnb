'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { Link } from '@/navigation';
import { FaClock, FaFire, FaCode, FaTrophy, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
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
                    totalCommits: data?.totalCommits ?? 0,
                    averageCommitsPerDay: data?.averageCommitsPerDay ?? 0,
                    consistencyScore: data?.consistencyScore ?? 0,
                    currentStreak: data?.currentStreak ?? 0
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
        <section className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-20 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-px w-12 bg-primary/50" />
                            <span className="text-xs font-mono font-bold tracking-[0.3em] text-primary uppercase">System_Analytics</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-text-primary">
                            {t.rich('title', {
                                span: (chunks) => <span className="text-primary">{chunks}</span>
                            })}
                        </h2>
                        <p className="text-text-secondary text-lg font-light max-w-xl leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="relative overflow-visible group h-full">
                                    {loading ? (
                                        <Skeleton className="h-32 w-full" />
                                    ) : (
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className={`p-3 rounded-xl bg-primary-soft border border-border group-hover:scale-110 transition-transform ${stat.color}`}>
                                                    {stat.icon}
                                                </div>
                                                <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-widest">MT_{index.toString().padStart(2, '0')}</span>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs font-mono font-bold text-text-muted uppercase tracking-widest">{stat.label}</p>
                                                <h4 className="text-4xl font-bold text-text-primary tracking-tighter">
                                                    {stat.value}
                                                </h4>
                                            </div>
                                            <div className="h-1 w-full bg-primary-soft rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: '70%' }}
                                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                                    className={`h-full bg-gradient-to-r from-primary to-primary-hover`}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 flex justify-center">
                        <Link href="/analytics">
                            <Button size="lg" className="min-w-[240px] group">
                                {t('view_detailed')}
                                <FaArrowRight className="ml-3 text-xs group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
