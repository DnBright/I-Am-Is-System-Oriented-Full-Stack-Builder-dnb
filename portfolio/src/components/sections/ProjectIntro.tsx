'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Button from '@/components/ui/Button';

export default function ProjectIntro() {
    const t = useTranslations('ProjectIntro');

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                            {t('text_1')}
                            <br />
                            <span className="text-primary">{t('text_2')}</span>
                        </h2>

                        <Link href="/projects" className="inline-block pt-4">
                            <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 rounded-full px-10 h-14 font-bold uppercase tracking-widest text-xs transition-all">
                                {t('button')}
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Minimalist divider */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-primary/10 to-transparent opacity-20" />
        </section>
    );
}
