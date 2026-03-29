"use client";

import type { ComparisonRegion } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ComparisonSelectorProps {
  regions: ComparisonRegion[];
  selectedId?: string;
  onSelect: (regionId: string) => void;
  className?: string;
}

export function ComparisonSelector({ regions, selectedId, onSelect, className }: ComparisonSelectorProps) {
  return (
    <div className={cn("rounded border border-border-default bg-surface-level1 p-4", className)}>
      <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Comparison region</p>
      <div className="mt-3 grid gap-2">
        {regions.map((region) => {
          const active = region.id === selectedId;
          return (
            <button
              key={region.id}
              type="button"
              onClick={() => onSelect(region.id)}
              className={cn(
                "flex items-center justify-between rounded border px-3 py-2 text-left transition-colors",
                active ? "border-accent-primary bg-accent-primary/10" : "border-border-default bg-surface-level2 hover:border-border-hover",
              )}
            >
              <div>
                <p className="text-sm font-medium text-text-primary">{region.name}</p>
                <p className="text-xs text-text-secondary">{region.radiusKm} km radius</p>
              </div>
              <span className="text-xs uppercase tracking-[0.15em] text-text-muted">
                {region.distanceKm != null ? `${region.distanceKm.toFixed(1)} km` : "Nearby"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
