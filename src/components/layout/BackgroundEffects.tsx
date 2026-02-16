'use client';


export default function BackgroundEffects() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-background">
            {/* Subtle Gradient for Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(30,41,59,0.3),transparent_80%)]" />
        </div>
    );
}
