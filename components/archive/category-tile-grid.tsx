"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { CategoryIcon } from "@/components/ui/category-icon";

export function CategoryTileGrid() {
  const { categoryCounts } = useResources();

  return (
    <section id="categories" className="w-full border-b border-[var(--border)] bg-[var(--background)] py-12 sm:py-16 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 pb-4 mb-8 border-b border-[var(--border)]">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-xs bg-[var(--accent)]" />
            <h2 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">
              CATEGORIES
            </h2>
            <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--surface-muted)] px-2.5 py-0.5 rounded-md font-semibold">
              {categories.length}
            </span>
          </div>
          <div className="text-[11px] font-mono text-[var(--text-muted)] tracking-wider uppercase hidden sm:block">
            CURATED ARCHIVE INDEX
          </div>
        </div>

        {/* Curated Archive Category Tile Grid: 2 cols mobile, 3 sm, 4 md, 6 desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5">
          {categories.map((cat, idx) => {
            const num = (idx + 1).toString().padStart(2, "0");
            const count = categoryCounts[cat.id] ?? 0;

            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group category-tile relative flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5 sm:p-4 overflow-hidden hover:border-[var(--accent)]/50 hover:bg-[var(--surface-hover)] select-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                {/* 01: Top Index Number & Arrow Reveal */}
                <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)]">
                  <span className="font-bold text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                    {num}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[8px] uppercase tracking-wider opacity-50 group-hover:opacity-0 transition-opacity">
                      IDX
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-[var(--accent)] opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-160" />
                  </div>
                </div>

                {/* 02: Center Dominant Category Geometric Symbol */}
                <div className="my-3.5 flex items-center justify-center p-1 w-full text-[var(--text-primary)] group-hover:text-[var(--accent)] group-hover:scale-106 transition-all duration-180">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center">
                    <CategoryIcon id={cat.id} className="w-full h-full" />
                  </div>
                </div>

                {/* 03: Bottom Category Name & Resource Count */}
                <div className="pt-2.5 border-t border-[var(--border)]/70 space-y-0.5">
                  <h3 className="text-xs font-bold uppercase tracking-tight text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-medium">
                    {count} {count === 1 ? "RESOURCE" : "RESOURCES"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
