"use client";

import { useCallback, useEffect, useState } from "react";

import { getErrorMessage, reverseGeocode, searchPlaces } from "@/lib/api";
import type { GeocodeQueryResult, ReverseGeocodeResult } from "@/lib/types";

interface UseGeocodeOptions {
  query?: string;
  latitude?: number;
  longitude?: number;
  mode: "search" | "reverse";
  enabled?: boolean;
}

interface UseGeocodeResult {
  data: GeocodeQueryResult | ReverseGeocodeResult | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGeocode({ query, latitude, longitude, mode, enabled = true }: UseGeocodeOptions): UseGeocodeResult {
  const [data, setData] = useState<GeocodeQueryResult | ReverseGeocodeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (mode === "search") {
        if (!query) return;
        setData(await searchPlaces(query));
      } else {
        if (latitude == null || longitude == null) return;
        setData(await reverseGeocode(latitude, longitude));
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [latitude, longitude, mode, query]);

  useEffect(() => {
    if (enabled) {
      void load();
    }
  }, [enabled, load]);

  return { data, isLoading, error, refetch: load };
}
