"use client";

import { useCallback, useEffect, useState } from "react";

import { fetchUsgsFeed, getErrorMessage } from "@/lib/api";
import type { UsgsEarthquakeFeed } from "@/lib/types";

interface UseUsgsEventsOptions {
  enabled?: boolean;
}

interface UseUsgsEventsResult {
  data: UsgsEarthquakeFeed | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useUsgsEvents({ enabled = true }: UseUsgsEventsOptions = {}): UseUsgsEventsResult {
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
    if (enabled) {
      void load();
    }
  }, [enabled, load]);

  return { data, isLoading, error, refetch: load };
}
