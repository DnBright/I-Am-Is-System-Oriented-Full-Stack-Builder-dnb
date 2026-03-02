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
    FaCheckCircle,
    FaUserGraduate,
    FaArrowRight,
    FaGlobe,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaHistory,
    FaUsers,
    FaAward,
    FaBuilding,
    FaFileContract,
    FaCertificate,
    FaLightbulb,
    FaShieldAlt
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
    <div className="relative h-full w-full overflow-y-auto bg-white">
        {/* Hero Section */}
        <div className="relative h-[600px] w-full bg-slate-900 overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1600&q=80"
                    alt="Main"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-slate-900/80" />
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

                <div className="absolute right-12 top-1/2 -translate-y-1/2 w-[340px]">
                    <div className="bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 p-10 relative overflow-hidden group hover:bg-white/10 transition-all duration-700 shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-[60px] rounded-full" />
                        <div className="flex flex-col items-center text-center space-y-8 relative z-10">
                            <div className="w-24 h-24 rounded-3xl bg-white shadow-2xl p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                                <img src="https://lpk-ayaka.vercel.app/logo.png" alt="AJC Logo" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">AJC</h2>
                                <p className="text-[8px] font-black text-red-500 uppercase tracking-[0.3em]">LPK jepang terpercaya</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Features Section */}
        <div className="py-24 container mx-auto px-12 grid grid-cols-4 gap-8">
            {[
                { title: 'Spesialis Putri', desc: 'Satu-satunya LPK yang fokus pada pemberdayaan tenaga kerja putri.', icon: <FaUserGraduate /> },
                { title: 'Kurikulum Standar', desc: 'Pelatihan bahasa dan budaya dengan standar industri Jepang.', icon: <FaCheckCircle /> },
                { title: 'Penempatan Cepat', desc: 'Koneksi langsung dengan ratusan perusahaan di berbagai prefektur.', icon: <FaArrowRight /> },
                { title: 'Legal & Aman', desc: 'Izin resmi SO dari Kemenaker RI dan jaminan perlindungan alumni.', icon: <FaGlobe /> },
            ].map((feature, i) => (
                <div key={i} className="p-8 rounded-[30px] bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-xl transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6 text-xl group-hover:scale-110 transition-transform">
                        {feature.icon}
                    </div>
                    <h3 className="text-xl font-black text-[#1e293b] uppercase mb-3">{feature.title}</h3>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed uppercase tracking-wider">{feature.desc}</p>
                </div>
            ))}
        </div>

        {/* Footer Teaser */}
        <div className="bg-[#1e293b] py-20 px-12 text-white">
            <div className="container mx-auto grid grid-cols-4 gap-16">
                <div className="col-span-2 space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white p-2">
                            <img src="https://lpk-ayaka.vercel.app/logo.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <h2 className="text-3xl font-black tracking-tighter uppercase">AYAKA JOSEI CENTER</h2>
                    </div>
                    <p className="text-slate-400 max-w-md leading-relaxed">
                        Membangun masa depan wanita Indonesia yang mandiri, kompeten, dan memiliki daya saing global di kancah internasional khususnya di Jepang.
                    </p>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all cursor-pointer"><FaPhone size={14} /></div>
                        <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all cursor-pointer"><FaEnvelope size={14} /></div>
                        <div className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all cursor-pointer"><FaMapMarkerAlt size={14} /></div>
                    </div>
                </div>
                <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Navigasi</h4>
                    <ul className="space-y-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                        <li className="hover:text-white cursor-pointer transition-colors">Beranda</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Tentang Kami</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Program Kerja</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Galeri Kegiatan</li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Legalitas</h4>
                    <p className="text-xs text-slate-400 leading-loose uppercase tracking-widest font-bold">
                        Akreditasi A<br />
                        KEMENAKER RI NO: 2/252/HK.01.03/IX/2023
                    </p>
                </div>
            </div>
            <div className="mt-20 pt-8 border-t border-slate-800 text-center text-[8px] font-black text-slate-500 uppercase tracking-[0.4em]">
                &copy; 2026 LPK Ayaka Josei Center. All Rights Reserved.
            </div>
        </div>
    </div>
);

const ProfilView = () => (
    <div className="bg-white min-h-full animate-fade-in overflow-y-auto pb-24">
        {/* Hero Profil */}
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

        {/* Visi & Misi Section */}
        <div className="bg-slate-50 py-32">
            <div className="container mx-auto px-12 grid grid-cols-3 gap-12">
                <div className="col-span-1 space-y-6">
                    <div className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em]">Our Vision</div>
                    <h2 className="text-6xl font-black text-[#1e293b] tracking-tighter uppercase leading-[0.8]">VISI<br />KAMI</h2>
                    <p className="text-slate-400 text-xs leading-relaxed uppercase tracking-widest font-bold">
                        Menjadi lembaga pelatihan kerja terbaik yang mencetak tenaga kerja wanita profesional dan berdikari.
                    </p>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-8">
                    {[
                        { title: 'Integritas', desc: 'Membangun karakter peserta yang jujur, disiplin, dan bertanggung jawab.' },
                        { title: 'Kompetensi', desc: 'Memberikan pelatihan bahasa dan skill dengan standar tinggi.' },
                        { title: 'Kepedulian', desc: 'Mendampingi setiap peserta secara personal hingga sukses.' },
                        { title: 'Inovasi', desc: 'Terus mengembangkan kurikulum yang sesuai dengan kebutuhan industri.' },
                    ].map((misi, i) => (
                        <div key={i} className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 group hover:shadow-xl transition-all">
                            <div className="text-red-600 font-black text-2xl mb-4">0{i + 1}</div>
                            <h3 className="text-xl font-black text-[#1e293b] uppercase mb-3">{misi.title}</h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-relaxed">{misi.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const ProgramView = () => (
    <div className="bg-white min-h-full animate-fade-in relative overflow-y-auto flex flex-col pt-24 pb-24">
        <div className="container mx-auto px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
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
                        Daftar Program Sekarang
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

        {/* Timeline Section */}
        <div className="bg-slate-900 py-32 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
                <h3 className="text-[200px] font-black uppercase tracking-tighter">SUCCESS</h3>
            </div>
            <div className="container mx-auto px-12 relative z-10">
                <div className="flex flex-col items-center text-center mb-24 space-y-4">
                    <div className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">Step by Step</div>
                    <h2 className="text-6xl font-black tracking-tighter uppercase leading-tight">ALUR KEBERAnGKATAn</h2>
                </div>

                <div className="grid grid-cols-5 gap-4 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0" />
                    {[
                        { title: 'Seleksi', desc: 'Tes Fisik, Psikotes, & Wawancara.' },
                        { title: 'Pelatihan', desc: 'Kursus Bahasa & Skill 4-6 Bulan.' },
                        { title: 'Wawancara User', desc: 'Wawancara langsung dengan pihak Jepang.' },
                        { title: 'COE & Visa', desc: 'Pengurusan dokumen legalitas.' },
                        { title: 'Terbang', desc: 'Keberangkatan ke Jepang.' }
                    ].map((step, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-6 group">
                            <div className="w-16 h-16 rounded-full bg-[#1e293b] border-4 border-slate-800 flex items-center justify-center text-xl font-black group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-500">
                                {i + 1}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-black uppercase tracking-tight">{step.title}</h3>
                                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed px-4">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
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
                    {['SEMUA', 'PROGRAM', 'BAHASA', 'BUDAYA', 'ALUMNI'].map((c, i) => (
                        <button key={i} className={cn("text-[10px] font-black uppercase tracking-widest transition-all relative", i === 0 ? "text-red-600" : "text-slate-400 hover:text-slate-600")}>
                            {c}
                            {i === 0 && <div className="absolute -bottom-[22px] left-0 w-full h-0.5 bg-red-600" />}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-12">
                {[
                    { cat: 'PROGRAM', title: 'Mengenal Program Kaigo', date: '07 Feb 2026', views: '1.2k', img: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&q=80' },
                    { cat: 'BAHASA', title: 'Tips Cepat Hafal Kanji N4', date: '05 Feb 2026', views: '850', img: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&q=80' },
                    { cat: 'BUDAYA', title: 'Etika Kerja di Perusahaan Jepang', date: '01 Feb 2026', views: '2.4k', img: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80' }
                ].map((post, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="aspect-[16/10] rounded-[30px] overflow-hidden mb-6 relative">
                            <img src={post.img} alt="Post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-6 left-6 px-4 py-1.5 bg-red-600 text-white rounded text-[8px] font-black uppercase tracking-widest">{post.cat}</div>
                        </div>
                        <div className="flex items-center gap-4 text-slate-300 text-[9px] font-black uppercase tracking-widest mb-3">
                            <div className="flex items-center gap-1.5"><FaCalendarAlt size={10} /> {post.date}</div>
                            <div className="flex items-center gap-1.5"><FaRegEye size={10} /> {post.views} Views</div>
                        </div>
                        <h3 className="text-4xl font-black text-[#1e293b] leading-[1] tracking-tighter uppercase group-hover:text-red-600 transition-colors">{post.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const EbookView = () => (
    <div className="bg-white min-h-full animate-fade-in overflow-y-auto p-24">
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-16">
                <div className="space-y-4">
                    <div className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em]">Resources & Library</div>
                    <h2 className="text-7xl font-black text-[#1e293b] leading-tight tracking-tighter uppercase">DIGITAL <br />LIBRARY</h2>
                </div>
                <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#1e293b] border-b-2 border-[#1e293b] pb-2 mb-2">Lihat Semua Katalog <FaChevronRight size={10} /></button>
            </div>

            <div className="grid grid-cols-4 gap-8">
                {[
                    { title: 'Panduan Kosakata N5', type: 'PDF', color: 'bg-red-500' },
                    { title: 'Persiapan Wawancara', type: 'PDF', color: 'bg-slate-800' },
                    { title: 'Budaya Kerja Jepang', type: 'EPUB', color: 'bg-slate-400' },
                    { title: 'Checklist Dokumen', type: 'PDF', color: 'bg-red-600' }
                ].map((book, i) => (
                    <div key={i} className="group">
                        <div className={cn("aspect-[3/4] rounded-[30px] p-8 flex flex-col justify-between mb-6 group-hover:scale-105 transition-transform duration-500 shadow-2xl relative overflow-hidden", book.color)}>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 blur-2xl rounded-full" />
                            <div className="text-white/40 text-[10px] font-black uppercase tracking-widest">{book.type}</div>
                            <h3 className="text-2xl font-black text-white leading-tight uppercase">{book.title}</h3>
                        </div>
                        <button className="w-full py-4 bg-slate-50 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-[#1e293b] hover:text-white transition-all">Download</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const AlumniView = () => (
    <div className="bg-slate-900 min-h-full animate-fade-in overflow-y-auto p-24 text-white">
        <div className="max-w-6xl mx-auto flex gap-12 items-start">
            <div className="w-1/3 sticky top-0">
                <div className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Ayaka Alumni Network</div>
                <h2 className="text-7xl font-black leading-[0.9] tracking-tighter uppercase mb-8">KISAH <br />SUKSES</h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-12">
                    Inspirasi dari para putri terbaik yang telah berhasil menggapai mimpi dan membangun karir profesional di Negeri Sakura.
                </p>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <div className="text-4xl font-black text-red-500">1.2k+</div>
                        <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">Alumni Tersebar</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black text-white">47</div>
                        <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">Kota di Jepang</div>
                    </div>
                </div>
            </div>
            <div className="w-2/3 grid grid-cols-2 gap-8">
                {[
                    { name: 'Sarah Amanda', job: 'Caregiver - Tokyo', story: 'AJC membantu saya dari nol hingga fasih N4. Sekarang saya bekerja di salah satu fasilitias kesehatan terbaik di Tokyo.' },
                    { name: 'Putri Rahayu', job: 'Food Process - Osaka', story: 'Berkat bimbingan sensei di Ayaka, proses keberangkatan saya sangat lancar dan transparan.' }
                ].map((alumni, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-md rounded-[50px] p-10 border border-white/10 space-y-6">
                        <div className="w-20 h-20 rounded-[25px] overflow-hidden">
                            <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Alumni" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black uppercase tracking-tight">{alumni.name}</h3>
                            <p className="text-red-500 text-[10px] font-black uppercase tracking-widest mt-1">{alumni.job}</p>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed italic">"{alumni.story}"</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const KontakView = () => (
    <div className="bg-white min-h-full animate-fade-in flex">
        <div className="w-1/2 p-24 flex flex-col justify-center space-y-12">
            <div className="space-y-4">
                <div className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em]">Hubungi Kami</div>
                <h2 className="text-8xl font-black text-[#1e293b] leading-[0.8] tracking-tighter uppercase">TERHUBUnG <br />DEnGAn KAMI</h2>
            </div>
            <div className="space-y-6">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><FaPhone size={24} /></div>
                    <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hotline 24/7</div>
                        <div className="text-xl font-black text-[#1e293b]">+62 812 3456 7890</div>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400"><FaMapMarkerAlt size={24} /></div>
                    <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kantor Pusat</div>
                        <div className="text-xl font-black text-[#1e293b]">Yogyakarta, Indonesia</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-1/2 bg-slate-50 p-24 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-[40px] p-10 shadow-2xl space-y-8">
                <div className="space-y-2">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-[#1e293b]">Kirim Pesan</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Konsultasi Gratis Sekarang</p>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#1e293b]">Nama Lengkap</label>
                        <input className="w-full bg-slate-50 rounded-2xl px-6 py-4 border-none outline-none focus:ring-2 focus:ring-red-600/20 transition-all text-xs" placeholder="Jane Doe" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#1e293b]">Email</label>
                        <input className="w-full bg-slate-50 rounded-2xl px-6 py-4 border-none outline-none focus:ring-2 focus:ring-red-600/20 transition-all text-xs" placeholder="jane@example.com" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#1e293b]">Pesan</label>
                        <textarea rows={4} className="w-full bg-slate-50 rounded-3xl px-6 py-4 border-none outline-none focus:ring-2 focus:ring-red-600/20 transition-all text-xs resize-none" placeholder="Apa yang ingin anda tanyakan?" />
                    </div>
                    <button className="w-full py-5 bg-[#dc2626] text-white rounded-full text-[12px] font-black uppercase tracking-widest shadow-xl shadow-red-600/20 hover:scale-[1.02] active:scale-95 transition-all">Kirim Sekarang</button>
                </div>
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
                        {activeTab === 'e-book' && <EbookView />}
                        {activeTab === 'alumni' && <AlumniView />}
                        {activeTab === 'kontak' && <KontakView />}
                        {(!['home', 'profil', 'program', 'galeri', 'blog', 'e-book', 'alumni', 'kontak'].includes(activeTab)) && (
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
