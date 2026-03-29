import type { ReactNode } from "react";

import { PageShell } from "@/components/layout/page-shell";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <PageShell>{children}</PageShell>;
}
