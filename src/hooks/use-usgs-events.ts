"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { fetchUsgsFeed, getErrorMessage, summarizeEarthquake } from "@/lib/api";
import type { UsgsEarthquakeFeed, UsgsEarthquakeSummary } from "@/lib/types";

interface UseUsgsEventsOptions {
  enabled?: boolean;
  refreshIntervalMs?: number;
}

interface UseUsgsEventsResult {
  data: UsgsEarthquakeFeed | null;
  summaries: UsgsEarthquakeSummary[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useUsgsEvents({ enabled = true, refreshIntervalMs }: UseUsgsEventsOptions = {}): UseUsgsEventsResult {
  const [data, setData] = useState<UsgsEarthquakeFeed | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setData(await fetchUsgsFeed());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    void load();
  }, [enabled, load]);

  useEffect(() => {
    if (!enabled || !refreshIntervalMs) return;
    const interval = window.setInterval(() => {
      void load();
    }, refreshIntervalMs);
    return () => window.clearInterval(interval);
  }, [enabled, load, refreshIntervalMs]);

  const summaries = useMemo(() => data?.features.map((feature) => summarizeEarthquake(feature)) ?? [], [data]);

  return { data, summaries, isLoading, error, refetch: load };
}
