"use client";

import Link from "next/link";
import { categories } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { CategoryIcon } from "@/components/ui/category-icon";

export function CategoryTileGrid() {
  const { categoryCounts } = useResources();

  return (
    <section id="categories" className="w-full border-b border-[var(--border)] bg-[var(--background)] py-10 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-xs bg-[var(--accent)]" />
            <h2 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">
              DISCIPLINE INDEX
            </h2>
            <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--surface-muted)] px-2 py-0.5 rounded">
              {categories.length}
            </span>
          </div>
          <div className="text-[11px] font-mono text-[var(--text-muted)] tracking-wider uppercase hidden sm:block">
            SYSTEMATIC ARCHIVE CATEGORIES
          </div>
        </div>

        {/* Dense Archive Index Tile Grid: 2 cols mobile, 3-4 tablet, 6 desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {categories.map((cat, idx) => {
            const num = (idx + 1).toString().padStart(2, "0");
            const count = categoryCounts[cat.id] ?? 0;

            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group category-tile relative flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 sm:p-3.5 overflow-hidden hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] select-none outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                {/* 01: Top Index Number */}
                <div className="flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)]">
                  <span className="font-bold text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                    {num}
                  </span>
                  <span className="text-[8px] uppercase tracking-wider opacity-50">IDX</span>
                </div>

                {/* 02: Center Dominant Category Geometric Symbol */}
                <div className="my-3 flex items-center justify-center p-1 w-full text-[var(--text-primary)] group-hover:text-[var(--accent)] group-hover:scale-108 transition-all duration-160">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center">
                    <CategoryIcon id={cat.id} className="w-full h-full" />
                  </div>
                </div>

                {/* 03: Bottom Category Name & Resource Count */}
                <div className="pt-2 border-t border-[var(--border)]/60 space-y-0.5">
                  <h3 className="text-xs font-bold uppercase tracking-tight text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
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
