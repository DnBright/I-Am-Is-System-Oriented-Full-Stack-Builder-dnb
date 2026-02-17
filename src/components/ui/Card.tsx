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
                'rounded-none p-8 border-[8px] border-black transition-all duration-75 relative group overflow-hidden',
                glass ? 'bg-white' : 'bg-surface',
                hover && 'hover:animate-jitter hover:rotate-2 hover:scale-105',
                className
            )}
        >
            {/* Tech Corners - REMOVED for chaos */}
            <div className="absolute top-2 right-2 text-primary font-bold animate-blink">?!</div>

            {/* Ambient Background Detail */}
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
}
