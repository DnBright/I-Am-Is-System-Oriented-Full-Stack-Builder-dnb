'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FiAward, FiCheckCircle, FiShield, FiFileText, FiUserCheck, FiUsers } from 'react-icons/fi';
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
                    <h2 className="text-xl font-bold font-mono uppercase tracking-wider text-text-primary">
                        {t('verified_authority.title')}
                    </h2>
                </div>

                <p className="text-text-secondary max-w-2xl mb-12 leading-relaxed">
                    {t('verified_authority.intro')}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {verifiedDocs.map((doc, index) => (
                        <motion.div
                            key={doc.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                            onClick={() => setSelectedDoc({ url: doc.file, title: t(`verified_authority.docs.${doc.key}`) })}
                            className="group relative bg-surface-elevated/40 border border-border p-8 rounded-xl hover:bg-surface-elevated/60 hover:border-primary/60 transition-all duration-300 cursor-pointer overflow-hidden shadow-2xl shadow-black/20"
                        >
                            {/* Hover Status Highlight */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* High Contrast Hover Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-full group-hover:translate-y-0 z-20">
                                <div className="flex flex-col items-center gap-4 p-4 text-center">
                                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-background shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] scale-75 group-hover:scale-100 transition-transform duration-500 delay-100">
                                        <FiShield size={40} />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">AUTHENTICITY</div>
                                        <div className="text-white text-sm font-bold">VIEW CERTIFICATE</div>
                                    </div>
                                    <div className="px-6 py-2 bg-primary text-background text-[10px] font-black uppercase rounded-full tracking-widest hover:scale-105 active:scale-95 transition-all">
                                        Open Now
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 flex flex-col items-center text-center gap-6">
                                {/* Large Prominent Icon */}
                                <div className="w-16 h-16 rounded-2xl bg-surface-elevated border-2 border-border flex items-center justify-center text-primary group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] transition-all duration-500">
                                    {doc.icon}
                                </div>

                                <h3 className="text-sm font-black text-text-primary group-hover:text-primary transition-colors leading-snug min-h-[40px] flex items-center justify-center uppercase tracking-wider">
                                    {t(`verified_authority.docs.${doc.key}`)}
                                </h3>

                                {/* High Contrast Primary Badge */}
                                <div className="w-full mt-2 text-[10px] uppercase font-black tracking-[0.2em] text-background flex items-center justify-center gap-2 bg-primary px-4 py-2.5 rounded-lg shadow-lg group-hover:shadow-primary/40 group-hover:scale-105 transition-all">
                                    <FiCheckCircle size={14} className="animate-pulse" />
                                    VERIFY CREDENTIAL
                                </div>
                            </div>

                            {/* Corner Tech Decor */}
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/40 opacity-40 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/40 opacity-40 group-hover:opacity-100 transition-opacity" />
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
