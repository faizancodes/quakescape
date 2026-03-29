import { cn } from "@/lib/utils";

interface RiskScoreGaugeProps {
  score: number;
  label: string;
  severity: "low" | "moderate" | "high" | "critical";
  className?: string;
}

const severityStyles: Record<RiskScoreGaugeProps["severity"], string> = {
  low: "text-emerald-400",
  moderate: "text-amber-400",
  high: "text-orange-400",
  critical: "text-rose-400",
};

export function RiskScoreGauge({ score, label, severity, className }: RiskScoreGaugeProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className={cn("rounded border border-border-default bg-surface-level1 p-5", className)}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Compound risk</p>
          <h3 className="mt-1 text-lg font-light text-text-primary">{label}</h3>
        </div>
        <span className={cn("text-sm font-semibold uppercase tracking-[0.15em]", severityStyles[severity])}>{severity}</span>
      </div>
      <div className="mt-5 flex items-center gap-5">
        <div className="relative h-28 w-28 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="42" className="fill-none stroke-[#1f1f1f]" strokeWidth="10" />
            <circle
              cx="50"
              cy="50"
              r="42"
              className="fill-none stroke-accent-primary"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-semibold text-text-primary">{Math.round(clamped)}</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">/ 100</span>
          </div>
        </div>
        <div className="space-y-2 text-sm text-text-secondary">
          <p>Weighted from magnitude, depth, weather, and access constraints.</p>
          <p>Higher scores indicate more urgent inspection and response prioritization.</p>
        </div>
      </div>
    </div>
  );
}
