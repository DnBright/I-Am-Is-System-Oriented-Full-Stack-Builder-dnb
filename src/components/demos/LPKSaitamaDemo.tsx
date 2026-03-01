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
    FaInfoCircle
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
                <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
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
                            "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all text-left",
                            activeTab === item.id
                                ? "bg-[#1e293b] text-white shadow-lg"
                                : "text-slate-400 hover:text-white"
                        )}
                    >
                        <item.icon size={14} className={cn(activeTab === item.id ? "text-blue-500" : "opacity-50")} />
                        <span className="text-[11px] font-bold">{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

const Topbar = () => (
    <div className="h-14 bg-[#1e3a8a] flex items-center justify-between px-6 text-white border-b border-white/5">
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
            <div className="hidden md:flex items-center gap-4 mr-4 opacity-70">
                <FaSearch size={12} />
                <FaBell size={12} />
                <FaCogs size={12} />
            </div>
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-tight uppercase">k</span>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-black italic bg-white/10">k</div>
            </div>
        </div>
    </div>
);

// --- Views ---

const DashboardView = () => (
    <div className="p-8 space-y-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1 border border-slate-100 bg-white rounded-[2rem] overflow-hidden shadow-sm flex flex-col items-center">
                <div className="w-full h-32 bg-[#1e293b] p-6 relative">
                    <div className="absolute top-4 right-4 text-white/20"><FaCogs size={16} /></div>
                </div>
                <div className="-mt-16 relative">
                    <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg bg-slate-200">
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500">
                            <FaUser size={60} />
                        </div>
                    </div>
                </div>
                <div className="p-8 flex flex-col items-center gap-2 text-center w-full">
                    <h2 className="text-xl font-black text-[#1e293b] uppercase tracking-tighter">k</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">K@GMAIL.COM</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[8px] font-black uppercase tracking-widest rounded-sm border border-blue-100">SENSEI</span>
                        <span className="px-3 py-1 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded-sm">PENGAJARAN</span>
                    </div>
                    <button className="mt-8 text-[9px] font-black text-[#1e3a8a] border-b border-[#1e3a8a] pb-1 uppercase tracking-widest hover:text-blue-700 transition-colors">Edit Profil</button>
                </div>
            </div>

            {/* Stats & Charts */}
            <div className="lg:col-span-3 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-50 flex flex-col gap-2 group hover:shadow-md transition-all">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Kelas</span>
                        <h2 className="text-6xl font-black text-[#1e293b]">6</h2>
                    </div>
                    <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-50 flex flex-col gap-2 group hover:shadow-md transition-all">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Siswa</span>
                        <h2 className="text-6xl font-black text-[#1e293b]">184</h2>
                    </div>
                </div>

                <div className="bg-[#1e293b] rounded-[2rem] text-white p-8 overflow-hidden shadow-xl">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                <FaCalendarAlt className="text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-tighter">Jadwal Mengajar</h3>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">MINGGU INI</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border-l-[6px] border-red-500 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                <div>
                                    <p className="font-black text-sm uppercase">Kanji <span className="text-[10px] text-slate-400 font-bold ml-2">A1</span></p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Selasa, 13:00 - 15:00</p>
                                </div>
                            </div>
                            <div className="text-[10px] font-black text-slate-500 uppercase">A1</div>
                        </div>
                        <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border-l-[6px] border-blue-500 hover:bg-white/10 transition-colors">
                            <div className="flex items-center gap-6">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <div>
                                    <p className="font-black text-sm uppercase">Kotoba <span className="text-[10px] text-slate-400 font-bold ml-2">B2</span></p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Rabu, 09:00 - 11:00</p>
                                </div>
                            </div>
                            <div className="text-[10px] font-black text-slate-500 uppercase">B2</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Kehadiran Circle */}
                    <div className="md:col-span-1 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-50 flex flex-col items-center">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">KEHADIRAN</h3>
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 * (1 - 0.85)} className="text-[#1e3a8a] transition-all duration-1000" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black text-[#1e293b]">85%</span>
                                <span className="text-[9px] font-black text-green-500 uppercase tracking-widest mt-1">HADIR</span>
                            </div>
                        </div>
                        <div className="mt-8">
                            <span className="bg-green-50 text-green-600 text-[8px] font-black px-4 py-1 rounded-full uppercase tracking-widest border border-green-100">Baik</span>
                        </div>
                    </div>

                    {/* Performance Chart */}
                    <div className="md:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-50">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-sm font-black text-[#1e293b] uppercase tracking-tighter">Grafik Performa Kelas</h3>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Perkembangan nilai rata-rata siswa</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#1e3a8a]" />
                                    <span className="text-[8px] font-bold text-slate-500 uppercase">Bahasa</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-400" />
                                    <span className="text-[8px] font-bold text-slate-500 uppercase">Fisik & Mental</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-40 flex items-end justify-between px-4 relative border-l border-b border-slate-100">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                <div key={i} className="flex flex-col items-center gap-2 group flex-1">
                                    <div className="flex gap-1 items-end w-full justify-center h-32">
                                        <motion.div initial={{ height: 0 }} animate={{ height: `${60 + Math.random() * 20}%` }} className="w-1.5 bg-[#1e3a8a] rounded-t-sm" />
                                        <motion.div initial={{ height: 0 }} animate={{ height: `${50 + Math.random() * 30}%` }} className="w-1.5 bg-red-400 rounded-t-sm" />
                                    </div>
                                    <span className="text-[8px] font-bold text-slate-300 uppercase">W{i}</span>
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
        <div className="p-8 space-y-6 max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-black text-[#1e3a8a] uppercase tracking-tighter">Penilaian Presensi</h2>
                        <span className="bg-blue-600 text-white text-[9px] px-3 py-1 rounded-sm font-black uppercase tracking-widest">A1</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">PENCATATAN KEHADIRAN SISWA (HADIR/SAKIT/IZIN/ALFA)</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="px-8 py-2.5 bg-[#1e3a8a] text-white rounded-md text-[11px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all flex items-center gap-2 min-w-[120px] justify-center" onClick={() => { setSaving(true); setTimeout(() => setSaving(false), 800); }}>
                        {saving ? <FaSpinner className="animate-spin" /> : 'Simpan'}
                    </button>
                    <button className="px-8 py-2.5 bg-white border border-slate-200 text-slate-400 rounded-md text-[11px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all" onClick={() => setStudents(initialStudents)}>Reset</button>
                    <button className="px-6 py-2.5 bg-white border border-slate-100 text-slate-400 rounded-md text-[9px] font-bold uppercase tracking-widest">31 Hari Aktif</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Attendance Table */}
                <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-[#1e3a8a] text-white text-[10px] font-black uppercase tracking-widest">
                                    <th className="px-6 py-4 border-r border-white/10 w-16">No</th>
                                    <th className="px-6 py-4 border-r border-white/10">Nama Siswa</th>
                                    <th className="px-6 py-4 border-r border-white/10 w-40">No. Telp</th>
                                    <th className="px-6 py-4">
                                        <div className="grid grid-cols-8 gap-1">
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="flex items-center justify-center p-1 bg-white/10 rounded-sm text-[8px]">{i}</div>)}
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {students.map((student, idx) => (
                                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 text-[11px] font-bold text-slate-400 border-r border-slate-100">{idx + 1}</td>
                                        <td className="px-6 py-4 border-r border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[9px] font-black uppercase shadow-sm">
                                                    {student.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <p className="font-black text-[11px] text-[#1e3a8a] uppercase">{student.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[10px] font-mono font-bold text-slate-500 border-r border-slate-100">{student.phone}</td>
                                        <td className="px-6 py-4">
                                            <div className="grid grid-cols-8 gap-2">
                                                {student.attendance.map((val, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => toggleDot(student.id, i)}
                                                        className={cn(
                                                            "w-6 h-6 rounded-full border-2 transition-all shadow-sm",
                                                            val ? "bg-green-500 border-green-500 scale-110" : "bg-white border-slate-100 hover:border-slate-300"
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

                {/* Sidebar Legend */}
                <div className="space-y-6">
                    <div className="bg-[#1e293b] text-white p-6 rounded-xl shadow-lg flex flex-col gap-6 border border-white/5">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Statistik Kehadiran</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-lg flex flex-col gap-1 border border-white/5">
                                <span className="text-[8px] font-black uppercase text-green-400">Hadir</span>
                                <span className="text-2xl font-black">0</span>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg flex flex-col gap-1 border border-white/5 text-red-400">
                                <span className="text-[8px] font-black uppercase">Alfa</span>
                                <span className="text-2xl font-black text-white">0</span>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg flex flex-col gap-1 border border-white/5 text-orange-400">
                                <span className="text-[8px] font-black uppercase">Sakit</span>
                                <span className="text-2xl font-black text-white">0</span>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg flex flex-col gap-1 border border-white/5 text-blue-400">
                                <span className="text-[8px] font-black uppercase">Izin</span>
                                <span className="text-2xl font-black text-white">0</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#1e3a8a] mb-6">KETERANGAN ICON</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Hadir (H)', color: 'bg-green-500' },
                                { label: 'Alfa (A)', color: 'bg-red-500' },
                                { label: 'Sakit (S)', color: 'bg-orange-500' },
                                { label: 'Izin (I)', color: 'bg-blue-500' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                                    <span>{item.label}</span>
                                    <div className={cn("w-4 h-4 rounded-full shadow-sm", item.color)} />
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
        <div className="p-8 space-y-6 max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-black text-[#1e3a8a] uppercase tracking-tighter">Penilaian Kotoba</h2>
                        <span className="bg-blue-600 text-white text-[9px] px-3 py-1 rounded-sm font-black uppercase tracking-widest">A1</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">DAFTAR NILAI KAS KOSAKATA (KOTOBA) SISWA</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#1e3a8a] text-white text-[10px] font-black uppercase tracking-widest">
                            <th className="px-6 py-4 border-r border-white/10 w-16">No</th>
                            <th className="px-6 py-4 border-r border-white/10">Nama Siswa</th>
                            <th className="px-6 py-4 border-r border-white/10 w-32 text-center">Bener</th>
                            <th className="px-6 py-4 border-r border-white/10 w-32 text-center">Nilai</th>
                            <th className="px-6 py-4">Tanggal</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {kotobaData.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 text-[11px] font-bold text-slate-400 border-r border-slate-100">{idx + 1}</td>
                                <td className="px-6 py-4 font-black text-[11px] text-[#1e3a8a] uppercase border-r border-slate-100">{item.name}</td>
                                <td className="px-6 py-4 text-[11px] font-black text-slate-600 border-r border-slate-100 text-center">{item.bener}</td>
                                <td className="px-6 py-4 border-r border-slate-100 text-center">
                                    <span className={cn(
                                        "px-4 py-1 rounded-sm text-[10px] font-black shadow-sm",
                                        item.nilai >= 75 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    )}>
                                        {item.nilai}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-[10px] font-mono font-bold text-slate-400">{item.tanggal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- Main Component ---

export default function LPKSaitamaDemo() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="w-full h-full min-h-[900px] bg-[#f8fafc] text-[#1e293b] flex shadow-2xl font-sans overflow-hidden border border-slate-200">
            {/* Sidebar replicated from screenshot */}
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Topbar />

                <div className="flex-1 overflow-y-auto bg-[#f8fafc]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.99 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.99 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            {activeTab === 'presensi' && <AttendanceView />}
                            {activeTab === 'pengajaran' && <KotobaView />}
                            {activeTab === 'dashboard' && <DashboardView />}
                            {(!['presensi', 'pengajaran', 'dashboard'].includes(activeTab)) && (
                                <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-4 opacity-50">
                                    <FaCogs size={60} />
                                    <p className="font-black uppercase tracking-[0.3em] text-xs">Module In Development</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
