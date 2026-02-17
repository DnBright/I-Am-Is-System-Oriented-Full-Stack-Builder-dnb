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
            primary: 'bg-primary text-white border border-primary/20 hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] shadow-lg',
            secondary: 'bg-surface-elevated text-white border border-white/10 hover:bg-surface-elevated/80',
            outline: 'border border-white/10 text-white hover:bg-white/5 hover:border-white/20',
            ghost: 'text-text-secondary hover:text-white hover:bg-white/5 border-transparent',
            danger: 'bg-error text-white hover:bg-error/90'
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
