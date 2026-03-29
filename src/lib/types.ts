export interface ApiErrorResponse {
  error: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiFailureResponse {
  success: false;
  error: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiFailureResponse;

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface BoundingBox {
  minLatitude: number;
  minLongitude: number;
  maxLatitude: number;
  maxLongitude: number;
}

export interface UsgsEarthquakeProperties {
  mag: number;
  place: string;
  time: number;
  updated: number;
  tz: number;
  url: string;
  detail: string;
  felt: number;
  cdi: number;
  mmi: number;
  alert: string;
  status: string;
  tsunami: number;
  sig: number;
  net: string;
  code: string;
  ids: string;
  sources: string;
  types: string;
  nst: number;
  dmin: number;
  rms: number;
  gap: number;
  magType: string;
  type: string;
  title: string;
}

export interface UsgsEarthquakeGeometry {
  type: "Point";
  coordinates: [number, number, number];
}

export interface UsgsEarthquakeFeature {
  type: "Feature";
  id: string;
  properties: UsgsEarthquakeProperties;
  geometry: UsgsEarthquakeGeometry;
}

export interface UsgsEarthquakeFeed {
  type: "FeatureCollection";
  metadata: {
    generated: number;
    url: string;
    title: string;
    status: number;
    api: string;
    count: number;
  };
  features: UsgsEarthquakeFeature[];
  bbox: [number, number, number, number];
}

export interface UsgsEarthquakeSummary {
  id: string;
  title: string;
  magnitude: number;
  depthKm: number;
  latitude: number;
  longitude: number;
  place: string;
  time: number;
  url: string;
  alert: string;
  felt: number;
  tsunami: number;
}

export interface WeatherSummary {
  latitude: number;
  longitude: number;
  current: OpenMeteoCurrentWeather;
  hourly: OpenMeteoHourlyWeather;
}

export interface GeocodeQueryResult {
  query: string;
  places: NominatimPlace[];
}

export interface ReverseGeocodeResult {
  latitude: number;
  longitude: number;
  places: NominatimPlace[];
}

export interface RouteRequest {
  origin: string;
  destination: string;
}

export interface RouteRequestCoordinates {
  origin: GeoPoint;
  destination: GeoPoint;
}

export interface RouteResponse extends RouteSummary {
  origin: GeoPoint;
  destination: GeoPoint;
}

export interface EventDetailResponse {
  event: UsgsEarthquakeFeature;
  summary: UsgsEarthquakeSummary;
  weather?: WeatherSummary;
  nearbyPlaces?: NominatimPlace[];
  reverseGeocode?: ReverseGeocodeResult;
  routes?: RouteResponse[];
  riskScore?: RiskScoreBreakdown;
  responseContext?: string[];
  comparisonRegions?: ComparisonRegion[];
}

export interface OpenMeteoCurrentWeather {
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  weather_code: number;
  cloud_cover: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
}

export interface OpenMeteoHourlyWeather {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
  precipitation: number[];
  wind_speed_10m: number[];
  wind_gusts_10m: number[];
}

export interface OpenMeteoWeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: OpenMeteoCurrentWeather;
  hourly: OpenMeteoHourlyWeather;
}

export interface NominatimAddress {
  city: string;
  town: string;
  village: string;
  county: string;
  state: string;
  country: string;
  country_code: string;
}

export interface NominatimPlace {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  address: NominatimAddress;
}

export interface RouteStep {
  distance: number;
  duration: number;
  name: string;
  mode: string;
}

export interface RouteLeg {
  distance: number;
  duration: number;
  steps: RouteStep[];
}

export interface RouteGeometry {
  type: "LineString";
  coordinates: [number, number][];
}

export interface RouteSummary {
  distanceMeters: number;
  durationSeconds: number;
  geometry: RouteGeometry;
  legs: RouteLeg[];
}

export interface RiskScoreBreakdown {
  seismic: number;
  weather: number;
  exposure: number;
  accessibility: number;
  total: number;
  label: string;
  severity: "low" | "moderate" | "high" | "critical";
}

export interface TimelinePoint {
  timestamp: number;
  magnitude: number;
  depthKm: number;
  aftershockCount: number;
}

export interface ComparisonRegion {
  id: string;
  name: string;
  centerLatitude: number;
  centerLongitude: number;
  radiusKm: number;
  distanceKm?: number;
  eventCount?: number;
  averageMagnitude?: number;
  averageDepthKm?: number;
  heatmapIntensity?: number;
}

export interface EventSequenceSummary {
  id: string;
  title: string;
  startTime: number;
  endTime: number;
  eventCount: number;
  maxMagnitude: number;
  averageMagnitude: number;
  averageDepthKm: number;
  aftershockCount: number;
  weatherComplicationScore: number;
}

export interface ComparisonMetric {
  label: string;
  value: number;
  normalized: number;
  unit?: string;
}

export interface HeatmapCell {
  latitude: number;
  longitude: number;
  intensity: number;
  label: string;
}

export interface LoadingStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export interface ErrorStateProps {
  title?: string;
  message?: string;
  className?: string;
  onRetry?: () => void;
}

export interface EmptyStateProps {
  title?: string;
  description?: string;
  message?: string;
  className?: string;
  children?: React.ReactNode;
}
