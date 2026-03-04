'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── Data ─────────────────────────────────────────────────────────────────────

const revenueData = [10.2, 4.8, 19.5, 15.2, 30.8, 12.1, 8.5];
const revenueLabels = ['AUG', 'SEPT', 'OCT', 'NOV', 'DEC', 'JAN'];

const bestSellers = [
    { name: 'Car Charger Adapter', count: 1038, color: '#4ade80' },
    { name: 'Kabel Data', count: 119, color: '#3b82f6' },
    { name: 'GAN Charger (High Tech)', count: 84, color: '#f59e0b' },
    { name: 'Power Inverter', count: 29, color: '#ef4444' },
];

const mlRecommendations = [
    { category: 'CAR CHARGER ADAPTER', name: 'Charger Batere Mobil Remote RC Remote Control Adaptor', price: 'Rp 37.000', rating: 4.4, growth: 3.47 },
    { category: 'CAR CHARGER ADAPTER', name: 'NVN-SV3 Charger Mobil PD Fast Charging Car Charger Qualcomm 3.0', price: 'Rp 31.500', rating: 5.0, growth: 3.47 },
    { category: 'POWER INVERTER', name: 'Power Car Inverter Colokan Listrik Mobil + USB Charger Lighter Mobil', price: 'Rp 115.000', rating: 4.9, growth: 3.47 },
    { category: 'KABEL DATA', name: 'Charger Mobil Robot C07 - Output 2 Port USB 2.4A Casan Mobil Motor Kabel', price: 'Rp 51.100', rating: 5.0, growth: 3.47 },
    { category: 'CAR CHARGER ADAPTER', name: 'Joyseus Car Charger Fast Charge QC3.0 Quick Charger Mobil USB - CM0005', price: 'Rp 74.800', rating: 4.9, growth: 3.47 },
    { category: 'CAR CHARGER ADAPTER', name: 'Charger Aki Motor Mobil/1500A/Otomatis Accu Kering dan Basah Lead Acid/Batter...', price: 'Rp 141.900', rating: 4.6, growth: 3.47 },
];

const recentListings = [
    { name: 'Charger Mobil Blue...', city: 'Jakarta Utara', sector: 'FM Transmitter/Bluetooth', price: 'Rp 95.000' },
    { name: 'Car Bluetooth MP3...', city: 'Jakarta Utara', sector: 'FM Transmitter/Bluetooth', price: 'Rp 95.000' },
    { name: 'Adaptor 12 Volt Ca...', city: 'Surabaya', sector: 'Car Charger Adapter', price: 'Rp 65.000' },
    { name: 'Car Fast Charger M...', city: 'Jakarta Barat', sector: 'Car Charger Adapter', price: 'Rp 22.400' },
    { name: 'Car Charger Mobil...', city: 'Bandung', sector: 'Car Charger Adapter', price: 'Rp 50.000' },
    { name: 'Saver Robot RT-C06...', city: 'Kab. Bogor', sector: 'Car Charger Adapter', price: 'Rp 48.000' },
    { name: 'Voltmeter Charger...', city: 'Jakarta Utara', sector: 'Car Charger Adapter', price: 'Rp 25.145' },
    { name: 'Universal Charger...', city: 'Kab. Tangerang', sector: 'Car Charger Adapter', price: 'Rp 35.000' },
    { name: 'Hotwheels The Fate...', city: 'Tasikmalaya', sector: 'Car Charger Adapter', price: 'Rp 27.900' },
    { name: 'Car Charger Mobil...', city: 'Jakarta Utara', sector: 'Car Charger Adapter', price: 'Rp 145.000' },
];

const geoCities = [
    { city: 'Jakarta Utara', pct: 32, color: '#4ade80' },
    { city: 'Bandung', pct: 22, color: '#3b82f6' },
    { city: 'Surabaya', pct: 18, color: '#f59e0b' },
    { city: 'Tangerang', pct: 16, color: '#8b5cf6' },
    { city: 'Bogor', pct: 12, color: '#ef4444' },
];

// ─── Mini Charts ──────────────────────────────────────────────────────────────

const LineChart = () => {
    const w = 480, h = 200, pad = 20;
    const max = Math.max(...revenueData);
    const pts = revenueData.map((v, i) => {
        const x = pad + (i / (revenueData.length - 1)) * (w - pad * 2);
        const y = h - pad - ((v / max) * (h - pad * 2));
        return `${x},${y}`;
    }).join(' ');
    const area = `M ${pts.split(' ')[0]} L ${pts} L ${480 - pad},${h - pad} L ${pad},${h - pad} Z`;

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
            <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4ade80" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
                </linearGradient>
            </defs>
            {/* Gridlines */}
            {[0.25, 0.5, 0.75, 1].map((t, i) => (
                <line key={i} x1={pad} y1={pad + (1 - t) * (h - pad * 2)} x2={w - pad} y2={pad + (1 - t) * (h - pad * 2)} stroke="#1a2a1a" strokeWidth="1" />
            ))}
            {/* Y labels */}
            {[0, 10, 20, 30, 35].map((v, i) => (
                <text key={i} x={pad - 4} y={h - pad - ((v / max) * (h - pad * 2)) + 4} textAnchor="end" fill="#4b6e4b" fontSize="9" fontFamily="monospace">{v}M</text>
            ))}
            {/* Area fill */}
            <path d={area} fill="url(#lineGrad)" />
            {/* Line */}
            <polyline points={pts} fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            {/* Dots */}
            {revenueData.map((v, i) => {
                const x = pad + (i / (revenueData.length - 1)) * (w - pad * 2);
                const y = h - pad - ((v / max) * (h - pad * 2));
                return <circle key={i} cx={x} cy={y} r="4" fill="#4ade80" stroke="#0c1a0c" strokeWidth="2" />;
            })}
            {/* X labels */}
            {revenueLabels.map((l, i) => (
                <text key={i} x={pad + (i / (revenueLabels.length - 1)) * (w - pad * 2)} y={h - 2} textAnchor="middle" fill="#4b6e4b" fontSize="9" fontFamily="monospace">{l}</text>
            ))}
        </svg>
    );
};

const DonutChart = () => {
    const total = bestSellers.reduce((a, b) => a + b.count, 0);
    let cumAngle = -90;
    const r = 70, cx = 100, cy = 100;

    const slices = bestSellers.map(item => {
        const angle = (item.count / total) * 360;
        const startRad = (cumAngle * Math.PI) / 180;
        const endRad = ((cumAngle + angle) * Math.PI) / 180;
        const x1 = cx + r * Math.cos(startRad);
        const y1 = cy + r * Math.sin(startRad);
        const x2 = cx + r * Math.cos(endRad);
        const y2 = cy + r * Math.sin(endRad);
        const large = angle > 180 ? 1 : 0;
        const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
        cumAngle += angle;
        return { ...item, d };
    });

    return (
        <svg viewBox="0 0 200 200" className="w-full h-full">
            {slices.map((s, i) => (
                <path key={i} d={s.d} fill={s.color} opacity="0.9" />
            ))}
            <circle cx={cx} cy={cy} r="44" fill="#0c1a0c" />
            <text x={cx} y={cy - 6} textAnchor="middle" fill="#6b7280" fontSize="8" fontFamily="monospace" fontWeight="bold">TOTAL</text>
            <text x={cx} y={cy + 10} textAnchor="middle" fill="white" fontSize="20" fontFamily="monospace" fontWeight="900">{total}</text>
        </svg>
    );
};

const PieChart = () => {
    let cumAngle = -90;
    const r = 72, cx = 105, cy = 105;
    return (
        <svg viewBox="0 0 210 210" className="w-full h-full">
            {geoCities.map((item, i) => {
                const angle = (item.pct / 100) * 360;
                const startRad = (cumAngle * Math.PI) / 180;
                const endRad = ((cumAngle + angle) * Math.PI) / 180;
                const x1 = cx + r * Math.cos(startRad);
                const y1 = cy + r * Math.sin(startRad);
                const x2 = cx + r * Math.cos(endRad);
                const y2 = cy + r * Math.sin(endRad);
                const large = angle > 180 ? 1 : 0;
                const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
                cumAngle += angle;
                return <path key={i} d={d} fill={item.color} opacity="0.85" stroke="#111a10" strokeWidth="1.5" />;
            })}
        </svg>
    );
};

// ─── ML Neural Loading ────────────────────────────────────────────────────────

const NeuralLoader = ({ onDone }: { onDone: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(p => {
                if (p >= 100) { clearInterval(timer); onDone(); return 100; }
                return p + 2;
            });
        }, 60);
        return () => clearInterval(timer);
    }, [onDone]);

    return (
        <div className="flex flex-col items-center justify-center py-16 bg-[#0c1a0c] border border-[#1a3a1a] rounded-xl relative overflow-hidden">
            <div className="relative w-24 h-24 mb-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="36" fill="none" stroke="#1a3a1a" strokeWidth="3" />
                    <circle cx="40" cy="40" r="36" fill="none" stroke="#4ade80" strokeWidth="3"
                        strokeDasharray={`${2 * Math.PI * 36}`}
                        strokeDashoffset={`${2 * Math.PI * 36 * (1 - progress / 100)}`}
                        strokeLinecap="round" className="transition-all duration-75"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-[0_0_12px_#4ade80]" />
                </div>
            </div>
            <p className="text-green-400 font-mono font-bold text-base animate-pulse">Processing Neural Matrix...</p>
            <p className="text-[#3a6a3a] font-mono text-[10px] uppercase tracking-widest mt-2">Collaborative Filtering Activity Detected</p>
        </div>
    );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function VoltaseDemo() {
    const [mlReady, setMlReady] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [showML, setShowML] = useState(false);
    const [activeView, setActiveView] = useState<'dashboard' | 'orders'>('dashboard');

    const handleRunAnalysis = () => {
        if (mlReady) return;
        setIsAnalyzing(true);
        setShowML(true);
    };

    return (
        <div className="w-full h-full bg-[#080f08] text-white font-mono flex flex-col overflow-hidden text-xs">
            {/* Topbar */}
            <header className="flex items-center justify-between px-8 py-4 border-b border-[#1a2e1a] shrink-0 bg-[#0a120a]">
                <div>
                    <div className="text-[#4ade80] font-black text-sm tracking-wider">ADMIN HUB</div>
                    <div className="text-[#2a4a2a] text-[9px] tracking-widest uppercase">Advanced Analytics</div>
                </div>
                <nav className="flex items-center gap-8">
                    <button onClick={() => setActiveView('dashboard')} className={cn("text-[10px] font-bold uppercase tracking-widest transition-colors", activeView === 'dashboard' ? 'text-white' : 'text-[#3a6a3a] hover:text-white')}>Dashboard</button>
                    <button onClick={() => setActiveView('orders')} className={cn("text-[10px] font-bold uppercase tracking-widest transition-colors", activeView === 'orders' ? 'text-white' : 'text-[#3a6a3a] hover:text-white')}>Data Order</button>
                </nav>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-[9px] text-[#3a6a3a] uppercase tracking-widest">Logged In As</div>
                        <div className="text-white font-bold text-[11px]">Admin LowRider</div>
                    </div>
                    <button className="px-4 py-2 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest hover:bg-red-500 transition-colors rounded">Log Out</button>
                </div>
            </header>

            {/* Main Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                    {activeView === 'dashboard' ? (
                        <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 space-y-8">

                            {/* Hero Title */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="text-[#4ade80] text-[9px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <span className="w-4 h-px bg-[#4ade80]" /> Real-Time Performance
                                    </div>
                                    <h1 className="font-black text-5xl tracking-tight leading-none">
                                        COMMAND <span className="text-[#4ade80]">CENTER</span>
                                    </h1>
                                    <p className="text-[#4b6e4b] mt-3 text-[11px] leading-relaxed max-w-md">
                                        Welcome back, Manager. All systems are operational. Tracking <span className="text-white font-bold">1270 orders</span> across multiple sectors.
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <select className="bg-[#0e1e0e] border border-[#2a4a2a] text-[#4ade80] text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 outline-none rounded cursor-pointer">
                                        <option>Market Trend (AI)</option>
                                        <option>Revenue Trend</option>
                                        <option>Sector Trend</option>
                                    </select>
                                    <button
                                        onClick={handleRunAnalysis}
                                        className={cn("px-6 py-2.5 font-black text-[10px] uppercase tracking-widest transition-all border rounded",
                                            mlReady
                                                ? "bg-[#0e1e0e] border-[#4ade80] text-[#4ade80]"
                                                : "bg-[#4ade80] border-[#4ade80] text-[#080f08] hover:bg-[#22c55e]"
                                        )}
                                    >
                                        {mlReady ? '✓ AI Insight: Ready' : 'Run Market Analysis ◆'}
                                    </button>
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-4 gap-4">
                                {[
                                    { label: 'Net Sales Revenue', value: 'Rp 88.273.648', sub: '+12.5% vs last month', subColor: 'text-[#4ade80]', bg: '', watermark: '$S' },
                                    { label: 'Total Transactions', value: '1270 Items', sub: '● Live  System Active', subColor: 'text-[#4ade80]', bg: '', watermark: 'OK' },
                                    { label: 'Customer Satisfaction', value: '★ 4.5', sub: 'Excellent  User Feedback', subColor: 'text-yellow-400', bg: 'border-[#4ade80]', watermark: 'SAT' },
                                    { label: 'Regional Reach', value: '5 Cities', sub: 'Expanding  Market Coverage', subColor: 'text-[#4ade80]', bg: '', watermark: 'MAP' },
                                ].map((stat, i) => (
                                    <div key={i} className={cn("bg-[#0c1a0c] border rounded-lg p-5 relative overflow-hidden", stat.bg || 'border-[#1a2e1a]')}>
                                        <div className="absolute right-2 top-1 font-black text-4xl text-white/5 select-none leading-none">{stat.watermark}</div>
                                        <div className="text-[9px] text-[#3a6a3a] uppercase tracking-widest mb-3">{stat.label}</div>
                                        <div className={cn("font-black text-2xl leading-tight mb-3", i === 2 ? 'text-yellow-400' : 'text-white')}>{stat.value}</div>
                                        <div className={cn("text-[9px] font-bold", stat.subColor)}>{stat.sub}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Charts Row */}
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-2 bg-[#0c1a0c] border border-[#1a2e1a] rounded-xl p-6">
                                    <div className="text-[#4ade80] text-[9px] uppercase tracking-widest font-bold mb-1">Growth Dynamics</div>
                                    <div className="font-black text-2xl tracking-tight mb-4">FINANCIAL STREAM</div>
                                    <div className="flex items-center justify-end gap-2 mb-4">
                                        <div className="w-2 h-2 rounded-full bg-[#4ade80]" />
                                        <span className="text-[9px] text-[#4b6e4b] uppercase tracking-widest">Monthly Revenue</span>
                                    </div>
                                    <div className="h-48">
                                        <LineChart />
                                    </div>
                                </div>

                                <div className="bg-[#0c1a0c] border border-[#1a2e1a] rounded-xl p-6 flex flex-col">
                                    <div className="text-[#4ade80] text-[9px] uppercase tracking-widest font-bold mb-1">Sector Analysis</div>
                                    <div className="font-black text-2xl tracking-tight mb-4">BEST SELLERS</div>
                                    <div className="w-48 h-48 mx-auto">
                                        <DonutChart />
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        {bestSellers.map((s, i) => (
                                            <div key={i} className="flex items-center justify-between text-[10px]">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                                                    <span className="text-[#4b6e4b] uppercase truncate max-w-[120px]">{s.name}</span>
                                                </div>
                                                <span className="text-white font-bold ml-2">{s.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* ML Analysis Area */}
                            <AnimatePresence>
                                {showML && (
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                        {isAnalyzing && !mlReady && (
                                            <NeuralLoader onDone={() => { setMlReady(true); setIsAnalyzing(false); }} />
                                        )}

                                        {mlReady && (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                                <div>
                                                    <div className="text-[#4ade80] text-[9px] uppercase tracking-widest font-bold mb-1">Intelligence Report</div>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h2 className="font-black text-3xl tracking-tight">MARKET TREND ANALYSIS</h2>
                                                            <div className="text-[#3a6a3a] text-[9px] mt-1 uppercase tracking-widest">Formula: User-Based Collaborative Filtering Weighted</div>
                                                        </div>
                                                        <div className="px-4 py-2 border border-[#4ade80] text-[#4ade80] text-[9px] font-black uppercase tracking-widest rounded">AI Insight: Ready</div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-3 gap-4">
                                                    {mlRecommendations.map((item, i) => (
                                                        <div key={i} className="bg-[#0c1a0c] border border-[#1a2e1a] rounded-xl p-5 hover:border-[#4ade80]/50 transition-all">
                                                            <div className="flex items-start justify-between mb-4">
                                                                <span className="text-[8px] text-[#3a6a3a] font-bold uppercase tracking-widest">{item.category}</span>
                                                                <span className="text-[8px] text-[#4ade80] font-black border border-[#4ade80]/30 px-1.5 py-0.5 rounded">Growth Index: {item.growth}</span>
                                                            </div>
                                                            <div className="flex items-center gap-3 mb-4">
                                                                <div className="w-10 h-10 bg-[#0a120a] border border-[#1a2e1a] rounded flex items-center justify-center text-[7px] font-black text-[#4ade80] shrink-0">BEST</div>
                                                                <p className="text-white font-bold text-[11px] leading-snug line-clamp-2">{item.name}</p>
                                                            </div>
                                                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#1a2e1a]">
                                                                <div>
                                                                    <div className="text-[8px] text-[#3a6a3a] uppercase tracking-widest mb-1">Focus Point</div>
                                                                    <div className="text-[#4ade80] font-black text-sm">{item.price}</div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="text-[8px] text-[#3a6a3a] uppercase tracking-widest mb-1">Confidence</div>
                                                                    <div className="text-yellow-400 font-black">★ {item.rating}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="bg-[#0c1a0c] border border-[#2a4a2a] rounded-xl p-5 flex items-start gap-3">
                                                    <span className="text-[#4ade80] mt-0.5">⚡</span>
                                                    <div>
                                                        <span className="text-[#4ade80] text-[9px] font-black uppercase tracking-widest">Strategy Tip: </span>
                                                        <span className="text-[#4b6e4b] text-[11px]">Produk di atas memiliki probabilitas transaksi tertinggi bulan ini berdasarkan pola keemilikan pelanggan. Fokuskan stok pada item ini.</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Bottom Row: Geo Pulse + Recent Listings */}
                            <div className="grid grid-cols-3 gap-6">
                                <div className="bg-[#0c1a0c] border border-[#1a2e1a] rounded-xl p-6">
                                    <div className="text-[#3a6a3a] text-[9px] uppercase tracking-widest font-bold mb-4">Geographic Pulse</div>
                                    <div className="w-44 h-44 mx-auto mb-4">
                                        <PieChart />
                                    </div>
                                    <div className="space-y-2">
                                        {geoCities.map((g, i) => (
                                            <div key={i} className="flex items-center justify-between text-[10px]">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full" style={{ background: g.color }} />
                                                    <span className="text-[#4b6e4b]">{g.city}</span>
                                                </div>
                                                <span className="text-white font-bold">{g.pct}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-span-2 bg-[#0c1a0c] border border-[#1a2e1a] rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <div className="text-[#3a6a3a] text-[9px] uppercase tracking-widest font-bold mb-1">Inventory Feed</div>
                                            <h3 className="font-black text-2xl tracking-tight">RECENT LISTINGS</h3>
                                        </div>
                                        <button className="text-[#4ade80] text-[9px] font-black uppercase tracking-widest hover:underline">View All Orders →</button>
                                    </div>
                                    <div className="space-y-0">
                                        <div className="grid grid-cols-4 py-2 border-b border-[#1a2e1a] text-[9px] text-[#3a6a3a] uppercase tracking-widest font-bold">
                                            <span>Resource</span>
                                            <span>Sector</span>
                                            <span>Valuation</span>
                                            <span className="text-right">Status</span>
                                        </div>
                                        {recentListings.map((item, i) => (
                                            <div key={i} className="grid grid-cols-4 py-2.5 border-b border-[#0f1e0f] hover:bg-[#0f1e0f] transition-colors items-center">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 bg-[#1a2e1a] rounded text-[8px] font-black text-[#4ade80] flex items-center justify-center">ACT</div>
                                                    <div>
                                                        <div className="text-white font-bold text-[10px] truncate max-w-[100px]">{item.name}</div>
                                                        <div className="text-[#3a6a3a] text-[9px]">{item.city}</div>
                                                    </div>
                                                </div>
                                                <div className="px-2 py-0.5 bg-[#0a120a] border border-[#1a2e1a] rounded text-[9px] text-[#4b6e4b] w-fit">{item.sector}</div>
                                                <span className="text-[#4ade80] font-bold text-[10px]">{item.price}</span>
                                                <div className="flex justify-end">
                                                    <div className="w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80]" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </motion.div>
                    ) : (
                        <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8">
                            <h1 className="font-black text-3xl mb-2">DATA ORDER</h1>
                            <p className="text-[#4b6e4b] text-[11px] mb-8">Seluruh transaksi marketplace Voltase — realtime tracking dari semua kota.</p>
                            <div className="bg-[#0c1a0c] border border-[#1a2e1a] rounded-xl overflow-hidden">
                                <div className="grid grid-cols-5 py-3 px-5 border-b border-[#1a2e1a] text-[9px] text-[#3a6a3a] uppercase tracking-widest font-bold">
                                    <span>ID Order</span><span>Produk</span><span>Kategori</span><span>Kota</span><span className="text-right">Harga</span>
                                </div>
                                {[...recentListings, ...recentListings.slice(0, 5)].map((item, i) => (
                                    <div key={i} className="grid grid-cols-5 py-3 px-5 border-b border-[#0f1e0f] hover:bg-[#0f1e0f] transition-colors items-center text-[10px]">
                                        <span className="text-[#3a6a3a] font-mono">#VLT-{1000 + i}</span>
                                        <span className="text-white font-bold truncate pr-4">{item.name}</span>
                                        <span className="text-[#4b6e4b]">{item.sector.substring(0, 18)}...</span>
                                        <span className="text-[#4b6e4b]">{item.city}</span>
                                        <span className="text-[#4ade80] font-bold text-right">{item.price}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
