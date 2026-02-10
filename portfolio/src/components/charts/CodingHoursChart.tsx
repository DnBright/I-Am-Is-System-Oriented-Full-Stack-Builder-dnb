'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '@/components/ui/Card';

interface CodingHoursChartProps {
    data: Array<{ date: string; hours: number }>;
}

export default function CodingHoursChart({ data }: CodingHoursChartProps) {
    // Take last 14 days
    const chartData = data.slice(-14).map(item => ({
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        hours: item.hours
    }));

    return (
        <Card className="p-6">
            <h3 className="text-xl font-bold mb-2 text-text-primary">Coding Hours</h3>
            <p className="text-text-secondary text-sm mb-6">Last 14 days</p>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgb(31, 31, 31)" />
                    <XAxis
                        dataKey="date"
                        stroke="rgb(163, 163, 163)"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        stroke="rgb(163, 163, 163)"
                        style={{ fontSize: '12px' }}
                        label={{ value: 'Hours', angle: -90, position: 'insideLeft', fill: 'rgb(163, 163, 163)' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgb(17, 17, 17)',
                            border: '1px solid rgb(31, 31, 31)',
                            borderRadius: '8px',
                            color: 'rgb(229, 229, 229)'
                        }}
                        formatter={(value: number) => [`${value}h`, 'Coding Hours']}
                    />
                    <Bar
                        dataKey="hours"
                        fill="rgb(16, 185, 129)"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
}
