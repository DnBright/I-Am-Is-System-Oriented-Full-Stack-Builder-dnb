import { cn } from '@/lib/utils';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
}

export default function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
    const variants = {
        text: 'h-4 w-full',
        circular: 'rounded-full',
        rectangular: 'rounded-lg'
    };

    return (
        <div
            className={cn(
                'animate-pulse bg-surface-elevated',
                variants[variant],
                className
            )}
        />
    );
}
