"use client";

import { useDashboardStore } from "@/lib/store";

const REGIONS = [
  { value: "global", label: "Global" },
  { value: "west-coast", label: "West Coast" },
  { value: "interior", label: "Interior" },
  { value: "pacific", label: "Pacific" },
  { value: "atlantic", label: "Atlantic" },
];

export function RegionPicker() {
  const region = useDashboardStore((state) => state.filters.region);
  const setFilters = useDashboardStore((state) => state.setFilters);

  return (
    <label className="flex flex-col gap-2 text-sm text-text-secondary">
      Region
      <select
        value={region}
        onChange={(event) => setFilters({ region: event.target.value })}
        className="border border-border-default bg-surface-level1 px-3 py-2 text-text-primary outline-none transition-colors focus:border-accent-primary"
      >
        {REGIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
