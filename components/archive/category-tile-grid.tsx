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
        <div className="flex items-center justify-between gap-4 pb-4 mb-8 sm:mb-10 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#00C4CC] inline-block shadow-xs" />
            <h2 className="font-sans text-xs sm:text-sm font-black uppercase tracking-wider text-[#0B132B]">
              BROWSE CATEGORIES
            </h2>
            <span className="text-[11px] font-mono text-[#64748B] bg-[#F1F5F9] px-2.5 py-0.5 rounded-md font-bold border border-[#E2E8F0]">
              {categories.length}
            </span>
          </div>
          <div className="text-[11px] font-mono text-[#64748B] tracking-wider uppercase hidden sm:block font-bold">
            CURATED DIRECTORY
          </div>
        </div>

        {/* 6-Column Category Grid matching Reference Benchmark */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
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
                className="group category-card-item relative flex flex-col justify-between rounded-2xl p-3.5 sm:p-4 overflow-hidden border transition-all duration-250 ease-out cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#00C4CC] hover:-translate-y-1.5 hover:shadow-lg"
                style={{
                  backgroundColor: theme.bg,
                  borderColor: theme.border,
                }}
              >
                {/* 01: Top Index Number */}
                <div className="flex items-center justify-between font-mono text-[10.5px] font-black text-[#64748B]">
                  <span className="tracking-wider text-[#334155] group-hover:text-[#0B132B] transition-colors">
                    {theme.num}
                  </span>
                </div>

                {/* 02: Large Dominant 3D Category Illustration with Upward Shift & Scale on Hover */}
                <div className="my-2.5 sm:my-3.5 flex items-center justify-center p-1 w-full h-18 sm:h-20 transition-transform duration-250 ease-out group-hover:scale-106 group-hover:-translate-y-1">
                  <Category3DIcon id={cat.id} className="w-full h-full object-contain" />
                </div>

                {/* 03: Bottom Metadata (Category Title, Count, and Arrow) */}
                <div className="flex items-end justify-between pt-1.5 gap-1.5 border-t border-black/5">
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <h3 className="text-[11px] sm:text-[12px] font-black uppercase tracking-tight text-[#0B132B] leading-tight line-clamp-2">
                      {theme.name}
                    </h3>
                    <p className="font-mono text-[9px] text-[#64748B] uppercase tracking-wider font-bold">
                      {count} {count === 1 ? "RESOURCE" : "RESOURCES"}
                    </p>
                  </div>

                  {/* Circular Arrow Button with Subtle Shift on Hover */}
                  <div className="w-6 h-6 rounded-full bg-white/95 border border-black/8 flex items-center justify-center text-[#334155] shadow-2xs group-hover:bg-white group-hover:text-[#0B132B] group-hover:translate-x-0.5 group-hover:shadow-xs transition-all duration-200 shrink-0">
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
