"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useDashboardStore } from "@/lib/store";
import type { UsgsEarthquakeSummary } from "@/lib/types";
import { cn, formatDateTime, formatNumber } from "@/lib/utils";

interface EventListProps {
  events: UsgsEarthquakeSummary[];
}

export function EventList({ events }: EventListProps) {
  const selectedEventId = useDashboardStore((state) => state.selectedEventId);
  const hoverEvent = useDashboardStore((state) => state.hoverEvent);
  const selectEvent = useDashboardStore((state) => state.selectEvent);

  if (events.length === 0) {
    return <div className="rounded border border-border-default bg-surface-level1 p-6 text-sm text-text-secondary">No events match the current filters.</div>;
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <Card key={event.id} className={cn("cursor-pointer p-4", selectedEventId === event.id && "border-accent-primary")}>
          <button type="button" className="w-full text-left" onMouseEnter={() => hoverEvent(event.id)} onMouseLeave={() => hoverEvent(null)} onClick={() => selectEvent(event.id)}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-light text-text-primary">{event.title}</h3>
                <p className="mt-1 text-sm text-text-secondary">{event.place}</p>
              </div>
              <Badge>M {formatNumber(event.magnitude, 1)}</Badge>
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-text-secondary">
              <span>{formatDateTime(event.time)}</span>
              <span>{formatNumber(event.depthKm, 1)} km depth</span>
              <span>{event.alert || "no alert"}</span>
            </div>
          </button>
        </Card>
      ))}
    </div>
  );
}
