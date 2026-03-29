import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const variantClasses = {
    primary: "bg-accent-primary text-[#0a0a0a] hover:bg-accent-hover",
    secondary: "bg-surface-level2 text-text-primary border border-border-default hover:border-border-hover",
    ghost: "bg-transparent text-text-secondary hover:text-text-primary",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded px-4 py-2 text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary/40 disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
