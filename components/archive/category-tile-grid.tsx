"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { Category3DIcon, CATEGORY_THEMES } from "@/components/ui/category-3d-icon";

export function CategoryTileGrid() {
  const { categoryCounts } = useResources();

  return (
    <section id="categories" className="w-full bg-[var(--background)] py-10 sm:py-14 px-4 sm:px-8 lg:px-12 font-sans select-none">
      <div className="mx-auto max-w-7xl">
        {/* Section Header matching Reference */}
        <div className="flex items-center justify-between gap-4 pb-4 mb-6 sm:mb-8 border-b border-[var(--border)]">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0284C7] inline-block shadow-xs" />
            <h2 className="font-sans text-xs sm:text-sm font-black uppercase tracking-wider text-[var(--text-primary)]">
              BROWSE CATEGORIES
            </h2>
            <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--surface-muted)] px-2 py-0.5 rounded-md font-semibold border border-[var(--border)]">
              {categories.length}
            </span>
          </div>
          <div className="text-[11px] font-mono text-[var(--text-muted)] tracking-wider uppercase hidden sm:block font-semibold">
            CURATED DIRECTORY
          </div>
        </div>

        {/* 6-Column Category Grid matching Reference Benchmark */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5">
          {categories.map((cat, idx) => {
            const theme = CATEGORY_THEMES[cat.id] || {
              id: cat.id,
              num: (idx + 1).toString().padStart(2, "0"),
              name: cat.name.toUpperCase(),
              bg: "#F8FAFC",
              hoverBg: "#F1F5F9",
              border: "#E2E8F0",
              accent: "#00C4CC",
            };
            const count = categoryCounts[cat.id] ?? 0;

            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group category-card-item relative flex flex-col justify-between rounded-2xl p-3 sm:p-3.5 overflow-hidden border transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#00C4CC]"
                style={{
                  backgroundColor: theme.bg,
                  borderColor: theme.border,
                }}
              >
                {/* 01: Top Index Number */}
                <div className="flex items-center justify-between font-mono text-[10px] font-bold text-[var(--text-muted)]">
                  <span className="tracking-wider text-[#334155] group-hover:text-[var(--text-primary)] transition-colors">
                    {theme.num}
                  </span>
                </div>

                {/* 02: Large Dominant 3D Category Illustration */}
                <div className="my-2 sm:my-3 flex items-center justify-center p-1 w-full h-18 sm:h-20 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                  <Category3DIcon id={cat.id} className="w-full h-full object-contain" />
                </div>

                {/* 03: Bottom Metadata (Category Title, Count, and Arrow) */}
                <div className="flex items-end justify-between pt-1 gap-1.5">
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <h3 className="text-[11px] sm:text-[11.5px] font-black uppercase tracking-tight text-[var(--text-primary)] leading-tight line-clamp-2">
                      {theme.name}
                    </h3>
                    <p className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                      {count} {count === 1 ? "RESOURCE" : "RESOURCES"}
                    </p>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="w-6 h-6 rounded-full bg-white/90 border border-black/8 flex items-center justify-center text-[var(--text-secondary)] shadow-2xs group-hover:bg-white group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 transition-all shrink-0">
                    <ArrowRight className="w-3 h-3" />
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
