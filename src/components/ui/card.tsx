import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CardProps {
  title?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

export function Card({ title, description, className, children }: CardProps) {
  return (
    <section className={cn("border border-border-default bg-surface-level2 p-6 transition-colors hover:border-border-hover", className)}>
      {title ? <h2 className="text-lg font-light text-text-primary">{title}</h2> : null}
      {description ? <p className="mt-2 text-sm text-text-secondary">{description}</p> : null}
      {children ? <div className={cn(title || description ? "mt-4" : undefined)}>{children}</div> : null}
    </section>
  );
}
