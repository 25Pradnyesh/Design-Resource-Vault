"use client";

import { ResourceProvider } from "@/lib/resource-context";
import { UIProvider } from "@/lib/ui-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ResourceProvider>
      <UIProvider>{children}</UIProvider>
    </ResourceProvider>
  );
}

