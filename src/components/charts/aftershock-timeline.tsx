"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card } from "@/components/ui/card";
import type { TimelinePoint } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";

interface AftershockTimelineProps {
  data: TimelinePoint[];
  className?: string;
}

export function AftershockTimeline({ data, className }: AftershockTimelineProps) {
  return (
    <Card title="Aftershock progression" description="Event sequence intensity over time" className={className}>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#222222" vertical={false} />
            <XAxis dataKey="timestamp" tickFormatter={(value) => formatDateTime(value)} tick={{ fill: "#a1a1a1", fontSize: 12 }} axisLine={{ stroke: "#222222" }} tickLine={false} />
            <YAxis tick={{ fill: "#a1a1a1", fontSize: 12 }} axisLine={{ stroke: "#222222" }} tickLine={false} />
            <Tooltip contentStyle={{ background: "#111111", border: "1px solid #222222", borderRadius: 0 }} labelFormatter={(value) => formatDateTime(Number(value))} />
            <Area type="monotone" dataKey="aftershockCount" stroke="#2DD4BF" fill="#2DD4BF" fillOpacity={0.18} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
