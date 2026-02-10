import { cn } from '@/lib/utils';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
    className?: string;
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
    const variants = {
        success: 'bg-success/10 text-success border-success/20',
        warning: 'bg-warning/10 text-warning border-warning/20',
        error: 'bg-error/10 text-error border-error/20',
        info: 'bg-info/10 text-info border-info/20',
        default: 'bg-primary/10 text-primary border-primary/20'
    };

    return (
        <span className={cn(
            'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
}
