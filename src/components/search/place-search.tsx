"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useDashboardStore } from "@/lib/store";

export function PlaceSearch() {
  const [value, setValue] = useState("");
  const setFilters = useDashboardStore((state) => state.setFilters);

  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search city, county, or landmark"
        className="min-w-0 flex-1 border border-border-default bg-surface-level1 px-3 py-2 text-sm text-text-primary outline-none transition-colors focus:border-accent-primary"
      />
      <Button
        type="button"
        onClick={() => setFilters({ query: value })}
      >
        Search
      </Button>
    </div>
  );
}
