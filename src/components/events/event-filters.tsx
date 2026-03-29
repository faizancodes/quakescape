"use client";

import { RegionPicker } from "@/components/search/region-picker";
import { Button } from "@/components/ui/button";
import { useDashboardStore } from "@/lib/store";

export function EventFilters() {
  const filters = useDashboardStore((state) => state.filters);
  const setFilters = useDashboardStore((state) => state.setFilters);
  const resetFilters = useDashboardStore((state) => state.resetFilters);

  return (
    <div className="grid gap-4 rounded border border-border-default bg-surface-level1 p-4 lg:grid-cols-3">
      <label className="flex flex-col gap-2 text-sm text-text-secondary">
        Magnitude min
        <input type="number" value={filters.minMagnitude} onChange={(event) => setFilters({ minMagnitude: Number(event.target.value) })} className="border border-border-default bg-surface-level0 px-3 py-2 text-text-primary" />
      </label>
      <label className="flex flex-col gap-2 text-sm text-text-secondary">
        Magnitude max
        <input type="number" value={filters.maxMagnitude} onChange={(event) => setFilters({ maxMagnitude: Number(event.target.value) })} className="border border-border-default bg-surface-level0 px-3 py-2 text-text-primary" />
      </label>
      <label className="flex flex-col gap-2 text-sm text-text-secondary">
        Depth max (km)
        <input type="number" value={filters.maxDepth} onChange={(event) => setFilters({ maxDepth: Number(event.target.value) })} className="border border-border-default bg-surface-level0 px-3 py-2 text-text-primary" />
      </label>
      <label className="flex flex-col gap-2 text-sm text-text-secondary">
        Time window (hours)
        <input type="number" value={filters.timeWindowHours} onChange={(event) => setFilters({ timeWindowHours: Number(event.target.value) })} className="border border-border-default bg-surface-level0 px-3 py-2 text-text-primary" />
      </label>
      <RegionPicker />
      <label className="flex flex-col gap-2 text-sm text-text-secondary">
        Alert status
        <select value={filters.alertStatus} onChange={(event) => setFilters({ alertStatus: event.target.value })} className="border border-border-default bg-surface-level0 px-3 py-2 text-text-primary">
          <option value="all">All</option>
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="orange">Orange</option>
          <option value="red">Red</option>
        </select>
      </label>
      <div className="flex items-end">
        <Button type="button" variant="secondary" className="w-full" onClick={resetFilters}>
          Reset filters
        </Button>
      </div>
    </div>
  );
}
