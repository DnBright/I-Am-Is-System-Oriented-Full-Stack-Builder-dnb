'use client';

import { ContributionDay } from '@/types/analytics';
import { cn } from '@/lib/utils';

interface ContributionHeatmapProps {
    data: ContributionDay[];
}

export default function ContributionHeatmap({ data }: ContributionHeatmapProps) {
    // Safety check for undefined or empty data
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-40 text-text-muted text-sm">
                No contribution data available
            </div>
        );
    }

    // Group by weeks
    const weeks: ContributionDay[][] = [];
    for (let i = 0; i < data.length; i += 7) {
        weeks.push(data.slice(i, i + 7));
    }

    const getLevelColor = (level: 0 | 1 | 2 | 3 | 4) => {
        const colors = {
            0: 'bg-surface-elevated',
            1: 'bg-primary/20',
            2: 'bg-primary/40',
            3: 'bg-primary/60',
            4: 'bg-primary'
        };
        return colors[level];
    };

    return (
        <div className="w-full overflow-x-auto">
            <div className="inline-flex gap-1">
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                        {week.map((day, dayIndex) => (
                            <div
                                key={`${weekIndex}-${dayIndex}`}
                                className={cn(
                                    'w-3 h-3 rounded-sm transition-all duration-200 hover:ring-2 hover:ring-primary',
                                    getLevelColor(day.level)
                                )}
                                title={`${day.date}: ${day.count} commits`}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-4 text-xs text-text-secondary">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                    <div
                        key={level}
                        className={cn('w-3 h-3 rounded-sm', getLevelColor(level as 0 | 1 | 2 | 3 | 4))}
                    />
                ))}
                <span>More</span>
            </div>
        </div>
    );
}
