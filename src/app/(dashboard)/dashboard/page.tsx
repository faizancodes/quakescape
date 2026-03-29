import { EventSummaryCards } from "@/components/events/event-summary-cards";
import { SeismicMap } from "@/components/map/seismic-map";
import { SectionHeader } from "@/components/shared/section-header";

const DEMO_EVENTS = [
  { id: "demo-1", title: "M 5.4 near Anchorage, Alaska", place: "Anchorage, Alaska", magnitude: 5.4, depthKm: 12.3, time: Date.now(), alert: "yellow" },
  { id: "demo-2", title: "M 4.8 off the Oregon coast", place: "Pacific Ocean", magnitude: 4.8, depthKm: 8.1, time: Date.now() - 3600000, alert: "green" },
  { id: "demo-3", title: "M 6.1 near Ridgecrest, California", place: "Ridgecrest, California", magnitude: 6.1, depthKm: 6.7, time: Date.now() - 7200000, alert: "orange" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Dashboard" title="Live seismic command map" description="Monitor active earthquakes, magnitude clusters, and response urgency in one operational view." />
      <EventSummaryCards summaries={DEMO_EVENTS} />
      <SeismicMap events={DEMO_EVENTS} />
    </div>
  );
}
