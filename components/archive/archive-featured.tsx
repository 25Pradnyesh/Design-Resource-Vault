"use client";

import { useResources } from "@/lib/resource-context";
import { getFeaturedResources } from "@/lib/search";
import { ResourceGrid } from "@/components/resource-grid/resource-grid";
import { Sparkles, Award } from "lucide-react";

export function ArchiveFeatured() {
  const { resources } = useResources();
  const featured = getFeaturedResources(resources, 6);

  if (featured.length === 0) return null;

  return (
    <section className="w-full border-b border-slate-200 bg-slate-50/40 py-10 px-4 sm:px-8 lg:px-12 font-sans select-none">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-500 inline-block" />
            <h2 className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
              Curator&apos;s Featured Spotlight
            </h2>
            <span className="text-[11px] font-mono text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-bold">
              {featured.length} BENCHMARKS
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 tracking-wider uppercase hidden sm:block">
            GOLD-STANDARD REFERENCES
          </span>
        </div>

        <ResourceGrid resources={featured} customViewMode="gallery" />
      </div>
    </section>
  );
}
