'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Link } from '@/navigation';
import { FaLayerGroup, FaSearch, FaFilter } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

const categories = ['All', 'Web Application', 'Data Visualization', 'Enterprise', 'System Tool'];

const projectsData = [
    {
        id: 1,
        title: 'LPK Management System',
        description: 'A comprehensive ERP-style platform for vocational training centers. Orchestrates student lifecycles, payroll, certification, and regulatory reporting.',
        tech: ['Laravel', 'PostgreSQL', 'Livewire', 'Alpine.js'],
        category: 'Web Application',
        slug: 'lpk-management-system'
    },
    {
        id: 2,
        title: 'Real-time Analytics Dashboard',
        description: 'High-frequency data ingestion and visualization system. Built to handle massive GitHub event streams and compute engineer performance metrics.',
        tech: ['Next.js', 'TypeScript', 'Recharts', 'Redis'],
        category: 'Data Visualization',
        slug: 'analytics-dashboard'
    },
    {
        id: 3,
        title: 'Enterprise CRM Architecture',
        description: 'Scale-oriented CRM system with automated lead scoring, multi-tenant database partitioning, and real-time activity tracking.',
        tech: ['Next.js', 'Prisma', 'PostgreSQL', 'tRPC'],
        category: 'Enterprise',
        slug: 'crm-system'
    },
    {
        id: 4,
        title: 'Cloud Orchestrator',
        description: 'System-level tool for managing distributed microservices across multiple environments. Focuses on observability and self-healing mechanisms.',
        tech: ['Go', 'Docker', 'Kubernetes', 'gRPC'],
        category: 'System Tool',
        slug: 'cloud-orchestrator'
    }
];


export default function ProjectsPage() {
    const t = useTranslations('Projects');
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const filteredProjects = projectsData.filter(p => {
        const matchesFilter = filter === 'All' || p.category === filter;
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.tech.some(t => t.toLowerCase().includes(search.toLowerCase()));
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 border border-primary/20 mb-4">
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-primary uppercase">Portfolio_Access // Repository_v2.4</span>
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase"
                    >
                        {t.rich('title', {
                            span: (children) => <span className="text-primary">{children}</span>
                        })}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-text-muted text-lg font-mono uppercase tracking-widest opacity-60 max-w-2xl"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>

                {/* Filters & Search */}
                <div className="max-w-6xl mx-auto mb-16 flex flex-col lg:flex-row gap-8 justify-between items-center">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={cn(
                                    "px-4 py-1.5 rounded-sm text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-all border",
                                    filter === cat
                                        ? "bg-primary border-primary text-background"
                                        : "bg-surface/40 border-primary/10 text-text-muted hover:text-primary hover:border-primary/40"
                                )}
                            >
                                {cat === 'All' ? t('categories.all') :
                                    cat === 'Web Application' ? t('categories.web') :
                                        cat === 'Data Visualization' ? t('categories.data') :
                                            cat === 'Enterprise' ? t('categories.enterprise') : cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:w-96 group">
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-focus-within:opacity-100 transition-opacity rounded-sm" />
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="QUERY_SYSTEM_ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-surface/40 border border-primary/10 rounded-sm py-3 pl-12 pr-4 text-[11px] font-mono font-bold uppercase tracking-[0.2em] focus:border-primary/40 outline-none transition-all placeholder:opacity-30"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-text-muted opacity-20 group-focus-within:opacity-40">INPUT_REQ</div>
                    </div>
                </div>

                {/* Project Grid */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link href={`/projects/${project.slug}`}>
                                    <Card hover className="p-0 h-full flex flex-col group overflow-hidden border-primary/5 bg-surface/40">
                                        {/* Status Header */}
                                        <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                                <span className="text-[10px] font-mono font-bold text-primary tracking-widest uppercase">Operational</span>
                                            </div>
                                            <span className="text-[9px] font-mono text-text-muted opacity-30 tracking-widest uppercase">ID: 0x{project.id.toString().padStart(3, '0')}</span>
                                        </div>

                                        <div className="p-10 flex-1">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-sm">
                                                    <span className="text-[9px] font-mono font-bold text-primary tracking-[0.2em] uppercase">
                                                        {project.category}
                                                    </span>
                                                </div>
                                                <FaLayerGroup className="text-primary/20 group-hover:text-primary transition-all group-hover:rotate-12" />
                                            </div>

                                            <h3 className="text-3xl font-black mb-6 text-text-primary group-hover:text-primary transition-colors tracking-tighter uppercase">
                                                {project.title}
                                            </h3>

                                            <p className="text-text-muted leading-relaxed mb-8 font-mono text-xs uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="p-10 bg-white/[0.02] border-t border-white/5 mt-auto">
                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {project.tech.map(t => (
                                                    <span key={t} className="px-3 py-1 bg-white/5 text-[9px] font-mono font-bold text-text-muted uppercase border border-white/5 group-hover:border-primary/20 transition-colors">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 group/link">
                                                    <span className="text-[10px] font-mono font-black text-primary tracking-[0.3em] uppercase group-hover/link:tracking-[0.4em] transition-all">
                                                        EXPLORE_SYSTEM
                                                    </span>
                                                    <div className="w-8 h-[1px] bg-primary/30 group-hover/link:w-12 transition-all" />
                                                </div>
                                                <div className="flex gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                                                    {[...Array(3)].map((_, i) => (
                                                        <div key={i} className="w-1 h-3 bg-primary" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredProjects.length === 0 && (
                    <Card className="max-w-6xl mx-auto p-20 flex flex-col items-center text-center bg-surface/20 border-primary/5">
                        <div className="w-16 h-16 rounded-sm border border-primary/20 flex items-center justify-center mb-8 opacity-40">
                            <FaSearch className="text-3xl text-primary/40" />
                        </div>
                        <p className="text-sm font-mono text-text-muted uppercase tracking-[0.3em] opacity-60">
                            No matching system protocols found in current matrix.
                        </p>
                        <button
                            onClick={() => { setSearch(''); setFilter('All'); }}
                            className="mt-8 text-[10px] font-mono text-primary font-bold uppercase tracking-[0.3em] hover:tracking-[0.4em] transition-all underline underline-offset-8"
                        >
                            Reset_Parameters
                        </button>
                    </Card>
                )}
            </div>
        </div>
    );
}

import { cn } from '@/lib/utils';
