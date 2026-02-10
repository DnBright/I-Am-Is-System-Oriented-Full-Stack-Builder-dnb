import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Engineering Philosophy | System-Oriented Engineer",
    description: "Insights into the system-oriented mindset, work values, and architectural principles.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
