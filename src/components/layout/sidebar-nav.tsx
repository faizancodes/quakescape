import Link from "next/link";

import { APP_NAME } from "@/lib/constants";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/explore", label: "Explore" },
  { href: "/compare", label: "Compare" },
  { href: "/timeline", label: "Timeline" },
  { href: "/quake/demo-1", label: "Event detail" },
];

export function SidebarNav() {
  return (
    <aside className="hidden min-h-screen w-64 border-r border-border-default bg-surface-level1 px-5 py-6 lg:flex lg:flex-col">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.05em] text-accent-primary">Quakescape</p>
        <h1 className="mt-2 text-xl font-light text-text-primary">{APP_NAME}</h1>
      </div>
      <nav className="mt-10 space-y-2">
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className="block rounded border border-transparent px-3 py-2 text-sm text-text-secondary transition-colors hover:border-border-hover hover:bg-surface-level2 hover:text-text-primary">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
