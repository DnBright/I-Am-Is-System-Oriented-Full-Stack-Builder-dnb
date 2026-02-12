'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FiAward, FiCheckCircle, FiShield } from 'react-icons/fi';
import Badge from '@/components/ui/Badge';

export default function Certificates() {
    const t = useTranslations('Experience');

    const certs = [
        { key: 'adobe', icon: <FiAward />, issuer: "Adobe" },
        { key: 'net', icon: <FiShield />, issuer: "BNSP / VSGA" },
        { key: 'design', icon: <FiCheckCircle />, issuer: "Professional Competency" },
    ];

    return (
        <section className="relative py-20 border-t border-white/5 bg-surface/10">
            <div className="container mx-auto px-6 max-w-5xl">

                {/* Header */}
                <div className="mb-12 flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <h2 className="text-2xl font-bold font-mono uppercase tracking-wider text-white">
                        {t('certificates_title')}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {certs.map((cert, index) => (
                        <motion.div
                            key={cert.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-background border border-white/10 p-6 rounded-sm hover:border-primary/50 transition-all duration-300"
                        >
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10 flex flex-col items-start gap-4">
                                <div className="p-3 bg-surface rounded-full text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                                    {cert.icon}
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">
                                        {t(`certs.${cert.key}`)}
                                    </h3>
                                    <Badge variant="outline" className="text-[10px] opacity-70">
                                        {cert.issuer}
                                    </Badge>
                                </div>
                            </div>

                            {/* Corner Accent */}
                            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
