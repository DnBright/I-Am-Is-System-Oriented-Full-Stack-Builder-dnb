'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Link } from '@/navigation';
import { FaGithub, FaCode, FaChartLine } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function Hero() {
    const t = useTranslations('Hero');

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col items-center text-center">
                        {/* Main Heading */}
                        <div className="relative mb-8">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-6xl md:text-9xl font-bold leading-tight tracking-tighter"
                            >
                                <span className="text-primary">{t('title_primary')}</span>
                                <br />
                                <span className="text-white">
                                    {t('title_secondary')}
                                </span>
                            </motion.h1>
                        </div>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg md:text-2xl text-text-secondary mb-16 max-w-2xl leading-relaxed font-light"
                        >
                            {t('subtitle_1')} {t('subtitle_2')}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-8 justify-center"
                        >
                            <Link href="/projects">
                                <Button size="lg" className="min-w-[220px] bg-primary text-black hover:bg-primary/90 rounded-full font-bold h-14 text-lg">
                                    {t('buttons.projects')}
                                </Button>
                            </Link>
                            <Link href="/live">
                                <Button variant="outline" size="lg" className="min-w-[220px] border-border text-white hover:bg-white/5 rounded-full font-bold h-14 text-lg">
                                    {t('buttons.live')}
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Subtle Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 opacity-20"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
            </motion.div>
        </section>
    );
}
