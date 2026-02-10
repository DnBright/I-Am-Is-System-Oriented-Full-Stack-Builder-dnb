'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { FaArrowLeft, FaCogs, FaProjectDiagram, FaCheckCircle, FaExternalLinkAlt } from 'react-icons/fa';

const projectsContent: Record<string, any> = {
    'lpk-management-system': {
        title: 'LPK Management System',
        category: 'Web Application',
        tags: ['Next.js', 'PostgreSQL', 'Tailwind', 'Real-time'],
        problem: 'Vocational training centers (LPK) in Indonesia traditionally face fragmentation in student data, payroll, and government reporting compliance. Manual processes lead to high error rates and delayed certification.',
        system: 'A distributed system architecture designed for multi-tenant LPK management. Features an event-driven payroll engine, atomic student data tracking (from enrollment to placement), and an automated reporting layer that interfaces with regulatory formats.',
        solution: 'Reduced administrative overhead by 65%. Centralized repository for 2,000+ students. Zero-error payroll computation for staff and instructors. 100% compliance with digital certification standards.',
        architecture: ['Atomic Data Layer', 'Reactive Frontend Orchestration', 'Stateless API Layer', 'Relational Integrity Guards']
    },
    'analytics-dashboard': {
        title: 'Real-time Analytics Dashboard',
        category: 'Data Visualization',
        tags: ['React', 'D3.js', 'WebSockets', 'Go'],
        problem: 'High-frequency GitHub events are difficult to visualize in a way that provides actionable engineering insights. Standard dashboards focus on activity quantity rather than quality and consistency.',
        system: 'A high-throughput ingestion pipeline using Go to process GitHub webhooks. Data is aggregated and cached using Redis, then streamed to a React frontend using server-sent events. Custom SVG charts provide non-standard visualizations of work intensity.',
        solution: 'Real-time observability of developer velocity. 99.9% accurate coding-hour estimations based on inter-commit temporal analysis. Instant feedback loop for system-wide engineering performance.',
        architecture: ['Streaming Ingestion Pipe', 'Temporal Analysis Engine', 'Vector Chart Rendering', 'In-memory Cache Layer']
    },
}

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const project = projectsContent[slug] || {
        title: 'System Prototype',
        category: 'Full-Stack',
        tags: ['Under Development'],
        problem: 'This system is currently undergoing architectural review.',
        system: 'Details on the decomposition of this system will be available shortly.',
        solution: 'Coming soon.',
        architecture: ['Pending Review']
    };

    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Back button */}
                    <Link href="/projects" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8 text-sm group">
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        BACK TO SYSTEMS
                    </Link>

                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-4">
                            <Badge variant="default" className="uppercase text-[10px] tracking-widest">{project.category}</Badge>
                            <span className="text-text-muted text-xs font-mono">ID: {slug.toUpperCase()}</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">{project.title}</h1>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((t: string) => (
                                <span key={t} className="px-3 py-1 bg-surface-elevated rounded-full text-xs font-medium text-text-secondary border border-border">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-12">
                        {/* Visual Placeholder */}
                        <Card className="p-0 overflow-hidden aspect-video relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-info/20 opacity-50 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <FaCogs className="text-8xl text-primary/10 animate-spin-slow" />
                            </div>
                            <div className="absolute bottom-6 right-6">
                                <Button size="sm" variant="outline" className="gap-2">
                                    <FaExternalLinkAlt size={12} />
                                    LIVE PREVIEW
                                </Button>
                            </div>
                        </Card>

                        {/* Content Decomposition */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="md:col-span-2 space-y-12">
                                <section>
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                                        <span className="text-primary tracking-tighter">01.</span> THE PROBLEM
                                    </h2>
                                    <p className="text-text-secondary leading-relaxed text-lg">
                                        {project.problem}
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                                        <span className="text-primary tracking-tighter">02.</span> THE SYSTEM
                                    </h2>
                                    <p className="text-text-secondary leading-relaxed text-lg">
                                        {project.system}
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                                        <span className="text-primary tracking-tighter">03.</span> THE SOLUTION
                                    </h2>
                                    <p className="text-text-secondary leading-relaxed text-lg italic border-l-2 border-primary pl-6 py-2 bg-primary/5">
                                        {project.solution}
                                    </p>
                                </section>
                            </div>

                            <div className="space-y-8">
                                <Card className="p-8">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-6 flex items-center gap-2">
                                        <FaProjectDiagram className="text-primary" />
                                        Architecture
                                    </h3>
                                    <ul className="space-y-4">
                                        {project.architecture.map((item: string, i: number) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <FaCheckCircle className="text-primary mt-1 flex-shrink-0" />
                                                <span className="text-sm text-text-secondary">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Card>

                                <Card className="p-8 bg-primary/10 border-primary/20">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Project Status</h3>
                                    <div className="flex items-center gap-3 text-text-primary">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        <span className="text-sm font-bold uppercase">Production Ready</span>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
