"use client";

import { useCallback, useEffect, useState } from "react";

import { fetchWeather, getErrorMessage } from "@/lib/api";
import type { WeatherSummary } from "@/lib/types";

interface UseWeatherOptions {
  latitude?: number;
  longitude?: number;
  enabled?: boolean;
}

interface UseWeatherResult {
  data: WeatherSummary | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useWeather({ latitude, longitude, enabled = true }: UseWeatherOptions): UseWeatherResult {
  const [data, setData] = useState<WeatherSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (latitude == null || longitude == null) return;
    setIsLoading(true);
    setError(null);
    try {
      setData(await fetchWeather(latitude, longitude));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (enabled && latitude != null && longitude != null) {
      void load();
    }
  }, [enabled, latitude, longitude, load]);

  return { data, isLoading, error, refetch: load };
}
