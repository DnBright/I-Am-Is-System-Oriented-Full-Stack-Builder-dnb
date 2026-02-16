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
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left: Identity / Photo (Unusual Alignment) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="col-span-1 lg:col-span-5 relative order-2 lg:order-1"
                    >
                        <div className="relative w-full max-w-md mx-auto lg:mx-0 aspect-[4/5] rounded-sm overflow-hidden border-2 border-primary/20 bg-primary/5 group">
                            {/* Glitch Overlay Effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                            {/* Scanline */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 shadow-[0_0_15px_rgba(var(--primary-rgb),0.8)] animate-scanline z-30" />

                            <img
                                src="/images/profile.png"
                                alt="System Architect"
                                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                            />

                            {/* Tech Borders */}
                            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-primary" />
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-primary" />

                            {/* Data Label */}
                            <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 border border-primary/20 text-xs font-mono text-primary">
                                STATUS: ONLINE
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Typography & Introduction (Unusual) */}
                    <div className="col-span-1 lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mb-6 flex items-center gap-4"
                            >
                                <Badge variant="outline" className="text-primary border-primary/30">
                                    IDENTITY_CONFIRMED
                                </Badge>
                                <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60"
                            >
                                {t.rich('title', {
                                    br: () => <br />,
                                    span: (chunks) => <span className="text-primary block">{chunks}</span>
                                })}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="space-y-6 max-w-2xl"
                            >
                                <p className="text-xl md:text-2xl text-text-muted font-light border-l-2 border-primary/20 pl-6 py-2">
                                    {t('intro_short')}
                                </p>

                                <div className="grid grid-cols-2 gap-8 py-6 border-t border-white/5">
                                    <div>
                                        <h4 className="text-xs font-mono uppercase text-primary mb-2 tracking-widest">Role</h4>
                                        <p className="text-lg text-white font-medium">{t('status')}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-mono uppercase text-primary mb-2 tracking-widest">Focus</h4>
                                        <p className="text-lg text-white font-medium">Scalable Infrastructure</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 pt-4">
                                    <Link href="/about">
                                        <Button size="lg" className="bg-primary text-black hover:bg-primary/90 rounded-none border-l-4 border-black hover:border-white transition-all">
                                            {t('cta_bio')}
                                        </Button>
                                    </Link>
                                    <Link href="/projects">
                                        <Button variant="ghost" size="lg" className="text-white hover:text-primary gap-4 group">
                                            {t('cta_project')} <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10" />
        </section>
    );
}
