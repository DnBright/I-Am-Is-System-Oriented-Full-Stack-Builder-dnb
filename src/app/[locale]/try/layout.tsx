import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "System Trial | Interactive Demos",
    description: "Initiate a trial connection to see the architecture in motion via sandboxed interactive demos.",
};

export default function TryLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
