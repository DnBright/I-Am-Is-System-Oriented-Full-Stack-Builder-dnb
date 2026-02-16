'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 py-24 border-t border-primary/10 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute inset-0 bg-primary/[0.01] -z-10" />

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-16 lg:gap-12">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-4 lg:col-span-2">
                        <Link href="/" className="group flex items-center gap-3 mb-8">
                            <div className="relative w-12 h-12 rounded-sm border border-primary/20 flex items-center justify-center overflow-hidden transition-all group-hover:border-primary/50">
                                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                                <div className="w-2 h-2 bg-primary animate-pulse" />
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/40" />
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/40" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-primary text-sm leading-none font-mono font-bold tracking-[0.4em] uppercase">Nexus_OS</span>
                                <span className="text-text-muted text-xs leading-tight font-mono uppercase tracking-[0.2em] opacity-40">System_Engineer</span>
                            </div>
                        </Link>
                        <p className="text-text-muted mb-10 max-w-sm leading-relaxed text-xs font-mono uppercase tracking-wider opacity-60">
                            Engineering complex systems with observability, scalability, and performance as core primitives.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: <FaGithub size={18} />, href: 'https://github.com/DnBright', label: 'GitHub' },
                                { icon: <FaLinkedin size={18} />, href: '#', label: 'LinkedIn' },
                                { icon: <FaTwitter size={18} />, href: '#', label: 'Twitter' }
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-sm bg-surface/40 border border-primary/10 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/40 transition-all group"
                                    aria-label={social.label}
                                >
                                    <span className="group-hover:scale-110 transition-transform">
                                        {social.icon}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-3 bg-primary/30" />
                            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-text-primary">Core_Modules</h4>
                        </div>
                        <ul className="space-y-4">
                            {[
                                { href: '/', label: 'Overview' },
                                { href: '/projects', label: 'Case_Studies' },
                                { href: '/live', label: 'Command_Center' },
                                { href: '/analytics', label: 'Performance' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-[11px] font-mono uppercase tracking-widest text-text-muted hover:text-primary transition-all flex items-center gap-2 group">
                                        <span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary">&gt;</span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-3 bg-primary/30" />
                            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-text-primary">Docs_Engine</h4>
                        </div>
                        <ul className="space-y-4">
                            {[
                                { href: '/about', label: 'Philosophy' },
                                { href: '/try', label: 'Simulation' },
                                { href: 'https://github.com/DnBright', label: 'Source_Access' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-[11px] font-mono uppercase tracking-widest text-text-muted hover:text-primary transition-all flex items-center gap-2 group">
                                        <span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary">&gt;</span>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-8 border-t border-primary/5">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-6 text-[9px] font-mono tracking-[0.2em] uppercase text-text-muted opacity-50">
                            <p>© {currentYear} ALL_RIGHTS_RESERVED // NEXUS_OS</p>
                            <span className="hidden md:block opacity-20">|</span>
                            <div className="flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-primary/40 animate-pulse" />
                                <p className="hidden md:block">KERN_STATUS: STABLE</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                <span className="text-[9px] font-mono font-bold text-primary tracking-widest uppercase">Streaming_v4.2.0</span>
                            </div>
                            <div className="text-[9px] font-mono text-text-muted opacity-30 uppercase">
                                Latency: 24ms
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
