"use client";

import { create } from "zustand";

import type { GeoPoint } from "@/lib/types";

export interface EventFilters {
  query: string;
  minMagnitude: number;
  maxMagnitude: number;
  minDepth: number;
  maxDepth: number;
  timeWindowHours: number;
  alertStatus: string;
  region: string;
}

interface RequestState {
  isLoading: boolean;
  error: string | null;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

interface DashboardState {
  filters: EventFilters;
  selectedEventId: string | null;
  hoveredEventId: string | null;
  mapCenter: GeoPoint;
  mapZoom: number;
  setFilters: (filters: Partial<EventFilters>) => void;
  resetFilters: () => void;
  selectEvent: (eventId: string | null) => void;
  hoverEvent: (eventId: string | null) => void;
  setMapCenter: (center: GeoPoint) => void;
  setMapZoom: (zoom: number) => void;
}

const DEFAULT_FILTERS: EventFilters = {
  query: "",
  minMagnitude: 0,
  maxMagnitude: 10,
  minDepth: 0,
  maxDepth: 700,
  timeWindowHours: 24,
  alertStatus: "all",
  region: "global",
};

export const useRequestStore = create<RequestState>((set) => ({
  isLoading: false,
  error: null,
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set({ isLoading: false, error: null }),
}));

export const useDashboardStore = create<DashboardState>((set) => ({
  filters: DEFAULT_FILTERS,
  selectedEventId: null,
  hoveredEventId: null,
  mapCenter: { latitude: 37.0902, longitude: -95.7129 },
  mapZoom: 3,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: DEFAULT_FILTERS }),
  selectEvent: (eventId) => set({ selectedEventId: eventId }),
  hoverEvent: (eventId) => set({ hoveredEventId: eventId }),
  setMapCenter: (mapCenter) => set({ mapCenter }),
  setMapZoom: (mapZoom) => set({ mapZoom }),
}));
