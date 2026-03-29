"use client";

import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDashboardStore } from "@/lib/store";
import type { ComparisonMetric, ComparisonRegion, EventSequenceSummary, HeatmapCell, TimelinePoint, UsgsEarthquakeSummary } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface ComparisonPanelProps {
  events: UsgsEarthquakeSummary[];
  regions: ComparisonRegion[];
  timeline: TimelinePoint[];
  sequence: EventSequenceSummary[];
  heatmap: HeatmapCell[];
}

export function ComparisonPanel({ events, regions, timeline, sequence, heatmap }: ComparisonPanelProps) {
  const { comparisonEventIds, toggleComparisonEvent, clearComparisonEvents } = useDashboardStore();

  const metrics = useMemo<ComparisonMetric[]>(() => {
    return events.map((event) => ({
      label: event.place.split(",")[0] ?? event.title,
      value: event.magnitude,
      normalized: Math.min(100, event.magnitude * 20),
      unit: "Mw",
    }));
  }, [events]);

  return (
    <div className="space-y-6">
      <Card title="Comparison workspace" description="Select events to contrast magnitude, depth, and response context">
        <div className="flex flex-wrap gap-2">
          {events.map((event) => {
            const active = comparisonEventIds.includes(event.id);
            return (
              <Button key={event.id} variant={active ? "primary" : "secondary"} onClick={() => toggleComparisonEvent(event.id)}>
                {event.place}
              </Button>
            );
          })}
          <Button variant="ghost" onClick={clearComparisonEvents}>
            Clear selection
          </Button>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} title={metric.label} description={metric.unit ?? "Metric"}>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-semibold text-text-primary">{formatNumber(metric.value, 1)}</span>
              <Badge>{formatNumber(metric.normalized, 0)}%</Badge>
            </div>
          </Card>
        ))}
      </div>

      <Card title="Regional context" description="Comparison regions and event sequence summary">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-3">
            {regions.map((region) => (
              <div key={region.id} className="rounded border border-border-default bg-surface-level1 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-sm font-semibold text-text-primary">{region.name}</h4>
                  <span className="text-xs uppercase tracking-[0.2em] text-text-muted">{region.radiusKm} km</span>
                </div>
                <p className="mt-2 text-sm text-text-secondary">{region.eventCount ?? 0} events · {formatNumber(region.averageMagnitude ?? 0, 1)} avg mag</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {sequence.map((item) => (
              <div key={item.id} className="rounded border border-border-default bg-surface-level1 p-4">
                <h4 className="text-sm font-semibold text-text-primary">{item.title}</h4>
                <p className="mt-2 text-sm text-text-secondary">{item.eventCount} events · {formatNumber(item.averageMagnitude, 1)} avg mag · {formatNumber(item.weatherComplicationScore, 0)} weather score</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Timeline snapshot" description="Recent sequence activity">
          <div className="space-y-2">
            {timeline.slice(-6).map((point) => (
              <div key={point.timestamp} className="flex items-center justify-between rounded border border-border-default px-3 py-2 text-sm">
                <span className="text-text-secondary">{new Date(point.timestamp).toLocaleDateString()}</span>
                <span className="text-text-primary">{point.aftershockCount} aftershocks</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Heatmap preview" description="Regional intensity cells">
          <div className="grid grid-cols-3 gap-2">
            {heatmap.slice(0, 9).map((cell) => (
              <div key={cell.label} className="rounded border border-border-default p-3 text-xs" style={{ backgroundColor: `rgba(45, 212, 191, ${Math.max(0.15, cell.intensity / 10)})` }}>
                {cell.label}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
