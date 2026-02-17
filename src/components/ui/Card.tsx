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
                'rounded-xl p-8 border border-white/10 transition-all duration-300 relative group overflow-hidden',
                glass ? 'bg-surface/40 backdrop-blur-md' : 'bg-surface/60 backdrop-blur-sm',
                hover && 'hover:border-primary/50 hover:bg-surface/80 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)] hover:-translate-y-1',
                className
            )}
        >
            {/* Tech Corners */}
            <div className="absolute top-0 right-0 w-8 h-8 opacity-20 pointer-events-none">
                <div className="absolute top-4 right-4 w-2 h-2 border-t-2 border-r-2 border-primary" />
            </div>

            {/* Ambient Background Detail */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
}
