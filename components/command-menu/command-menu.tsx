"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { useResources } from "@/lib/resource-context";
import { useUI } from "@/lib/ui-context";
import { searchWithIntelligence } from "@/lib/search";
import { categoryMap } from "@/data/categories";
import { cn, getDomainFromUrl } from "@/lib/utils";

export function SearchTrigger({ className }: { className?: string }) {
  const { setCommandMenuOpen } = useUI();
  return (
    <button
      type="button"
      onClick={() => setCommandMenuOpen(true)}
      className={cn(
        "px-3 py-1.5 border border-[#d8d8d8] text-[14px] font-light text-[#000000] hover:border-[#000000] transition-colors cursor-pointer",
        className
      )}
    >
      Search ⌘K
    </button>
  );
}

export function CommandMenu() {
  const router = useRouter();
  const { resources, viewCounts } = useResources();
  const { commandMenuOpen, setCommandMenuOpen } = useUI();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const searchResult = useMemo(
    () => searchWithIntelligence(resources, query, viewCounts, 10),
    [resources, query, viewCounts]
  );

  const { scored, adjacentConcepts } = searchResult;

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

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const navigateToResource = useCallback(
    (slug: string) => {
      setCommandMenuOpen(false);
      router.push(`/resources/${slug}`);
    },
    [router, setCommandMenuOpen]
  );

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < scored.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : scored.length - 1));
    } else if (e.key === "Enter" && scored[selectedIndex]) {
      e.preventDefault();
      navigateToResource(scored[selectedIndex].resource.slug);
    }
  };

  if (!commandMenuOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Menu Search"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 font-sans select-none"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 cursor-pointer"
        onClick={() => setCommandMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Modal Window */}
      <div
        className="relative z-10 w-full max-w-2xl bg-[#ffffff] border border-[#000000] overflow-hidden spotlight-window"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-[#000000]">
          <Search className="h-5 w-5 text-[#000000] mr-4 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search specimen archive..."
            className="w-full text-[21px] font-extralight text-[#000000] placeholder:text-[#888888] outline-none bg-transparent rounded-none"
          />
          <button
            type="button"
            onClick={() => setCommandMenuOpen(false)}
            className="p-1 text-[#000000] hover:opacity-50 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Adjacent Concepts Strip */}
        {adjacentConcepts.length > 0 && (
          <div className="px-6 py-2 bg-[#f0f0f0] border-b border-[#d8d8d8] flex items-center gap-2 text-[13px] font-light text-[#666666]">
            <span>PATHS:</span>
            {adjacentConcepts.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setQuery(c)}
                className="underline underline-offset-2 text-[#000000] hover:opacity-60 cursor-pointer"
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-[#d8d8d8]">
          {scored.length > 0 ? (
            scored.map((item, index) => {
              const res = item.resource;
              const isSelected = index === selectedIndex;
              const catName = categoryMap[res.categories[0]]?.name || res.categories[0] || "Archive";
              const domain = getDomainFromUrl(res.url);

              return (
                <div
                  key={res.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  onClick={() => navigateToResource(res.slug)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    "px-6 py-4 flex items-center justify-between cursor-pointer transition-colors",
                    isSelected ? "bg-[#f0f0f0]" : "bg-[#ffffff] hover:bg-[#fafafa]"
                  )}
                >
                  <div className="space-y-0.5 min-w-0 pr-4">
                    <div className="text-[12px] font-light text-[#888888] uppercase tracking-wider">
                      {catName} · {domain}
                    </div>
                    <div className="text-[18px] font-extralight text-[#000000] truncate">
                      {res.name}
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 text-[#000000] shrink-0 opacity-60" />
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-[15px] font-light text-[#666666]">
              No specimens matched &ldquo;{query}&rdquo;
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#d8d8d8] bg-[#f0f0f0] flex items-center justify-between text-[12px] font-light text-[#888888]">
          <span>SELECT WITH ↑↓ · OPEN WITH ↵</span>
          <span>ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
}
