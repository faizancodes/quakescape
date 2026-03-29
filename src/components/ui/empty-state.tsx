import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  message?: string;
  className?: string;
  children?: ReactNode;
}

export function EmptyState({ title = "No results", description, message, className, children }: EmptyStateProps) {
  return (
    <div className={cn("flex min-h-[240px] flex-col items-center justify-center gap-3 border border-border-default bg-surface-level1 p-6 text-center", className)}>
      <p className="text-sm font-semibold uppercase tracking-[0.05em] text-text-primary">{title}</p>
      <p className="max-w-sm text-sm text-text-secondary">{description ?? message ?? "There is nothing to display yet."}</p>
      {children}
    </div>
  );
}
