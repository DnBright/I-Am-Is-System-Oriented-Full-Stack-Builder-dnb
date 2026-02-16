import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Coding Analytics | System-Oriented Engineer",
    description: "Detailed visualization of coding patterns, consistency scores, and language distribution.",
};

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
