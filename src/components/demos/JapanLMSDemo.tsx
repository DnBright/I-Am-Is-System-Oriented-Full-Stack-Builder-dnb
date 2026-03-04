'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaHome, FaShoppingBag, FaBook, FaVideo, FaFileAlt, FaCheckCircle, FaQuestionCircle,
    FaCertificate, FaCog, FaSignOutAlt, FaArrowLeft, FaBell, FaSearch, FaCheck,
    FaLock, FaPlay, FaChevronDown, FaChevronRight, FaCalendarAlt, FaUsers, FaTimes, FaGlobe
} from 'react-icons/fa';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

type NavItem = 'overview' | 'packages' | 'courses' | 'live' | 'materials' | 'quizzes' | 'certs';

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const Sidebar = ({ active, onNav }: { active: NavItem; onNav: (v: NavItem) => void }) => {
    const mainNav = [
        { id: 'overview', label: 'Overview', icon: <FaHome /> },
        { id: 'packages', label: 'Beli Paket', icon: <FaShoppingBag /> },
        { id: 'courses', label: 'My Courses', icon: <FaBook /> },
        { id: 'live', label: 'Live Classes', icon: <FaVideo /> },
    ];
    const assetNav = [
        { id: 'materials', label: 'Materials', icon: <FaFileAlt /> },
        { id: 'quizzes', label: 'Quizzes & Exams', icon: <FaQuestionCircle /> },
        { id: 'certs', label: 'Certificates', icon: <FaCertificate /> },
    ];

    return (
        <aside className="w-56 bg-white border-r border-slate-100 h-full flex flex-col shrink-0 overflow-y-auto">
            {/* Logo */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center">
                    <FaGlobe className="text-white text-base" />
                </div>
                <div>
                    <div className="font-black text-red-600 text-sm leading-none">KursusJepang</div>
                    <div className="text-[9px] text-slate-400 font-semibold tracking-widest mt-0.5">MEMBER HUB</div>
                </div>
            </div>

            {/* Back */}
            <button className="flex items-center gap-2 text-[11px] text-slate-500 font-medium px-6 py-4 hover:text-slate-800 transition-colors">
                <FaArrowLeft size={10} /> Ke Beranda
            </button>

            {/* Main */}
            <div className="px-4 mb-2">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Main Dashboard</div>
                {mainNav.map(item => (
                    <button
                        key={item.id}
                        onClick={() => onNav(item.id as NavItem)}
                        className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all mb-1",
                            active === item.id
                                ? "bg-red-50 text-red-600"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                        )}
                    >
                        <span className="text-[14px]">{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Assets */}
            <div className="px-4 mt-2">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Learning Assets</div>
                {assetNav.map(item => (
                    <button
                        key={item.id}
                        onClick={() => onNav(item.id as NavItem)}
                        className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all mb-1",
                            active === item.id
                                ? "bg-red-50 text-red-600"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                        )}
                    >
                        <span className="text-[14px]">{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="mt-auto px-4 pb-6">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-50 mb-1">
                    <FaCog /> Settings
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50">
                    <FaSignOutAlt /> Sign Out
                </button>
            </div>
        </aside>
    );
};

// ─── Topbar ───────────────────────────────────────────────────────────────────

const Topbar = () => (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center px-8 gap-6 shrink-0">
        <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-xs" />
            <input
                type="text"
                placeholder="Search lessons, materials, or sensei..."
                className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none text-slate-500 font-medium placeholder:text-slate-300 focus:border-red-200 transition-colors"
            />
            <kbd className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] text-slate-300 bg-slate-100 px-2 py-0.5 rounded">⌘K</kbd>
        </div>
        <button className="w-9 h-9 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-400 relative transition-colors">
            <FaBell />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
        </button>
        <div className="flex items-center gap-3">
            <div className="text-right">
                <div className="text-sm font-bold text-slate-800">Ganang</div>
                <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Premium Member</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-white text-sm font-bold">GA</div>
        </div>
    </header>
);

// ─── Overview View ────────────────────────────────────────────────────────────

const OverviewView = ({ onNav }: { onNav: (v: NavItem) => void }) => (
    <div className="p-8 space-y-8 overflow-y-auto">
        <div className="flex items-start justify-between">
            <div>
                <h1 className="text-3xl font-black text-slate-800">Selamat Datang, Ganang! 👋</h1>
                <p className="text-slate-500 mt-1 text-sm font-medium">Siap melanjutkan pembelajaran hari ini?</p>
            </div>
            <div className="text-sm text-slate-400 font-medium">Wednesday, 04 March 2026</div>
        </div>

        <div className="grid grid-cols-3 gap-6">
            {[
                { label: 'Total XP', value: '1,240', sub: 'Keep learning to earn more!', color: 'bg-purple-500', emoji: '⭐' },
                { label: 'Lessons Completed', value: '18', sub: 'Great progress!', color: 'bg-emerald-500', emoji: '📚' },
                { label: 'Achievements Earned', value: '5', sub: 'Unlock more badges!', color: 'bg-orange-500', emoji: '🏆' },
            ].map((stat, i) => (
                <div key={i} className={cn("rounded-2xl text-white p-6 flex justify-between items-start", stat.color)}>
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest opacity-80 mb-3">{stat.label}</div>
                        <div className="text-5xl font-black">{stat.value}</div>
                        <div className="text-xs mt-3 opacity-80 font-medium">{stat.sub}</div>
                    </div>
                    <span className="text-3xl">{stat.emoji}</span>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="text-lg">📝</span> Quiz Tersedia
                </h3>
                <div className="space-y-3">
                    {[
                        { title: 'Daily Quiz: Hiragana あ-さ', sub: '0 soal • 10 menit' },
                        { title: 'Daily Quiz: Katakana ア-サ', sub: '0 soal • 10 menit' },
                        { title: 'Week 1: Basic Greetings & Numbers', sub: '0 soal • 15 menit' },
                    ].map((q, i) => (
                        <button key={i} onClick={() => onNav('quizzes')} className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-sm border border-slate-100 transition-all group">
                            <div className="text-left">
                                <div className="text-sm font-bold text-slate-800">{q.title}</div>
                                <div className="text-xs text-slate-400 mt-0.5">{q.sub}</div>
                            </div>
                            <FaChevronRight className="text-slate-300 group-hover:text-red-500 transition-colors" size={12} />
                        </button>
                    ))}
                    <button onClick={() => onNav('quizzes')} className="w-full text-center py-3 text-sm font-bold text-slate-600 hover:text-red-600 transition-colors">
                        Lihat Semua Quiz →
                    </button>
                </div>
            </div>

            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="text-lg">📋</span> Assignment Mendatang
                </h3>
                <div className="flex flex-col items-center justify-center py-8 text-center text-slate-500">
                    <div className="text-3xl mb-3">🎉</div>
                    <p className="text-sm font-medium">Semua assignment sudah dikumpulkan!</p>
                </div>
                <button className="w-full py-3 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:border-red-300 hover:text-red-600 transition-all">
                    Lihat Semua Assignment →
                </button>
            </div>
        </div>
    </div>
);

// ─── Packages View ────────────────────────────────────────────────────────────

const PackagesView = () => (
    <div className="p-8 overflow-y-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-slate-800">Upgrade Karirmu 🚀</h1>
            <p className="text-slate-500 mt-3 text-base font-medium">Pilih paket tambahan untuk meningkatkan skill bahasa Jepang dan peluang karirmu.</p>
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
                {
                    tier: 'FOUNDATION', name: 'Basic N5', price: 'Rp 399k', original: 'Rp 599.000',
                    features: ['Video N5 Lengkap', 'E-Book Modul Eksklusif', 'Akses LMS Selamanya', 'Sertifikat Digital'],
                    dark: false, active: false, popular: false,
                    checks: [false, false, false, false]
                },
                {
                    tier: 'INTENSIVE', name: 'Intensive N4', price: 'Rp 2,250k', original: 'Rp 3.000.000',
                    features: ['Live Class Zoom 2x / Week', 'Koreksi Tugas Private', 'Tryout JLPT Real Time', 'Grup Diskusi Premium', 'Job Matching Priority'],
                    dark: true, active: true, popular: true,
                    checks: [true, true, true, true, true]
                },
                {
                    tier: 'CAREER', name: 'Tokutei Ginou', price: 'Rp 8,500k', original: 'Rp 12.000.000',
                    features: ['Pelatihan Skill Bidang', 'Interview Mockup Session', 'Counseling Preparation', 'Direct Working Visa'],
                    dark: false, active: false, popular: false,
                    checks: [false, false, false, false]
                },
            ].map((pkg, i) => (
                <div key={i} className={cn(
                    "rounded-3xl p-8 flex flex-col relative transition-all",
                    pkg.dark ? "bg-slate-900 text-white shadow-2xl scale-105" : "bg-white border border-slate-200 text-slate-800"
                )}>
                    {pkg.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                            ★ Most Popular
                        </div>
                    )}
                    <div className={cn("inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 w-fit border", pkg.dark ? "border-slate-700 text-slate-400" : "border-slate-200 text-slate-500")}>
                        {pkg.tier}
                    </div>
                    <h3 className="text-3xl font-black mb-6">{pkg.name}</h3>
                    <div className={cn("text-sm font-medium line-through mb-1", pkg.dark ? "text-slate-500" : "text-slate-400")}>{pkg.original}</div>
                    <div className="text-4xl font-black mb-8">{pkg.price}</div>

                    <ul className="space-y-3 mb-8 flex-1">
                        {pkg.features.map((f, j) => (
                            <li key={j} className="flex items-center gap-3 text-sm font-medium">
                                <div className={cn("w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] flex-shrink-0", pkg.dark ? "bg-red-600" : "bg-slate-800")}>
                                    <FaCheck />
                                </div>
                                {f}
                            </li>
                        ))}
                    </ul>

                    <button className={cn(
                        "w-full py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all",
                        pkg.active
                            ? "bg-white text-slate-800 border-2 border-emerald-500 text-emerald-600"
                            : pkg.dark
                                ? "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/30"
                                : "bg-slate-900 text-white hover:bg-slate-700"
                    )}>
                        {pkg.active ? '✓ Sudah Dimiliki' : 'Pilih Paket'}
                    </button>
                </div>
            ))}
        </div>
    </div>
);

// ─── Live Classes View ────────────────────────────────────────────────────────

const LiveClassesView = () => {
    const [view, setView] = useState<'list' | 'calendar'>('list');

    return (
        <div className="p-8 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-slate-800">Jadwal Kelas Live</h1>
                    <p className="text-sm text-slate-500 mt-1">Jangan lewatkan sesi live teaching bersama Sensei expert kami.</p>
                </div>
                <div className="flex border border-slate-200 rounded-xl overflow-hidden">
                    {(['list', 'calendar'] as const).map(v => (
                        <button
                            key={v}
                            onClick={() => setView(v)}
                            className={cn("px-5 py-2 text-[11px] font-bold uppercase transition-all capitalize", view === v ? "bg-slate-800 text-white" : "text-slate-500 hover:bg-slate-50")}
                        >
                            {v === 'list' ? 'List View' : 'Calendar'}
                        </button>
                    ))}
                </div>
            </div>

            {/* LIVE NOW Banner */}
            <div className="bg-red-700 rounded-2xl p-6 text-white flex items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-600 opacity-50" />
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-red-300 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest bg-red-900/40 px-3 py-1 rounded-full">Sedang Berlangsung (LIVE NOW)</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/10 rounded-2xl p-4 text-center min-w-[60px] border border-white/20">
                            <div className="text-[10px] font-bold uppercase">Hari Ini</div>
                            <div className="text-3xl font-black">05</div>
                            <div className="text-[10px] font-bold">Jan</div>
                        </div>
                        <div>
                            <h3 className="text-xl font-black">Bunpou N4: Mastering Conditional Forms (Tara, Ba, Nara)</h3>
                            <div className="flex items-center gap-4 mt-2 text-red-200 text-xs font-medium">
                                <span>🕐 19:00 - 20:30 WIB</span>
                                <span>👤 Tanaka Sensei</span>
                            </div>
                        </div>
                    </div>
                    <button className="mt-5 px-6 py-2.5 bg-white text-red-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-50 transition-colors flex items-center gap-2">
                        <FaVideo /> Join Zoom Meeting
                    </button>
                </div>
            </div>

            <h3 className="font-bold text-slate-700 text-base">Kelas Mendatang & Riwayat</h3>

            <div className="grid grid-cols-2 gap-4">
                {[
                    { tag: 'INTENSIVE N4', time: '19:30 WIB', title: 'Kaiwa Practice: Job Interview Simulation', desc: 'Simulasi wawancara kerja dengan native speaker. Persiapan jikoshoukai terbaikmu.', day: 'Besok', date: '06', month: 'Jan', sensei: 'S', senseiName: 'Sato Sensei', action: 'Belum Mulai', actionColor: 'text-slate-600 border border-slate-200' },
                    { tag: 'BASIC N5', time: 'Selesai', title: 'Materi 5: Partikel Dasar (Wa, Ga, O)', desc: 'Pembahasan mendalam tentang penggunaan partikel dasar yang sering membingungkan pemula.', day: 'Selesai', date: '03', month: 'Jan', sensei: 'B', senseiName: 'Budi Sensei', action: 'Tonton Rekaman', actionColor: 'text-emerald-600' },
                    { tag: 'TOKUTEI GINOU', time: '10:00 WIB', title: 'Caregiver Vocabulary Drill', desc: 'Latihan kosakata khusus bidang Kaigo (Caregiver) part 1.', day: 'Minggu Depan', date: '12', month: 'Jan', sensei: 'Y', senseiName: 'Yuki Sensei', action: 'Belum Mulai', actionColor: 'text-slate-600 border border-slate-200' },
                    { tag: 'BASIC N5', time: 'Selesai', title: 'Hiragana Perfect: Speed Reading', desc: 'Latihan kecepatan membaca Hiragana untuk memperkuat fondasi membaca.', day: 'Selesai', date: '28', month: 'Des', sensei: 'A', senseiName: 'Aya Sensei', action: 'Tonton Rekaman', actionColor: 'text-emerald-600' },
                ].map((cls, i) => (
                    <div key={i} className="border border-slate-100 rounded-2xl p-5 bg-white hover:shadow-sm transition-all flex gap-4">
                        <div className="text-center">
                            <div className={cn("text-[10px] font-bold mb-1.5", cls.day === 'Selesai' ? 'text-slate-400' : 'text-blue-600')}>{cls.day}</div>
                            <div className="text-2xl font-black text-slate-800">{cls.date}</div>
                            <div className="text-xs text-slate-400 font-medium">{cls.month}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                                <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                                    cls.tag.includes('INTENSIVE') ? 'bg-blue-50 text-blue-600' : cls.tag.includes('TOKUTEI') ? 'bg-purple-50 text-purple-600' : 'bg-slate-100 text-slate-600'
                                )}>{cls.tag}</span>
                                <span className="text-[11px] text-slate-400 font-medium">{cls.time}</span>
                            </div>
                            <h4 className="font-bold text-slate-800 text-sm leading-snug mb-1">{cls.title}</h4>
                            <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">{cls.desc}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <div className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[9px] font-black">{cls.sensei}</div>
                                    {cls.senseiName}
                                </div>
                                <button className={cn("text-[11px] font-bold px-4 py-1.5 rounded-xl transition-all", cls.actionColor, cls.action === 'Belum Mulai' ? 'bg-white hover:bg-slate-50' : 'hover:underline')}>
                                    {cls.action.includes('Rekaman') ? `⏺ ${cls.action}` : cls.action}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── My Courses View ──────────────────────────────────────────────────────────

const MyCoursesView = ({ onNav }: { onNav: (v: NavItem) => void }) => {
    const [filter, setFilter] = useState('Semua Kursus');

    return (
        <div className="p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-800">Kursus Saya</h1>
                    <p className="text-sm text-slate-500 mt-1">Lanjutkan pembelajaran Anda dari tempat terakhir Anda meninggalkannya.</p>
                </div>
                <div className="relative flex items-center gap-2 border border-slate-200 rounded-xl px-4 py-2">
                    <span className="text-sm text-slate-600 font-medium">Filter: {filter}</span>
                    <FaChevronDown size={10} className="text-slate-400" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {[
                    { tier: 'BASIC N5', title: 'Basic N5: The Foundation', desc: 'Membangun pondasi bahasa Jepang dari nol. Fokus pada penguasaan huruf, kosakata dasar, dan...', progress: 0, locked: true, emoji: '🇯🇵', modules: '3 Modul POPO', action: 'Beli Paket', actionColor: 'text-red-600 font-bold' },
                    { tier: 'INTENSIVE N4', title: 'Intensive N4: The Accelerator', desc: 'Program percepatan untuk lulus JLPT N4. Fokus pada konjugasi kata kerja, pemahaman bacaan, dan...', progress: 0, locked: false, emoji: '👘', modules: '3 Modul POPO', action: 'Lanjut →', actionColor: 'bg-red-600 text-white font-bold' },
                ].map((course, i) => (
                    <div key={i} className={cn("bg-white border rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col", course.locked ? 'border-slate-100' : 'border-slate-200')}>
                        <div className="h-44 bg-slate-50 flex items-center justify-center relative">
                            <span className="text-7xl">{course.emoji}</span>
                            {course.locked ? (
                                <span className="absolute top-4 right-4 px-3 py-1 bg-slate-200 text-slate-500 text-[10px] font-black uppercase rounded-full flex items-center gap-1.5">
                                    <FaLock size={8} /> Terkunci
                                </span>
                            ) : (
                                <span className="absolute top-4 right-4 px-3 py-1 bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase rounded-full flex items-center gap-1.5">
                                    ● Aktif
                                </span>
                            )}
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <div className={cn("text-[10px] font-black uppercase tracking-widest mb-2", course.locked ? 'text-slate-400' : 'text-blue-600')}>{course.tier}</div>
                            <h3 className={cn("font-black text-lg mb-2 leading-snug", course.locked ? 'text-slate-400' : 'text-slate-800')}>{course.title}</h3>
                            <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-1">{course.desc}</p>
                            <div className="mb-5">
                                <div className="flex justify-between text-xs text-slate-500 font-medium mb-1.5">
                                    <span>Progress Belajar</span> <span>{course.progress}%</span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500 rounded-full" style={{ width: `${course.progress}%` }} />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
                                    <span>📁</span> {course.modules}
                                </span>
                                <button onClick={() => !course.locked && onNav('materials')} className={cn("px-5 py-2.5 rounded-xl text-xs transition-all", course.actionColor, !course.locked ? 'shadow-md shadow-red-100 hover:bg-red-500' : 'text-sm')}>
                                    {course.action}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Materials View ───────────────────────────────────────────────────────────

const MaterialsView = () => {
    const [openModule, setOpenModule] = useState<number | null>(0);

    const modules = [
        {
            num: 1, title: 'Modul 1: Pengenalan Huruf Hiragana', count: '4 Materi • 45 Menit', status: 'Selesai', color: 'text-emerald-600', icon: <FaCheck />, bg: 'bg-emerald-100',
            items: [
                { type: 'video', icon: <FaPlay size={10} className="text-red-600" />, title: 'Video: Sejarah & Dasar Hiragana', meta: '12 Menit', status: '✓ Selesai', actions: ['Review'] },
                { type: 'pdf', icon: <FaFileAlt size={10} className="text-blue-600" />, title: 'PDF: Tabel & Cara Tulis A-Ko', meta: '5 Halaman', status: '✓ Selesai', actions: ['Baca Ulang'] },
            ]
        },
        { num: 2, title: 'Modul 2: Hiragana Lanjutan (Sa-Yo)', count: '3 Materi • 30 Menit', status: 'In Progress', color: 'text-blue-600', icon: '2', bg: 'bg-blue-100', items: [] },
        { num: 3, title: 'Modul 3: Katakana Dasar', count: 'Selesaikan Modul 2 untuk membuka', status: 'Terkunci', color: 'text-slate-400', icon: <FaLock size={12} />, bg: 'bg-slate-100', items: [] },
    ];

    return (
        <div className="p-8 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-slate-800">Materi Pembelajaran</h1>
                    <p className="text-sm text-slate-500 mt-1">Akses semua modul, video, dan bahan bacaan kursus Anda.</p>
                </div>
                <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-medium">
                    KURSUS: Basic N5: Hiragana & Katakana <FaChevronDown size={10} className="ml-2 text-slate-400" />
                </div>
            </div>

            <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="relative w-16 h-16">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                            <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                            <circle cx="32" cy="32" r="28" fill="none" stroke="white" strokeWidth="4" strokeDasharray={`${2 * Math.PI * 28 * 0.75} ${2 * Math.PI * 28 * 0.25}`} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-black">75%</div>
                    </div>
                    <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest bg-red-700/40 px-3 py-1 rounded-full mb-2 w-fit">Sedang Dipelajari</div>
                        <h3 className="text-xl font-black">Basic N5: Hiragana & Katakana Mastery</h3>
                        <p className="text-red-200 text-xs mt-1 font-medium">Lanjutkan modul terakhir Anda untuk menyelesaikan Bab 3. Semangat!</p>
                    </div>
                </div>
                <button className="px-6 py-3 bg-white text-red-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-50 transition-colors flex items-center gap-2 shadow-md">
                    <FaPlay /> Lanjut Belajar
                </button>
            </div>

            <div className="space-y-3">
                {modules.map((mod, i) => (
                    <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden bg-white">
                        <button
                            onClick={() => setOpenModule(openModule === i ? null : i)}
                            className={cn("w-full flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors", mod.status === 'Terkunci' && 'opacity-60 cursor-not-allowed')}
                            disabled={mod.status === 'Terkunci'}
                        >
                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0", mod.bg, mod.color)}>
                                {typeof mod.icon === 'string' ? mod.icon : mod.icon}
                            </div>
                            <div className="text-left flex-1">
                                <div className="font-bold text-slate-800 text-sm">{mod.title}</div>
                                <div className="text-xs text-slate-400 mt-0.5">{mod.count}</div>
                            </div>
                            <span className={cn("text-xs font-bold px-3 py-1 rounded-full", mod.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600' : mod.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400')}>
                                {mod.status}
                            </span>
                            {mod.items.length > 0 && <FaChevronDown className={cn("text-slate-300 transition-transform flex-shrink-0", openModule === i && 'rotate-180')} size={12} />}
                        </button>

                        <AnimatePresence>
                            {openModule === i && mod.items.length > 0 && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-slate-100 overflow-hidden"
                                >
                                    {mod.items.map((item, j) => (
                                        <div key={j} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                                            <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">{item.icon}</div>
                                            <div className="flex-1">
                                                <div className="text-sm font-bold text-slate-700">{item.title}</div>
                                                <div className="text-xs text-slate-400 mt-0.5">{item.meta}</div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs text-emerald-600 font-bold">{item.status}</span>
                                                {item.actions.map((a, k) => (
                                                    <button key={k} className="text-[11px] text-slate-500 font-bold hover:text-red-600 transition-colors">{a}</button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Quizzes View ─────────────────────────────────────────────────────────────

const QuizzesView = () => (
    <div className="p-8 overflow-y-auto space-y-8">
        <div>
            <h1 className="text-2xl font-black text-slate-800">Quizzes & Exams</h1>
            <p className="text-sm text-slate-500 mt-1">Uji pengetahuanmu dan pantau perkembanganmu secara berkala.</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
            {[
                { type: 'Daily Quiz', title: 'Daily Quiz: Hiragana あ-さ', sub: '10 soal • 10 menit', status: 'available', score: null },
                { type: 'Daily Quiz', title: 'Daily Quiz: Katakana ア-サ', sub: '10 soal • 10 menit', status: 'available', score: null },
                { type: 'Week 1', title: 'Week 1: Basic Greetings & Numbers', sub: '15 soal • 15 menit', status: 'available', score: null },
                { type: 'JLPT N5 Tryout', title: 'JLPT N5 Tryout: Full Simulation', sub: '110 soal • 105 menit', status: 'done', score: 82 },
            ].map((q, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center justify-between hover:shadow-sm transition-all">
                    <div className="flex items-center gap-5">
                        <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center text-sm",
                            q.status === 'done' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                        )}>
                            {q.status === 'done' ? <FaCheck /> : <FaQuestionCircle />}
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{q.type}</div>
                            <div className="font-bold text-slate-800">{q.title}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{q.sub}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        {q.score !== null && (
                            <div className="text-right">
                                <div className="text-2xl font-black text-emerald-600">{q.score}</div>
                                <div className="text-[10px] text-slate-400 font-medium">Score</div>
                            </div>
                        )}
                        <button className={cn("px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                            q.status === 'done'
                                ? "border border-slate-200 text-slate-600 hover:bg-slate-50"
                                : "bg-red-600 text-white hover:bg-red-500 shadow-md shadow-red-100"
                        )}>
                            {q.status === 'done' ? 'Lihat Hasil' : 'Mulai Quiz'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// ─── Certificates View ────────────────────────────────────────────────────────

const CertificatesView = () => (
    <div className="p-8 overflow-y-auto space-y-8">
        <div>
            <h1 className="text-2xl font-black text-slate-800">Certificates</h1>
            <p className="text-sm text-slate-500 mt-1">Sertifikat digital Anda yang bisa dibagikan ke profil LinkedIn.</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
            {[
                { title: 'N5 Hiragana Mastery', date: '15 Feb 2026', unlock: true },
                { title: 'Intensive N4 - Bunpou', date: 'Belum Terbuka', unlock: false },
            ].map((cert, i) => (
                <div key={i} className={cn("rounded-3xl p-8 border", cert.unlock ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-white border-slate-700' : 'bg-slate-50 border-slate-100')}>
                    <div className="flex items-center gap-3 mb-6">
                        <FaCertificate className={cert.unlock ? 'text-yellow-400 text-2xl' : 'text-slate-300 text-2xl'} />
                        <div>
                            <div className={cn("text-[10px] font-black uppercase tracking-widest", cert.unlock ? 'text-yellow-400' : 'text-slate-400')}>Kursus Jepang</div>
                        </div>
                    </div>
                    <h3 className={cn("text-xl font-black mb-2", cert.unlock ? 'text-white' : 'text-slate-400')}>{cert.title}</h3>
                    <p className={cn("text-sm mb-6", cert.unlock ? 'text-slate-400' : 'text-slate-400')}>Diberikan kepada: Ganang Aulia</p>
                    <div className="flex items-center justify-between">
                        <span className={cn("text-xs font-medium", cert.unlock ? 'text-slate-500' : 'text-slate-400')}>{cert.date}</span>
                        {cert.unlock ? (
                            <button className="px-5 py-2 bg-white text-slate-800 rounded-xl text-xs font-black hover:bg-slate-100 transition-colors">Download</button>
                        ) : (
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium"><FaLock size={10} /> Terkunci</div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function JapanLMSDemo() {
    const [active, setActive] = useState<NavItem>('overview');

    const renderView = () => {
        switch (active) {
            case 'overview': return <OverviewView onNav={setActive} />;
            case 'packages': return <PackagesView />;
            case 'courses': return <MyCoursesView onNav={setActive} />;
            case 'live': return <LiveClassesView />;
            case 'materials': return <MaterialsView />;
            case 'quizzes': return <QuizzesView />;
            case 'certs': return <CertificatesView />;
            default: return <OverviewView onNav={setActive} />;
        }
    };

    return (
        <div className="w-full h-full bg-slate-50 flex font-sans overflow-hidden">
            <Sidebar active={active} onNav={setActive} />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Topbar />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1 overflow-hidden"
                    >
                        {renderView()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
