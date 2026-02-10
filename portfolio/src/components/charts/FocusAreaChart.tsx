'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Card from '@/components/ui/Card';

interface FocusAreaChartProps {
    data: Array<{ language: string; percentage: number }>;
}

const COLORS = [
    'rgb(16, 185, 129)',   // Primary green
    'rgb(59, 130, 246)',   // Blue
    'rgb(251, 191, 36)',   // Yellow
    'rgb(239, 68, 68)',    // Red
    'rgb(168, 85, 247)',   // Purple
    'rgb(236, 72, 153)',   // Pink
];

export default function FocusAreaChart({ data }: FocusAreaChartProps) {
    // Take top 6 languages
    const chartData = data.slice(0, 6).map(item => ({
        name: item.language,
        value: item.percentage
    }));

    return (
        <Card className="p-6">
            <h3 className="text-xl font-bold mb-6 text-text-primary">Focus Areas</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, value }) => `${name} ${value}%`}
                        labelLine={false}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgb(17, 17, 17)',
                            border: '1px solid rgb(31, 31, 31)',
                            borderRadius: '8px',
                            color: 'rgb(229, 229, 229)'
                        }}
                        formatter={(value: number) => `${value}%`}
                    />
                </PieChart>
            </ResponsiveContainer>
        </Card>
    );
}
