"use client";

import { useResources } from "@/lib/resource-context";
import { getFeaturedResources } from "@/lib/search";
import { ResourceGrid } from "@/components/resource-grid/resource-grid";

export function ArchiveFeatured() {
  const { resources } = useResources();
  const featured = getFeaturedResources(resources, 10);

  if (featured.length === 0) return null;

  return (
    <section className="w-full border-b border-[var(--border)] bg-[var(--background)] py-10 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-xs bg-[var(--accent)]" />
            <h2 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">
              FEATURED REFERENCES
            </h2>
            <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--surface-muted)] px-2 py-0.5 rounded">
              {featured.length}
            </span>
          </div>
          <span className="text-[11px] font-mono text-[var(--text-muted)] tracking-wider uppercase hidden sm:block">
            EDITOR&apos;S CHOICE
          </span>
        </div>

        <ResourceGrid resources={featured} />
      </div>
    </section>
  );
}
