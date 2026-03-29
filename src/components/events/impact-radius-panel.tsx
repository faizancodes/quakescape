import { Card } from "@/components/ui/card";
import type { ComparisonRegion, NominatimPlace, RouteResponse } from "@/lib/types";

interface ImpactRadiusPanelProps {
  places?: NominatimPlace[];
  routes?: RouteResponse[];
  comparisonRegions?: ComparisonRegion[];
  className?: string;
}

export function ImpactRadiusPanel({ places = [], routes = [], comparisonRegions = [], className }: ImpactRadiusPanelProps) {
  return (
    <Card title="Impact radius" description="Nearby assets, administrative areas, and access estimates." className={className}>
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Nearby places</p>
          <div className="mt-3 space-y-2">
            {places.slice(0, 5).map((place) => (
              <div key={place.place_id} className="rounded border border-border-default bg-surface-level1 p-3 text-sm">
                <p className="font-medium text-text-primary">{place.display_name}</p>
                <p className="text-text-secondary">{place.address.county || place.address.state || place.address.country}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Route accessibility</p>
          <div className="mt-3 space-y-2">
            {routes.slice(0, 3).map((route, index) => (
              <div key={`${route.distanceMeters}-${index}`} className="rounded border border-border-default bg-surface-level1 p-3 text-sm text-text-secondary">
                <p className="text-text-primary">Route {index + 1}</p>
                <p>{(route.distanceMeters / 1000).toFixed(1)} km · {(route.durationSeconds / 60).toFixed(0)} min</p>
              </div>
            ))}
          </div>
          {comparisonRegions.length > 0 ? <p className="mt-4 text-xs uppercase tracking-[0.2em] text-text-muted">Comparison regions available</p> : null}
        </div>
      </div>
    </Card>
  );
}
