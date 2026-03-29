import { ComparisonPanel } from "@/components/events/comparison-panel";
import { DEFAULT_COMPARE_LIMIT, DEFAULT_HEATMAP_GRID } from "@/lib/constants";
import type { ComparisonRegion, EventSequenceSummary, HeatmapCell, TimelinePoint, UsgsEarthquakeSummary } from "@/lib/types";

const events: UsgsEarthquakeSummary[] = Array.from({ length: DEFAULT_COMPARE_LIMIT }, (_, index) => ({
  id: `compare-${index + 1}`,
  title: `Comparison Event ${index + 1}`,
  magnitude: 4.2 + index * 0.6,
  depthKm: 8 + index * 5,
  latitude: 34 + index,
  longitude: -118 + index,
  place: `Region ${index + 1}, Demo State`,
  time: Date.now() - index * 3600_000,
  url: "https://earthquake.usgs.gov",
  alert: index === 0 ? "green" : "",
  felt: 10 + index,
  tsunami: 0,
}));

const regions: ComparisonRegion[] = events.map((event, index) => ({
  id: event.id,
  name: event.place,
  centerLatitude: event.latitude,
  centerLongitude: event.longitude,
  radiusKm: 50,
  eventCount: 12 + index * 3,
  averageMagnitude: event.magnitude - 0.3,
  averageDepthKm: event.depthKm + 2,
  heatmapIntensity: 4 + index,
}));

const timeline: TimelinePoint[] = Array.from({ length: 12 }, (_, index) => ({
  timestamp: Date.now() - (11 - index) * 6 * 3600_000,
  magnitude: 3.5 + index * 0.2,
  depthKm: 6 + index,
  aftershockCount: index * 2,
}));

const sequence: EventSequenceSummary[] = [
  {
    id: "sequence-1",
    title: "Northern corridor",
    startTime: timeline[0]?.timestamp ?? Date.now(),
    endTime: timeline[timeline.length - 1]?.timestamp ?? Date.now(),
    eventCount: 14,
    maxMagnitude: 6.1,
    averageMagnitude: 4.8,
    averageDepthKm: 11.2,
    aftershockCount: 22,
    weatherComplicationScore: 68,
  },
];

const heatmap: HeatmapCell[] = Array.from({ length: DEFAULT_HEATMAP_GRID * 2 }, (_, index) => ({
  latitude: 0,
  longitude: 0,
  intensity: 2 + (index % 6),
  label: `Cell ${index + 1}`,
}));

export default function ComparePage() {
  return <ComparisonPanel events={events} regions={regions} timeline={timeline} sequence={sequence} heatmap={heatmap} />;
}
