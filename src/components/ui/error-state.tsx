import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  message?: string;
  className?: string;
  onRetry?: () => void;
}

export function ErrorState({ title = "Unable to load", message = "An unexpected error occurred.", className, onRetry }: ErrorStateProps) {
  return (
    <div className={cn("flex min-h-[240px] flex-col items-center justify-center gap-4 border border-border-default bg-surface-level1 p-6 text-center", className)}>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.05em] text-text-primary">{title}</p>
        <p className="mt-2 text-sm text-text-secondary">{message}</p>
      </div>
      {onRetry ? <Button onClick={onRetry}>Retry</Button> : null}
    </div>
  );
}
