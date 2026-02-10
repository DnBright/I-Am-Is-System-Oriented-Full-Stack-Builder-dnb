'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CallToAction() {
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
                            Ready to see what I've built?
                        </h2>
                        <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                            Explore interactive demos, dive into case studies, or check out my live GitHub activity.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/try">
                                <Button size="lg" className="w-full sm:w-auto">
                                    Try My Work
                                </Button>
                            </Link>
                            <Link href="/projects">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                    View Case Studies
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
