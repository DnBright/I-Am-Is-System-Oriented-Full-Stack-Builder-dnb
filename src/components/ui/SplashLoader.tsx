'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashLoader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [textIndex, setTextIndex] = useState(0);

    const loadingTexts = [
        "INITIALIZING SYSTEM CORE...",
        "LOADING ASSETS...",
        "ESTABLISHING SECURE CONNECTION...",
        "PREPARING UI MANIFEST...",
        "SYSTEM READY."
    ];

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = 'hidden';

        // Text update interval
        const textInterval = setInterval(() => {
            setTextIndex(prev => (prev < loadingTexts.length - 1 ? prev + 1 : prev));
        }, 500);

        // Progress interval
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const next = prev + Math.floor(Math.random() * 15) + 5;
                if (next >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        setIsLoading(false);
                        document.body.style.overflow = 'unset';
                    }, 800);
                    return 100;
                }
                return next;
            });
        }, 150);

        return () => {
            clearInterval(textInterval);
            clearInterval(progressInterval);
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-primary font-mono overflow-hidden"
                >
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

                    <div className="relative z-10 w-full max-w-sm px-6 flex flex-col items-center">
                        {/* Status badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-sm mb-12"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">DNB_SYSTEM_BOOT_LDR</span>
                        </motion.div>

                        <div className="w-full text-center mb-8">
                            <motion.div
                                key={textIndex}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[10px] md:text-xs uppercase tracking-widest text-text-muted mb-4 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] h-4"
                            >
                                {loadingTexts[textIndex]}
                            </motion.div>
                            <div className="text-7xl md:text-8xl font-black tracking-tighter text-text-primary drop-shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                {progress}<span className="text-3xl md:text-5xl opacity-30">%</span>
                            </div>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="w-full h-[2px] bg-border overflow-hidden rounded-full mb-4">
                            <motion.div
                                className="h-full bg-primary shadow-[0_0_15px_rgba(16,185,129,1)]"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ type: "tween", duration: 0.15 }}
                            />
                        </div>

                        {/* Details */}
                        <div className="w-full flex justify-between text-[10px] text-text-muted opacity-60 uppercase tracking-widest">
                            <span>{progress < 100 ? 'LOADING...' : 'BOOTED'}</span>
                            <span className="font-bold flex items-center gap-2">
                                <span className={progress === 100 ? "text-primary" : ""}>SYS_ACTIVE</span>
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
