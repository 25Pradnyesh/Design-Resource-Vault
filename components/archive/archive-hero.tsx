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
  "brutalist portfolio with WebGL",
  "3D interactive shader",
  "copy-paste motion components",
  "minimal dark landing pages",
  "open source SVG iconography",
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
    <section className="relative w-full border-b border-[var(--border)] bg-[var(--background)] pt-8 sm:pt-12 pb-10 sm:pb-14 px-4 sm:px-8 lg:px-12 font-sans overflow-hidden">
      {/* 01: Procedural WebGL Architectural Background */}
      <WebGLHero className="opacity-40" />

      {/* 02: Editorial Hero Container */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* LEFT COLUMN: Editorial Headline, Eyebrow, Positioning & Discovery (Cols 1-6 / 7) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center space-y-4 sm:space-y-5">
            
            {/* Archive Eyebrow Label */}
            <div className="inline-flex items-center gap-2 self-start px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-xs text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span>CURATED VISUAL INTELLIGENCE // VOL. 2026</span>
            </div>

            {/* Huge Editorial Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-[var(--text-primary)] leading-[0.95] uppercase">
                THE INTERNET&apos;S<br />
                <span className="text-[var(--accent)] font-extrabold">DESIGN</span><br />
                RESOURCE VAULT
              </h1>
            </div>

            {/* Editorial Positioning Description */}
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium max-w-lg leading-relaxed">
              A curated visual intelligence archive for designers and developers. Discover interface systems, motion tools, 3D assets, and engineering references.
            </p>

            {/* Primary Action Row & Live Metrics */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#resources-library"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--text-primary)] text-[var(--background)] font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
              >
                <span>EXPLORE VAULT</span>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--accent)]" />
              </a>

              <a
                href="#categories"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xs font-mono text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors shadow-2xs"
              >
                <span>CATEGORIES ({categories.length})</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              {/* Monospace Quick Stats Badge */}
              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--border)]/70 bg-[var(--surface-muted)]/50 font-mono text-[11px] text-[var(--text-muted)]">
                <Sparkles className="w-3 h-3 text-[var(--accent)]" />
                <span className="font-bold text-[var(--text-primary)]">{resources.length}</span>
                <span>OBJECTS ARCHIVED</span>
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
                  className="w-full pl-10 pr-20 py-2.5 text-xs sm:text-sm rounded-xl border border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] outline-none transition-colors shadow-2xs font-sans"
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
                    <Compass className="h-2.5 w-2.5 text-[var(--accent)]" />
                    <span>DISCOVER:</span>
                  </span>
                  {DISCOVERY_PROMPTS.slice(0, 3).map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => onQueryChange?.(prompt)}
                      className="px-2 py-0.5 rounded-md border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xs text-[10px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer shadow-2xs"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Live Search Intent Breakdown */}
              {query.trim() && hasIntentSignals && (
                <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-[var(--text-muted)] p-2 rounded-lg bg-[var(--surface)]/90 backdrop-blur-xs border border-[var(--border)]">
                  <span className="text-[var(--accent)] font-semibold flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5" />
                    <span>PARSED:</span>
                  </span>
                  {intent.styles.map((style) => (
                    <span key={style} className="px-1.5 py-0.2 rounded bg-[var(--surface-muted)] text-[var(--text-primary)]">
                      Style: {style}
                    </span>
                  ))}
                  {intent.technologies.map((tech) => (
                    <span key={tech} className="px-1.5 py-0.2 rounded bg-[var(--surface-muted)] text-[var(--text-primary)]">
                      Tech: {tech}
                    </span>
                  ))}
                  {intent.intentType && (
                    <span className="px-1.5 py-0.2 rounded bg-[var(--accent-soft)] text-[var(--accent)]">
                      {intent.intentType}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Original Creative Design Studio / Laboratory Illustration (Cols 7-12) */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-end">
            <HeroStudioIllustration />
          </div>

        </div>
      </div>
    </section>
  );
}
