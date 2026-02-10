import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
    children: ReactNode;
    className?: string;
    glass?: boolean;
    hover?: boolean;
}

export default function Card({ children, className = '', glass = false, hover = true }: CardProps) {
    return (
        <div
            className={cn(
                'rounded-xl p-6 border',
                glass ? 'glass' : 'bg-surface border-border',
                hover && 'hover:border-primary/50 transition-all duration-300',
                className
            )}
        >
            {children}
        </div>
    );
}
