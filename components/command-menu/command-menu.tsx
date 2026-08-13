"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Star, Command } from "lucide-react";

import { useResources } from "@/lib/resource-context";
import { useUI } from "@/lib/ui-context";
import { CategoryIcon } from "@/components/ui/category-icon";

import { searchResources } from "@/lib/search";
import { categoryMap } from "@/data/categories";
import { cn, getDomainFromUrl } from "@/lib/utils";

function FaviconMini({ url, name }: { url: string; name: string }) {
  const [error, setError] = useState(false);
  const domain = getDomainFromUrl(url);
  const iconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  return (
    <div className="h-5 w-5 shrink-0 rounded border border-border/60 bg-muted/30 flex items-center justify-center font-mono text-[9px] uppercase font-bold text-muted-foreground">
      {!error ? (
        <img
          src={iconUrl}
          alt={name}
          className="h-full w-full object-contain rounded-xs"
          onError={() => setError(true)}
          loading="lazy"
        />
      ) : (
        <span>{name.charAt(0)}</span>
      )}
    </div>
  );
}

export function CommandMenu() {
  const router = useRouter();
  const { resources, isFavorite } = useResources();
  const { commandMenuOpen, setCommandMenuOpen } = useUI();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const results = searchResources(resources, query, 16);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandMenuOpen(true);
      }
      if (e.key === "Escape") {
        setCommandMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setCommandMenuOpen]);

  useEffect(() => {
    if (!commandMenuOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [commandMenuOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const navigate = useCallback(
    (slug: string) => {
      setCommandMenuOpen(false);
      router.push(`/resources/${slug}`);
    },
    [router, setCommandMenuOpen]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      navigate(results[selectedIndex].slug);
    }
  };

  return (
    <AnimatePresence>
      {commandMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
            onClick={() => setCommandMenuOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto w-full max-w-2xl rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl overflow-hidden font-sans"
            >
              {/* Search Header */}
              <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3.5 bg-[var(--background)]/80">
                <Search className="h-4 w-4 text-[var(--text-muted)] shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search archive entries, tags, categories..."
                  className="flex-1 bg-transparent text-sm font-sans text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
                />
                <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-[var(--border)] px-1.5 font-mono text-[10px] text-[var(--text-muted)]">
                  ESC
                </kbd>
              </div>

              {/* Results List */}
              <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
                {query && results.length === 0 && (
                  <div className="px-4 py-12 text-center font-mono text-xs text-[var(--text-muted)]">
                    NO ARCHIVE MATCHES FOUND FOR &quot;{query}&quot;
                  </div>
                )}

                {!query && (
                  <div className="px-4 py-10 text-center font-mono text-xs text-[var(--text-muted)] space-y-1">
                    <Command className="h-6 w-6 mx-auto mb-2 opacity-40 text-[var(--accent)]" />
                    <div>INDEX SEARCH · ENTER QUERY OR USE ARROWS</div>
                  </div>
                )}

                {results.map((resource, index) => {
                  const primaryCat = categoryMap[resource.categories[0]];
                  const isSelected = index === selectedIndex;

                  return (
                    <button
                      key={resource.id}
                      onClick={() => navigate(resource.slug)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-left transition-colors font-sans",
                        isSelected
                          ? "bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--accent)]/40 shadow-xs"
                          : "hover:bg-[var(--surface-muted)] border border-transparent"
                      )}
                    >
                      <FaviconMini url={resource.url} name={resource.name} />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold font-display text-[var(--text-primary)] truncate">
                            {resource.name}
                          </span>
                          {isFavorite(resource.id) && (
                            <Star className="h-3 w-3 fill-[var(--champagne)] text-[var(--champagne)] shrink-0" />
                          )}
                        </div>
                        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] font-mono text-[var(--text-muted)]">
                          {primaryCat && (
                            <span className="text-[var(--text-secondary)] bg-[var(--surface-muted)] px-1.5 py-0.5 rounded text-[10px] flex items-center gap-1">
                              <CategoryIcon id={primaryCat.id} className="h-3 w-3" />
                              <span>{primaryCat.name}</span>
                            </span>
                          )}
                          <span>·</span>
                          <span className="truncate">{getDomainFromUrl(resource.url)}</span>
                        </div>
                      </div>

                      <ArrowRight
                        className={cn(
                          "h-4 w-4 shrink-0 transition-transform",
                          isSelected ? "text-[var(--accent)] translate-x-0.5" : "text-[var(--text-muted)] opacity-40"
                        )}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Bottom Keyboard Nav Hints */}
              <div className="border-t border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2 flex items-center justify-between font-mono text-[10px] text-[var(--text-muted)]">
                <div className="flex items-center gap-3">
                  <span>NAVIGATE: ↑ ↓</span>
                  <span>SELECT: ↵</span>
                </div>
                <span>VAULT COMMAND INTERFACE</span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export function SearchTrigger() {
  const { setCommandMenuOpen } = useUI();

  return (
    <button
      onClick={() => setCommandMenuOpen(true)}
      className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      <Search className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">SEARCH...</span>
      <kbd className="hidden sm:inline-flex ml-2 h-4 items-center rounded border border-border px-1 text-[9px]">
        ⌘K
      </kbd>
    </button>
  );
}
