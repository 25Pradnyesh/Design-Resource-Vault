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
  Layers,
  ArrowUpDown,
  Star,
} from "lucide-react";
import { CategoryIcon } from "@/components/ui/category-icon";
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

  const activeCategoryCount = selectedCategories.length;
  const activeFilterCount =
    activeCategoryCount +
    (favoritesOnly ? 1 : 0) +
    (sort !== "recent" ? 1 : 0);

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

  const selectGroupCategories = useCallback(
    (categoryIds: string[]) => {
      const allSelected = categoryIds.every((id) => selectedCategories.includes(id));
      if (allSelected) {
        // Deselect group
        onCategoriesChange(selectedCategories.filter((id) => !categoryIds.includes(id)));
      } else {
        // Select all in group
        const newSelected = Array.from(new Set([...selectedCategories, ...categoryIds]));
        onCategoriesChange(newSelected);
      }
    },
    [selectedCategories, onCategoriesChange]
  );

  return (
    <div ref={containerRef} className={cn("relative w-full font-sans select-none", className)}>
      {/* Primary Filter Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 py-1 text-xs">
        
        {/* Left: Primary [ FILTERS ] Trigger & Quick Sort Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* 01: ONE Primary [ FILTERS ] Button */}
          <button
            type="button"
            id="filters-primary-trigger"
            onClick={() => setIsOpen((prev) => !prev)}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2 rounded-xl border font-mono text-xs uppercase tracking-wider transition-all duration-160 cursor-pointer shadow-2xs font-semibold focus-visible:outline-2 focus-visible:outline-[var(--accent)]",
              isOpen || activeCategoryCount > 0
                ? "bg-[var(--text-primary)] text-[var(--background)] border-[var(--text-primary)] shadow-sm"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
            )}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            aria-label={`Open category filters. ${activeCategoryCount} active filters`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-[var(--accent)] shrink-0" />
            <span>FILTERS</span>

            {/* Active Category Count Badge */}
            {activeCategoryCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-[var(--accent)] text-white text-[10px] font-mono font-bold leading-none">
                {activeCategoryCount}
              </span>
            )}

            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200 ease-out shrink-0",
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
              "hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer shadow-2xs",
              sort === "recent"
                ? "bg-[var(--surface-muted)] text-[var(--text-primary)] border-[var(--border-strong)] font-bold"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
            title="Sort by Recently Added"
          >
            <Sparkles className="h-3 w-3 text-[var(--accent)]" />
            <span>RECENT</span>
          </button>

          {/* Quick Sort: Featured */}
          <button
            type="button"
            onClick={() => onSortChange(sort === "featured" ? "recent" : "featured")}
            className={cn(
              "hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer shadow-2xs",
              sort === "featured"
                ? "bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)] font-bold"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
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
              "flex items-center gap-1.5 px-3 py-2 rounded-xl border font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer shadow-2xs",
              favoritesOnly
                ? "bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)] font-bold"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
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
            <span className="font-mono text-[11px] text-[var(--text-muted)] uppercase hidden md:inline">
              {activeFilterCount} {activeFilterCount === 1 ? "FILTER ACTIVE" : "FILTERS ACTIVE"}
            </span>
            <button
              type="button"
              onClick={onClear}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] text-[11px] font-mono font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer shadow-2xs"
              title="Reset all active filters"
            >
              <RotateCcw className="h-3 w-3" />
              <span>CLEAR ALL</span>
            </button>
          </div>
        )}
      </div>

      {/* Editorial Category Archive Filter Popover Panel */}
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
            aria-label="Category Archive Filter"
            className="fixed sm:absolute inset-x-3 bottom-3 sm:inset-auto sm:left-0 sm:top-full sm:mt-2.5 z-50 w-auto sm:w-full sm:max-w-4xl max-h-[85vh] sm:max-h-[640px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl overflow-hidden flex flex-col font-sans animate-popover-in"
            style={{
              boxShadow: "0 24px 60px -12px rgba(24, 24, 27, 0.16), 0 0 0 1px rgba(24, 24, 27, 0.05)",
            }}
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)] bg-[var(--surface-hover)] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-xs bg-[var(--accent)]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  CATEGORY ARCHIVE FILTER
                </span>
                {activeCategoryCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[var(--accent)] text-white text-[10px] font-mono font-bold">
                    {activeCategoryCount} SELECTED
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {activeCategoryCount > 0 && (
                  <button
                    type="button"
                    onClick={() => onCategoriesChange([])}
                    className="flex items-center gap-1 font-mono text-[11px] text-[var(--accent)] hover:underline font-semibold cursor-pointer"
                    title="Clear selected categories"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>RESET CATEGORIES</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-colors cursor-pointer"
                  title="Close filters panel"
                  aria-label="Close filters panel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Category Groups List with Large Touch Checkboxes */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
              
              {CATEGORY_GROUPS.map((group: CategoryGroup) => {
                const groupCategories = group.categoryIds
                  .map((id) => categories.find((c) => c.id === id))
                  .filter((c): c is (typeof categories)[0] => Boolean(c));

                const groupSelectedCount = groupCategories.filter((c) =>
                  selectedCategories.includes(c.id)
                ).length;
                const isAllGroupSelected =
                  groupCategories.length > 0 && groupSelectedCount === groupCategories.length;

                return (
                  <div key={group.id} className="space-y-2.5">
                    {/* Category Group Subheader */}
                    <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border)]/70">
                      <div className="flex items-center gap-2">
                        <Layers className="h-3.5 w-3.5 text-[var(--accent)] shrink-0" />
                        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                          {group.name} ({groupCategories.length})
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => selectGroupCategories(group.categoryIds)}
                          className="font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--accent)] uppercase transition-colors cursor-pointer underline-offset-2 hover:underline"
                        >
                          {isAllGroupSelected ? "DESELECT ALL" : "SELECT ALL"}
                        </button>
                        {groupSelectedCount > 0 && (
                          <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-[var(--accent-soft)] text-[var(--accent)] font-semibold">
                            {groupSelectedCount}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Category Multi-Column Checkbox Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
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
                            className={cn(
                              "flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl border text-left text-xs transition-all duration-140 cursor-pointer group select-none focus-visible:outline-2 focus-visible:outline-[var(--accent)]",
                              isSelected
                                ? "bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--text-primary)] font-semibold shadow-2xs"
                                : "border-[var(--border)]/80 bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                            )}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {/* Large Accessible Checkbox Indicator: □ -> ☑ */}
                              <div
                                className={cn(
                                  "w-4 h-4 rounded-md flex items-center justify-center shrink-0 transition-all duration-140",
                                  isSelected
                                    ? "bg-[var(--accent)] text-white border border-[var(--accent)] shadow-2xs"
                                    : "border border-[var(--border-strong)] bg-[var(--surface)] group-hover:border-[var(--text-secondary)]"
                                )}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>

                              {/* Custom Category SVG Icon */}
                              <span
                                className={cn(
                                  "w-3.5 h-3.5 shrink-0 flex items-center justify-center transition-colors",
                                  isSelected
                                    ? "text-[var(--accent)]"
                                    : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                                )}
                              >
                                <CategoryIcon id={cat.id} className="w-3.5 h-3.5" />
                              </span>

                              {/* Category Name */}
                              <span className="truncate text-[12px]">{cat.name}</span>
                            </div>

                            {/* Live Category Resource Count Badge */}
                            <span
                              className={cn(
                                "font-mono text-[10px] px-1.5 py-0.2 rounded shrink-0 transition-colors",
                                isSelected
                                  ? "bg-[var(--accent)] text-white font-bold"
                                  : "bg-[var(--surface-muted)] text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"
                              )}
                            >
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Sort Order Setting Row */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 pb-1.5 border-b border-[var(--border)]/70">
                  <ArrowUpDown className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                    SORT ORDER
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "recent" as SortOption, label: "Recently Added" },
                    { id: "featured" as SortOption, label: "Featured" },
                    { id: "most-used" as SortOption, label: "Most Used" },
                    { id: "relevance" as SortOption, label: "Relevance" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSortChange(item.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-xl border text-xs font-mono transition-colors cursor-pointer",
                        sort === item.id
                          ? "bg-[var(--text-primary)] text-[var(--background)] border-[var(--text-primary)] font-bold shadow-2xs"
                          : "border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Panel Footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--border)] bg-[var(--surface-hover)] shrink-0">
              <div className="font-mono text-[11px] text-[var(--text-muted)]">
                <span>{resources.length} OBJECTS IN VAULT</span>
                {activeCategoryCount > 0 && (
                  <span className="ml-2 text-[var(--accent)] font-semibold">
                    ({activeCategoryCount} {activeCategoryCount === 1 ? "category" : "categories"} filtered)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {hasFilters && (
                  <button
                    type="button"
                    onClick={onClear}
                    className="px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-2xs"
                  >
                    CLEAR ALL
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-1.5 rounded-xl bg-[var(--text-primary)] text-[var(--background)] font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-2xs"
                >
                  VIEW RESULTS
                </button>
              </div>
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

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedPurposes([]);
    setFavoritesOnly(false);
    setSort("recent");
    setQuery("");
  };

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
    clearFilters,
  };
}
