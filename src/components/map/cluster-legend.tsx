import { Badge } from "@/components/ui/badge";

export function ClusterLegend() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Magnitude</Badge>
      <Badge>Depth</Badge>
      <Badge>Selected</Badge>
      <Badge>Hovered</Badge>
    </div>
  );
}
