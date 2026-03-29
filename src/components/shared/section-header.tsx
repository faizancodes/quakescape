import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  action?: ReactNode;
}

export function SectionHeader({ eyebrow, title, description, className, action }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3 border-b border-border-default pb-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div>
        {eyebrow ? <Badge>{eyebrow}</Badge> : null}
        <h2 className="mt-3 text-2xl font-light text-text-primary">{title}</h2>
        {description ? <p className="mt-2 max-w-3xl text-sm text-text-secondary">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
