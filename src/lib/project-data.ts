export interface Project {
    id: number;
    title: string;
    description?: string;
    tech: string[];
    category: string;
    slug: string;
    image: string;
    screenshots: string[];
    introKey: string;
    demoUrl?: string;
    colors?: {
        primary: string;
        bg: string;
        border: string;
        hover: string;
        gradient: string;
    };
}

export const projectsData: Project[] = [
    {
        id: 1,
        title: 'Dashboard LPK Saitama',
        description: 'Sistem manajemen komprehensif untuk mengelola data siswa, penggajian, dan pelaporan lembaga pelatihan kerja',
        tech: ['Laravel', 'React', 'MySQL', 'Redis', 'Tailwind CSS'],
        category: 'App',
        slug: 'lpk-saitama-dashboard',
        introKey: 'lpk_saitama',
        demoUrl: 'https://lpk-saitama.vercel.app', // Placeholder
        image: '/projects/saitama-screenshots/Screenshot 2026-02-15 at 22.16.55.png',
        screenshots: [
            '/projects/saitama-screenshots/Screenshot 2026-02-15 at 22.14.37.png',
            '/projects/saitama-screenshots/Screenshot 2026-02-15 at 22.16.55.png',
            '/projects/saitama-screenshots/Screenshot 2026-02-15 at 22.17.05.png',
            '/projects/saitama-screenshots/Screenshot 2026-02-15 at 22.17.09.png',
            '/projects/saitama-screenshots/Screenshot 2026-02-15 at 22.17.12.png',
        ],
        colors: {
            primary: 'text-red-700',
            bg: 'bg-red-50',
            border: 'border-red-200',
            hover: 'group-hover:text-red-600',
            gradient: 'from-red-100 to-white'
        }
    },
    {
        id: 2,
        title: 'Website Company LPK Ayaka',
        description: 'Website profil perusahaan dan portal pendaftaran dengan optimasi SEO untuk lembaga pelatihan kerja',
        tech: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'SEO Optimization'],
        category: 'Web',
        slug: 'lpk-ayaka-website',
        introKey: 'lpk_ayaka',
        demoUrl: 'https://lpk-ayaka.vercel.app', // Placeholder
        image: '/projects/ayaka-screenshots/home.jpg',
        screenshots: [
            '/projects/ayaka-screenshots/home.jpg',
            '/projects/ayaka-screenshots/program.jpg',
            '/projects/ayaka-screenshots/gallery.jpg',
            '/projects/ayaka-screenshots/contact.jpg',
            '/projects/ayaka-screenshots/alumni.jpg',
        ],
        colors: {
            primary: 'text-pink-700',
            bg: 'bg-pink-50',
            border: 'border-pink-200',
            hover: 'group-hover:text-pink-600',
            gradient: 'from-pink-100 to-white'
        }
    },
    {
        id: 3,
        title: 'Dashboard Admin Terintegrasi AI',
        description: 'Dashboard admin canggih dengan integrasi AI untuk efisiensi operasional dan manajemen keseharian admin otomatis',
        tech: ['Next.js', 'OpenAI API', 'PostgreSQL', 'tRPC', 'Prisma'],
        category: 'AI',
        slug: 'ai-admin-dashboard',
        introKey: 'ai_dashboard',
        demoUrl: 'https://ai-admin.vercel.app', // Placeholder
        image: '/projects/ai-dashboard-screenshots/form-1.png',
        screenshots: [
            '/projects/ai-dashboard-screenshots/form-1.png',
            '/projects/ai-dashboard-screenshots/form-2.png',
            '/projects/ai-dashboard-screenshots/form-3.png',
            '/projects/ai-dashboard-screenshots/form-4.png',
        ],
        colors: {
            primary: 'text-indigo-700',
            bg: 'bg-indigo-50',
            border: 'border-indigo-200',
            hover: 'group-hover:text-indigo-600',
            gradient: 'from-indigo-100 to-white'
        }
    },
    {
        id: 4,
        title: 'Kursus Jepang Online Hybrid',
        description: 'Platform LMS modern untuk pembelajaran bahasa Jepang dengan metodologi hybrid dan bypass learning',
        tech: ['React', 'Node.js', 'WebRTC', 'MongoDB', 'Socket.io'],
        category: 'EdTech',
        slug: 'japan-online-course',
        introKey: 'japan_course',
        demoUrl: 'https://japan-course.vercel.app', // Placeholder
        image: '/projects/kursus-jepang-online-hybrid/1.png',
        screenshots: [
            '/projects/kursus-jepang-online-hybrid/1.png',
            '/projects/kursus-jepang-online-hybrid/2.png',
            '/projects/kursus-jepang-online-hybrid/3.png',
            '/projects/kursus-jepang-online-hybrid/4.png',
            '/projects/kursus-jepang-online-hybrid/5.png',
            '/projects/kursus-jepang-online-hybrid/6.png',
            '/projects/kursus-jepang-online-hybrid/7.png',
        ],
        colors: {
            primary: 'text-teal-700',
            bg: 'bg-teal-50',
            border: 'border-teal-200',
            hover: 'group-hover:text-teal-600',
            gradient: 'from-teal-100 to-white'
        }
    },
    {
        id: 5,
        title: 'Gro Visual - Creative Branding',
        description: 'Layanan kreatif yang berfokus pada pembangunan identitas visual bisnis secara strategis dan modern',
        tech: ['Logo Design', 'Branding Strategy', 'Social Media Management', 'Graphic Design'],
        category: 'Branding',
        slug: 'gro-visual-branding',
        introKey: 'gro_visual',
        demoUrl: 'https://gro-visual.id', // Placeholder
        image: '/projects/Gro Visual/Screenshot 2026-02-27 at 22.18.37.png',
        screenshots: [
            '/projects/Gro Visual/Screenshot 2026-02-27 at 22.18.37.png',
            '/projects/Gro Visual/Screenshot 2026-02-27 at 22.18.42.png',
            '/projects/Gro Visual/Screenshot 2026-02-27 at 22.18.46.png',
        ],
        colors: {
            primary: 'text-orange-600',
            bg: 'bg-orange-50',
            border: 'border-orange-200',
            hover: 'group-hover:text-orange-500',
            gradient: 'from-orange-100 to-white'
        }
    },
    {
        id: 6,
        title: 'Marketplace Voltase Dashboard',
        description: 'Platform analisis pasar cerdas dan sistem rekomendasi AI untuk optimasi strategi e-commerce',
        tech: ['Laravel', 'Python', 'Scraping', 'NLP', 'Chart.js'],
        category: 'Data Analytics',
        slug: 'marketplace-voltase-dashboard',
        introKey: 'marketplace_voltase',
        demoUrl: 'https://marketplace-voltase.vercel.app', // Placeholder
        image: '/projects/G4.20/Screenshot 2026-03-01 at 19.07.18.png',
        screenshots: [
            '/projects/G4.20/Screenshot 2026-03-01 at 19.16.39.png',
            '/projects/G4.20/Screenshot 2026-03-01 at 19.16.42.png',
            '/projects/G4.20/Screenshot 2026-03-01 at 19.16.50.png',
            '/projects/G4.20/Screenshot 2026-03-01 at 19.16.58.png',
            '/projects/G4.20/Screenshot 2026-03-01 at 19.17.01.png',
        ],
        colors: {
            primary: 'text-violet-700',
            bg: 'bg-violet-50',
            border: 'border-violet-200',
            hover: 'group-hover:text-violet-600',
            gradient: 'from-violet-100 to-white'
        }
    }
];
