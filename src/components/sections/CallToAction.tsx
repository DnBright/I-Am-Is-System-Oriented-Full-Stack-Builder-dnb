'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function CallToAction() {
    const t = useTranslations('CTA');

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
                            {t('title')}
                        </h2>
                        <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                            {t('subtitle')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/try">
                                <Button size="lg" className="w-full sm:w-auto">
                                    {t('button_try')}
                                </Button>
                            </Link>
                            <Link href="/projects">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                    {t('button_cases')}
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
