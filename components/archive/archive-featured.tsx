"use client";

import { useResources } from "@/lib/resource-context";
import { getFeaturedResources } from "@/lib/search";
import { ResourceCard } from "@/components/resource-card/resource-card";

export function ArchiveFeatured() {
  const { resources } = useResources();
  const featured = getFeaturedResources(resources, 6);

  if (featured.length === 0) return null;

  return (
    <section className="w-full border-b border-[var(--border)] bg-[var(--background)] py-14 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-[var(--border)]">
          <div>
            <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest mb-1">
              02 // CURATED EXHIBITION
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
              SELECTED HIGHLIGHTS
            </h2>
          </div>
          <span className="text-xs font-mono text-[var(--text-muted)] tracking-wider uppercase">
            EDITORIAL VAULT SELECTIONS
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {featured.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
}
