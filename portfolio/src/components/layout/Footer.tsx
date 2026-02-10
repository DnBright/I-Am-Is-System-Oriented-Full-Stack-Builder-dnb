import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-surface border-t border-border mt-20">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-4 lg:col-span-2">
                        <Link href="/" className="text-xl font-bold flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                            </div>
                            <div className="flex flex-col -gap-1">
                                <span className="text-primary text-sm leading-none font-black tracking-tighter uppercase">System</span>
                                <span className="text-text-primary text-xs leading-none font-bold tracking-widest uppercase">Engineer</span>
                            </div>
                        </Link>
                        <p className="text-text-secondary mb-8 max-w-sm leading-relaxed text-sm">
                            Harnessing the power of system design to build scalable, observable, and high-performance software solutions. Driven by metrics, validated by code.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: <FaGithub size={20} />, href: 'https://github.com/DnBright', label: 'GitHub' },
                                { icon: <FaLinkedin size={20} />, href: '#', label: 'LinkedIn' },
                                { icon: <FaTwitter size={20} />, href: '#', label: 'Twitter' }
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-surface-elevated border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/30 transition-all group"
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
                    <div className="space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">System Core</h4>
                        <ul className="space-y-3">
                            {[
                                { href: '/', label: 'Overview' },
                                { href: '/projects', label: 'Case Studies' },
                                { href: '/live', label: 'Command Center' },
                                { href: '/analytics', label: 'Performance' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-text-secondary hover:text-primary transition-all flex items-center gap-2 group">
                                        <div className="w-1 h-1 rounded-full bg-text-muted group-hover:bg-primary transition-colors" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-text-primary">Documentation</h4>
                        <ul className="space-y-3">
                            {[
                                { href: '/about', label: 'Philosophy' },
                                { href: '/try', label: 'Simulation' },
                                { href: 'https://github.com/DnBright', label: 'Source Code' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-text-secondary hover:text-primary transition-all flex items-center gap-2 group">
                                        <div className="w-1 h-1 rounded-full bg-text-muted group-hover:bg-primary transition-colors" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-border/50">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase text-text-muted">
                            <p>© {currentYear} ALL_RIGHTS_RESERVED</p>
                            <span className="hidden md:block opacity-20">|</span>
                            <p className="hidden md:block animate-pulse">SYSTEM_STATUS: STABLE</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/20 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span className="text-[10px] font-bold text-primary tracking-tighter">DATASTREAM_ACTIVE_V4.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
