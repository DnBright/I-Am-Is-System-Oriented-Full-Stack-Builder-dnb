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


export default function AnalyticsPage() {
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
        { label: 'Consistency', value: data ? `${data.consistencyScore}%` : '0%', icon: <FaBullseye />, color: 'text-primary' },
        { label: 'Avg Hours', value: data ? `${Math.round(data.totalCommits / 20 * 10) / 10}h` : '0h', icon: <FaClock />, color: 'text-info' },
        { label: 'Streak', value: data ? `${data.currentStreak}d` : '0d', icon: <FaFire />, color: 'text-error' },
        { label: 'Activity', value: data ? `${data.totalCommits}` : '0', icon: <FaCalendarAlt />, color: 'text-warning' },
    ];

    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="max-w-6xl mx-auto mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold mb-4"
                    >
                        System <span className="text-primary">Analytics</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-text-secondary text-lg max-w-2xl"
                    >
                        Quantifying logic, intensity, and technical patterns over time.
                        Because if it's not measurable, it's not observable.
                    </motion.p>
                </div>

                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Top Line Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {statsCards.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                            >
                                <Card className="p-6 flex flex-col items-center text-center">
                                    <div className={`${stat.color} text-2xl mb-4`}>{stat.icon}</div>
                                    <div className="text-3xl font-mono font-bold text-text-primary">{loading ? <Skeleton className="h-8 w-16" /> : stat.value}</div>
                                    <div className="text-xs uppercase tracking-widest text-text-muted mt-2">{stat.label}</div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Intensity Chart */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {loading ? (
                                <Skeleton className="h-[400px] w-full rounded-xl" />
                            ) : (
                                <CommitTrendChart data={data?.commitFrequency || []} />
                            )}
                        </motion.div>

                        {/* Time Distribution */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {loading ? (
                                <Skeleton className="h-[400px] w-full rounded-xl" />
                            ) : (
                                <CodingHoursChart data={data?.codingHours || []} />
                            )}
                        </motion.div>
                    </div>

                    {/* Focus Areas & Meta Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="lg:col-span-2"
                        >
                            {loading ? (
                                <Skeleton className="h-[400px] w-full rounded-xl" />
                            ) : (
                                <FocusAreaChart data={data?.focusAreas || []} />
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <Card className="p-8 h-full flex flex-col justify-center">
                                <FaChartBar className="text-4xl text-primary mb-6" />
                                <h3 className="text-2xl font-bold mb-4">Architecture Insight</h3>
                                <p className="text-text-secondary leading-relaxed mb-6">
                                    Patterns indicate a heavy focus on system architecture and backend orchestration.
                                    Maintenance vs. Feature creation is balanced to ensure long-term stability.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-text-muted">Stability Index</span>
                                        <span className="text-primary font-mono">94.2%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[94%]" />
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
