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
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="max-w-6xl mx-auto mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold mb-4"
                    >
                        {t.rich('title', {
                            span: (children) => <span className="text-primary">{children}</span>
                        })}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-text-secondary text-lg max-w-2xl"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>

                {/* Filters */}
                <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row gap-6 justify-between items-center">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                    filter === cat
                                        ? "bg-primary text-background"
                                        : "bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-primary/50"
                                )}
                            >
                                {cat === 'All' ? t('categories.all') :
                                    cat === 'Web Application' ? t('categories.web') :
                                        cat === 'Data Visualization' ? t('categories.data') :
                                            cat === 'Enterprise' ? t('categories.enterprise') : cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                            type="text"
                            placeholder="..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-surface border border-border rounded-lg py-3 pl-12 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Project Grid */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link href={`/projects/${project.slug}`}>
                                    <Card hover className="p-0 h-full flex flex-col group overflow-hidden border-border/40 hover:border-primary/40">
                                        <div className="h-2 bg-gradient-to-r from-primary/50 to-info/50 opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="p-8 flex-1">
                                            <div className="flex items-center justify-between mb-4">
                                                <Badge variant="default" className="text-[10px] tracking-wider uppercase">
                                                    {project.category}
                                                </Badge>
                                                <FaLayerGroup className="text-text-muted group-hover:text-primary transition-colors" />
                                            </div>

                                            <h3 className="text-2xl font-bold mb-3 text-text-primary group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>

                                            <p className="text-text-secondary leading-relaxed mb-6">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="p-8 bg-surface-elevated/30 border-t border-border mt-auto">
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.tech.map(t => (
                                                    <span key={t} className="px-2 py-1 bg-surface-elevated rounded text-[10px] font-mono text-text-secondary uppercase border border-border">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                                                    EXPLORE SYSTEM →
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-40">
                        <p className="text-text-muted text-lg">No systems found matching your search parameters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

import { cn } from '@/lib/utils';
