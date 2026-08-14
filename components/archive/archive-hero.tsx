"use client";

import { Search, Sparkles } from "lucide-react";
import { useResources } from "@/lib/resource-context";
import { categories } from "@/data/categories";
import { useUI } from "@/lib/ui-context";

interface ArchiveHeroProps {
  query?: string;
  onQueryChange?: (val: string) => void;
}

export function ArchiveHero({ query = "", onQueryChange }: ArchiveHeroProps) {
  const { resources } = useResources();
  const { setCommandMenuOpen } = useUI();

  return (
    <section className="w-full border-b border-[var(--border)] bg-[var(--background)] pt-8 pb-8 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: Concise Brand & Intro */}
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)] shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span>SYSTEMATIC REFERENCE VAULT</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
              Design Resource Vault
            </h1>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Curated visual directory of interface components, motion tools, 3D assets, iconography, and web inspiration.
            </p>
          </div>

          {/* Right: Instant Search & Metrics */}
          <div className="w-full md:w-auto md:min-w-[340px] space-y-2.5">
            {/* In-page direct search input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
              <input
                type="text"
                value={query}
                onChange={(e) => onQueryChange?.(e.target.value)}
                placeholder="Search 66+ tools, categories, tags..."
                className="w-full pl-9 pr-14 py-2.5 text-xs sm:text-sm rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--border-strong)] outline-none transition-colors shadow-2xs font-sans"
              />
              <button
                onClick={() => setCommandMenuOpen(true)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--surface-muted)] text-[10px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                title="Open Command Palette"
              >
                ⌘K
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex items-center justify-between px-1 text-[11px] font-mono text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-[var(--accent)]" />
                <span>{resources.length} CURATED OBJECTS</span>
              </div>
              <div>{categories.length} CATEGORIES</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
