import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Case Studies | System-Oriented Engineer",
    description: "In-depth decomposition of engineering problems and system architecture solutions.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
