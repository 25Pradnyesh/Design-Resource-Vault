"use client";

import { useMemo } from "react";
import { Search, Sparkles, Compass, X, ArrowRight, ArrowUpRight } from "lucide-react";
import { useResources } from "@/lib/resource-context";
import { categories } from "@/data/categories";
import { useUI } from "@/lib/ui-context";
import { parseSearchIntent } from "@/lib/search-intent";
import { HeroStudioIllustration } from "./hero-studio-illustration";
import { WebGLHero } from "@/components/webgl/webgl-hero";

interface ArchiveHeroProps {
  query?: string;
  onQueryChange?: (val: string) => void;
}

const DISCOVERY_PROMPTS = [
  "interactive 3D WebGL",
  "minimal dark interfaces",
  "motion animation physics",
  "open-source SVG iconography",
  "modular component tokens",
  "AI vibe coding tools",
];

export function ArchiveHero({ query = "", onQueryChange }: ArchiveHeroProps) {
  const { resources } = useResources();
  const { setCommandMenuOpen } = useUI();

  const intent = useMemo(() => parseSearchIntent(query), [query]);

  const hasIntentSignals =
    intent.technologies.length > 0 ||
    intent.styles.length > 0 ||
    intent.categories.length > 0 ||
    Boolean(intent.intentType);

  return (
    <section className="relative w-full border-b border-[var(--border)] bg-[var(--background)] min-h-[72vh] lg:min-h-[78vh] flex flex-col justify-center pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-8 lg:px-12 font-sans overflow-hidden">
      {/* 01: Procedural WebGL / Architectural Blueprint Background */}
      <WebGLHero className="opacity-45" />

      {/* Subtle Background Editorial Coordinates */}
      <div className="absolute top-4 left-6 hidden lg:flex items-center gap-2 font-mono text-[9px] text-[var(--text-muted)] opacity-60 pointer-events-none select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        <span>ARCHIVE_SYS // COORD [X:042, Y:108]</span>
      </div>
      <div className="absolute top-4 right-6 hidden lg:flex items-center gap-2 font-mono text-[9px] text-[var(--text-muted)] opacity-60 pointer-events-none select-none">
        <span>GRID: 8PT SYSTEM // V5.2</span>
      </div>

      {/* 02: Editorial Hero Container */}
      <div className="relative z-10 mx-auto max-w-7xl w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-center">
          
          {/* LEFT COLUMN: Dominant Headline, Eyebrow, Positioning & Discovery (Cols 1-6 / 7) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center space-y-5 sm:space-y-6">
            
            {/* Archive Eyebrow Label */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-md border border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-xs text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span>❖ CURATED SYSTEMIC ARCHIVE // VOL. 2026</span>
            </div>

            {/* Dominant Headline: DESIGN RESOURCE VAULT */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tight text-[var(--text-primary)] leading-[0.92] uppercase font-sans">
                DESIGN<br />
                RESOURCE<br />
                <span className="text-[var(--accent)] font-black">VAULT</span>
              </h1>
            </div>

            {/* Editorial Positioning Description */}
            <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] font-medium max-w-xl leading-relaxed">
              A curated visual intelligence archive for designers and developers. Discover interface systems, motion tools, 3D assets, and engineering references.
            </p>

            {/* Primary Action Row & Live Metrics */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#resources-library"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--background)] font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-sm cursor-pointer"
              >
                <span>EXPLORE VAULT</span>
                <ArrowRight className="w-4 h-4 text-[var(--accent)]" />
              </a>

              <a
                href="#categories"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xs font-mono text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] transition-all shadow-2xs"
              >
                <span>CATEGORIES ({categories.length})</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              {/* Monospace Quick Stats Badge */}
              <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[var(--border)]/70 bg-[var(--surface-muted)]/60 font-mono text-[11px] text-[var(--text-muted)]">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span className="font-bold text-[var(--text-primary)]">{resources.length}</span>
                <span>OBJECTS INDEXED</span>
              </div>
            </div>

            {/* Global Quick Search Box in Hero */}
            <div className="pt-2 max-w-lg space-y-2.5">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--accent)]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => onQueryChange?.(e.target.value)}
                  placeholder="Search resources, tech stack, or aesthetic style..."
                  className="w-full pl-10 pr-20 py-2.5 text-xs sm:text-sm rounded-xl border border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none transition-all shadow-2xs font-sans"
                />

                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {query && (
                    <button
                      onClick={() => onQueryChange?.("")}
                      className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                      title="Clear search query"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => setCommandMenuOpen(true)}
                    className="px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--surface-muted)] text-[10px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                    title="Open Spotlight Search"
                  >
                    ⌘K
                  </button>
                </div>
              </div>

              {/* Prompt Suggestion Chips */}
              {!query && (
                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase flex items-center gap-1">
                    <Compass className="h-3 w-3 text-[var(--accent)]" />
                    <span>DISCOVER:</span>
                  </span>
                  {DISCOVERY_PROMPTS.slice(0, 3).map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => onQueryChange?.(prompt)}
                      className="px-2.5 py-0.5 rounded-md border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xs text-[10px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer shadow-2xs"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Live Search Intent Breakdown */}
              {query.trim() && hasIntentSignals && (
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-[var(--text-muted)] p-2.5 rounded-lg bg-[var(--surface)]/95 backdrop-blur-xs border border-[var(--border)] shadow-2xs">
                  <span className="text-[var(--accent)] font-semibold flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    <span>PARSED INTENT:</span>
                  </span>
                  {intent.styles.map((style) => (
                    <span key={style} className="px-1.5 py-0.2 rounded bg-[var(--surface-muted)] text-[var(--text-primary)] font-medium">
                      Style: {style}
                    </span>
                  ))}
                  {intent.technologies.map((tech) => (
                    <span key={tech} className="px-1.5 py-0.2 rounded bg-[var(--surface-muted)] text-[var(--text-primary)] font-medium">
                      Tech: {tech}
                    </span>
                  ))}
                  {intent.intentType && (
                    <span className="px-1.5 py-0.2 rounded bg-[var(--accent-soft)] text-[var(--accent)] font-bold">
                      {intent.intentType}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Rich Creative Design Studio & Digital Laboratory Composition (Cols 7-12) */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-end">
            <HeroStudioIllustration />
          </div>

        </div>
      </div>
    </section>
  );
}
