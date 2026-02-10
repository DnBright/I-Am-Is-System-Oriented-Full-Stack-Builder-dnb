'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import Link from 'next/link';
import { FaClock, FaFire, FaCode, FaTrophy } from 'react-icons/fa';

interface AnalyticsSummary {
    totalCommits: number;
    averageCommitsPerDay: number;
    consistencyScore: number;
    currentStreak: number;
}

export default function AnalyticsSummary() {
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
            label: 'Total Commits',
            value: analytics?.totalCommits || 0,
            color: 'text-primary'
        },
        {
            icon: <FaClock className="text-2xl" />,
            label: 'Avg Commits/Day',
            value: analytics?.averageCommitsPerDay.toFixed(1) || '0',
            color: 'text-info'
        },
        {
            icon: <FaTrophy className="text-2xl" />,
            label: 'Consistency Score',
            value: `${analytics?.consistencyScore || 0}%`,
            color: 'text-warning'
        },
        {
            icon: <FaFire className="text-2xl" />,
            label: 'Current Streak',
            value: `${analytics?.currentStreak || 0} days`,
            color: 'text-error'
        }
    ];

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4 text-text-primary">Coding Analytics</h2>
                        <p className="text-text-secondary">
                            Measurable work, transparent progress
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <Card key={index} glass hover className="p-6 text-center">
                                {loading ? (
                                    <div className="space-y-3">
                                        <Skeleton variant="circular" className="w-12 h-12 mx-auto" />
                                        <Skeleton className="h-8 w-20 mx-auto" />
                                        <Skeleton className="h-4 w-24 mx-auto" />
                                    </div>
                                ) : (
                                    <>
                                        <div className={`${stat.color} mb-4 flex justify-center`}>
                                            {stat.icon}
                                        </div>
                                        <div className="text-3xl font-bold text-text-primary mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-text-secondary">
                                            {stat.label}
                                        </div>
                                    </>
                                )}
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <Link
                            href="/analytics"
                            className="text-primary hover:text-primary-hover transition-colors inline-flex items-center gap-2"
                        >
                            View Detailed Analytics
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
