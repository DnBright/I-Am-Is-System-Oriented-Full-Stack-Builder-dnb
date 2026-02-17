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
        <section className="py-24 relative overflow-visible bg-white border-y-[50px] border-text-primary">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto bg-background p-20 border-[30px] border-error rotate-2">
                    <div className="flex flex-col items-center text-center mb-16 bg-white p-10 border-[10px] border-dashed border-error animate-jitter">
                        <div className="inline-flex items-center gap-2 px-10 py-5 rounded-none bg-error border-[10px] border-white mb-4 animate-blink">
                            <span className="text-4xl font-black tracking-[0.5em] text-white uppercase italic">!!! ANALYTICS_HACKED !!!</span>
                        </div>
                        <h2 className="text-6xl md:text-9xl font-black text-error tracking-tighter mb-4 uppercase bg-text-primary p-6">
                            {t.rich('title', {
                                span: (chunks) => <span className="text-white underline decoration-wavy decoration-error">{chunks}</span>
                            })}
                        </h2>
                        <p className="text-white text-3xl font-black italic bg-error p-4 -rotate-1">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-20">
                        {stats.map((stat, index) => (
                            <Card key={index} className="p-0 border-[20px] border-black bg-white overflow-visible group hover:animate-spin-chaos">
                                {loading ? (
                                    <div className="p-8 space-y-4 text-8xl font-black text-error animate-blink">
                                        CALCULATING_CHAOS...
                                    </div>
                                ) : (
                                    <div className="p-10 relative bg-surface-elevated text-white">
                                        <div className="absolute -top-10 -right-10 p-10 bg-error border-[10px] border-white text-8xl z-20 animate-jitter">
                                            {stat.icon}
                                        </div>
                                        <div className={`${stat.color} mb-6 flex flex-col gap-3`}>
                                            <span className="text-4xl font-black uppercase tracking-widest bg-white text-background p-2">Metric_{index.toString().padStart(2, '0')}</span>
                                        </div>
                                        <div className="text-[10rem] font-black text-error m-0 leading-none tracking-tighter bg-text-primary p-10 border-b-[30px] border-white">
                                            {stat.value}
                                        </div>
                                        <div className="text-4xl font-black uppercase text-white tracking-widest bg-error mt-4 p-4 text-center line-through">
                                            {stat.label}
                                        </div>

                                        {/* Bottom Progress Bar Decoration (Chaotic) */}
                                        <div className="absolute bottom-[-20px] left-0 h-10 bg-primary/20 w-full animate-jitter">
                                            <div className="h-full bg-error w-full animate-blink" />
                                        </div>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-20">
                        <Link href="/analytics">
                            <Button variant="danger" size="lg" className="w-full h-40 animate-jitter">
                                !!! {t('view_detailed')} !!!
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
