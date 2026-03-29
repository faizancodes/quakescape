import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { EventDetailResponse } from "@/lib/types";
import { formatDateTime, formatNumber } from "@/lib/utils";

interface EventDetailPanelProps {
  detail: EventDetailResponse;
  className?: string;
}

export function EventDetailPanel({ detail, className }: EventDetailPanelProps) {
  const { summary, event, responseContext = [] } = detail;

  return (
    <Card title="Event detail" description={summary.title} className={className}>
      <div className="space-y-4 text-sm text-text-secondary">
        <div className="grid gap-3 sm:grid-cols-2">
          <Metric label="Magnitude" value={formatNumber(summary.magnitude)} />
          <Metric label="Depth" value={`${formatNumber(summary.depthKm)} km`} />
          <Metric label="Time" value={formatDateTime(summary.time)} />
          <Metric label="Alert" value={summary.alert || "None"} />
        </div>
        <div className="rounded border border-border-default bg-surface-level1 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Response context</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {responseContext.length > 0 ? responseContext.map((item) => <Badge key={item}>{item}</Badge>) : <span>No response context available.</span>}
          </div>
        </div>
        <p>{event.properties.place}</p>
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
