'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Card from '@/components/ui/Card';

interface CommitTrendChartProps {
    data: Array<{ date: string; count: number }>;
}

export default function CommitTrendChart({ data }: CommitTrendChartProps) {
    // Format data for chart
    const chartData = data.map(item => ({
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        commits: item.count
    }));

    return (
        <Card className="p-6">
            <h3 className="text-xl font-bold mb-6 text-text-primary">Commit Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="commitGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="rgb(16, 185, 129)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="rgb(16, 185, 129)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgb(31, 31, 31)" />
                    <XAxis
                        dataKey="date"
                        stroke="rgb(163, 163, 163)"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        stroke="rgb(163, 163, 163)"
                        style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgb(17, 17, 17)',
                            border: '1px solid rgb(31, 31, 31)',
                            borderRadius: '8px',
                            color: 'rgb(229, 229, 229)'
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="commits"
                        stroke="rgb(16, 185, 129)"
                        strokeWidth={2}
                        fill="url(#commitGradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
    );
}
