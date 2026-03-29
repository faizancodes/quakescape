import { Badge } from "@/components/ui/badge";

export function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-border-default bg-surface-level0 px-4 py-4 lg:px-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.05em] text-text-secondary">Situational awareness</p>
        <h2 className="text-lg font-light text-text-primary">Live seismic intelligence</h2>
      </div>
      <Badge>Operational</Badge>
    </header>
  );
}
