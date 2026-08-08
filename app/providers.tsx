"use client";

import { ResourceProvider } from "@/lib/resource-context";
import { ThemeProvider } from "@/lib/theme-context";
import { UIProvider } from "@/lib/ui-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ResourceProvider>
        <UIProvider>{children}</UIProvider>
      </ResourceProvider>
    </ThemeProvider>
  );
}
