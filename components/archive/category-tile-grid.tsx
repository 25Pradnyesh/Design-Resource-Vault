"use client";

import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { categories } from "@/data/categories";
import { useResources } from "@/lib/resource-context";

export function CategoryTileGrid() {
  const { categoryCounts } = useResources();

  return (
    <section
      id="categories"
      className="w-full bg-white py-10 sm:py-14 px-4 sm:px-8 lg:px-12 font-sans select-none scroll-mt-20 border-b border-slate-200"
    >
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-blue-600 inline-block" />
            <h2 className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
              Browse Taxonomies
            </h2>
            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-bold border border-slate-200">
              {categories.length} DOMAINS
            </span>
          </div>
          <div className="text-[11px] font-mono text-slate-400 tracking-wider uppercase hidden sm:block">
            SPECIALIZED REFERENCE DIRECTORY
          </div>
        </div>

        {/* 6-Column High-Density Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-3.5">
          {categories.map((cat, idx) => {
            const count = categoryCounts[cat.id] ?? 0;
            const num = String(idx + 1).padStart(2, "0");

            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="category-card-item group relative flex flex-col justify-between rounded-xl p-3.5 sm:p-4 border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-400 transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 hover:shadow-sm"
              >
                {/* Index tag */}
                <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 font-semibold mb-2">
                  <span className="text-slate-700 font-bold group-hover:text-blue-600 transition-colors">
                    {num}
                  </span>
                  <span className="text-[8.5px] uppercase tracking-widest text-slate-400">
                    CAT
                  </span>
                </div>

                {/* Archetype Icon & Emoji badge */}
                <div className="my-2 flex items-center justify-start gap-2">
                  <span className="text-xl" role="img" aria-label={cat.name}>
                    {cat.emoji}
                  </span>
                </div>

                {/* Bottom Metadata */}
                <div className="pt-2 border-t border-slate-200/80 flex items-end justify-between gap-1.5 mt-auto">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="font-mono text-[9.5px] text-slate-500 font-medium mt-0.5">
                      {count} {count === 1 ? "specimen" : "specimens"}
                    </p>
                  </div>

                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
