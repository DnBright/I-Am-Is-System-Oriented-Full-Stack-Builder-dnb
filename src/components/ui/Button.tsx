import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, variant = 'primary', size = 'md', className, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg';

        const variants = {
            primary: 'bg-primary text-background hover:bg-primary-hover glow-primary hover:glow-primary-strong border border-primary/50',
            secondary: 'bg-surface-elevated text-text-primary hover:bg-border border border-border/50 hover:border-primary/30',
            outline: 'border-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary',
            ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface border border-transparent hover:border-border/50',
            danger: 'bg-error text-white hover:bg-error/90 border border-error/50'
        };

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg'
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
