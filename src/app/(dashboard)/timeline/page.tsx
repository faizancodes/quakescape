import { AftershockTimeline } from "@/components/charts/aftershock-timeline";
import { DepthDistributionChart } from "@/components/charts/depth-distribution-chart";
import { MagnitudeChart } from "@/components/charts/magnitude-chart";
import { RegionalHeatmap } from "@/components/charts/regional-heatmap";
import type { ComparisonMetric, HeatmapCell, TimelinePoint } from "@/lib/types";

const timeline: TimelinePoint[] = Array.from({ length: 10 }, (_, index) => ({
  timestamp: Date.now() - (9 - index) * 24 * 3600_000,
  magnitude: 3.8 + index * 0.25,
  depthKm: 5 + index * 3,
  aftershockCount: index * 3,
}));

const magnitudeData: ComparisonMetric[] = timeline.map((point, index) => ({
  label: `E${index + 1}`,
  value: point.magnitude,
  normalized: Math.min(100, point.magnitude * 18),
  unit: "Mw",
}));

const depthData: ComparisonMetric[] = timeline.slice(0, 4).map((point, index) => ({
  label: index < 2 ? "Shallow" : "Deep",
  value: point.depthKm,
  normalized: Math.max(10, 100 - point.depthKm),
  unit: "km",
}));

const heatmap: HeatmapCell[] = Array.from({ length: 12 }, (_, index) => ({
  latitude: 0,
  longitude: 0,
  intensity: 1 + (index % 8),
  label: `Zone ${index + 1}`,
}));

export default function TimelinePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-light text-text-primary">Analytical timeline</h1>
        <p className="mt-2 text-sm text-text-secondary">Track magnitude, depth, aftershock progression, and regional intensity over time.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <MagnitudeChart data={magnitudeData} />
        <DepthDistributionChart data={depthData} />
        <AftershockTimeline data={timeline} />
        <RegionalHeatmap data={heatmap} />
      </div>
    </div>
  );
}
