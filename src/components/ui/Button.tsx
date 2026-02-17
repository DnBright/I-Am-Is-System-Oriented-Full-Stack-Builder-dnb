import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, variant = 'primary', size = 'md', className, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg active:scale-[0.98]';

        const variants = {
            primary: 'bg-primary text-white border border-primary/20 hover:bg-primary-hover shadow-lg transition-all',
            secondary: 'bg-surface-elevated text-text-primary border border-border hover:bg-surface-elevated/80 transition-all',
            outline: 'border border-border text-text-primary hover:bg-primary-soft hover:border-primary/30 transition-all',
            ghost: 'text-text-secondary hover:text-primary hover:bg-primary-soft border-transparent transition-all',
            danger: 'bg-error text-white hover:bg-error/90 shadow-lg transition-all'
        };

        const sizes = {
            sm: 'h-9 px-4 text-xs',
            md: 'h-11 px-6 text-sm',
            lg: 'h-13 px-8 text-base font-bold'
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
