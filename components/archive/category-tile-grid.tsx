"use client";

import Link from "next/link";
import { categories } from "@/data/categories";
import { CategoryIcon } from "@/components/ui/category-icon";

export function CategoryTileGrid() {
  return (
    <section id="categories" className="w-full border-b border-[var(--border)] bg-[var(--background)] py-14 px-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 mb-8 border-b border-[var(--border)]">
          <div>
            <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest mb-1">
              01 // INDEXED COLLECTION
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
              THE ARCHIVE
            </h2>
          </div>
          <div className="text-xs font-mono text-[var(--text-muted)] tracking-wider uppercase">
            SELECT A COLLECTION TO ENTER
          </div>
        </div>

        {/* Small Square Category Tile Grid: 2 cols mobile, 3-4 tablet, 4-6 desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
          {categories.map((cat, idx) => {
            const num = (idx + 1).toString().padStart(2, "0");

            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group archive-tile relative flex flex-col justify-between aspect-square rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5 sm:p-4 overflow-hidden hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)] hover:shadow-xs select-none outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                {/* Top: Index Number */}
                <div className="flex items-center justify-between font-mono text-[11px] text-[var(--text-muted)]">
                  <span className="font-bold text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                    {num}
                  </span>
                </div>

                {/* Center: Dominant Category Symbol Anchor */}
                <div className="my-auto flex-1 flex items-center justify-center p-2 w-full h-full overflow-hidden">
                  <CategoryIcon id={cat.id} className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20" />
                </div>

                {/* Bottom: Category Title */}
                <div className="pt-1">
                  <h3 className="font-display text-[11px] sm:text-xs font-bold tracking-tight text-[var(--text-primary)] uppercase leading-snug group-hover:text-[var(--text-primary)] transition-colors line-clamp-2">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

