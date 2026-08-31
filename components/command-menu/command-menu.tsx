"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Search,
  ArrowRight,
  Star,
  ExternalLink,
  X,
  Sparkles,
  Compass,
} from "lucide-react";

import { useResources } from "@/lib/resource-context";
import { useUI } from "@/lib/ui-context";
import { CategoryIcon } from "@/components/ui/category-icon";
import { searchWithIntelligence } from "@/lib/search";
import { categoryMap } from "@/data/categories";
import { cn, getDomainFromUrl } from "@/lib/utils";

function FaviconMini({ url, name }: { url: string; name: string }) {
  const [error, setError] = useState(false);
  const domain = getDomainFromUrl(url);
  const iconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    <div className="h-6 w-6 shrink-0 rounded-md border border-[var(--border)] bg-[var(--surface-muted)] flex items-center justify-center font-mono text-[9px] uppercase font-bold text-[var(--text-muted)] overflow-hidden shadow-2xs">
      {!error ? (
        <Image
          src={iconUrl}
          alt=""
          width={16}
          height={16}
          className="h-4 w-4 object-contain rounded-xs"
          onError={() => setError(true)}
          unoptimized
        />
      ) : (
        <span>{name.charAt(0)}</span>
      )}
    </div>
  );
}

export function CommandMenu() {
  const router = useRouter();
  const { resources, isFavorite, viewCounts } = useResources();
  const { commandMenuOpen, setCommandMenuOpen } = useUI();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMac, setIsMac] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent));
    }
  }, []);

  const searchResult = useMemo(
    () => searchWithIntelligence(resources, query, viewCounts, 14),
    [resources, query, viewCounts]
  );

  const { scored, intent, adjacentConcepts } = searchResult;

  // Global Keyboard Shortcut (⌘K / Ctrl+K) & Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandMenuOpen(true);
      }
      if (e.key === "Escape" && commandMenuOpen) {
        e.preventDefault();
        setCommandMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [commandMenuOpen, setCommandMenuOpen]);

  // Reset state on open/close
  useEffect(() => {
    if (!commandMenuOpen) {
      setQuery("");
      setSelectedIndex(0);
    } else {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [commandMenuOpen]);

  // Reset selected index on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  const navigateToResource = useCallback(
    (slug: string) => {
      setCommandMenuOpen(false);
      router.push(`/resources/${slug}`);
    },
    [router, setCommandMenuOpen]
  );

  const openExternal = useCallback((url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, Math.max(0, scored.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && scored[selectedIndex]) {
      e.preventDefault();
      if (e.metaKey || e.ctrlKey) {
        openExternal(scored[selectedIndex].resource.url);
      } else {
        navigateToResource(scored[selectedIndex].resource.slug);
      }
    } else if (e.key === "Tab") {
      // Prevent focus from escaping the modal
      e.preventDefault();
      if (e.shiftKey) {
        setSelectedIndex((i) => (i <= 0 ? scored.length - 1 : i - 1));
      } else {
        setSelectedIndex((i) => (i >= scored.length - 1 ? 0 : i + 1));
      }
    }
  };

  const handleClearQuery = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const hasIntentSignals =
    intent.technologies.length > 0 ||
    intent.styles.length > 0 ||
    intent.categories.length > 0 ||
    Boolean(intent.intentType);

  return (
    <AnimatePresence>
      {commandMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command Menu Search"
          className="fixed inset-0 z-50 flex items-start justify-center pt-[8vh] sm:pt-[12vh] px-3 sm:px-4"
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
            className="fixed inset-0 bg-[#0B132B]/50 backdrop-blur-xs cursor-pointer"
            onClick={() => setCommandMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Spotlight Palette Window */}
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98, y: shouldReduceMotion ? 0 : -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98, y: shouldReduceMotion ? 0 : -8 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] spotlight-window overflow-hidden font-sans flex flex-col max-h-[82vh] shadow-2xl"
          >
            {/* Header: Search Input & Controls */}
            <div className="border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3.5 flex flex-col gap-2 shrink-0">
              <div className="flex items-center gap-3">
                <Search className="h-4 w-4 text-[var(--accent)] shrink-0" />
                <input
                  ref={inputRef}
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search resources, domains, categories, tags..."
                  aria-autocomplete="list"
                  aria-controls="command-results-list"
                  className="flex-1 bg-transparent text-xs sm:text-sm font-sans text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] tracking-tight font-medium"
                />
                {query && (
                  <button
                    type="button"
                    onClick={handleClearQuery}
                    className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-colors cursor-pointer"
                    title="Clear search query"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-[var(--border)] bg-[var(--surface-muted)] px-1.5 font-mono text-[10px] font-semibold text-[var(--text-muted)]">
                  ESC
                </kbd>
              </div>

              {/* Intent Understanding Tag Matrix */}
              {query.trim() && hasIntentSignals && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1.5 font-mono text-[10px] text-[var(--text-muted)] border-t border-[var(--border)]/60">
                  <span className="flex items-center gap-1 text-[var(--accent)] font-bold">
                    <Sparkles className="h-2.5 w-2.5" />
                    <span>INTENT:</span>
                  </span>
                  {intent.intentType && (
                    <span className="px-1.5 py-0.5 rounded bg-[var(--accent-soft)] text-[var(--accent)] font-semibold">
                      {intent.intentType.toUpperCase()}
                    </span>
                  )}
                  {intent.styles.map((style) => (
                    <span
                      key={style}
                      className="px-1.5 py-0.5 rounded bg-[var(--surface-muted)] text-[var(--text-primary)] border border-[var(--border)]"
                    >
                      Style: {style}
                    </span>
                  ))}
                  {intent.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.5 rounded bg-[var(--surface-muted)] text-[var(--text-primary)] border border-[var(--border)]"
                    >
                      Tech: {tech}
                    </span>
                  ))}
                  {intent.categories.map((catId) => {
                    const cat = categoryMap[catId];
                    return (
                      <span
                        key={catId}
                        className="px-1.5 py-0.5 rounded bg-[var(--surface-muted)] text-[var(--text-primary)] border border-[var(--border)]"
                      >
                        Cat: {cat?.name ?? catId}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Results Section */}
            <div
              id="command-results-list"
              role="listbox"
              aria-label="Search results"
              className="flex-1 overflow-y-auto p-2 space-y-1"
            >
              {/* Section Header */}
              <div className="px-2.5 py-1.5 flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                <span>{query.trim() ? "MATCHED RESOURCES" : "FEATURED DISCOVERY"}</span>
                <span>{scored.length} {scored.length === 1 ? "RESULT" : "RESULTS"}</span>
              </div>

              {/* Empty State */}
              {query && scored.length === 0 && (
                <div className="px-4 py-12 text-center space-y-3 font-sans">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-muted)] text-[var(--text-muted)] mx-auto">
                    <Search className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                      No resources found for &quot;{query}&quot;
                    </p>
                    <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto leading-relaxed">
                      Try searching by name, domain (e.g. framer.com), category, or visual style.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearQuery}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-muted)] text-xs font-medium text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-colors cursor-pointer font-mono"
                  >
                    Clear search
                  </button>
                </div>
              )}

              {/* Scored Results List */}
              {scored.map((item, index) => {
                const { resource, matchPercentage, matchExplanation } = item;
                const primaryCat = categoryMap[resource.categories[0]];
                const isSelected = index === selectedIndex;
                const favorited = isFavorite(resource.id);
                const domain = getDomainFromUrl(resource.url);

                return (
                  <div
                    key={resource.id}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => navigateToResource(resource.slug)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "group flex items-start gap-3 rounded-xl p-2.5 text-left transition-all duration-150 font-sans cursor-pointer border select-none",
                      isSelected
                        ? "bg-[var(--surface-muted)] border-[var(--border-strong)] text-[var(--text-primary)] shadow-2xs"
                        : "border-transparent hover:bg-[var(--surface-hover)]"
                    )}
                  >
                    <div className="pt-0.5">
                      <FaviconMini url={resource.url} name={resource.name} />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className={cn(
                              "text-xs sm:text-[13px] font-bold tracking-tight transition-colors truncate",
                              isSelected ? "text-[var(--text-primary)]" : "text-[var(--text-primary)] group-hover:text-[var(--accent)]"
                            )}
                          >
                            {resource.name}
                          </span>
                          {favorited && (
                            <Star className="h-3 w-3 fill-[var(--accent)] text-[var(--accent)] shrink-0" />
                          )}
                          <span className="text-[10px] font-mono text-[var(--text-muted)] truncate">
                            {domain}
                          </span>
                        </div>

                        {/* Match Score Badge */}
                        {query.trim() && (
                          <span
                            className={cn(
                              "shrink-0 px-2 py-0.5 rounded font-mono text-[10px] font-bold border",
                              matchPercentage >= 85
                                ? "bg-[var(--intel-high-bg)] text-[var(--intel-high)] border-[var(--intel-high-border)]"
                                : "bg-[var(--intel-med-bg)] text-[var(--intel-med)] border-[var(--intel-med-border)]"
                            )}
                          >
                            {matchPercentage}% MATCH
                          </span>
                        )}
                      </div>

                      {/* Explainable Match Rationale */}
                      {query.trim() && matchExplanation && (
                        <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1 italic">
                          &ldquo;{matchExplanation}&rdquo;
                        </p>
                      )}

                      {!query.trim() && (
                        <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1">
                          {resource.description}
                        </p>
                      )}

                      {/* Metadata Tag Row */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-[var(--text-muted)]">
                        {primaryCat && (
                          <span className="bg-[var(--surface)] border border-[var(--border)] px-1.5 py-0.2 rounded flex items-center gap-1 text-[var(--text-secondary)]">
                            <CategoryIcon id={primaryCat.id} className="h-2.5 w-2.5 text-[var(--accent)]" />
                            <span>{primaryCat.name}</span>
                          </span>
                        )}
                        {resource.technologies?.slice(0, 2).map((tech) => (
                          <span key={tech} className="bg-[var(--surface)] border border-[var(--border)] px-1.5 py-0.2 rounded text-[var(--text-muted)]">
                            {tech}
                          </span>
                        ))}
                        {resource.styles?.slice(0, 1).map((st) => (
                          <span key={st} className="bg-[var(--surface)] border border-[var(--border)] px-1.5 py-0.2 rounded text-[var(--text-muted)]">
                            {st}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 pt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openExternal(resource.url);
                        }}
                        className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                        title="Open external website"
                        aria-label={`Open ${resource.name} external site`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                      <ArrowRight
                        className={cn(
                          "h-3.5 w-3.5 transition-transform",
                          isSelected ? "text-[var(--accent)] translate-x-0.5" : "text-[var(--text-muted)] opacity-30"
                        )}
                      />
                    </div>
                  </div>
                );
              })}

              {/* Adjacent Discovery Paths */}
              {adjacentConcepts.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[var(--border)] px-2 pb-2">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    <Compass className="h-3 w-3 text-[var(--accent)]" />
                    <span>ADJACENT DISCOVERY PATHS</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {adjacentConcepts.map((concept) => (
                      <button
                        key={concept}
                        type="button"
                        onClick={() => {
                          setQuery(concept);
                          inputRef.current?.focus();
                        }}
                        className="px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs font-sans"
                      >
                        <span>{concept}</span>
                        <ArrowRight className="h-2.5 w-2.5 opacity-50" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Keyboard Navigation Bar */}
            <div className="border-t border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2 flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)] shrink-0">
              <div className="flex items-center gap-3">
                <span>NAVIGATE: ↑ ↓</span>
                <span>SELECT: ↵</span>
                <span>OPEN SITE: {isMac ? "⌘↵" : "Ctrl+↵"}</span>
              </div>
              <span className="hidden sm:inline">DESIGN RESOURCE VAULT</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function SearchTrigger() {
  const { setCommandMenuOpen } = useUI();
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent));
    }
  }, []);

  return (
    <button
      onClick={() => setCommandMenuOpen(true)}
      className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 font-mono text-xs text-[var(--text-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] cursor-pointer shadow-2xs"
    >
      <Search className="h-3.5 w-3.5 text-[var(--accent)]" />
      <span className="hidden sm:inline">Search resources...</span>
      <kbd className="hidden sm:inline-flex ml-2 h-4 items-center rounded border border-[var(--border)] bg-[var(--surface-muted)] px-1 text-[9px] font-semibold">
        {isMac ? "⌘K" : "Ctrl+K"}
      </kbd>
    </button>
  );
}
