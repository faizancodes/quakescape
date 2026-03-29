import Link from "next/link";

import { APP_NAME } from "@/lib/constants";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-text-secondary">
      <div className="max-w-md space-y-4 rounded-2xl border border-border-default bg-surface-level1 p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.05em] text-accent-primary">404</p>
        <h1 className="text-2xl font-light text-text-primary">Page not found</h1>
        <p>The requested route does not exist in {APP_NAME}.</p>
        <div className="flex gap-3">
          <Link href="/dashboard" className="inline-flex rounded px-4 py-2 text-sm font-bold text-[#0a0a0a]" style={{ backgroundColor: "var(--accent)" }}>
            Open dashboard
          </Link>
          <Link href="/timeline" className="inline-flex rounded border border-border-default px-4 py-2 text-sm font-medium text-text-primary">
            View timeline
          </Link>
        </div>
      </div>
    </main>
  );
}
