"use client";

import { useCallback, useEffect, useState } from "react";

import { fetchEventDetail, getErrorMessage } from "@/lib/api";
import type { EventDetailResponse } from "@/lib/types";

interface UseEventDetailOptions {
  eventId?: string;
  enabled?: boolean;
}

interface UseEventDetailResult {
  data: EventDetailResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useEventDetail({ eventId, enabled = true }: UseEventDetailOptions): UseEventDetailResult {
  const [data, setData] = useState<EventDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!eventId) return;
    setIsLoading(true);
    setError(null);
    try {
      setData(await fetchEventDetail(eventId));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    if (enabled && eventId) {
      void load();
    }
  }, [enabled, eventId, load]);

  return { data, isLoading, error, refetch: load };
}
