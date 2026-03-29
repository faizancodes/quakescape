import { Card } from "@/components/ui/card";
import type { UsgsEarthquakeSummary } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface EventSummaryCardsProps {
  summaries: UsgsEarthquakeSummary[];
}

export function EventSummaryCards({ summaries }: EventSummaryCardsProps) {
  const total = summaries.length;
  const strongest = summaries.reduce((max, item) => Math.max(max, item.magnitude), 0);
  const shallow = summaries.filter((item) => item.depthKm <= 10).length;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card title="Active events" description="Current USGS feed count">
        <p className="text-3xl font-light text-text-primary">{formatNumber(total, 0)}</p>
      </Card>
      <Card title="Strongest magnitude" description="Highest event in the current feed">
        <p className="text-3xl font-light text-text-primary">{formatNumber(strongest, 1)}</p>
      </Card>
      <Card title="Shallow events" description="Events at or above 10 km depth">
        <p className="text-3xl font-light text-text-primary">{formatNumber(shallow, 0)}</p>
      </Card>
    </div>
  );
}
