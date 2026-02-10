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
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 flex justify-center"
                    >
                        <Badge variant="success" className="animate-pulse-slow">
                            <span className="inline-block w-2 h-2 bg-success rounded-full mr-2" />
                            {t('badge')}
                        </Badge>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold mb-6"
                    >
                        <span className="text-primary">{t('title_primary')}</span>
                        <br />
                        <span className="text-text-primary">{t('title_secondary')}</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto"
                    >
                        {t('subtitle_1')}
                        <br />
                        {t('subtitle_2')}
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto"
                    >
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <FaGithub className="text-primary text-2xl" />
                            </div>
                            <div className="text-3xl font-bold text-text-primary">1.2K+</div>
                            <div className="text-sm text-text-secondary">{t('stats.commits')}</div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <FaCode className="text-primary text-2xl" />
                            </div>
                            <div className="text-3xl font-bold text-text-primary">28</div>
                            <div className="text-sm text-text-secondary">{t('stats.repositories')}</div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                                <FaChartLine className="text-primary text-2xl" />
                            </div>
                            <div className="text-3xl font-bold text-text-primary">8+</div>
                            <div className="text-sm text-text-secondary">{t('stats.experience')}</div>
                        </div>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/projects">
                            <Button size="lg" className="w-full sm:w-auto">
                                {t('buttons.projects')}
                            </Button>
                        </Link>
                        <Link href="/live">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                {t('buttons.live')}
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
                    />
                </div>
            </motion.div>
        </section>
    );
}
