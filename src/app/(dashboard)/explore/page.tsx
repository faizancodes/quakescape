"use client";

import { EventFilters } from "@/components/events/event-filters";
import { EventList } from "@/components/events/event-list";
import { SeismicMap } from "@/components/map/seismic-map";
import { PlaceSearch } from "@/components/search/place-search";
import { SectionHeader } from "@/components/shared/section-header";
import { useDashboardStore } from "@/lib/store";

const DEMO_EVENTS = [
  { id: "demo-1", title: "M 5.4 near Anchorage, Alaska", place: "Anchorage, Alaska", magnitude: 5.4, depthKm: 12.3, latitude: 61.2181, longitude: -149.9003, time: Date.now(), url: "https://example.com/demo-1", alert: "yellow", felt: 0, tsunami: 0 },
  { id: "demo-2", title: "M 4.8 off the Oregon coast", place: "Pacific Ocean", magnitude: 4.8, depthKm: 8.1, latitude: 44.0, longitude: -125.0, time: Date.now() - 3600000, url: "https://example.com/demo-2", alert: "green", felt: 0, tsunami: 0 },
  { id: "demo-3", title: "M 6.1 near Ridgecrest, California", place: "Ridgecrest, California", magnitude: 6.1, depthKm: 6.7, latitude: 35.622, longitude: -117.67, time: Date.now() - 7200000, url: "https://example.com/demo-3", alert: "orange", felt: 0, tsunami: 0 },
];

export default function ExplorePage() {
  const filters = useDashboardStore((state) => state.filters);
  const filteredEvents = DEMO_EVENTS.filter((event) => {
    const matchesQuery = filters.query ? event.place.toLowerCase().includes(filters.query.toLowerCase()) || event.title.toLowerCase().includes(filters.query.toLowerCase()) : true;
    const matchesMagnitude = event.magnitude >= filters.minMagnitude && event.magnitude <= filters.maxMagnitude;
    const matchesDepth = event.depthKm >= filters.minDepth && event.depthKm <= filters.maxDepth;
    const matchesAlert = filters.alertStatus === "all" ? true : event.alert === filters.alertStatus;
    return matchesQuery && matchesMagnitude && matchesDepth && matchesAlert;
  });

  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Explore" title="Search and inspect events" description="Filter by region, magnitude, depth, and alert status, then inspect the most relevant earthquakes." action={<PlaceSearch />} />
      <EventFilters />
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <SeismicMap events={filteredEvents} />
        <EventList events={filteredEvents} />
      </div>
    </div>
  );
}
