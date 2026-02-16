'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FiExternalLink, FiCheckCircle } from 'react-icons/fi';

interface PDFViewerModalProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
    title: string;
}

export default function PDFViewerModal({ isOpen, onClose, url, title }: PDFViewerModalProps) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="relative w-full max-w-5xl h-[85vh] bg-surface-elevated border border-white/10 rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-surface/50 backdrop-blur-md relative z-20">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <h3 className="text-lg font-bold text-white truncate">
                                    {title}
                                </h3>
                                <div className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                                    <FiCheckCircle size={10} />
                                    Authentic
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-text-muted hover:text-white transition-colors"
                                    title="Open in new tab"
                                >
                                    <FiExternalLink size={20} />
                                </a>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-text-muted hover:text-red-400 transition-colors rounded-full hover:bg-white/5"
                                >
                                    <IoClose size={24} />
                                </button>
                            </div>
                        </div>

                        {/* PDF Viewer Container */}
                        <div className="flex-1 bg-neutral-900 relative">
                            {/* Watermark Overlay */}
                            <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center overflow-hidden">
                                <div className="opacity-[0.03] transform -rotate-45 text-white whitespace-nowrap text-[8vw] font-bold select-none">
                                    VERIFIED DOCUMENT • VERIFIED DOCUMENT • VERIFIED DOCUMENT
                                </div>
                            </div>

                            {/* Digital Stamp / Authenticity Trigger */}
                            <motion.div
                                initial={{ opacity: 0, scale: 1.5, rotate: -20 }}
                                animate={{ opacity: 1, scale: 1, rotate: -12 }}
                                transition={{ delay: 0.5, type: 'spring', bounce: 0.5 }}
                                className="absolute bottom-8 right-8 z-20 pointer-events-none select-none"
                            >
                                <div className="w-32 h-32 rounded-full border-4 border-green-500/30 flex items-center justify-center relative rotate-[-12deg] bg-green-900/10 backdrop-blur-sm shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                                    <div className="absolute inset-1 rounded-full border border-green-500/50 border-dashed animate-[spin_10s_linear_infinite]" />
                                    <div className="text-center">
                                        <div className="text-green-500 font-bold text-lg tracking-widest">VERIFIED</div>
                                        <div className="text-green-500/70 text-[10px] uppercase">Original Document</div>
                                        <div className="text-green-500/50 text-[8px] mt-1 font-mono">ID: {Math.random().toString(36).substr(2, 8).toUpperCase()}</div>
                                    </div>
                                </div>
                            </motion.div>

                            <iframe
                                src={`${url}#toolbar=0&navpanes=0&scrollbar=0`}
                                className="w-full h-full border-none relative z-0"
                                title={title}
                            />

                            {/* Mobile Fallback / Loading State */}
                            <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center text-text-muted">
                                <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
                                <p>Loading document...</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
