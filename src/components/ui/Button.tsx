import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, variant = 'primary', size = 'md', className, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center font-bold tracking-tighter uppercase transition-none disabled:opacity-100 disabled:cursor-wait rounded-none border-[6px] active:scale-150';

        const variants = {
            primary: 'bg-primary text-error border-text-primary hover:animate-jitter hover:bg-white',
            secondary: 'bg-surface-elevated text-background border-primary hover:animate-spin-chaos',
            outline: 'border-dashed border-text-muted text-surface-elevated bg-white hover:bg-primary',
            ghost: 'text-text-muted border-transparent hover:border-text-primary hover:animate-blink',
            danger: 'bg-error text-background border-black animate-jitter uppercase italic'
        };

        const sizes = {
            sm: 'px-2 py-1 text-[8px]',
            md: 'px-12 py-6 text-2xl',
            lg: 'px-20 py-10 text-4xl'
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
