'use client';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-24 h-24">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin" />

        {/* Inner pulsing core */}
        <div className="absolute inset-4 bg-primary/10 rounded-full animate-pulse-slow border border-primary/30 flex items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full" />
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-text-primary font-mono tracking-widest text-xs uppercase animate-pulse">
          Synchronizing System Data...
        </p>
        <div className="mt-2 w-48 h-1 bg-surface-elevated rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-[loading-bar_2s_infinite]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0); }
          100% { width: 0%; transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
