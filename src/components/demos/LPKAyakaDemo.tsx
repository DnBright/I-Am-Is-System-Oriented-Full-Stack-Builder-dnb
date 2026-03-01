'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaPlay,
    FaExternalLinkAlt,
    FaChevronRight,
    FaChevronDown,
    FaSearch,
    FaClock,
    FaCalendarAlt,
    FaFilter,
    FaRegComment,
    FaRegEye,
    FaCheckCircle
} from 'react-icons/fa';
import { cn } from '@/lib/utils';

// --- Components ---

const Navbar = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) => {
    const tabs = ['HOME', 'PROFIL', 'PROGRAM', 'GALERI', 'BLOG', 'E-BOOK', 'ALUMNI', 'KONTAK'];

    return (
        <div className="bg-white/95 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 h-16 sticky top-0 z-50">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 p-1.5 overflow-hidden">
                    <img src="https://lpk-ayaka.vercel.app/logo.png" alt="Ayaka Logo" className="w-full h-full object-contain" onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Ayaka&background=ef4444&color=fff';
                    }} />
                </div>
            </div>

            <div className="flex bg-slate-50/50 p-1 rounded-full border border-slate-100 items-center">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab.toLowerCase())}
                        className={cn(
                            "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                            activeTab === tab.toLowerCase()
                                ? "bg-[#1e293b] text-white shadow-lg shadow-slate-900/20"
                                : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">Masuk</button>
                <button className="px-6 py-2 bg-[#dc2626] text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-600/20 hover:scale-105 active:scale-95 transition-all">Daftar</button>
            </div>
        </div>
    );
};

const HomeView = () => (
    <div className="relative h-full w-full overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
            <img
                src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1600&q=80"
                alt="Main"
                className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-slate-900/80" />
            <div className="absolute inset-0 bg-slate-900/20" />
        </div>

        <div className="relative h-full container mx-auto px-12 flex items-center">
            <div className="max-w-2xl space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Solusi Karir Jepang Terpercaya</span>
                </div>

                <h1 className="text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase relative">
                    AYAKA <span className="text-[#dc2626]">JOSEI</span><br />
                    CENTER
                    <div className="absolute -top-4 -right-12 w-24 h-24 bg-[#dc2626]/20 blur-3xl rounded-full" />
                </h1>

                <p className="text-lg text-white/70 font-medium max-w-lg leading-relaxed">
                    Lembaga Pelatihan Kerja Jepang Spesialis Putri yang berdedikasi membangun masa depan profesional global.
                </p>

                <div className="flex items-center gap-6 pt-4">
                    <button className="px-10 py-5 bg-[#dc2626] text-white rounded-full text-[12px] font-black uppercase tracking-widest shadow-2xl shadow-red-600/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group">
                        Pelajari Selengkapnya <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="flex items-center gap-3 text-white group cursor-pointer">
                        <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md group-hover:bg-white/10 group-hover:border-white transition-all">
                            <FaPlay size={14} className="ml-1" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Play Video</span>
                    </button>
                </div>
            </div>

            <div className="absolute right-12 top-1/2 -translate-y-1/2 w-[380px]">
                <div className="bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 p-10 relative overflow-hidden group hover:bg-white/10 transition-all duration-700 shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[60px] rounded-full" />

                    <div className="flex flex-col items-center text-center space-y-8 relative z-10">
                        <div className="w-32 h-32 rounded-3xl bg-white shadow-2xl shadow-slate-900/20 p-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                            <img src="https://lpk-ayaka.vercel.app/logo.png" alt="AJC Logo" className="w-full h-full object-contain" onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Ayaka&background=ef4444&color=fff';
                            }} />
                        </div>

                        <div>
                            <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">AJC</h2>
                            <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">LPK jepang terpercaya</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Floating Icons */}
        <div className="absolute bottom-12 right-12 flex flex-col gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.128l-.9 3.293 3.393-.89c.801.433 1.455.635 2.25.635 3.183 0 5.768-2.586 5.768-5.766 0-3.18-2.586-5.766-5.768-5.766zm3.208 8.169c-.139.389-.705.711-1.077.755-.3.036-.693.055-1.121-.082-.26-.083-.585-.195-.992-.37-1.741-.749-2.887-2.518-2.974-2.633-.087-.116-.711-.937-.711-1.789 0-.852.448-1.27.608-1.438.159-.168.347-.209.463-.209s.231.001.332.006c.108.005.253-.041.396.305.145.347.492 1.185.534 1.272.043.087.071.188.014.305s-.087.188-.173.289c-.087.101-.183.226-.261.304-.087.087-.179.182-.077.358.101.176.45 1.042.966 1.498.665.592 1.226.776 1.401.864.176.088.279.073.385-.049.106-.122.448-.521.569-.699.121-.176.242-.148.405-.087s1.041.492 1.214.577c.174.085.291.127.332.202.041.075.041.433-.098.822z" /></svg>
            </div>
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-10H6v2h12V4z" /></svg>
            </div>
        </div>
    </div>
);

const ProfilView = () => (
    <div className="bg-white min-h-full animate-fade-in overflow-y-auto">
        <div className="container mx-auto px-12 py-24">
            <div className="max-w-4xl mx-auto text-center space-y-12">
                <div className="inline-flex px-4 py-1 bg-red-50 text-red-600 rounded-full text-[9px] font-black uppercase tracking-widest">Profil Lembaga</div>
                <h2 className="text-7xl font-black text-[#1e293b] tracking-tighter uppercase leading-[0.9]">
                    Menemani Langkah Menuju <br />
                    <span className="text-slate-400">Masa Depan Global</span>
                </h2>
                <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                    LPK Ayaka Global Indonesia adalah mitra strategis dalam pengembangan kompetensi dan pemberdayaan wanita Indonesia untuk berkarir di kancah internasional.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mt-32 items-center">
                <div className="rounded-[40px] overflow-hidden shadow-2xl relative aspect-[4/3]">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&q=80" alt="Intro" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                </div>
                <div className="space-y-8">
                    <h3 className="text-4xl font-black text-[#1e293b] tracking-tight uppercase">Pengantar Profil</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Ayaka Josei Center (AJC) adalah lembaga pelatihan kerja (LPK) yang berdedikasi khusus untuk mempersiapkan dan memberdayakan perempuan Indonesia dalam meraih karir profesional di Jepang. Melalui pendekatan yang humanis dan terstandardisasi, kami berkomitmen menjadi jembatan...
                    </p>
                    <div className="grid grid-cols-2 gap-8 pt-8">
                        <div>
                            <div className="text-5xl font-black text-red-600 mb-2">98%</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tingkat Kelulusan</div>
                        </div>
                        <div>
                            <div className="text-5xl font-black text-[#1e293b] mb-2">500+</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alumni Aktif</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ProgramView = () => (
    <div className="bg-white min-h-full animate-fade-in relative overflow-hidden flex flex-col pt-24">
        <div className="container mx-auto px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-1">
            <div className="space-y-8">
                <div className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Program Edisi 2026</div>
                <h2 className="text-8xl font-black text-[#1e293b] leading-[0.8] tracking-tighter uppercase">
                    KARIR MASA <br />
                    <span className="text-red-600">DEPAn</span> <br />
                    DI JEPAnG
                </h2>
                <p className="text-xl text-slate-500 font-medium max-w-lg leading-relaxed">
                    Memberdayakan putri Indonesia melalui pelatihan vokasi spesialis dan penempatan langsung di sektor strategis Jepang.
                </p>
                <div className="pt-8">
                    <button className="px-12 py-5 bg-[#1e293b] text-white rounded-sm text-[12px] font-black uppercase tracking-widest shadow-2xl shadow-slate-900/20 hover:scale-105 active:scale-95 transition-all">
                        Jelajahi Program
                    </button>
                </div>
            </div>

            <div className="relative h-full flex items-center justify-center">
                <div className="w-full aspect-square rounded-[60px] overflow-hidden shadow-2xl relative">
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1000&q=80" alt="Program" className="w-full h-full object-cover" />
                    <div className="absolute top-0 right-0 w-full h-full bg-slate-400/10" />
                </div>

                {/* 98% Badge */}
                <div className="absolute bottom-12 left-0 -translate-x-12 bg-white/90 backdrop-blur-xl rounded-[40px] px-12 py-10 shadow-3xl border border-white/50">
                    <div className="text-6xl font-black text-red-600">98%</div>
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">Tingkat Penempatan</div>
                </div>
            </div>
        </div>

        <div className="absolute top-0 right-0 opacity-[0.03] select-none pointer-events-none transform translate-x-1/4 -translate-y-1/4">
            <h3 className="text-[300px] font-black uppercase tracking-tighter">PROGRAM</h3>
        </div>
    </div>
);

const GaleriView = () => (
    <div className="bg-white min-h-full animate-fade-in overflow-y-auto">
        <div className="container mx-auto px-12 py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
                <div className="space-y-4">
                    <div className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em]">Arsip Dokumentasi</div>
                    <h2 className="text-[120px] font-black text-[#1e293b] leading-[0.8] tracking-tighter uppercase relative">
                        CATATAn <br />
                        HIDUP
                        <div className="absolute top-0 -left-6 w-1 h-24 bg-red-600 rounded-full" />
                    </h2>
                </div>
                <div className="max-w-md pt-24">
                    <div className="w-16 h-1 bg-red-600 mb-8 rounded-full" />
                    <h3 className="text-4xl font-black text-[#1e293b] mb-6 tracking-tight">Jejak Langkah Kami</h3>
                    <p className="text-lg text-slate-500 leading-relaxed font-medium">
                        Kumpulan momen berharga yang merekam perjalanan transformasi para peserta didik menjadi tenaga profesional global yang tangguh dan berkarakter.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-center gap-12 mb-12 border-t border-slate-100 pt-12">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    <FaFilter size={10} /> Filter berdasarkan konteks
                </div>
                <div className="flex gap-4">
                    {['Semua', 'Pelatihan Skill', 'Kelas Bahasa Jepang', 'Pembinaan Karakter', 'Persiapan Keberangkatan'].map((f, i) => (
                        <button key={i} className={cn("px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all", i === 0 ? "bg-[#1e293b] text-white border-transparent" : "bg-white text-slate-400 border-slate-100 hover:border-slate-300")}>
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className="aspect-square rounded-[30px] overflow-hidden group relative">
                        <img src={`https://images.unsplash.com/photo-${1500000000000 + (i * 100000)}?w=600&h=600&fit=crop`} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                            <span className="text-white text-[10px] font-black uppercase tracking-widest">View Details</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const BlogView = () => (
    <div className="bg-white min-h-full animate-fade-in overflow-y-auto">
        <div className="container mx-auto px-12 py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-24">
                <div className="space-y-4">
                    <div className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em]">Pusat Intelijen Resmi</div>
                    <h2 className="text-[120px] font-black text-[#1e293b] leading-[0.8] tracking-tighter uppercase font-serif italic">
                        JURNAL <br />
                        AYAKA
                    </h2>
                </div>
                <div className="max-w-md pt-16">
                    <div className="w-16 h-1 bg-red-600 mb-8 rounded-full" />
                    <p className="text-2xl text-slate-500 italic leading-relaxed font-serif">
                        Edukasi dan informasi resmi mengenai program kerja Jepang, bahasa, dan budaya untuk mempersiapkan masa depan yang lebih matang.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-12 border-t border-b border-slate-100 py-6 mb-16">
                <div className="w-8 h-8 rounded-lg border border-slate-100 flex items-center justify-center text-slate-300">
                    <FaSearch size={12} />
                </div>
                <div className="flex gap-12 flex-1">
                    {['SEMUA', 'BLOG.CATEGORY.PROGRAM', 'BLOG.CATEGORY.BAHASA', 'BLOG.CATEGORY.BUDAYA', 'BLOG.CATEGORY.UMUM'].map((c, i) => (
                        <button key={i} className={cn("text-[10px] font-black uppercase tracking-widest transition-all relative", i === 0 ? "text-red-600" : "text-slate-400 hover:text-slate-600")}>
                            {c}
                            {i === 0 && <div className="absolute -bottom-[22px] left-0 w-full h-0.5 bg-red-600" />}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-12">
                {[
                    { cat: 'BLOG.CATEGORY.PROGRAM', title: 'Mengenal Program', date: '07 Feb 2026', views: 0 },
                    { cat: 'BLOG.CATEGORY.BAHASA', title: 'Tips Belajar Kanji', date: '05 Feb 2026', views: 0 }
                ].map((post, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="aspect-[16/10] rounded-[30px] overflow-hidden mb-6 relative">
                            <img src={`https://images.unsplash.com/photo-${1510000000000 + (i * 50000)}?w=800&h=500&fit=crop`} alt="Post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-6 left-6 px-4 py-1.5 bg-red-600 text-white rounded text-[8px] font-black uppercase tracking-widest">{post.cat}</div>
                        </div>
                        <div className="flex items-center gap-4 text-slate-300 text-[9px] font-black uppercase tracking-widest mb-3">
                            <div className="flex items-center gap-1.5"><FaCalendarAlt size={10} /> {post.date}</div>
                            <div className="flex items-center gap-1.5"><FaRegEye size={10} /> {post.views}</div>
                        </div>
                        <h3 className="text-5xl font-black text-[#1e293b] leading-[1] tracking-tighter uppercase group-hover:text-red-600 transition-colors">{post.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// --- Main Component ---

export default function LPKAyakaDemo() {
    const [activeTab, setActiveTab] = useState('home');

    return (
        <div className="w-full h-full bg-[#f8fafc] text-[#1e293b] flex flex-col font-sans overflow-hidden">
            <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="flex-1 min-h-0 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                    >
                        {activeTab === 'home' && <HomeView />}
                        {activeTab === 'profil' && <ProfilView />}
                        {activeTab === 'program' && <ProgramView />}
                        {activeTab === 'galeri' && <GaleriView />}
                        {activeTab === 'blog' && <BlogView />}
                        {(!['home', 'profil', 'program', 'galeri', 'blog'].includes(activeTab)) && (
                            <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-4 opacity-50 bg-white">
                                <FaSearch size={60} />
                                <p className="font-black uppercase tracking-[0.3em] text-xs">Section Under Maintenance</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Locale Floating Switch */}
            <div className="absolute bottom-8 left-8 z-50">
                <div className="bg-white/80 backdrop-blur-md rounded-full px-6 py-2 shadow-2xl border border-slate-100 flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 overflow-hidden">
                        <img src="https://flagcdn.com/id.svg" alt="ID" className="w-full h-full object-cover rounded-sm" />
                    </div>
                    <span className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">Indonesia</span>
                    <FaChevronDown size={8} className="text-slate-400 group-hover:rotate-180 transition-transform" />
                </div>
            </div>
        </div>
    );
}
