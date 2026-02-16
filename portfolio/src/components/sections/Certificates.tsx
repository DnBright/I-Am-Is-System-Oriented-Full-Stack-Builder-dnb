'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FiAward, FiCheckCircle, FiShield, FiFileText, FiUserCheck, FiUsers } from 'react-icons/fi';
import Badge from '@/components/ui/Badge';
import PDFViewerModal from '@/components/ui/PDFViewerModal';

export default function Certificates() {
    const t = useTranslations('Experience');
    const [selectedDoc, setSelectedDoc] = useState<{ url: string; title: string } | null>(null);

    const verifiedDocs = [
        {
            key: 'work_order',
            icon: <FiFileText />,
            file: '/documents/work-orders/Work Order Admin Project.pdf'
        },
        {
            key: 'reference',
            icon: <FiUserCheck />,
            file: '/documents/references/Surat Refrensi Admin Project.pdf'
        },
        {
            key: 'competency',
            icon: <FiAward />,
            file: '/documents/competency/Sertifikasi Kompetensi.pdf'
        },
        {
            key: 'committee',
            icon: <FiUsers />,
            file: '/documents/committee/Sertifikat Kepanitiaan.pdf'
        }
    ];

    return (
        <section className="relative py-20 border-t border-white/5 bg-surface/10">
            <div className="container mx-auto px-6 max-w-5xl">
                {/* Verified Authority Section */}
                <div className="mb-8 flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <h2 className="text-xl font-bold font-mono uppercase tracking-wider text-white">
                        {t('verified_authority.title')}
                    </h2>
                </div>

                <p className="text-gray-400 max-w-2xl mb-8 leading-relaxed">
                    {t('verified_authority.intro')}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {verifiedDocs.map((doc, index) => (
                        <motion.div
                            key={doc.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                            onClick={() => setSelectedDoc({ url: doc.file, title: t(`verified_authority.docs.${doc.key}`) })}
                            className="group relative bg-surface/20 border border-white/5 p-6 rounded-sm hover:bg-surface/40 hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden"
                        >
                            {/* Hover Effect Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* "Click to View" Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-20">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="p-2 bg-primary rounded-full text-background">
                                        <FiShield size={20} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">View Credential</span>
                                </div>
                            </div>

                            <div className="relative z-10 flex flex-col items-center text-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary/40 transition-all">
                                    {doc.icon}
                                </div>

                                <h3 className="text-sm font-bold text-gray-200 group-hover:text-primary transition-colors">
                                    {t(`verified_authority.docs.${doc.key}`)}
                                </h3>

                                <div className="mt-2 text-[10px] uppercase tracking-widest text-text-muted opacity-60 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full border border-white/10">
                                    <FiCheckCircle size={10} className="text-primary animate-pulse" />
                                    Click to Verify
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>

            <PDFViewerModal
                isOpen={!!selectedDoc}
                onClose={() => setSelectedDoc(null)}
                url={selectedDoc?.url || ''}
                title={selectedDoc?.title || ''}
            />
        </section >
    );
}
