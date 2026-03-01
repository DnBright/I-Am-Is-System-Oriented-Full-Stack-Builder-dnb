'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaLayout,
    FaChalkboardTeacher,
    FaUserCheck,
    FaClipboardList,
    FaUserClock,
    FaArrowRight,
    FaCheckCircle,
    FaTimesCircle,
    FaInfoCircle,
    FaUser
} from 'react-icons/fa';
import { cn } from '@/lib/utils';
import Card from '@/components/ui/Card';

interface Student {
    id: number;
    name: string;
    phone: string;
    status: 'H' | 'S' | 'I' | 'A' | null;
}

const initialStudents: Student[] = [
    { id: 1, name: 'Adonis Pagac IV', phone: '1-720-939-0836', status: null },
    { id: 2, name: 'Alessandro Effertz', phone: '1-819-853-9961', status: null },
    { id: 3, name: 'Anabelle Beahan', phone: '+19124557613', status: null },
    { id: 4, name: 'Annamarie Schulist', phone: '732-868-7971', status: null },
    { id: 5, name: 'Antonia DuBuque', phone: '1-770-615-7792', status: null },
];

export default function LPKSaitamaDemo() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [isLoading, setIsLoading] = useState(false);

    const handleAttendance = (id: number, status: 'H' | 'S' | 'I' | 'A') => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    };

    const stats = {
        totalKelas: 6,
        totalSiswa: 184,
        kehadiran: Math.round((students.filter(s => s.status === 'H').length / students.length) * 100) || 0
    };

    const navItems = [
        { id: 'dashboard', icon: FaLayout, label: 'Dashboard' },
        { id: 'pengajaran', icon: FaChalkboardTeacher, label: 'Pengajaran' },
        { id: 'presensi', icon: FaUserCheck, label: 'Penilaian Presensi' },
        { id: 'evaluasi', icon: FaClipboardList, label: 'Evaluasi Seleksi' },
        { id: 'status', icon: FaUserClock, label: 'Status Siswa' },
    ];

    return (
        <div className="w-full h-full bg-[#f8fafc] text-[#1e293b] flex overflow-hidden rounded-sm border border-slate-200 shadow-xl font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-slate-200 flex flex-col pt-6">
                <div className="px-6 mb-8 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#0f172a] rounded-full flex items-center justify-center text-white font-bold text-xs">S</div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-tighter leading-none">PT SAITAMA</h4>
                        <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Juara Mendunia</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-1 px-3">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all text-left",
                                activeTab === item.id
                                    ? "bg-[#1e3a8a] text-white shadow-md shadow-blue-900/10"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                            )}
                        >
                            <item.icon size={16} className={cn("transition-colors", activeTab === item.id ? "text-white" : "opacity-50")} />
                            <span className="text-xs font-bold">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <div className="h-16 bg-[#1e3a8a] border-b border-white/10 flex items-center justify-between px-8 text-white">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase opacity-80">System Online // Session: Active</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold tracking-tighter">Sensei Mode</span>
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black italic">k</div>
                    </div>
                </div>

                {/* Dashboard Scroll Area */}
                <div className="flex-1 overflow-y-auto p-8 bg-[#fdfdfd]">
                    {activeTab === 'dashboard' && (
                        <div className="space-y-8 max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-sm border border-slate-100 shadow-sm flex flex-col gap-2">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Total Kelas</span>
                                    <h2 className="text-4xl font-black text-[#1e3a8a]">{stats.totalKelas}</h2>
                                </div>
                                <div className="bg-white p-6 rounded-sm border border-slate-100 shadow-sm flex flex-col gap-2 text-primary">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">Total Siswa</span>
                                    <h2 className="text-4xl font-black">{stats.totalSiswa}</h2>
                                </div>
                                <div className="bg-white p-6 rounded-sm border border-slate-100 shadow-sm flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Kehadiran</span>
                                        <span className="bg-success/10 text-success text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest">Baik</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <h2 className="text-4xl font-black text-slate-700">{stats.kehadiran}%</h2>
                                        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${stats.kehadiran}%` }}
                                                className="h-full bg-success"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card className="p-8 bg-white border-slate-100">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-black text-sm uppercase tracking-tighter">Jadwal Mengajar</h3>
                                        <Badge className="bg-blue-50 text-blue-600 rounded-sm text-[8px] px-3 font-black">MINGGU INI</Badge>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-sm border-l-4 border-red-500">
                                            <div>
                                                <p className="font-black text-xs uppercase">Kanji <span className="text-[10px] text-slate-400 font-bold ml-2">A1</span></p>
                                                <p className="text-[10px] text-slate-400 font-mono mt-1">Selasa, 13:00 - 15:00</p>
                                            </div>
                                            <FaArrowRight className="text-slate-300" size={12} />
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-sm border-l-4 border-blue-500">
                                            <div>
                                                <p className="font-black text-xs uppercase">Kotoba <span className="text-[10px] text-slate-400 font-bold ml-2">B2</span></p>
                                                <p className="text-[10px] text-slate-400 font-mono mt-1">Rabu, 09:00 - 11:00</p>
                                            </div>
                                            <FaArrowRight className="text-slate-300" size={12} />
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-8 bg-white border-slate-100 flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-slate-50 shadow-lg">
                                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                                            <FaUser size={40} />
                                        </div>
                                    </div>
                                    <h3 className="font-black text-xl tracking-tighter uppercase">Kenzie Sensei</h3>
                                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1">k@gmail.com // Level: Elite</p>
                                    <div className="mt-6 flex gap-2">
                                        <Badge className="bg-primary/10 text-primary border-primary/20 rounded-sm px-4">PENGAJARAN</Badge>
                                        <Badge className="bg-slate-100 text-slate-500 border-slate-200 rounded-sm px-4">ADMIN</Badge>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}

                    {activeTab === 'presensi' && (
                        <div className="max-w-5xl mx-auto">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="font-black text-2xl uppercase tracking-tighter">Penilaian Presensi</h3>
                                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1">Pencatatan Kehadiran Siswa (H/S/I/A)</p>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" size="sm" className="rounded-sm text-[10px] font-black" onClick={() => setStudents(initialStudents)}>RESET</Button>
                                    <Button size="sm" className="rounded-sm text-[10px] font-black bg-[#1e3a8a]">SIMPAN DATA</Button>
                                </div>
                            </div>

                            <div className="bg-white rounded-sm border border-slate-100 shadow-sm overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#1e3a8a] text-white text-[10px] font-black uppercase tracking-widest">
                                            <th className="px-6 py-4">Siswa</th>
                                            <th className="px-6 py-4">Kontak</th>
                                            <th className="px-6 py-4 text-center">Status Kehadiran</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {students.map((student) => (
                                            <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <p className="font-black text-xs uppercase">{student.name}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-[10px] font-mono text-slate-400">{student.phone}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center gap-2">
                                                        {(['H', 'S', 'I', 'A'] as const).map((status) => (
                                                            <button
                                                                key={status}
                                                                onClick={() => handleAttendance(student.id, status)}
                                                                className={cn(
                                                                    "w-8 h-8 rounded-sm flex items-center justify-center text-[10px] font-black transition-all border",
                                                                    student.status === status
                                                                        ? (status === 'H' ? "bg-success text-white border-success" :
                                                                            status === 'A' ? "bg-error text-white border-error" :
                                                                                status === 'S' ? "bg-warning text-white border-warning" :
                                                                                    "bg-info text-white border-info")
                                                                        : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                                                                )}
                                                            >
                                                                {status}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-8 p-6 bg-blue-50/50 border border-blue-100 rounded-sm flex items-center gap-4">
                                <FaInfoCircle className="text-blue-500" />
                                <p className="text-[10px] font-mono text-blue-700 uppercase tracking-widest leading-relaxed">
                                    Informasi: Data kehadiran akan langsung mempengaruhi statistik performa kelas secara real-time. Tekan SIMPAN untuk menyimpan ke "database".
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
