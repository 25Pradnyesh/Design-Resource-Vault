"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { Category3DIcon, CATEGORY_THEMES } from "@/components/ui/category-3d-icon";

export function CategoryTileGrid() {
  const { categoryCounts } = useResources();

  return (
    <section id="categories" className="w-full bg-[var(--background)] py-12 sm:py-16 px-4 sm:px-8 lg:px-12 font-sans select-none">
      <div className="mx-auto max-w-7xl">
        {/* Section Header matching Reference */}
        <div className="flex items-center justify-between gap-4 pb-4 mb-8 sm:mb-10 border-b border-[var(--border)]">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] inline-block shadow-xs" />
            <h2 className="font-sans text-xs sm:text-sm font-black uppercase tracking-wider text-[var(--text-primary)]">
              BROWSE CATEGORIES
            </h2>
            <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--surface-muted)] px-2.5 py-0.5 rounded-md font-bold border border-[var(--border)]">
              {categories.length}
            </span>
          </div>
          <div className="text-[11px] font-mono text-[var(--text-muted)] tracking-wider uppercase hidden sm:block font-bold">
            CURATED DIRECTORY
          </div>
        </div>

        {/* 6-Column Category Grid matching Reference Benchmark */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-4.5">
          {categories.map((cat, idx) => {
            const theme = CATEGORY_THEMES[cat.id] || {
              id: cat.id,
              num: (idx + 1).toString().padStart(2, "0"),
              name: cat.name.toUpperCase(),
              bg: "#FAF8F5",
              hoverBg: "#F5EFE6",
              border: "#E2E8F0",
              accent: "#00C4CC",
            };
            const count = categoryCounts[cat.id] ?? 0;

            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group category-card-item relative flex flex-col justify-between rounded-2xl p-3.5 sm:p-4 overflow-hidden border bg-[var(--card-bg)] hover:bg-[var(--card-hover-bg)] border-[var(--card-border)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 hover:-translate-y-1 hover:shadow-md hover:border-[var(--border-strong)] motion-reduce:hover:translate-y-0 motion-reduce:transform-none select-none"
                style={{
                  "--card-bg": theme.bg,
                  "--card-hover-bg": theme.hoverBg,
                  "--card-border": theme.border,
                  "--card-accent": theme.accent,
                } as React.CSSProperties}
              >
                {/* 01: Top Index Number & Metadata Label */}
                <div className="flex items-center justify-between font-mono text-[10px] font-bold text-[var(--text-muted)]">
                  <span className="tracking-wider text-[var(--text-secondary)] font-black group-hover:text-[var(--text-primary)] transition-colors duration-250">
                    {theme.num}
                  </span>
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-[var(--text-muted)] opacity-70 group-hover:opacity-100 transition-opacity duration-250">
                    CAT
                  </span>
                </div>

                {/* 02: Centered 3D Category Artwork with Layered Upward Shift & Controlled 1.04 Scale */}
                <div className="my-3 sm:my-3.5 flex items-center justify-center p-1 w-full h-18 sm:h-20 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-104 pointer-events-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100">
                  <Category3DIcon id={cat.id} className="w-full h-full object-contain filter drop-shadow-2xs group-hover:drop-shadow-xs transition-[filter] duration-300" />
                </div>

                {/* 03: Bottom Metadata (Category Title, Count, and Directional Arrow) */}
                <div className="flex items-end justify-between pt-2 gap-2 border-t border-black/6">
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <h3 className="text-[10.5px] sm:text-[11.5px] lg:text-[12px] font-black uppercase tracking-tight text-[var(--text-primary)] leading-tight line-clamp-2 transition-colors duration-250 group-hover:text-[var(--accent)]">
                      {theme.name}
                    </h3>
                    <p className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider font-bold">
                      {count} {count === 1 ? "RESOURCE" : "RESOURCES"}
                    </p>
                  </div>

                  {/* Circular Arrow Button with 4px Horizontal Shift on Hover */}
                  <div className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-white/95 border border-black/8 flex items-center justify-center text-[var(--text-secondary)] shadow-2xs group-hover:bg-white group-hover:text-[var(--text-primary)] group-hover:border-black/15 group-hover:translate-x-1 group-hover:shadow-xs transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 motion-reduce:group-hover:translate-x-0">
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
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
