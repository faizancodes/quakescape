"use client";

import { useMemo } from "react";

import { ClusterLegend } from "@/components/map/cluster-legend";
import { EventMarker } from "@/components/map/event-marker";
import { useDashboardStore } from "@/lib/store";
import type { UsgsEarthquakeSummary } from "@/lib/types";
import { cn, formatNumber } from "@/lib/utils";

interface SeismicMapProps {
  events: UsgsEarthquakeSummary[];
}

export function SeismicMap({ events }: SeismicMapProps) {
  const selectedEventId = useDashboardStore((state) => state.selectedEventId);
  const hoveredEventId = useDashboardStore((state) => state.hoveredEventId);

  const points = useMemo(() => events.slice(0, 24), [events]);

  return (
    <div className="space-y-4 rounded border border-border-default bg-surface-level1 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-light text-text-primary">Live seismic map</h3>
        <ClusterLegend />
      </div>
      <div className="relative h-[420px] overflow-hidden border border-border-default bg-[radial-gradient(circle_at_center,_rgba(45,212,191,0.08),_transparent_55%)]">
        {points.map((event, index) => (
          <div
            key={event.id}
            className={cn("absolute", selectedEventId === event.id && "z-20", hoveredEventId === event.id && "z-10")}
            style={{ left: `${10 + (index * 13) % 80}%`, top: `${15 + (index * 17) % 70}%` }}
          >
            <EventMarker magnitude={event.magnitude} depthKm={event.depthKm} isSelected={selectedEventId === event.id} isHovered={hoveredEventId === event.id} />
          </div>
        ))}
      </div>
      <div className="grid gap-2 text-xs text-text-secondary sm:grid-cols-3">
        <div>Events plotted: {formatNumber(points.length, 0)}</div>
        <div>Selected: {selectedEventId ?? "none"}</div>
        <div>Hovered: {hoveredEventId ?? "none"}</div>
      </div>
    </div>
  );
}
