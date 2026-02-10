import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Live GitHub Activity | System-Oriented Engineer",
    description: "Real-time synchronization of system updates, commits, and repository activity.",
};

export default function LiveLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
