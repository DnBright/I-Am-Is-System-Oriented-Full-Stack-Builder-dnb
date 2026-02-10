'use client';

import { motion } from 'framer-motion';

export default function BackgroundEffects() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-background">
            {/* Base Grid */}
            <div className="absolute inset-0 tech-grid opacity-30 animate-grid-pulse" />

            {/* Radial Gradient for Depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]" />

            {/* Scanline Effect */}
            <div className="absolute inset-0 scanline animate-scanline h-[200%] opacity-20" />

            {/* Animated Glow Points */}
            <motion.div
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"
            />
            <motion.div
                animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1.2, 1, 1.2],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-info/5 rounded-full blur-[150px]"
            />
        </div>
    );
}
