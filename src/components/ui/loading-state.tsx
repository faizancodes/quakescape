import { cn } from "@/lib/utils";

interface LoadingStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export function LoadingState({ title = "Loading", description = "Preparing data…", className }: LoadingStateProps) {
  return (
    <div className={cn("flex min-h-[240px] flex-col items-center justify-center gap-2 border border-border-default bg-surface-level1 p-6 text-center", className)}>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border-hover border-t-accent-primary" />
      <p className="text-sm font-semibold uppercase tracking-[0.05em] text-text-primary">{title}</p>
      <p className="text-sm text-text-secondary">{description}</p>
    </div>
  );
}
