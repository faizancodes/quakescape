"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card } from "@/components/ui/card";
import { cn, formatNumber } from "@/lib/utils";
import type { ComparisonMetric } from "@/lib/types";

interface MagnitudeChartProps {
  data: ComparisonMetric[];
  className?: string;
}

export function MagnitudeChart({ data, className }: MagnitudeChartProps) {
  return (
    <Card title="Magnitude trends" description="Normalized event strength across the comparison set" className={className}>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#222222" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: "#a1a1a1", fontSize: 12 }} axisLine={{ stroke: "#222222" }} tickLine={false} />
            <YAxis tick={{ fill: "#a1a1a1", fontSize: 12 }} axisLine={{ stroke: "#222222" }} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "#111111", border: "1px solid #222222", borderRadius: 0 }}
              labelStyle={{ color: "#ffffff" }}
              formatter={(value) => (typeof value === "number" ? formatNumber(value, 2) : value)}
            />
            <Bar dataKey="normalized" fill="#2DD4BF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className={cn("mt-3 text-xs uppercase tracking-[0.2em] text-text-muted")}>Higher bars indicate stronger relative shaking</p>
    </Card>
  );
}
