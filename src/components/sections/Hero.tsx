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
        <section className="relative min-h-screen flex items-center pt-20 bg-primary/20">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col gap-20 items-center">

                    {/* Left: Identity / Photo (Tilted and Chaos) */}
                    <motion.div
                        initial={{ opacity: 1, scale: 2 }}
                        animate={{ opacity: 1, scale: 1, rotate: -15 }}
                        transition={{ duration: 0.1, repeat: Infinity, repeatType: "reverse" }}
                        className="relative"
                    >
                        <div className="relative w-80 h-80 rounded-full border-[20px] border-error bg-primary group animate-spin-chaos">
                            <img
                                src="/images/profile.png"
                                alt="System Architect"
                                className="w-full h-full object-cover invert hue-rotate-90"
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-background animate-blink">
                                HACKED??
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Typography & Introduction (Unusual) */}
                    <div className="w-full flex flex-col justify-center text-center">
                        <div className="relative">
                            <motion.h1
                                initial={{ opacity: 0, x: -500 }}
                                animate={{ opacity: 1, x: 50 }}
                                transition={{ type: "spring", stiffness: 1000 }}
                                className="text-8xl md:text-[12rem] font-black leading-tight tracking-[1rem] mb-8 text-error bg-surface-elevated border-b-[30px] border-text-primary"
                            >
                                {t.rich('title', {
                                    br: () => <br />,
                                    span: (chunks) => <span className="text-background bg-error p-4 block animate-jitter">{chunks}</span>
                                })}
                            </motion.h1>

                            <motion.div
                                className="space-y-6 max-w-none bg-white p-10 border-l-[50px] border-primary"
                            >
                                <p className="text-4xl text-text-primary font-bold line-through decoration-error decoration-[10px]">
                                    {t('intro_short')}
                                </p>

                                <div className="flex flex-wrap gap-2 justify-center py-6">
                                    <div className="bg-text-primary text-background p-4 rotate-3">
                                        <h4 className="text-xs font-mono uppercase text-primary mb-2 tracking-widest">Role</h4>
                                        <p className="text-4xl text-white font-black">{t('status')}</p>
                                    </div>
                                    <div className="bg-error text-white p-4 -rotate-6">
                                        <h4 className="text-xs font-mono uppercase text-primary mb-2 tracking-widest">Focus</h4>
                                        <p className="text-4xl text-white font-black uppercase">Breaking Stuff</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-10 items-center pt-4">
                                    <Link href="/about">
                                        <Button size="lg" variant="danger" className="animate-jitter w-full h-40">
                                            !!! {t('cta_bio')} !!!
                                        </Button>
                                    </Link>
                                    <Link href="/projects">
                                        <Button variant="outline" size="lg" className="animate-spin-chaos">
                                            {t('cta_project')} {"->"} ?????
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
