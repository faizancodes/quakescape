import { EventSummaryCards } from "@/components/events/event-summary-cards";
import { SeismicMap } from "@/components/map/seismic-map";
import { SectionHeader } from "@/components/shared/section-header";

const DEMO_EVENTS = [
  { id: "demo-1", title: "M 5.4 near Anchorage, Alaska", place: "Anchorage, Alaska", magnitude: 5.4, depthKm: 12.3, latitude: 61.2181, longitude: -149.9003, time: Date.now(), url: "https://example.com/demo-1", alert: "yellow", felt: 0, tsunami: 0 },
  { id: "demo-2", title: "M 4.8 off the Oregon coast", place: "Pacific Ocean", magnitude: 4.8, depthKm: 8.1, latitude: 44.0, longitude: -125.0, time: Date.now() - 3600000, url: "https://example.com/demo-2", alert: "green", felt: 0, tsunami: 0 },
  { id: "demo-3", title: "M 6.1 near Ridgecrest, California", place: "Ridgecrest, California", magnitude: 6.1, depthKm: 6.7, latitude: 35.622, longitude: -117.67, time: Date.now() - 7200000, url: "https://example.com/demo-3", alert: "orange", felt: 0, tsunami: 0 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 sm:p-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600 dark:text-sky-400">
            Dashboard
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Live seismic command map
          </h1>
          <p className="text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Monitor active earthquakes, magnitude clusters, and response urgency in one operational view.
          </p>
        </div>
      </section>

      <SectionHeader
        eyebrow="Overview"
        title="Current activity snapshot"
        description="A concise summary of the latest events and their relative severity."
      />
      <EventSummaryCards summaries={DEMO_EVENTS} />
      <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <SeismicMap events={DEMO_EVENTS} />
      </div>
    </div>
  );
}
