import Link from "next/link";

import { APP_NAME } from "@/lib/constants";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-text-secondary">
      <div className="max-w-md space-y-4 rounded-none border border-border-default bg-surface-level1 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.05em] text-accent-primary">404</p>
        <h1 className="text-2xl font-light text-text-primary">Page not found</h1>
        <p>The requested route does not exist in {APP_NAME}.</p>
        <Link href="/" className="inline-flex rounded px-4 py-2 text-sm font-bold text-[#0a0a0a]" style={{ backgroundColor: "var(--accent)" }}>
          Return home
        </Link>
      </div>
    </main>
  );
}
