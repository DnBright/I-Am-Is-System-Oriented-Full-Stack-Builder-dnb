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
                'rounded-lg p-6 border transition-all duration-300 relative group overflow-hidden',
                glass ? 'glass' : 'bg-surface border-border',
                hover && 'hover:border-primary/40 hover:glow-primary',
                className
            )}
        >
            {/* Tech Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary/30 group-hover:border-primary/60 transition-colors" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary/30 group-hover:border-primary/60 transition-colors" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary/30 group-hover:border-primary/60 transition-colors" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary/30 group-hover:border-primary/60 transition-colors" />

            {/* Ambient Background Detail */}
            <div className="absolute inset-0 bg-primary/[0.01] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
