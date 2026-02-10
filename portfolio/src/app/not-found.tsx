import Link from 'next/link';
import Button from '@/components/ui/Button';
import { FaExclamationTriangle, FaTerminal } from 'react-icons/fa';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <div className="w-24 h-24 rounded-full bg-error/10 flex items-center justify-center border border-error/20 mb-8 animate-pulse">
                <FaExclamationTriangle className="text-error text-4xl" />
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-4 font-mono text-text-primary">
                404 <span className="text-error">ERR_NULL</span>
            </h1>

            <div className="max-w-md mb-8">
                <p className="text-xl text-text-secondary font-medium mb-4">
                    System routing failure: Requested resource not located.
                </p>
                <p className="text-sm text-text-muted font-mono bg-surface-elevated/50 p-3 rounded border border-border">
                    The node you are trying to access has either been decommissioned or exists in a restricted logical layer.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/">
                    <Button size="lg" className="min-w-[200px] gap-2">
                        <FaTerminal size={14} />
                        RETURN TO ROOT
                    </Button>
                </Link>
                <Link href="/projects">
                    <Button variant="outline" size="lg" className="min-w-[200px]">
                        VIEW CASE STUDIES
                    </Button>
                </Link>
            </div>
        </div>
    );
}
