"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { SortOption } from "@/types";
import { categories, CATEGORY_GROUPS, CategoryGroup } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { cn } from "@/lib/utils";
import {
  SlidersHorizontal,
  ChevronDown,
  Check,
  X,
  RotateCcw,
  Sparkles,
  Star,
} from "lucide-react";
import { ActiveFilterChips } from "./active-filter-chips";

export { ActiveFilterChips };

export interface FiltersProps {
  selectedCategories: string[];
  selectedTags?: string[];
  selectedPurpose?: string;
  selectedPurposes?: string[];
  favoritesOnly: boolean;
  sort: SortOption;
  onCategoriesChange: (cats: string[]) => void;
  onTagsChange?: (tags: string[]) => void;
  onPurposeChange?: (purpose: string) => void;
  onPurposesChange?: (purposes: string[]) => void;
  onFavoritesChange: (val: boolean) => void;
  onSortChange: (sort: SortOption) => void;
  onClear: () => void;
  className?: string;
}

export function Filters({
  selectedCategories = [],
  favoritesOnly = false,
  sort = "recent",
  onCategoriesChange,
  onFavoritesChange,
  onSortChange,
  onClear,
  className,
}: FiltersProps) {
  const { resources, categoryCounts } = useResources();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const activeCategoryCount = selectedCategories.length;
  const hasActiveCategories = activeCategoryCount > 0;
  const activeFilterCount =
    activeCategoryCount +
    (favoritesOnly ? 1 : 0) +
    (sort !== "recent" && sort !== "relevance" ? 1 : 0);

  const hasFilters = activeFilterCount > 0;

  // Close dropdown on outside click or ESC key without resetting selections
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const toggleCategory = useCallback(
    (id: string) => {
      if (selectedCategories.includes(id)) {
        onCategoriesChange(selectedCategories.filter((c) => c !== id));
      } else {
        onCategoriesChange([...selectedCategories, id]);
      }
    },
    [selectedCategories, onCategoriesChange]
  );

  return (
    <div ref={containerRef} className={cn("relative w-full font-sans select-none", className)}>
      {/* Primary Filter Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 py-1 text-xs">
        
        {/* Left: Primary [ FILTERS ] Trigger & Quick Sort / State Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Main Filter Button: "FILTERS" or "FILTERS · 3" */}
          <button
            ref={triggerRef}
            type="button"
            id="filters-primary-trigger"
            onClick={() => setIsOpen((prev) => !prev)}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2 rounded-lg border font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-2xs font-medium focus-visible:outline-2 focus-visible:outline-[var(--accent)]",
              isOpen || hasActiveCategories
                ? "bg-[var(--surface-muted)] text-[var(--text-primary)] border-[var(--text-primary)] font-semibold"
                : "border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
            )}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            aria-controls="filters-popover-panel"
            aria-label={
              hasActiveCategories
                ? `Filters, ${activeCategoryCount} active`
                : "Filters"
            }
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-[var(--text-secondary)] shrink-0" />

            {/* Typographic Label: FILTERS or FILTERS · 3 */}
            <span>
              {hasActiveCategories
                ? `FILTERS · ${activeCategoryCount}`
                : "FILTERS"}
            </span>

            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-[var(--text-muted)] transition-transform duration-200 ease-out shrink-0",
                isOpen && "rotate-180"
              )}
            />
          </button>

          <div className="hidden sm:block h-4 w-px bg-[var(--border)] mx-1" />

          {/* Quick Sort: Recently Added */}
          <button
            type="button"
            onClick={() => onSortChange("recent")}
            className={cn(
              "hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg border font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer shadow-2xs",
              sort === "recent"
                ? "bg-[var(--surface-muted)] text-[var(--text-primary)] border-[var(--border-strong)] font-semibold"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
            )}
            title="Sort by Recently Added"
          >
            <Sparkles className="h-3 w-3 text-[var(--text-muted)]" />
            <span>RECENT</span>
          </button>

          {/* Quick Sort: Featured */}
          <button
            type="button"
            onClick={() => onSortChange(sort === "featured" ? "recent" : "featured")}
            className={cn(
              "hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg border font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer shadow-2xs",
              sort === "featured"
                ? "bg-[var(--surface-muted)] text-[var(--text-primary)] border-[var(--border-strong)] font-semibold"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
            )}
            title="Filter by Featured items"
          >
            <span>FEATURED</span>
          </button>

          {/* Quick Filter: Favorites */}
          <button
            type="button"
            onClick={() => onFavoritesChange(!favoritesOnly)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-lg border font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer shadow-2xs",
              favoritesOnly
                ? "bg-[var(--surface-muted)] text-[var(--text-primary)] border-[var(--border-strong)] font-semibold"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
            )}
            title="Toggle Starred Favorites"
          >
            <Star className={cn("h-3 w-3", favoritesOnly ? "fill-[var(--accent)] text-[var(--accent)]" : "text-[var(--text-muted)]")} />
            <span>FAVORITES</span>
          </button>
        </div>

        {/* Right: Active Filter Summary & Clear Control */}
        {hasFilters && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClear}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[11px] font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer shadow-2xs"
              title="Reset all active filters"
            >
              <RotateCcw className="h-3 w-3 text-[var(--text-muted)]" />
              <span>CLEAR ALL</span>
            </button>
          </div>
        )}
      </div>

      {/* Archival Category Filter Popover Panel */}
      {isOpen && (
        <>
          {/* Mobile Backdrop Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs sm:hidden transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Popover Panel Container */}
          <div
            id="filters-popover-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Categories filter"
            className="fixed sm:absolute inset-x-3 bottom-3 sm:inset-auto sm:left-0 sm:top-full sm:mt-2 z-50 w-auto sm:w-[380px] md:w-[420px] max-h-[80vh] sm:max-h-[540px] rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] shadow-xl overflow-hidden flex flex-col font-sans animate-popover-in"
            style={{
              boxShadow: "0 20px 40px -12px rgba(11, 19, 43, 0.14), 0 0 0 1px rgba(11, 19, 43, 0.05)",
            }}
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)] shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  FILTERS
                </span>
                {hasActiveCategories && (
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">
                    · {activeCategoryCount} selected
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-colors cursor-pointer"
                  title="Close filters"
                  aria-label="Close filters"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Scrollable Category Groups List */}
            <div className="overflow-y-auto p-3 space-y-4 flex-1 divide-y divide-[var(--border)]/50">
              {CATEGORY_GROUPS.map((group: CategoryGroup) => {
                const groupCategories = group.categoryIds
                  .map((id) => categories.find((c) => c.id === id))
                  .filter((c): c is (typeof categories)[0] => Boolean(c));

                return (
                  <div key={group.id} className="pt-3 first:pt-0 space-y-1.5">
                    {/* Category Group Section Label */}
                    <div className="px-2 py-0.5 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      <span>{group.name}</span>
                    </div>

                    {/* Category Interactive Rows */}
                    <div className="space-y-0.5">
                      {groupCategories.map((cat) => {
                        const isSelected = selectedCategories.includes(cat.id);
                        const count = categoryCounts[cat.id] ?? 0;

                        return (
                          <button
                            key={cat.id}
                            type="button"
                            role="checkbox"
                            aria-checked={isSelected}
                            onClick={() => toggleCategory(cat.id)}
                            onKeyDown={(e) => {
                              if (e.key === " " || e.key === "Enter") {
                                e.preventDefault();
                                toggleCategory(cat.id);
                              }
                            }}
                            className={cn(
                              "w-full flex items-center justify-between gap-3 px-2.5 py-2 rounded-lg text-left text-xs transition-colors cursor-pointer group select-none",
                              "focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-1",
                              isSelected
                                ? "bg-[var(--surface-muted)] text-[var(--text-primary)] font-medium"
                                : "text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                            )}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {/* Semantic Custom Checkbox Box */}
                              <div
                                className={cn(
                                  "w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors",
                                  isSelected
                                    ? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--background)] shadow-2xs"
                                    : "border-[var(--border-strong)] bg-[var(--surface)] group-hover:border-[var(--text-secondary)]"
                                )}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>

                              {/* Category Name */}
                              <span className="truncate text-[12.5px] leading-snug">
                                {cat.name}
                              </span>
                            </div>

                            {/* Live Category Resource Count (Secondary Metadata) */}
                            <span className="font-mono text-[11px] text-[var(--text-muted)] shrink-0 group-hover:text-[var(--text-secondary)]">
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Popover Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--border)] bg-[var(--surface)] shrink-0 text-xs">
              <div>
                {hasActiveCategories ? (
                  <button
                    type="button"
                    onClick={() => onCategoriesChange([])}
                    className="font-mono text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer underline-offset-2 hover:underline"
                  >
                    Clear all
                  </button>
                ) : (
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">
                    {resources.length} items in archive
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 rounded-lg border border-[var(--border)] font-mono text-[11px] font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)] transition-colors cursor-pointer shadow-2xs"
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function useFilterState() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("recent");
  const [query, setQuery] = useState("");

  const clearFilterFacets = useCallback(() => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedPurposes([]);
    setFavoritesOnly(false);
    setSort("recent");
  }, []);

  const clearQuery = useCallback(() => {
    setQuery("");
  }, []);

  const clearAll = useCallback(() => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedPurposes([]);
    setFavoritesOnly(false);
    setSort("recent");
    setQuery("");
  }, []);

  return {
    selectedCategories,
    setSelectedCategories,
    selectedTags,
    setSelectedTags,
    selectedPurpose: selectedPurposes[0] ?? "",
    selectedPurposes,
    setSelectedPurpose: (p: string) => setSelectedPurposes(p ? [p] : []),
    setSelectedPurposes,
    favoritesOnly,
    setFavoritesOnly,
    sort,
    setSort,
    query,
    setQuery,
    clearFilterFacets,
    clearQuery,
    clearAll,
    clearFilters: clearFilterFacets,
  };
}
