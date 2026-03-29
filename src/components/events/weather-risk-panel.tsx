import { Card } from "@/components/ui/card";
import type { WeatherSummary } from "@/lib/types";

interface WeatherRiskPanelProps {
  weather?: WeatherSummary | null;
  className?: string;
}

function formatWind(speed: number): string {
  return `${Math.round(speed)} km/h`;
}

export function WeatherRiskPanel({ weather, className }: WeatherRiskPanelProps) {
  if (!weather) {
    return <Card title="Weather complication" description="No localized weather data available." className={className} />;
  }

  const current = weather.current;
  const hourly = weather.hourly;
  const maxPrecip = Math.max(...hourly.precipitation_probability.slice(0, 6), 0);
  const maxWind = Math.max(...hourly.wind_gusts_10m.slice(0, 6), current.wind_speed_10m);
  const tempSwing = Math.max(...hourly.temperature_2m.slice(0, 6)) - Math.min(...hourly.temperature_2m.slice(0, 6));

  return (
    <Card title="Weather complication" description="Localized conditions that may worsen access or slope stability." className={className}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Metric label="Current temp" value={`${Math.round(current.temperature_2m)}°C`} />
        <Metric label="Feels like" value={`${Math.round(current.apparent_temperature)}°C`} />
        <Metric label="Wind" value={formatWind(current.wind_speed_10m)} />
        <Metric label="Precipitation" value={`${current.precipitation.toFixed(1)} mm`} />
      </div>
      <div className="mt-4 rounded border border-border-default bg-surface-level1 p-4 text-sm text-text-secondary">
        <p>Next 6 hours: {maxPrecip}% precipitation chance, gusts up to {formatWind(maxWind)}, temperature swing {tempSwing.toFixed(1)}°C.</p>
      </div>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-border-default bg-surface-level1 p-3">
      <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted">{label}</p>
      <p className="mt-1 text-sm font-medium text-text-primary">{value}</p>
    </div>
  );
}
