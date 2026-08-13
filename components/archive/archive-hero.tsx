"use client";

import { Search, ArrowDown } from "lucide-react";
import { useResources } from "@/lib/resource-context";
import { categories } from "@/data/categories";
import { useUI } from "@/lib/ui-context";

export function ArchiveHero() {
  const { resources } = useResources();
  const { setCommandMenuOpen } = useUI();

  const scrollToArchive = () => {
    const el = document.getElementById("categories");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full border-b border-[var(--border)] bg-[var(--background)] pt-12 pb-14 px-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Editorial Title & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-2">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[var(--border)] bg-[var(--surface)] text-[10px] font-mono tracking-widest text-[var(--text-muted)] uppercase">
              <span>DIGITAL ARCHIVE</span>
              <span>•</span>
              <span className="text-[var(--text-primary)] font-bold">PALETTE 2 // V2</span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[0.9] text-[var(--text-primary)] select-none">
              DESIGN
              <br />
              <span className="text-[var(--text-muted)] opacity-70">RESOURCE</span>
              <br />
              VAULT
            </h1>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end space-y-6">
            <div className="border-l-2 border-[var(--deep-muted-green)] pl-4 py-1">
              <p className="font-sans text-base sm:text-lg text-[var(--text-secondary)] font-normal leading-relaxed">
                A curated living archive of interface components, motion tools, 3D assets, iconography, and web inspiration.
              </p>
            </div>

            {/* Dynamic Counts & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border)] font-sans text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-3 font-mono text-[11px] font-semibold text-[var(--text-primary)] uppercase">
                <span>{resources.length} RESOURCES</span>
                <span>·</span>
                <span>{categories.length} COLLECTIONS</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={scrollToArchive}
                  className="group flex items-center gap-2 bg-[var(--text-primary)] text-[var(--background)] px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider rounded transition-opacity hover:opacity-90 cursor-pointer"
                >
                  <span>EXPLORE GRID</span>
                  <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                </button>

                <button
                  onClick={() => setCommandMenuOpen(true)}
                  className="flex items-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
                >
                  <Search className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                  <kbd className="h-4 items-center rounded border border-[var(--border)] px-1 text-[9px] font-mono text-[var(--text-muted)]">
                    ⌘K
                  </kbd>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

