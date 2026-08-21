"use client";

import { useMemo } from "react";
import { Search, Sparkles, Compass, X } from "lucide-react";
import { useResources } from "@/lib/resource-context";
import { categories } from "@/data/categories";
import { useUI } from "@/lib/ui-context";
import { parseSearchIntent } from "@/lib/search-intent";

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
    <section className="w-full border-b border-[var(--border)] bg-[var(--background)] pt-8 pb-7 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Brand Identity & Positioning */}
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--text-muted)] shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span>DESIGN INTELLIGENCE ENGINE // V4</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Design Resource Vault
            </h1>

            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Discover interfaces, motion tools, 3D assets, and engineering references through structured design intelligence.
            </p>
          </div>

          {/* Right: Natural Discovery Bar & Prompt Suggestions */}
          <div className="w-full lg:w-[480px] space-y-2.5">
            {/* In-page direct search input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--accent)]" />
              <input
                type="text"
                value={query}
                onChange={(e) => onQueryChange?.(e.target.value)}
                placeholder="Ask for what you need (e.g. brutalist portfolio with WebGL)..."
                className="w-full pl-10 pr-20 py-2.5 text-xs sm:text-sm rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--border-strong)] outline-none transition-colors shadow-2xs font-sans tracking-tight"
              />

              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {query && (
                  <button
                    onClick={() => onQueryChange?.("")}
                    className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                    title="Clear search"
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

            {/* Natural Query Prompt Suggestions (when input is empty) */}
            {!query && (
              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase flex items-center gap-1">
                  <Compass className="h-2.5 w-2.5 text-[var(--accent)]" />
                  <span>TRY:</span>
                </span>
                {DISCOVERY_PROMPTS.slice(0, 3).map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => onQueryChange?.(prompt)}
                    className="px-2 py-0.5 rounded-md border border-[var(--border)] bg-[var(--surface)] text-[10px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer shadow-2xs"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Live Intent Breakdown Pills (when query active) */}
            {query.trim() && hasIntentSignals && (
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-[var(--text-muted)]">
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

            {/* Status Metrics Strip */}
            <div className="flex items-center justify-between px-1 text-[11px] font-mono text-[var(--text-muted)]">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-[var(--accent)]" />
                <span>{resources.length} CURATED OBJECTS</span>
              </div>
              <div>{categories.length} DISCIPLINES</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
