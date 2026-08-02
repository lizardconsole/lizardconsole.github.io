'use client';

import { WifiOff } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3 text-center px-6 bg-bg-primary text-text-primary">
      <WifiOff className="h-8 w-8 text-text-muted" />
      <div>
        <h1 className="text-base font-semibold">You&apos;re offline</h1>
        <p className="text-sm mt-1 text-text-secondary max-w-xs">
          This page needs a connection — it will load once you&apos;re back online.
        </p>
      </div>
      <button
        onClick={() => location.reload()}
        className="mt-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-4 py-2 text-xs font-bold text-gray-950 transition-all"
      >
        Retry
      </button>
    </div>
  );
}
