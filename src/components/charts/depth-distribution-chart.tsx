"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { Card } from "@/components/ui/card";
import type { ComparisonMetric } from "@/lib/types";

interface DepthDistributionChartProps {
  data: ComparisonMetric[];
  className?: string;
}

const COLORS = ["#2DD4BF", "#3D56F0", "#f59e0b", "#ef4444"];

export function DepthDistributionChart({ data, className }: DepthDistributionChartProps) {
  return (
    <Card title="Depth distribution" description="Relative contribution of shallow and deep events" className={className}>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip contentStyle={{ background: "#111111", border: "1px solid #222222", borderRadius: 0 }} />
            <Pie data={data} dataKey="normalized" nameKey="label" innerRadius={70} outerRadius={100} paddingAngle={3}>
              {data.map((entry, index) => (
                <Cell key={entry.label} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
