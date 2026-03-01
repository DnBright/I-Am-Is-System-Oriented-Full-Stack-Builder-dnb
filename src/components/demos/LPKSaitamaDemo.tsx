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
    FaGlobeAmericas,
    FaBookOpen,
    FaAward,
    FaChevronRight,
    FaEdit
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

const statusSiswaListData = [
    { id: 1, name: 'Delia Brown', angkatan: 'A1', followUp: '24/08/2025', status: 'SELEKSI', statusColor: 'bg-blue-100 text-[#1e3a8a]', initial: 'D' },
    { id: 2, name: 'Prof. Patrick Stamm', angkatan: 'A1', followUp: '24/09/2025', status: 'ULANG KELAS', statusColor: 'bg-orange-50 text-orange-600', initial: 'P' },
    { id: 3, name: 'Vickie Daugherty', angkatan: 'A1', followUp: '15/05/2025', status: 'SELEKSI', statusColor: 'bg-blue-100 text-[#1e3a8a]', initial: 'V' },
    { id: 4, name: 'Prof. Ricky Eichmann', angkatan: 'A1', followUp: '20/05/2025', status: 'BLK', statusColor: 'bg-orange-100 text-orange-700', initial: 'P' },
    { id: 5, name: 'Mason Luettgen', angkatan: 'A1', followUp: '28/06/2025', status: 'SELEKSI', statusColor: 'bg-blue-100 text-[#1e3a8a]', initial: 'M' },
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
        <div className="w-48 bg-[#0f172a] h-full flex flex-col pt-4 border-r border-white/5">
            <div className="px-5 mb-6 flex items-center gap-3">
                <div className="w-7 h-7 bg-blue-600 rounded-sm flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <span className="text-white font-black text-[10px]">S</span>
                </div>
                <div className="overflow-hidden">
                    <h4 className="text-[8px] font-black text-white uppercase tracking-tighter truncate">PT SAITAMA</h4>
                    <p className="text-[6px] text-slate-500 font-bold uppercase tracking-wider truncate">JUARA MENDUNIA</p>
                </div>
            </div>

            <nav className="flex-1 px-2 space-y-0.5">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onTabChange(item.id)}
                        className={cn(
                            "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all text-left group",
                            activeTab === item.id
                                ? "bg-blue-600/10 text-blue-400 shadow-[inset_0_0_12px_rgba(37,99,235,0.05)]"
                                : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                        )}
                    >
                        <item.icon size={12} className={cn(activeTab === item.id ? "text-blue-500" : "opacity-40 group-hover:opacity-100 transition-opacity")} />
                        <span className="text-[10px] font-black uppercase tracking-tight">{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

const Topbar = () => (
    <div className="h-12 bg-white flex items-center justify-between px-6 text-[#1e293b] border-b border-slate-100 shadow-sm z-10">
        <div className="flex items-center gap-2">
            <div className="flex flex-col">
                <h4 className="text-[9px] font-black uppercase tracking-tighter leading-none text-[#1e3a8a]">System Control</h4>
                <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">Session Active</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 mr-3 border-r border-slate-100 pr-3">
                <FaSearch size={10} className="text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" />
                <div className="relative cursor-pointer group">
                    <FaBell size={10} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                    <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
                </div>
                <FaCogs size={10} className="text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" />
            </div>
            <div className="flex items-center gap-2 px-2 py-1 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-[9px] font-black text-[#1e3a8a] uppercase">Admin Saitama</span>
                <div className="w-6 h-6 rounded-full bg-[#1e3a8a] flex items-center justify-center text-[9px] font-black text-white italic ring-2 ring-white">K</div>
            </div>
        </div>
    </div>
);

// --- Views ---

const DashboardView = () => (
    <div className="p-6 space-y-6 max-w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3 border border-slate-100 bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col items-center">
                <div className="w-full h-24 bg-[#1e293b] p-6 relative">
                    <div className="absolute top-4 right-4 text-white/10"><FaCogs size={12} /></div>
                </div>
                <div className="-mt-12 relative">
                    <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md bg-slate-50">
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <FaUser size={40} />
                        </div>
                    </div>
                </div>
                <div className="p-6 flex flex-col items-center gap-1 text-center w-full">
                    <h2 className="text-lg font-black text-[#1e293b] uppercase tracking-tighter">Admin Saitama</h2>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">ADMINISTRATOR</p>
                    <div className="flex gap-1.5 mt-4">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[7px] font-black uppercase tracking-widest rounded-sm border border-blue-100">ONLINE</span>
                        <span className="px-2 py-0.5 bg-slate-900 text-white text-[7px] font-black uppercase tracking-widest rounded-sm">SENSEI</span>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-9 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-50 flex flex-col gap-1 group hover:border-blue-100 transition-all">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">Total Kelas</span>
                        <h2 className="text-4xl font-black text-[#1e3a8a]">06</h2>
                        <div className="mt-2 h-1 w-8 bg-blue-600 rounded-full" />
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-50 flex flex-col gap-1 group hover:border-blue-100 transition-all">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">Total Siswa</span>
                        <h2 className="text-4xl font-black text-[#1e3a8a]">184</h2>
                        <div className="mt-2 h-1 w-8 bg-blue-600 rounded-full" />
                    </div>
                    <div className="bg-[#1e3050] p-6 rounded-2xl shadow-xl flex flex-col gap-1 group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-5"><FaThLarge size={60} /></div>
                        <span className="text-[9px] font-black text-blue-300/60 uppercase tracking-[0.15em] relative z-10">Status System</span>
                        <h2 className="text-4xl font-black text-white relative z-10">OK</h2>
                        <div className="mt-2 h-1 w-8 bg-green-500 rounded-full relative z-10" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[10px] font-black text-[#1e3a8a] uppercase tracking-widest flex items-center gap-2">
                                <FaCalendarAlt className="text-blue-600" size={10} /> Jadwal Mengajar
                            </h3>
                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">MINGGU INI</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border-l-[3px] border-blue-600 hover:bg-slate-100 transition-colors">
                                <span className="text-[10px] font-black text-[#1e3a8a] uppercase">KANJI A1 - Selasa, 13:00</span>
                                <FaArrowRight size={10} className="text-slate-300" />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border-l-[3px] border-blue-600 hover:bg-slate-100 transition-colors">
                                <span className="text-[10px] font-black text-[#1e3a8a] uppercase">KOTOBA B2 - Rabu, 09:00</span>
                                <FaArrowRight size={10} className="text-slate-300" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#1e293b] rounded-2xl p-6 text-white flex flex-col gap-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10"><FaGlobeAmericas size={80} /></div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-400 relative z-10">Quick Action</h3>
                        <div className="grid grid-cols-2 gap-3 relative z-10">
                            <button className="p-4 bg-white/5 rounded-xl border border-white/5 text-[9px] font-black uppercase hover:bg-white/10 transition-all">Input Nilai</button>
                            <button className="p-4 bg-white/5 rounded-xl border border-white/5 text-[9px] font-black uppercase hover:bg-white/10 transition-all">Cetak Raport</button>
                            <button className="p-4 bg-white/5 rounded-xl border border-white/5 text-[9px] font-black uppercase hover:bg-white/10 transition-all">Data Alumni</button>
                            <button className="p-4 bg-white/5 rounded-xl border border-white/5 text-[9px] font-black uppercase hover:bg-white/10 transition-all">Support</button>
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
        <div className="p-6 space-y-6 max-w-full mx-auto animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-black text-[#1e3a8a] uppercase tracking-tighter">Penilaian Presensi</h2>
                        <span className="bg-blue-600 text-white text-[8px] px-2 py-0.5 rounded-sm font-black uppercase tracking-widest shadow-lg shadow-blue-500/10">A1</span>
                    </div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">SISTEM MONITORING KEHADIRAN HARIAN</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="px-6 py-2 bg-[#1e3a8a] text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all flex items-center gap-2 shadow-lg shadow-blue-900/5 active:scale-95" onClick={() => { setSaving(true); setTimeout(() => setSaving(false), 1200); }}>
                        {saving ? <FaSpinner className="animate-spin" /> : <><FaCheckCircle size={10} /> Simpan</>}
                    </button>
                    <button className="px-6 py-2 bg-white border border-slate-200 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95" onClick={() => setStudents(initialStudents)}>Reset</button>
                    <div className="px-4 py-2 bg-blue-50 border border-blue-100 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                        <FaClock size={10} /> 31 HARI AKTIF
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-9 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-[#1e3a8a] text-white text-[9px] font-black uppercase tracking-widest">
                                    <th className="px-4 py-4 border-r border-white/5 w-12 text-center">No</th>
                                    <th className="px-6 py-4 border-r border-white/5">Identitas Siswa</th>
                                    <th className="px-6 py-4 border-r border-white/5 w-40">Kontak</th>
                                    <th className="px-6 py-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span>REKAPITULASI SESSI (1-10)</span>
                                            <FaInfoCircle size={8} className="opacity-40" />
                                        </div>
                                        <div className="grid grid-cols-10 gap-1.5">
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <div key={i} className="flex items-center justify-center h-5 bg-white/10 rounded-sm text-[7px] font-black">{i}</div>)}
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {students.map((student, idx) => (
                                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-4 text-[10px] font-black text-slate-300 border-r border-slate-50 text-center">{idx + 1}</td>
                                        <td className="px-6 py-4 border-r border-slate-50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[9px] font-black uppercase border border-slate-200">
                                                    {student.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <p className="font-black text-[10px] text-[#1e3a8a] uppercase leading-none">{student.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[9px] font-mono font-bold text-slate-400 border-r border-slate-50">{student.phone}</td>
                                        <td className="px-6 py-4">
                                            <div className="grid grid-cols-10 gap-2.5">
                                                {[...student.attendance, null, null].map((val, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => toggleDot(student.id, i)}
                                                        className={cn(
                                                            "w-5 h-5 rounded-full border-[1.5px] transition-all",
                                                            val ? "bg-blue-600 border-blue-600 shadow-md shadow-blue-500/20" : "bg-white border-slate-200 hover:border-blue-300"
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

                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-[#1e293b] text-white p-6 rounded-2xl shadow-xl flex flex-col gap-4 relative overflow-hidden h-full">
                        <div className="absolute top-0 right-0 p-4 opacity-5"><FaClipboardList size={60} /></div>
                        <h3 className="text-[9px] font-black uppercase tracking-widest text-blue-400 relative z-10">Live Metrics</h3>
                        <div className="grid grid-cols-1 gap-3 relative z-10">
                            {[
                                { label: 'Kehadiran', value: '142', color: 'text-blue-400', bg: 'bg-white/5' },
                                { label: 'Izin Hari Ini', value: '08', color: 'text-orange-400', bg: 'bg-white/5' },
                                { label: 'Alfa/Tanpa Ket', value: '02', color: 'text-red-400', bg: 'bg-white/5' },
                            ].map((stat, i) => (
                                <div key={i} className={cn("p-4 rounded-xl flex items-center justify-between border border-white/5", stat.bg)}>
                                    <span className="text-[8px] font-black uppercase opacity-60">{stat.label}</span>
                                    <span className={cn("text-xl font-black", stat.color)}>{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PengajaranView = () => {
    return (
        <div className="p-6 space-y-6 max-w-full mx-auto animate-fade-in bg-[#f8fafc] min-h-screen">
            {/* Top Row: Materials & Profile */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center p-12 min-h-[300px] gap-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200">
                        <FaBookOpen size={32} />
                    </div>
                    <div className="text-center">
                        <h3 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em]">Belum Ada Materi</h3>
                        <p className="text-[9px] text-slate-400 font-bold mt-1">Klik tombol Tambah Materi untuk mengunggah pengajaran Anda</p>
                    </div>
                </div>

                <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden relative">
                    <div className="p-6 pt-12 flex flex-col items-center">
                        <div className="relative mb-6">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                <FaCheckCircle className="text-white" size={10} />
                            </div>
                        </div>

                        <div className="w-full space-y-4 px-4">
                            <div className="flex items-center justify-between py-2 border-b border-slate-50">
                                <span className="text-[8px] font-black text-slate-300 uppercase">Nama</span>
                                <span className="text-[10px] font-black text-[#1e293b] uppercase">k</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-slate-50">
                                <span className="text-[8px] font-black text-slate-300 uppercase">Email</span>
                                <span className="text-[10px] font-black text-[#1e293b]">k@gmail.com</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-slate-50">
                                <span className="text-[8px] font-black text-slate-300 uppercase">Role</span>
                                <span className="text-[10px] font-black text-blue-600 uppercase">Sensei</span>
                            </div>
                        </div>

                        <button className="w-full mt-6 bg-[#ff9119] hover:bg-[#ff8000] text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all">
                            Presensi Sekarang
                        </button>
                    </div>
                </div>
            </div>

            {/* Middle Section: Jadwal Pengajaran */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="bg-[#1e293b] p-4 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
                            <FaCalendarAlt size={14} />
                        </div>
                        <h2 className="text-[11px] font-black text-white uppercase tracking-widest">Jadwal Pengajaran</h2>
                    </div>
                    <span className="bg-[#e11d48] text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20">Minggu I</span>
                </div>

                <div className="p-6 space-y-4">
                    {[
                        { icon: 'K', title: 'Kanji', level: 'KELAS A1', time: 'RABU • 15.00 - 16.00', color: 'bg-blue-50 text-blue-600' },
                        { icon: 'K', title: 'Kotoba', level: 'KELAS A2', time: 'SELASA • 15.00 - 16.00', color: 'bg-orange-50 text-orange-600' }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-slate-50/50 rounded-2xl p-4 flex items-center justify-between group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all border border-transparent hover:border-slate-100">
                            <div className="flex items-center gap-6">
                                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black shadow-sm", item.color)}>
                                    {item.icon}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-[12px] font-black text-[#1e293b] uppercase tracking-tight">{item.title}</h4>
                                        <span className={cn("px-2 py-0.5 rounded text-[7px] font-black uppercase tracking-widest", item.color)}>
                                            {item.level}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-1 text-slate-400">
                                        <FaClock size={8} />
                                        <span className="text-[9px] font-bold uppercase tracking-widest">{item.time}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-500 transition-colors">
                                    <FaInfoCircle size={14} />
                                </div>
                                <button className="bg-[#f43f5e] hover:bg-red-600 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20 active:scale-95 transition-all">
                                    Presensi
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Section: Evaluasi & Event */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 pb-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
                            <FaAward size={18} />
                        </div>
                        <div>
                            <h2 className="text-[12px] font-black text-[#1e293b] uppercase tracking-widest">Evaluasi & Event</h2>
                            <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Jadwal Evaluasi Siswa Mendatang</p>
                        </div>
                    </div>
                    <button className="text-[9px] font-black text-[#1e293b] uppercase tracking-widest flex items-center gap-2 group">
                        Lihat Semua <FaChevronRight className="group-hover:translate-x-0.5 transition-transform" size={8} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { title: 'Bunpou - Seleksi I', date: 'SENIN, 25 AGT 2025 • 15.00 - 16.00' },
                        { title: 'Kotoba - Seleksi I', date: 'SELASA, 26 AGT 2025 • 15.00 - 16.00' }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-slate-50/50 rounded-2xl p-5 flex items-center justify-between border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                            <div className="flex flex-col gap-1.5">
                                <h4 className="text-[12px] font-black text-[#1e293b] uppercase tracking-tight">{item.title}</h4>
                                <div className="flex items-center gap-1.5 text-slate-400 uppercase">
                                    <FaCalendarAlt size={8} />
                                    <span className="text-[8px] font-bold tracking-widest">{item.date}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors">
                                    <FaEdit size={12} />
                                </div>
                                <button className="bg-[#f43f5e] hover:bg-red-600 text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-red-500/20 active:scale-95 transition-all">
                                    Presensi
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const EvaluasiView = () => (
    <div className="p-6 space-y-6 max-w-full mx-auto animate-fade-in bg-[#f8fafc] min-h-screen">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-xl font-black text-[#1e293b] tracking-tighter uppercase">Evaluasi Seleksi</h2>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">MANAJEMEN EVALUASI & NILAI SELEKSI</p>
            </div>
            <button className="bg-[#1e293b] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-900/5">
                <FaSignOutAlt className="rotate-180" size={10} /> EXPORT
            </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={10} />
                    <input type="text" placeholder="Cari nama atau email siswa..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold outline-none focus:border-blue-200 transition-all" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-4 cursor-pointer">
                        Status <FaChevronDown size={8} />
                    </div>
                    <div className="px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-4 cursor-pointer">
                        Kelas <FaChevronDown size={8} />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">
                            <th className="pb-4 pl-2">Siswa</th>
                            <th className="pb-4 text-center">Bahasa</th>
                            <th className="pb-4 text-center">Fisik</th>
                            <th className="pb-4 text-center">Mental</th>
                            <th className="pb-4 text-center">Hasil</th>
                            <th className="pb-4 text-right pr-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {evaluasiData.map((item, idx) => (
                            <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[10px] font-black border border-slate-200">{item.name[0]}</div>
                                        <span className="text-[11px] font-black text-[#1e3a8a] uppercase">{item.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-center font-black text-slate-500 text-[10px]">{item.bahasa}</td>
                                <td className="py-4 text-center font-black text-slate-500 text-[10px]">{item.fisik}</td>
                                <td className="py-4 text-center font-black text-slate-500 text-[10px]">{item.mental}</td>
                                <td className="py-4 text-center">
                                    <span className={cn(
                                        "px-3 py-1 rounded-sm text-[8px] font-black uppercase tracking-widest",
                                        item.status === 'Lulus' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                                    )}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="py-4 text-right pr-2">
                                    <div className="w-7 h-7 rounded-lg bg-slate-900 inline-flex items-center justify-center shadow-lg shadow-slate-900/10 cursor-pointer hover:scale-105 transition-transform">
                                        <FaArrowRight size={10} className="text-white opacity-50" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const StatusSiswaView = () => (
    <div className="p-6 space-y-6 max-w-full mx-auto animate-fade-in bg-[#f8fafc] min-h-screen">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-xl font-black text-[#1e293b] tracking-tighter uppercase">Daftar Siswa</h2>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">MANAJEMEN DATA SISWA & KELAS</p>
            </div>
            <button className="bg-[#1e293b] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-900/5">
                <FaSignOutAlt className="rotate-180" size={10} /> EXPORT
            </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={10} />
                    <input type="text" placeholder="Cari nama atau email siswa..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold outline-none focus:border-blue-200 transition-all" />
                </div>
                <div className="flex items-center gap-2">
                    <div className="px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-4 cursor-pointer">
                        Status <FaChevronDown size={8} />
                    </div>
                    <div className="px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-4 cursor-pointer">
                        Kelas <FaChevronDown size={8} />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">
                            <th className="pb-4 pl-2">Siswa</th>
                            <th className="pb-4 text-center">Angkatan</th>
                            <th className="pb-4 text-center">Kontak</th>
                            <th className="pb-4 text-center">Follow Up</th>
                            <th className="pb-4 text-center">Status</th>
                            <th className="pb-4 text-right pr-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {statusSiswaListData.map((item, idx) => (
                            <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-black border border-blue-100 shadow-sm">{item.initial}</div>
                                        <span className="text-[11px] font-black text-[#1e3a8a] uppercase">{item.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-center">
                                    <span className="px-4 py-1.5 bg-slate-50 rounded-lg text-[9px] font-black text-slate-400">A1</span>
                                </td>
                                <td className="py-4 text-center">
                                    <div className="flex items-center justify-center gap-1.5">
                                        <div className="w-5 h-5 rounded-md bg-green-500 shadow-sm" />
                                        <div className="w-5 h-5 rounded-md bg-red-400 shadow-sm" />
                                    </div>
                                </td>
                                <td className="py-4 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-[7px] font-black text-slate-300 uppercase">FU 1:</span>
                                        <span className="text-[10px] font-bold text-[#1e3a8a] tracking-tight">{item.followUp}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-center">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="px-3 py-0.5 bg-green-50 text-green-600 text-[7px] font-black rounded-full uppercase tracking-widest border border-green-100/50">RESPON</span>
                                        <span className={cn("px-3 py-1 rounded-sm text-[8px] font-black uppercase tracking-widest", item.statusColor)}>
                                            {item.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 text-right pr-2">
                                    <div className="w-7 h-7 rounded-lg bg-slate-900 inline-flex items-center justify-center shadow-lg shadow-slate-900/10 cursor-pointer hover:scale-105 transition-transform">
                                        <FaArrowRight size={10} className="text-white opacity-50" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

// --- Main Component ---

export default function LPKSaitamaDemo() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="w-full h-full bg-[#f8fafc] text-[#1e293b] flex shadow-2xl font-sans overflow-hidden border border-slate-200">
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
                            {activeTab === 'pengajaran' && <PengajaranView />}
                            {activeTab === 'evaluasi' && <EvaluasiView />}
                            {activeTab === 'status' && <StatusSiswaView />}
                            {activeTab === 'dashboard' && <DashboardView />}
                            {(!['presensi', 'pengajaran', 'dashboard', 'evaluasi', 'status'].includes(activeTab)) && (
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
