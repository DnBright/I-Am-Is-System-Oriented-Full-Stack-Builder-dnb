'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Skeleton from '@/components/ui/Skeleton';
import CommitTrendChart from '@/components/charts/CommitTrendChart';
import CodingHoursChart from '@/components/charts/CodingHoursChart';
import FocusAreaChart from '@/components/charts/FocusAreaChart';
import { AnalyticsData } from '@/types/analytics';
import { FaChartBar, FaBullseye, FaCalendarAlt, FaFire, FaClock } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function AnalyticsPage() {
    const t = useTranslations('Analytics');
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAnalytics() {
            try {
                const response = await fetch('/api/analytics');
                const analyticsData = await response.json();
                setData(analyticsData);
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchAnalytics();
    }, []);

    const statsCards = [
        { label: t('stats.consistency'), value: data ? `${data.consistencyScore}%` : '0%', icon: <FaBullseye />, color: 'text-primary' },
        { label: 'Avg Hours', value: data ? `${Math.round(data.totalCommits / 20 * 10) / 10}h` : '0h', icon: <FaClock />, color: 'text-info' },
        { label: t('stats.streak'), value: data ? `${data.currentStreak}d` : '0d', icon: <FaFire />, color: 'text-error' },
        { label: 'Activity', value: data ? `${data.totalCommits}` : '0', icon: <FaCalendarAlt />, color: 'text-warning' },
    ];

    return (
        <div className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 border border-primary/20 mb-4">
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-primary uppercase">Analytics_Engine // Observability_v4.2</span>
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase"
                    >
                        {t.rich('title', {
                            span: (children) => <span className="text-primary relative inline-block">
                                {children}
                                <motion.span
                                    className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                />
                            </span>
                        })}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-text-muted text-lg max-w-2xl font-mono uppercase tracking-widest opacity-60"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>

                <div className="max-w-6xl mx-auto space-y-12">
                    {/* Top Line Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {statsCards.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                            >
                                <Card className="p-8 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <div className="text-4xl">{stat.icon}</div>
                                    </div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className={`w-1 h-4 ${stat.color.replace('text-', 'bg-')}`} />
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-text-muted">
                                            {stat.label}
                                        </span>
                                    </div>
                                    <div className="text-4xl font-mono font-bold text-text-primary tracking-tighter">
                                        {loading ? <Skeleton className="h-10 w-24" /> : stat.value}
                                    </div>
                                    <div className="mt-4 flex items-center gap-2">
                                        <div className="flex-1 h-[2px] bg-white/5 overflow-hidden">
                                            <motion.div
                                                className={`h-full ${stat.color.replace('text-', 'bg-')}`}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '70%' }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                            />
                                        </div>
                                        <span className="text-[8px] font-mono text-text-muted opacity-40">NOMINAL_OVR</span>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Intensity Chart */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-0 border-primary/5 bg-surface/40 overflow-hidden">
                                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FaFire className="text-primary text-sm" />
                                        <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em]">{t('charts.commits')}</h3>
                                    </div>
                                    <span className="text-[9px] font-mono text-text-muted px-2 py-1 bg-white/5">0x7F2_INTENSITY</span>
                                </div>
                                <div className="p-8">
                                    {loading ? (
                                        <Skeleton className="h-[300px] w-full" />
                                    ) : (
                                        <CommitTrendChart data={data?.commitFrequency || []} />
                                    )}
                                </div>
                            </Card>
                        </motion.div>

                        {/* Time Distribution */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="p-0 border-primary/5 bg-surface/40 overflow-hidden">
                                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FaClock className="text-info text-sm" />
                                        <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em]">{t('charts.hours')}</h3>
                                    </div>
                                    <span className="text-[9px] font-mono text-text-muted px-2 py-1 bg-white/5">0x4B3_DISTRIBUTION</span>
                                </div>
                                <div className="p-8">
                                    {loading ? (
                                        <Skeleton className="h-[300px] w-full" />
                                    ) : (
                                        <CodingHoursChart data={data?.codingHours || []} />
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Focus Areas & Meta Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <Card className="p-0 border-primary/5 bg-surface/40 overflow-hidden h-full">
                                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <FaBullseye className="text-warning text-sm" />
                                        <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em]">{t('charts.focus')}</h3>
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="w-1 h-3 bg-primary/20" />
                                        ))}
                                    </div>
                                </div>
                                <div className="p-8">
                                    {loading ? (
                                        <Skeleton className="h-[300px] w-full" />
                                    ) : (
                                        <FocusAreaChart data={data?.focusAreas || []} />
                                    )}
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-10 h-full relative overflow-hidden group border-primary/10">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

                                <FaChartBar className="text-5xl text-primary mb-8 animate-pulse" />
                                <h3 className="text-2xl font-black mb-6 uppercase tracking-tighter">Architecture Insight</h3>
                                <p className="text-text-muted leading-relaxed mb-8 font-mono text-xs uppercase tracking-widest opacity-80">
                                    System patterns indicate heavy focus on backend scalability and atomic commits. Observability hooks are active and healthy.
                                </p>

                                <div className="space-y-6">
                                    <div className="p-4 bg-white/5 border border-white/5 rounded-sm">
                                        <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.2em] mb-3">
                                            <span className="text-text-muted">Stability Index</span>
                                            <span className="text-primary font-bold">94.2%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/5 overflow-hidden">
                                            <div className="h-full bg-primary w-[94%]" />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center px-2">
                                        <span className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em]">Health_Status</span>
                                        <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-[0.2em]">OPERATIONAL</span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
