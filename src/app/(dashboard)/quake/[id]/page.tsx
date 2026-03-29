import { notFound } from "next/navigation";

import { ComparisonSelector } from "@/components/search/comparison-selector";
import { EventDetailPanel } from "@/components/events/event-detail-panel";
import { ImpactRadiusPanel } from "@/components/events/impact-radius-panel";
import { WeatherRiskPanel } from "@/components/events/weather-risk-panel";
import { RiskScoreGauge } from "@/components/charts/risk-score-gauge";
import { LoadingState } from "@/components/ui/loading-state";
import { fetchEventDetail, formatRiskLabel } from "@/lib/api";
import type { ComparisonRegion, RiskScoreBreakdown } from "@/lib/types";

interface QuakePageProps {
  params: Promise<{ id: string }>;
}

function buildRiskScore(magnitude: number, depthKm: number, precipitation = 0, wind = 0, tempSwing = 0, alert?: string): RiskScoreBreakdown {
  const seismic = Math.min(40, magnitude * 8 + Math.max(0, 20 - depthKm));
  const weather = Math.min(25, precipitation * 2 + wind / 4 + tempSwing * 2);
  const exposure = Math.min(20, 10 + magnitude * 2);
  const accessibility = Math.min(15, wind / 6 + precipitation);
  const total = Math.round(Math.min(100, seismic + weather + exposure + accessibility + (alert && alert !== "green" ? 10 : 0)));
  const label = formatRiskLabel(total);
  const severity: RiskScoreBreakdown["severity"] = total >= 85 ? "critical" : total >= 70 ? "high" : total >= 40 ? "moderate" : "low";
  return { seismic, weather, exposure, accessibility, total, label, severity };
}

export default async function QuakeDetailPage({ params }: QuakePageProps) {
  const { id } = await params;
  const detail = await fetchEventDetail(id).catch(() => null);

  if (!detail) {
    notFound();
  }

  const weather = detail.weather;
  const current = weather?.current;
  const riskScore = detail.riskScore ?? buildRiskScore(detail.summary.magnitude, detail.summary.depthKm, current?.precipitation, current?.wind_speed_10m, current ? Math.abs(current.temperature_2m - current.apparent_temperature) : 0, detail.summary.alert);
  const comparisonRegions: ComparisonRegion[] = detail.comparisonRegions ?? [
    { id: "local", name: "Local basin", centerLatitude: detail.summary.latitude, centerLongitude: detail.summary.longitude, radiusKm: 50, distanceKm: 0 },
    { id: "regional", name: "Regional corridor", centerLatitude: detail.summary.latitude + 0.5, centerLongitude: detail.summary.longitude + 0.5, radiusKm: 150, distanceKm: 72.4 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <RiskScoreGauge score={riskScore.total} label={riskScore.label} severity={riskScore.severity} />
          <EventDetailPanel detail={detail} />
          <ImpactRadiusPanel places={detail.nearbyPlaces} routes={detail.routes} comparisonRegions={comparisonRegions} />
        </div>
        <div className="space-y-6">
          <WeatherRiskPanel weather={weather} />
          <ComparisonSelector regions={comparisonRegions} selectedId={comparisonRegions[0]?.id} onSelect={() => undefined} />
          <div className="rounded border border-border-default bg-surface-level1 p-5 text-sm text-text-secondary">
            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Actionable response</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Prioritize field inspection near the highest exposure assets.</li>
              <li>Check road access where wind and precipitation are elevated.</li>
              <li>Monitor aftershock and weather escalation over the next 6 hours.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
