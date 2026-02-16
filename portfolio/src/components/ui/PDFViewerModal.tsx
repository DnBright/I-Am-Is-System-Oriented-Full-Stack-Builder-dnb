'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { FiDownload, FiExternalLink } from 'react-icons/fi';
import Button from '@/components/ui/Button';

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
                        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-surface/50 backdrop-blur-md">
                            <h3 className="text-lg font-bold text-white truncate pr-4">
                                {title}
                            </h3>
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

                        {/* PDF Viewer */}
                        <div className="flex-1 bg-neutral-900 relative">
                            <iframe
                                src={`${url}#view=FitH`}
                                className="w-full h-full border-none"
                                title={title}
                            />

                            {/* Mobile Fallback / Loading State */}
                            <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center text-text-muted">
                                <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
                                <p>Loading document...</p>
                            </div>
                        </div>

                        {/* Footer (Optional context or actions) */}
                        <div className="p-4 border-t border-white/5 bg-surface/50 backdrop-blur-md flex justify-end">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(url, '_blank')}
                                className="gap-2"
                            >
                                <FiDownload />
                                Download PDF
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
