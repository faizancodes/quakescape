import { cn, formatNumber } from "@/lib/utils";

interface EventMarkerProps {
  magnitude: number;
  depthKm: number;
  isSelected?: boolean;
  isHovered?: boolean;
}

export function EventMarker({ magnitude, depthKm, isSelected, isHovered }: EventMarkerProps) {
  const size = Math.max(10, magnitude * 6);
  const depthOpacity = Math.max(0.35, 1 - depthKm / 700);

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full border border-accent-primary/60 bg-accent-primary/20 text-[10px] font-semibold text-accent-primary shadow-[0_0_0_1px_rgba(45,212,191,0.15)]",
        isSelected && "bg-accent-primary text-[#0a0a0a]",
        isHovered && "scale-110",
      )}
      style={{ width: size, height: size, opacity: depthOpacity }}
      title={`M ${formatNumber(magnitude, 1)} · ${formatNumber(depthKm, 1)} km`}
    />
  );
}
