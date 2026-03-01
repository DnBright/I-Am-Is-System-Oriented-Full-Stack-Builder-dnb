'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaThLarge,
    FaChalkboardTeacher,
    FaClipboardList,
    FaUserClock,
    FaUser,
    FaSpinner,
    FaSearch,
    FaBell,
    FaCogs,
    FaSignOutAlt,
    FaCalendarAlt,
    FaArrowRight,
    FaChevronDown,
    FaInfoCircle,
    FaCheckCircle,
    FaClock,
    FaGlobeAmericas
} from 'react-icons/fa';
import { cn } from '@/lib/utils';

// --- Types & Data ---
interface Student {
    id: number;
    name: string;
    phone: string;
    attendance: (string | null)[]; // 8 slots for dots
}

const initialStudents: Student[] = [
    { id: 1, name: 'Adonis Pagac IV', phone: '1-720-939-0836', attendance: Array(8).fill(null) },
    { id: 2, name: 'Alessandro Effertz', phone: '1-819-853-9961', attendance: Array(8).fill(null) },
    { id: 3, name: 'Anabelle Beahan', phone: '+19124557613', attendance: Array(8).fill(null) },
    { id: 4, name: 'Annamarie Schulist', phone: '732-868-7971', attendance: Array(8).fill(null) },
    { id: 5, name: 'Antonia DuBuque', phone: '1-770-615-7792', attendance: Array(8).fill(null) },
    { id: 6, name: 'Clint Batz', phone: '+1.480.287.2529', attendance: Array(8).fill(null) },
    { id: 7, name: 'Delia Brown', phone: '+12173397786', attendance: Array(8).fill(null) },
    { id: 8, name: 'Deonte Pouros', phone: '858.720.4017', attendance: Array(8).fill(null) },
    { id: 9, name: 'Dr. Henry Armstrong I', phone: '+1-254-698-4344', attendance: Array(8).fill(null) },
];

const kotobaData = [
    { name: 'Adonis Pagac IV', bener: 14, nilai: 70, tanggal: '2024-05-13' },
    { name: 'Alessandro Effertz', bener: 20, nilai: 100, tanggal: '2024-05-13' },
    { name: 'Anabelle Beahan', bener: 18, nilai: 90, tanggal: '2024-05-13' },
    { name: 'Annamarie Schulist', bener: 12, nilai: 60, tanggal: '2024-05-13' },
    { name: 'Antonia DuBuque', bener: 15, nilai: 75, tanggal: '2024-05-13' },
    { name: 'Clint Batz', bener: 19, nilai: 95, tanggal: '2024-05-13' },
    { name: 'Delia Brown', bener: 16, nilai: 80, tanggal: '2024-05-13' },
    { name: 'Deonte Pouros', bener: 11, nilai: 55, tanggal: '2024-05-13' },
];

const evaluasiData = [
    { name: 'Adonis Pagac IV', bahasa: 85, fisik: 90, mental: 88, status: 'Lulus' },
    { name: 'Alessandro Effertz', bahasa: 92, fisik: 85, mental: 90, status: 'Lulus' },
    { name: 'Anabelle Beahan', bahasa: 70, fisik: 88, mental: 75, status: 'Mengulang' },
    { name: 'Annamarie Schulist', bahasa: 88, fisik: 82, mental: 85, status: 'Lulus' },
    { name: 'Antonia DuBuque', bahasa: 78, fisik: 75, mental: 80, status: 'Lulus' },
    { name: 'Clint Batz', bahasa: 95, fisik: 92, mental: 96, status: 'Lulus' },
    { name: 'Delia Brown', bahasa: 82, fisik: 80, mental: 84, status: 'Lulus' },
    { name: 'Deonte Pouros', bahasa: 65, fisik: 75, mental: 70, status: 'Mengulang' },
];

const statusSiswaData = [
    { name: 'Adonis Pagac IV', phase: 'Jepang', progress: 100, estimate: 'Selesai', icon: FaGlobeAmericas, color: 'text-green-500' },
    { name: 'Alessandro Effertz', phase: 'Matching', progress: 65, estimate: '2 Minggu', icon: FaClock, color: 'text-blue-500' },
    { name: 'Anabelle Beahan', phase: 'Learning', progress: 30, estimate: '4 Bulan', icon: FaChalkboardTeacher, color: 'text-orange-500' },
    { name: 'Annamarie Schulist', phase: 'Jepang', progress: 95, estimate: 'Waiting Visa', icon: FaGlobeAmericas, color: 'text-green-500' },
    { name: 'Antonia DuBuque', phase: 'Learning', progress: 15, estimate: '6 Bulan', icon: FaChalkboardTeacher, color: 'text-orange-500' },
    { name: 'Clint Batz', phase: 'Matching', progress: 80, estimate: '1 Minggu', icon: FaClock, color: 'text-blue-500' },
];

// --- Sub-Components ---

const Sidebar = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (id: string) => void }) => {
    const navItems = [
        { id: 'dashboard', icon: FaThLarge, label: 'Dashboard' },
        { id: 'pengajaran', icon: FaChalkboardTeacher, label: 'Pengajaran' },
        { id: 'presensi', icon: FaClipboardList, label: 'Penilaian Kelas' },
        { id: 'evaluasi', icon: FaClipboardList, label: 'Evaluasi Seleksi' },
        { id: 'status', icon: FaUserClock, label: 'Status Siswa' },
    ];

    return (
        <div className="w-56 bg-[#0f172a] h-full flex flex-col pt-4">
            <div className="px-5 mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <span className="text-white font-black text-xs">S</span>
                </div>
                <div>
                    <h4 className="text-[9px] font-black text-white uppercase leading-none">PT SAITAMA</h4>
                    <p className="text-[7px] text-slate-400 font-bold uppercase tracking-wider mt-1">JUARA MENDUNIA</p>
                </div>
            </div>

            <nav className="flex-1 px-2 space-y-1">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={cn(
                            "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all text-left group",
                            activeTab === item.id
                                ? "bg-[#1e293b] text-white shadow-xl"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <item.icon size={14} className={cn(activeTab === item.id ? "text-blue-500" : "opacity-50 group-hover:opacity-100 transition-opacity")} />
                        <span className="text-[11px] font-bold">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-red-400 text-left transition-colors">
                    <FaSignOutAlt size={12} />
                    <span className="text-[10px] font-black uppercase">Sign Out</span>
                </button>
            </div>
        </div>
    );
};

const Topbar = () => (
    <div className="h-14 bg-[#1e3a8a] flex items-center justify-between px-6 text-white border-b border-white/5 shadow-md z-10">
        <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white/20 rounded-sm flex items-center justify-center">
                <FaThLarge size={10} />
            </div>
            <div className="flex flex-col">
                <h4 className="text-[10px] font-black uppercase tracking-tighter leading-none">PT SAITAMA</h4>
                <p className="text-[8px] opacity-70 font-bold uppercase tracking-widest leading-none mt-1">JUARA MENDUNIA</p>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 mr-4 opacity-50">
                <FaSearch size={12} className="cursor-pointer hover:opacity-100" />
                <FaBell size={12} className="cursor-pointer hover:opacity-100" />
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <span className="text-[10px] font-black tracking-tight uppercase">KENZIE SENSEI</span>
                <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-black italic bg-white/10 shadow-inner">k</div>
            </div>
        </div>
    </div>
);

// --- Views ---

const DashboardView = () => (
    <div className="p-8 space-y-8 max-w-[1400px] mx-auto animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 border border-slate-100 bg-white rounded-[2rem] overflow-hidden shadow-sm flex flex-col items-center group hover:shadow-lg transition-all duration-500">
                <div className="w-full h-32 bg-[#1e293b] p-6 relative">
                    <div className="absolute top-4 right-4 text-white/10"><FaCogs size={20} /></div>
                </div>
                <div className="-mt-16 relative">
                    <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-xl bg-slate-200 group-hover:scale-105 transition-transform">
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500">
                            <FaUser size={60} />
                        </div>
                    </div>
                </div>
                <div className="p-8 flex flex-col items-center gap-2 text-center w-full">
                    <h2 className="text-xl font-black text-[#1e293b] uppercase tracking-tighter">Kenzie Sensei</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">K@GMAIL.COM</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[8px] font-black uppercase tracking-widest rounded-sm border border-blue-100 shadow-sm">SENSEI</span>
                        <span className="px-3 py-1 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded-sm shadow-lg shadow-blue-500/20">PENGAJARAN</span>
                    </div>
                    <button className="mt-8 text-[9px] font-black text-[#1e3a8a] border-b border-[#1e3a8a] pb-1 uppercase tracking-widest hover:text-blue-800 hover:border-blue-800 transition-all">Edit Profil</button>
                </div>
            </div>

            <div className="lg:col-span-3 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-50 flex flex-col gap-2 group hover:shadow-xl transition-all duration-500 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform"><FaThLarge size={120} /></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] relative z-10">Total Kelas</span>
                        <h2 className="text-7xl font-black text-[#1e293b] relative z-10">6</h2>
                    </div>
                    <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-50 flex flex-col gap-2 group hover:shadow-xl transition-all duration-500 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform"><FaUser size={120} /></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] relative z-10">Total Siswa</span>
                        <h2 className="text-7xl font-black text-[#1e293b] relative z-10">184</h2>
                    </div>
                </div>

                <div className="bg-[#1e293b] rounded-[2rem] text-white p-8 overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><FaCalendarAlt size={200} /></div>
                    <div className="flex items-center justify-between mb-8 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                                <FaCalendarAlt className="text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-tighter">Jadwal Mengajar</h3>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">MINGGU INI</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 relative z-10">
                        <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border-l-[6px] border-red-500 hover:bg-white/10 transition-all group/item">
                            <div className="flex items-center gap-6">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                <div>
                                    <p className="font-black text-sm uppercase group-hover/item:text-red-400 transition-colors">Kanji <span className="text-[10px] text-slate-500 font-bold ml-2">A1</span></p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Selasa, 13:00 - 15:00</p>
                                </div>
                            </div>
                            <FaArrowRight className="text-white/10 group-hover/item:text-white/40 transition-all" size={14} />
                        </div>
                        <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border-l-[6px] border-blue-500 hover:bg-white/10 transition-all group/item">
                            <div className="flex items-center gap-6">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <div>
                                    <p className="font-black text-sm uppercase group-hover/item:text-blue-400 transition-colors">Kotoba <span className="text-[10px] text-slate-500 font-bold ml-2">B2</span></p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Rabu, 09:00 - 11:00</p>
                                </div>
                            </div>
                            <FaArrowRight className="text-white/10 group-hover/item:text-white/40 transition-all" size={14} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-50 flex flex-col items-center group hover:shadow-lg transition-all">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">KEHADIRAN</h3>
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-50" />
                                <motion.circle
                                    cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent"
                                    initial={{ strokeDashoffset: 440 }}
                                    animate={{ strokeDashoffset: 440 * (1 - 0.85) }}
                                    strokeDasharray={440}
                                    className="text-[#1e3a8a]"
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black text-[#1e293b]">85%</span>
                                <span className="text-[9px] font-black text-green-500 uppercase tracking-widest mt-1">HADIR</span>
                            </div>
                        </div>
                        <div className="mt-8">
                            <span className="bg-green-50 text-green-600 text-[8px] font-black px-5 py-1.5 rounded-full uppercase tracking-widest border border-green-100 shadow-sm">KATEGORI: BAIK</span>
                        </div>
                    </div>

                    <div className="md:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-50 flex flex-col group hover:shadow-lg transition-all">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-sm font-black text-[#1e293b] uppercase tracking-tighter">Grafik Performa Kelas</h3>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Nilai rata-rata mingguan</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#1e3a8a] shadow-sm" />
                                    <span className="text-[8px] font-black text-slate-500 uppercase">BAHASA</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-400 shadow-sm" />
                                    <span className="text-[8px] font-black text-slate-500 uppercase">FISIK</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 h-40 flex items-end justify-between px-4 pb-4 border-l border-b border-slate-100">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                <div key={i} className="flex flex-col items-center gap-2 group/bar flex-1 max-w-[40px]">
                                    <div className="flex gap-1 items-end w-full justify-center h-full">
                                        <motion.div initial={{ height: 0 }} animate={{ height: `${65 + Math.random() * 25}%` }} className="w-2 bg-[#1e3a8a] rounded-t-sm shadow-md" transition={{ delay: i * 0.1 }} />
                                        <motion.div initial={{ height: 0 }} animate={{ height: `${55 + Math.random() * 35}%` }} className="w-2 bg-red-400 rounded-t-sm shadow-md" transition={{ delay: (i + 2) * 0.1 }} />
                                    </div>
                                    <span className="text-[8px] font-black text-slate-300 uppercase">W{i}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const AttendanceView = () => {
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [saving, setSaving] = useState(false);

    const toggleDot = (studentId: number, slotIndex: number) => {
        setStudents(prev => prev.map(s => {
            if (s.id === studentId) {
                const newAttendance = [...s.attendance];
                newAttendance[slotIndex] = newAttendance[slotIndex] ? null : 'H';
                return { ...s, attendance: newAttendance };
            }
            return s;
        }));
    };

    return (
        <div className="p-8 space-y-6 max-w-[1400px] mx-auto animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-black text-[#1e3a8a] uppercase tracking-tighter">Penilaian Presensi</h2>
                        <span className="bg-blue-600 text-white text-[9px] px-3 py-1 rounded-sm font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">A1</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">SISTEM MONITORING KEHADIRAN HARIAN</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="px-10 py-3 bg-[#1e3a8a] text-white rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all flex items-center gap-3 min-w-[140px] justify-center shadow-lg shadow-blue-900/10 active:scale-95" onClick={() => { setSaving(true); setTimeout(() => setSaving(false), 1200); }}>
                        {saving ? <FaSpinner className="animate-spin" /> : <><FaCheckCircle /> Simpan</>}
                    </button>
                    <button className="px-10 py-3 bg-white border border-slate-200 text-slate-500 rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95" onClick={() => setStudents(initialStudents)}>Reset</button>
                    <div className="px-6 py-3 bg-blue-50 border border-blue-100 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                        <FaClock /> 31 HARI AKTIF
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="bg-[#1e3a8a] text-white text-[10px] font-black uppercase tracking-widest">
                                    <th className="px-6 py-5 border-r border-white/5 w-16 text-center">No</th>
                                    <th className="px-8 py-5 border-r border-white/5">Identitas Siswa</th>
                                    <th className="px-8 py-5 border-r border-white/5 w-48">Kontak</th>
                                    <th className="px-8 py-5">
                                        <div className="flex items-center justify-between mb-2">
                                            <span>REKAPITULASI SESSI (1-10)</span>
                                            <FaInfoCircle size={10} className="opacity-50" />
                                        </div>
                                        <div className="grid grid-cols-10 gap-2">
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <div key={i} className="flex items-center justify-center h-6 bg-white/10 rounded-sm text-[8px] font-black">{i}</div>)}
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {students.map((student, idx) => (
                                    <tr key={student.id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-5 text-[11px] font-black text-slate-400 border-r border-slate-100 text-center">{idx + 1}</td>
                                        <td className="px-8 py-5 border-r border-slate-100">
                                            <div className="flex items-center gap-4">
                                                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-black uppercase shadow-inner">
                                                    {student.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <p className="font-black text-[11px] text-[#1e3a8a] uppercase leading-none">{student.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-[10px] font-mono font-bold text-slate-400 border-r border-slate-100">{student.phone}</td>
                                        <td className="px-8 py-5">
                                            <div className="grid grid-cols-10 gap-3">
                                                {/* Re-map to 10 slots for the complete UI look */}
                                                {[...student.attendance, null, null].map((val, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => toggleDot(student.id, i)}
                                                        className={cn(
                                                            "w-6 h-6 rounded-full border-2 transition-all shadow-sm",
                                                            val ? "bg-green-500 border-green-500 scale-110 shadow-green-500/20" : "bg-white border-slate-100 hover:border-blue-200"
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0f172a] text-white p-8 rounded-2xl shadow-2xl flex flex-col gap-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5"><FaClipboardList size={80} /></div>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-400 relative z-10">Statistik Live</h3>
                        <div className="grid grid-cols-2 gap-4 relative z-10">
                            {[
                                { label: 'Hadir', value: '142', color: 'text-green-500', bg: 'bg-green-500/10' },
                                { label: 'Alfa', value: '02', color: 'text-red-500', bg: 'bg-red-500/10' },
                                { label: 'Sakit', value: '05', color: 'text-orange-500', bg: 'bg-orange-500/10' },
                                { label: 'Izin', value: '08', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                            ].map((stat, i) => (
                                <div key={i} className={cn("p-4 rounded-xl flex flex-col gap-1 border border-white/5", stat.bg)}>
                                    <span className="text-[9px] font-black uppercase opacity-60">{stat.label}</span>
                                    <span className={cn("text-3xl font-black", stat.color)}>{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1e3a8a] mb-8 border-b border-slate-50 pb-4">INDIKATOR STATUS</h3>
                        <div className="space-y-5">
                            {[
                                { label: 'PESERTA HADIR (H)', color: 'bg-green-500' },
                                { label: 'TANPA KETERANGAN (A)', color: 'bg-red-500' },
                                { label: 'BERHALANGAN SAKIT (S)', color: 'bg-orange-500' },
                                { label: 'IZIN KEPERLUAN (I)', color: 'bg-blue-500' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between text-[11px] font-black text-slate-500 uppercase">
                                    <span>{item.label}</span>
                                    <div className={cn("w-4 h-4 rounded-full shadow-inner", item.color)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const KotobaView = () => {
    return (
        <div className="p-8 space-y-6 max-w-[1400px] mx-auto animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-black text-[#1e3a8a] uppercase tracking-tighter">Penilaian Kotoba</h2>
                        <span className="bg-blue-600 text-white text-[9px] px-3 py-1 rounded-sm font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">KAS-K</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">DAFTAR NILAI KOSAKATA (KOTOBA) SISWA HARIAN</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#1e3a8a] text-white text-[10px] font-black uppercase tracking-widest">
                            <th className="px-8 py-5 border-r border-white/5 w-16 text-center">No</th>
                            <th className="px-8 py-5 border-r border-white/5">Nama Siswa</th>
                            <th className="px-8 py-5 border-r border-white/5 w-32 text-center">Bener</th>
                            <th className="px-8 py-5 border-r border-white/5 w-32 text-center">Nilai</th>
                            <th className="px-8 py-5">Tanggal Penilaian</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {kotobaData.map((item, idx) => (
                            <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                                <td className="px-8 py-5 text-[11px] font-black text-slate-400 border-r border-slate-100 text-center">{idx + 1}</td>
                                <td className="px-8 py-5 font-black text-[11px] text-[#1e3a8a] uppercase border-r border-slate-100">{item.name}</td>
                                <td className="px-8 py-5 text-[11px] font-black text-slate-600 border-r border-slate-100 text-center">{item.bener}</td>
                                <td className="px-8 py-5 border-r border-slate-100 text-center">
                                    <span className={cn(
                                        "px-6 py-1.5 rounded-sm text-[10px] font-black shadow-sm",
                                        item.nilai >= 75 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    )}>
                                        {item.nilai}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-[10px] font-mono font-bold text-slate-400 uppercase">{item.tanggal} // 08:30 AM</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const EvaluasiView = () => (
    <div className="p-8 space-y-6 max-w-[1400px] mx-auto animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-black text-[#1e3a8a] uppercase tracking-tighter">Evaluasi Seleksi</h2>
                    <span className="bg-blue-600 text-white text-[9px] px-3 py-1 rounded-sm font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">BATCH 12</span>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">HASIL EVALUASI KOMPREHENSIF CALON PESERTA</p>
            </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-[#1e3a8a] text-white text-[10px] font-black uppercase tracking-widest">
                        <th className="px-8 py-5 border-r border-white/5 w-16 text-center">No</th>
                        <th className="px-8 py-5 border-r border-white/5">Identitas</th>
                        <th className="px-8 py-5 border-r border-white/5 text-center">Bahasa</th>
                        <th className="px-8 py-5 border-r border-white/5 text-center">Fisik</th>
                        <th className="px-8 py-5 border-r border-white/5 text-center">Mental</th>
                        <th className="px-8 py-5 text-center">Status Akhir</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {evaluasiData.map((item, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                            <td className="px-8 py-5 text-[11px] font-black text-slate-400 border-r border-slate-100 text-center">{idx + 1}</td>
                            <td className="px-8 py-5 font-black text-[11px] text-[#1e3a8a] uppercase border-r border-slate-100">{item.name}</td>
                            <td className="px-8 py-5 text-[11px] font-black text-slate-600 border-r border-slate-100 text-center">{item.bahasa}</td>
                            <td className="px-8 py-5 text-[11px] font-black text-slate-600 border-r border-slate-100 text-center">{item.fisik}</td>
                            <td className="px-8 py-5 text-[11px] font-black text-slate-600 border-r border-slate-100 text-center">{item.mental}</td>
                            <td className="px-8 py-5 text-center">
                                <span className={cn(
                                    "px-6 py-1.5 rounded-sm text-[10px] font-black shadow-sm uppercase tracking-widest",
                                    item.status === 'Lulus' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                )}>
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const StatusSiswaView = () => (
    <div className="p-8 space-y-6 max-w-[1400px] mx-auto animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-black text-[#1e3a8a] uppercase tracking-tighter">Status Penyaluran</h2>
                    <span className="bg-blue-600 text-white text-[9px] px-3 py-1 rounded-sm font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">LIVE TRACKER</span>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">PROFIL PROGRESS DAN TAHAPAN PENYALURAN KERJA</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statusSiswaData.map((student, idx) => (
                <div key={idx} className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><student.icon size={60} /></div>
                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <div className="w-11 h-11 rounded-full bg-slate-50 text-blue-600 flex items-center justify-center text-xs font-black uppercase shadow-inner border border-slate-100">
                            {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className={cn(
                            "text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm border border-slate-50",
                            student.phase === 'Jepang' ? "bg-green-50 text-green-600" :
                                student.phase === 'Matching' ? "bg-blue-50 text-blue-600" :
                                    "bg-orange-50 text-orange-600"
                        )}>
                            {student.phase}
                        </span>
                    </div>
                    <h4 className="font-black text-[13px] text-[#1e3a8a] uppercase mb-1 relative z-10">{student.name}</h4>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-6 relative z-10">Estimasi Penyaluran: <span className="text-slate-600">{student.estimate}</span></p>

                    <div className="space-y-2 relative z-10">
                        <div className="flex justify-between text-[8px] font-black uppercase text-slate-400">
                            <span>Kesiapan Peserta</span>
                            <span>{student.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${student.progress}%` }}
                                className={cn(
                                    "h-full transition-all duration-[1500ms] shadow-lg",
                                    student.progress === 100 ? "bg-green-500" : "bg-[#1e3a8a]"
                                )}
                                transition={{ ease: "circOut" }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// --- Main Component ---

export default function LPKSaitamaDemo() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="w-full h-full min-h-[900px] bg-[#f8fafc] text-[#1e293b] flex shadow-2xl font-sans overflow-hidden border border-slate-200 rounded-2xl">
            {/* Sidebar replicated from screenshot */}
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#fdfdfd]">
                <Topbar />

                <div className="flex-1 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.99, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.99, y: -5 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="h-full"
                        >
                            {activeTab === 'presensi' && <AttendanceView />}
                            {activeTab === 'pengajaran' && <KotobaView />}
                            {activeTab === 'evaluasi' && <EvaluasiView />}
                            {activeTab === 'status' && <StatusSiswaView />}
                            {activeTab === 'dashboard' && <DashboardView />}
                            {(!['presensi', 'pengajaran', 'dashboard', 'evaluasi', 'status'].includes(activeTab)) && (
                                <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-4 opacity-50">
                                    <FaCogs size={60} className="animate-pulse" />
                                    <p className="font-black uppercase tracking-[0.3em] text-xs">Modul Tahap Pengembangan</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
