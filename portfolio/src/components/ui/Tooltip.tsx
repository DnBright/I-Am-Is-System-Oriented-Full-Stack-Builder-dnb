import { ReactNode } from 'react';

interface TooltipProps {
    children: ReactNode;
    text: string;
}

export default function Tooltip({ children, text }: TooltipProps) {
    return (
        <div className="relative group inline-block">
            {children}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {text}
            </div>
        </div>
    );
}
