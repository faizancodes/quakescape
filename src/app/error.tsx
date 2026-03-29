"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-text-secondary">
      <div className="max-w-md space-y-4 rounded-none border border-border-default bg-surface-level1 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.05em] text-accent-primary">Error</p>
        <h1 className="text-2xl font-light text-text-primary">Something went wrong</h1>
        <button onClick={reset} className="rounded px-4 py-2 text-sm font-bold text-[#0a0a0a]" style={{ backgroundColor: "var(--accent)" }}>
          Try again
        </button>
      </div>
    </main>
  );
}
