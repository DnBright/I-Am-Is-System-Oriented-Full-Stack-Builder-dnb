'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaHome, FaFileAlt, FaPenNib, FaBook, FaBolt, FaChartLine,
    FaProjectDiagram, FaBullseye, FaCalendarCheck, FaBriefcase,
    FaUsers, FaCog, FaSignOutAlt, FaPlus, FaSearch, FaCogs, FaBell, FaEdit, FaCheck, FaSpinner, FaChevronDown, FaMagic
} from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

// --- Subviews ---

const CreateProposalView = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
    const [formData, setFormData] = useState({
        clientName: '',
        projectType: 'Website Bisnis',
        category: '',
        targetWebsite: '',
        problem: '',
        investment: '',
        duration: '',
        scale: 'MEDIUM',
        tone: 'Profesional'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="animate-fade-in max-w-5xl mx-auto pb-20">
            <div className="bg-[#111827]/60 border border-slate-800 p-6 rounded-2xl mb-8 flex items-center gap-6 backdrop-blur-md">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                    <FaFileAlt size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white tracking-wide">Create New Proposal</h2>
                    <p className="text-slate-400 text-sm mt-1">Mulai langkah pertama dengan memahami kebutuhan klien secara mendalam.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                {/* Left Column */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3 text-slate-300 font-bold text-[11px] uppercase tracking-widest mb-6">
                        <FaBriefcase /> Profil Klien & Dasar Proyek
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Nama Klien / Perusahaan</label>
                        <input
                            required
                            type="text"
                            className="w-full bg-transparent border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                            placeholder="Contoh: LPK Maju Jaya"
                            value={formData.clientName}
                            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Tipe Proyek (Sangat Penting)</label>
                        <div className="relative">
                            <select
                                className="w-full bg-transparent border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all appearance-none"
                                value={formData.projectType}
                                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                            >
                                <option className="bg-slate-900">Website Bisnis</option>
                                <option className="bg-slate-900">Aplikasi Mobile</option>
                                <option className="bg-slate-900">Sistem Informasi</option>
                            </select>
                            <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Jenis Bisnis / Kategori</label>
                        <div className="relative">
                            <select
                                className="w-full bg-transparent border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all appearance-none"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="" disabled className="bg-slate-900">Pilih Kategori</option>
                                <option value="Pendidikan" className="bg-slate-900">Pendidikan / LPK</option>
                                <option value="Retail" className="bg-slate-900">Retail / E-Commerce</option>
                                <option value="Manufaktur" className="bg-slate-900">Manufaktur</option>
                            </select>
                            <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Target Website (Opsional)</label>
                        <input
                            type="text"
                            className="w-full bg-transparent border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                            placeholder="www.client-site.com"
                            value={formData.targetWebsite}
                            onChange={(e) => setFormData({ ...formData, targetWebsite: e.target.value })}
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                    <div className="flex items-center gap-3 text-[#EAB308] font-bold text-[11px] uppercase tracking-widest mb-6">
                        <FaChartLine /> Investasi & Durasi (Wajib)
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Total Investasi (IDR)</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-transparent border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                                placeholder="Contoh: 10000000"
                                value={formData.investment}
                                onChange={(e) => setFormData({ ...formData, investment: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Durasi Kontrak (BLN)</label>
                            <input
                                required
                                type="number"
                                className="w-full bg-transparent border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                                placeholder="6"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Skala Proyek</label>
                        <div className="grid grid-cols-3 gap-3">
                            {['SMALL', 'MEDIUM', 'ENTERPRISE'].map(scale => (
                                <button
                                    key={scale}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, scale })}
                                    className={cn(
                                        "py-2.5 rounded-lg text-[10px] font-bold tracking-widest transition-all uppercase border",
                                        formData.scale === scale
                                            ? "bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                                            : "bg-transparent text-slate-400 border-slate-700 hover:border-slate-500"
                                    )}
                                >
                                    {scale}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Tone / Gaya Bahasa</label>
                        <div className="flex gap-8">
                            {['Profesional', 'Kreatif'].map(tone => (
                                <label key={tone} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center w-4 h-4">
                                        <input
                                            type="radio"
                                            name="tone"
                                            checked={formData.tone === tone}
                                            onChange={() => setFormData({ ...formData, tone })}
                                            className="appearance-none w-4 h-4 rounded-full border-2 border-slate-600 checked:border-blue-500 transition-all"
                                        />
                                        {formData.tone === tone && <div className="absolute w-2 h-2 rounded-full bg-blue-500" />}
                                    </div>
                                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{tone}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Row - Full width */}
                <div className="lg:col-span-2 space-y-2 border-t border-slate-800/50 pt-8 mt-2">
                    <label className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Masalah Utama Klien</label>
                    <textarea
                        required
                        className="w-full bg-transparent border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600 resize-none h-32"
                        placeholder="Apa hambatan terbesar bisnis mereka saat ini? (Contoh: Website lama tidak mobile-friendly, pendaftaran siswa LPK masih manual, dll)"
                        value={formData.problem}
                        onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                    />
                </div>

                <div className="lg:col-span-2 flex justify-end pb-8">
                    <button type="submit" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2">
                        <FaMagic /> Generate AI Proposal
                    </button>
                </div>
            </form>
        </div>
    );
};

const DraftAIView = ({ data, onBack }: { data: any, onBack: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        const duration = 5000; // 5 seconds simulation
        const intervalTime = 50;
        const steps = duration / intervalTime;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            setProgress((currentStep / steps) * 100);
            if (currentStep >= steps) {
                clearInterval(timer);
                setIsDone(true);
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="animate-fade-in max-w-5xl mx-auto h-full flex flex-col">
            <div className="bg-[#111827]/60 border border-slate-800 p-6 rounded-2xl mb-8 flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent" />
                        {/* Gemini-like icon representation */}
                        <div className="flex items-center justify-center gap-0.5">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-75" />
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-wide">AI Senior Writing Center</h2>
                        <p className="text-slate-400 text-sm mt-1">Generasi dokumen strategis via Gemini API dalam estimasi 5 menit (Demostrasi Cepat).</p>
                    </div>
                </div>
                <button onClick={onBack} className="px-6 py-2 border border-slate-700 hover:bg-slate-800 text-slate-300 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2">
                    &larr; Kembali ke Input
                </button>
            </div>

            <div className="flex-1 bg-[#0A0F1E] border border-slate-800 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden shadow-2xl p-12 min-h-[500px]">
                {/* Ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

                <AnimatePresence mode="wait">
                    {!isDone ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col items-center text-center max-w-lg z-10"
                        >
                            {/* Circular progress with spinner inside */}
                            <div className="relative w-32 h-32 mb-10">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#1E293B" strokeWidth="2" />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="45"
                                        fill="none"
                                        stroke="#3B82F6"
                                        strokeWidth="4"
                                        strokeDasharray={`${2 * Math.PI * 45}`}
                                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                                        strokeLinecap="round"
                                        className="transition-all duration-75"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <FaPenNib className="text-3xl text-slate-400 animate-pulse" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4">Menganalisis profil bisnis & kompetitor...</h3>

                            <div className="flex gap-2 mb-6">
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.1s' }} />
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>

                            <p className="text-slate-400 text-sm italic border-t border-slate-800 pt-6 mt-4">
                                "{data?.problem ? `Membangun narasi strategis untuk mengatasi masalah: ${data.problem.substring(0, 50)}...` : 'Menyusun kerangka arsitektur proposal...'}"
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="done"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center text-center z-10"
                        >
                            <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 text-4xl mb-8 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                                <FaCheck />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">Proposal Selesai Dibuat</h3>
                            <p className="text-slate-400 mb-8 max-w-md">Dokumen strategi proposal sepanjang 15 halaman telah berhasil dibuat oleh Gemini AI dan tersimpan di Draft Editor.</p>
                            <button onClick={onBack} className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg transition-all flex items-center gap-3">
                                <FaEdit /> Buka Editor Proposal
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const TemplatesPromptView = () => (
    <div className="animate-fade-in max-w-5xl mx-auto space-y-8 pb-20">
        <div className="bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 p-6 rounded-2xl flex items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                <FaBolt size={20} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-white tracking-wide">Templates & Prompt Control</h2>
                <p className="text-slate-400 text-sm mt-1">Gedung kendali kualitas AI untuk memastikan standar tinggi Dark and Bright.</p>
            </div>
        </div>

        <div className="bg-[#111827]/40 border border-slate-800 p-8 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2">Generate Industry-Specific Template</h3>
            <p className="text-sm text-slate-400 mb-8 leading-relaxed max-w-3xl">AI DNB akan merancang kerangka proposal yang taktis, berfokus pada efisiensi bisnis industri pilihan Anda. Masukkan jenis industri di bawah ini.</p>

            <div className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Ketik Industri... (misal: LPK, Startup, Retail)"
                    className="flex-1 bg-[#0A0F1E] border border-slate-700 rounded-xl px-6 py-4 text-sm text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all placeholder:text-slate-600"
                />
                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                    <FaBolt /> Generate Framework
                </button>
            </div>
        </div>

        <div className="bg-[#0A0F1E]/80 border border-slate-800 p-8 rounded-2xl shadow-2xl pb-16">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h3 className="text-lg font-bold text-white">Global Template Library</h3>
                    <div className="mt-1 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Persistence Collection</div>
                </div>
                <div className="px-4 py-1 border border-slate-700 rounded-full text-[10px] font-bold text-slate-400">3 SAVED</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {[
                    { tag: 'HIGH CONTENT', date: '2026-01-18', title: 'Standard LPK Template', ind: 'LPK', tagColor: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
                    { tag: 'BALANCED CONTENT', date: '2026-01-12', title: 'Creative Agency Pitch', ind: 'Startup', tagColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
                    { tag: 'PROFESSIONAL CONTENT', date: '2026-01-20', title: 'Corporate Profile v2', ind: 'Manufacturing', tagColor: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20' },
                ].map((tpl, i) => (
                    <div key={i} className="bg-[#111827] border border-slate-800 p-6 rounded-2xl hover:border-slate-600 transition-colors flex flex-col group cursor-pointer h-52">
                        <div className="flex justify-between items-start mb-6">
                            <span className={cn("px-2.5 py-1 rounded text-[8px] font-black uppercase tracking-widest border", tpl.tagColor)}>{tpl.tag}</span>
                            <span className="text-[10px] text-slate-600 font-mono">{tpl.date}</span>
                        </div>
                        <h4 className="text-white font-bold mb-1 line-clamp-2 leading-snug">{tpl.title}</h4>
                        <p className="text-xs text-slate-500 mb-auto">Industry: {tpl.ind}</p>

                        <div className="pt-4 border-t border-slate-800/80 flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-400">
                            <span>Edit</span>
                            <span>Default</span>
                        </div>
                    </div>
                ))}

                <button className="border border-dashed border-slate-700 bg-transparent rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:text-white hover:border-slate-500 transition-colors h-52 gap-4">
                    <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center"><FaPlus /></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Custom Template</span>
                </button>
            </div>
        </div>
    </div>
);


// --- Main Layout ---

export default function AIAdminDemo() {
    const [activeTab, setActiveTab] = useState('create');
    const [proposalData, setProposalData] = useState<any>(null);

    const handleCreateSubmit = (data: any) => {
        setProposalData(data);
        setActiveTab('draft');
    };

    return (
        <div className="w-full h-full bg-[#060B19] text-slate-300 flex font-sans overflow-hidden max-h-[90vh]">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0A0F1E] border-r border-[#1E293B] flex flex-col shrink-0 rounded-tr-[30px] rounded-br-[30px] z-20 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-white shadow-lg rounded-md flex items-center justify-center p-1.5">
                            <img src="https://lpk-ayaka.vercel.app/logo.png" alt="DNB" className="w-full h-full object-contain filter grayscale" onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=DNB&background=fff&color=000';
                            }} />
                        </div>
                        <div>
                            <div className="text-sm font-black text-white tracking-tighter">DNB ADMIN</div>
                            <div className="text-[8px] text-blue-400 font-bold tracking-[0.2em] uppercase">Proposal Command</div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar px-4 space-y-6 pb-8">
                    <div className="space-y-1">
                        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-[#1E293B]/50 transition-colors">
                            <FaHome /> <span className="font-medium">Dashboard</span>
                        </button>
                    </div>

                    <div className="space-y-1">
                        <button className="w-full flex items-center justify-between px-4 py-3 text-sm text-blue-400 font-medium">
                            <div className="flex items-center gap-4"><FaFileAlt /> Proposal Generator</div>
                            <FaChevronDown size={10} />
                        </button>
                        <div className="pl-12 space-y-1 mt-1 border-l border-slate-800 ml-6">
                            <button
                                onClick={() => setActiveTab('create')}
                                className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors", activeTab === 'create' ? "bg-white/5 text-white shadow-sm" : "text-slate-400 hover:text-slate-300")}
                            >
                                <FaPlus size={10} className={activeTab === 'create' ? "text-blue-500" : "opacity-0"} /> Create Proposal
                            </button>
                            <button
                                onClick={() => setActiveTab('draft')}
                                className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors", activeTab === 'draft' ? "bg-white/5 text-white shadow-sm" : "text-slate-400 hover:text-slate-300")}
                            >
                                <span className={activeTab === 'draft' ? "text-blue-500 font-black text-lg" : ""}>🤖</span> Draft AI
                            </button>
                            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-300 transition-colors">
                                Editor Proposal
                            </button>
                            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-300 transition-colors">
                                Proposal Library
                            </button>
                            <button
                                onClick={() => setActiveTab('templates')}
                                className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors", activeTab === 'templates' ? "bg-white/5 text-white shadow-sm" : "text-slate-400 hover:text-slate-300")}
                            >
                                <FaBolt className={activeTab === 'templates' ? "text-orange-500" : ""} /> Templates & Prompt
                            </button>
                            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-300 transition-colors">
                                Performance
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1 border-t border-slate-800/60 pt-6">
                        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-[#1E293B]/50 transition-colors">
                            <FaProjectDiagram /> <span className="font-medium">Projects</span>
                        </button>
                        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-[#1E293B]/50 transition-colors">
                            <FaBullseye className="text-red-400" /> <span className="font-medium">Company Target</span>
                        </button>
                        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-[#1E293B]/50 transition-colors">
                            <FaCalendarCheck className="text-purple-400" /> <span className="font-medium">Productivity</span>
                        </button>
                        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-[#1E293B]/50 transition-colors">
                            <FaBriefcase /> <span className="font-medium">Portfolio</span>
                        </button>
                    </div>

                    <div className="space-y-1 border-t border-slate-800/60 pt-6">
                        <div className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Management</div>
                        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-[#1E293B]/50 transition-colors">
                            <FaUsers /> <span className="font-medium">Users / Team</span>
                        </button>
                        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-[#1E293B]/50 transition-colors">
                            <FaCogs /> <span className="font-medium">Settings</span>
                        </button>
                        <button className="w-full flex items-center gap-4 px-4 py-3 mt-4 rounded-lg text-sm text-red-500 hover:bg-red-500/10 transition-colors">
                            <FaSignOutAlt /> <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 relative">
                {/* Topbar */}
                <header className="h-20 flex items-center px-10 shrink-0 border-b border-white/5 z-10 sticky top-0 bg-[#060B19]/90 backdrop-blur-md">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pages / Proposal</span>
                        <span className="text-white font-medium capitalize mt-1">
                            {activeTab === 'create' ? 'Create Proposal' : activeTab === 'draft' ? 'Draft AI' : 'Templates & Prompt'}
                        </span>
                    </div>

                    <div className="ml-auto flex items-center gap-6">
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                            <input
                                type="text"
                                placeholder="Type here..."
                                className="bg-[#111827] border border-slate-800 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all w-64"
                            />
                        </div>
                        <button className="text-slate-400 hover:text-white transition-colors"><FaCog size={14} /></button>
                        <button className="text-yellow-500 hover:text-yellow-400 transition-colors relative">
                            <FaBell size={14} />
                            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 border border-[#060B19]"></div>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-slate-700 ml-4 border-2 border-slate-600 overflow-hidden">
                            <img src="https://i.pravatar.cc/100?u=admin" alt="Admin" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </header>

                {/* View Content */}
                <div className="flex-1 overflow-y-auto p-10 relative">
                    {/* Background decor */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full relative z-10"
                        >
                            {activeTab === 'create' && <CreateProposalView onSubmit={handleCreateSubmit} />}
                            {activeTab === 'draft' && <DraftAIView data={proposalData} onBack={() => setActiveTab('create')} />}
                            {activeTab === 'templates' && <TemplatesPromptView />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
