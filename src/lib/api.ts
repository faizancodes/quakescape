import type {
  EventDetailResponse,
  GeocodeQueryResult,
  NominatimPlace,
  OpenMeteoWeatherResponse,
  ReverseGeocodeResult,
  RouteResponse,
  RouteSummary,
  UsgsEarthquakeFeed,
  UsgsEarthquakeFeature,
  UsgsEarthquakeSummary,
  WeatherSummary,
} from "@/lib/types";

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText || "Request failed");
  }
  return (await response.json()) as T;
};

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

export async function fetchUsgsFeed(url = "/api/usgs"): Promise<UsgsEarthquakeFeed> {
  return fetcher<UsgsEarthquakeFeed>(url);
}

export async function fetchUsgsEvent(eventId: string): Promise<UsgsEarthquakeFeature> {
  return fetcher<UsgsEarthquakeFeature>(`/api/usgs/${eventId}`);
}

export async function fetchWeather(latitude: number, longitude: number): Promise<WeatherSummary> {
  return fetcher<WeatherSummary>(`/api/weather?latitude=${latitude}&longitude=${longitude}`);
}

export async function searchPlaces(query: string): Promise<GeocodeQueryResult> {
  return fetcher<GeocodeQueryResult>(`/api/geocode/search?q=${encodeURIComponent(query)}`);
}

export async function reverseGeocode(latitude: number, longitude: number): Promise<ReverseGeocodeResult> {
  return fetcher<ReverseGeocodeResult>(`/api/geocode/reverse?latitude=${latitude}&longitude=${longitude}`);
}

export async function fetchRoute(origin: string, destination: string): Promise<RouteResponse> {
  return fetcher<RouteResponse>(`/api/route?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);
}

export function summarizeEarthquake(feature: UsgsEarthquakeFeature): UsgsEarthquakeSummary {
  const [longitude, latitude, depthKm] = feature.geometry.coordinates;
  return {
    id: feature.id,
    title: feature.properties.title,
    magnitude: feature.properties.mag,
    depthKm,
    latitude,
    longitude,
    place: feature.properties.place,
    time: feature.properties.time,
    url: feature.properties.url,
    alert: feature.properties.alert,
    felt: feature.properties.felt,
    tsunami: feature.properties.tsunami,
  };
}

export async function fetchEventDetail(eventId: string): Promise<EventDetailResponse> {
  return fetcher<EventDetailResponse>(`/api/usgs/${eventId}`);
}
