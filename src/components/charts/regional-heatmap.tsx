"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { HeatmapCell } from "@/lib/types";

interface RegionalHeatmapProps {
  data: HeatmapCell[];
  className?: string;
}

export function RegionalHeatmap({ data, className }: RegionalHeatmapProps) {
  const maxIntensity = Math.max(...data.map((cell) => cell.intensity), 1);

  return (
    <Card title="Regional heatmap" description="Normalized seismic density across the selected area" className={className}>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {data.map((cell) => {
          const opacity = Math.max(0.15, cell.intensity / maxIntensity);
          return (
            <div
              key={cell.label}
              className={cn("flex min-h-20 flex-col justify-between border border-border-default p-3 text-xs text-text-primary")}
              style={{ backgroundColor: `rgba(45, 212, 191, ${opacity})` }}
            >
              <span className="uppercase tracking-[0.2em] text-text-muted">{cell.label}</span>
              <span className="text-sm font-semibold">{cell.intensity.toFixed(1)}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
