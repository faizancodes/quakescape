"use client";

import { useCallback, useEffect, useState } from "react";

import { fetchRoute, getErrorMessage } from "@/lib/api";
import type { RouteResponse } from "@/lib/types";

interface UseRouteOptions {
  origin?: string;
  destination?: string;
  enabled?: boolean;
}

interface UseRouteResult {
  data: RouteResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useRoute({ origin, destination, enabled = true }: UseRouteOptions): UseRouteResult {
  const [data, setData] = useState<RouteResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!origin || !destination) return;
    setIsLoading(true);
    setError(null);
    try {
      setData(await fetchRoute(origin, destination));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [destination, origin]);

  useEffect(() => {
    if (enabled && origin && destination) {
      void load();
    }
  }, [enabled, origin, destination, load]);

  return { data, isLoading, error, refetch: load };
}
