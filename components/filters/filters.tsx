"use client";

import { useState, useRef, useEffect } from "react";
import { SortOption } from "@/types";
import { categories } from "@/data/categories";
import { CONTROLLED_PURPOSES, getPurposeCounts } from "@/data/resources";
import { useResources } from "@/lib/resource-context";
import { cn } from "@/lib/utils";
import {
  SlidersHorizontal,
  ChevronDown,
  Check,
  X,
  Sparkles,
  Star,
  RotateCcw,
  Layers,
  Target,
  ArrowUpDown,
} from "lucide-react";
import { CategoryIcon } from "@/components/ui/category-icon";

interface FiltersProps {
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
}

export function Filters({
  selectedCategories,
  selectedPurpose = "",
  selectedPurposes = [],
  favoritesOnly,
  sort,
  onCategoriesChange,
  onPurposeChange,
  onPurposesChange,
  onFavoritesChange,
  onSortChange,
  onClear,
}: FiltersProps) {
  const { resources, categoryCounts } = useResources();
  const purposeCounts = getPurposeCounts(resources);

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Active purposes set combines selectedPurposes array and selectedPurpose string
  const activePurposes = selectedPurposes.length > 0
    ? selectedPurposes
    : selectedPurpose
    ? [selectedPurpose]
    : [];

  const activeFilterCount =
    selectedCategories.length +
    activePurposes.length +
    (favoritesOnly ? 1 : 0) +
    (sort !== "recent" ? 1 : 0);

  const hasFilters = activeFilterCount > 0;

  // Close dropdown on outside click or ESC key
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

  const toggleCategory = (id: string) => {
    onCategoriesChange(
      selectedCategories.includes(id)
        ? selectedCategories.filter((c) => c !== id)
        : [...selectedCategories, id]
    );
  };

  const togglePurpose = (purpose: string) => {
    let nextPurposes: string[];
    if (activePurposes.includes(purpose)) {
      nextPurposes = activePurposes.filter((p) => p !== purpose);
    } else {
      nextPurposes = [...activePurposes, purpose];
    }

    if (onPurposesChange) {
      onPurposesChange(nextPurposes);
    }
    if (onPurposeChange) {
      onPurposeChange(nextPurposes.length === 1 ? nextPurposes[0] : nextPurposes.join(","));
    }
  };

  return (
    <div ref={containerRef} className="relative w-full font-sans select-none">
      {/* Primary Filter Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 py-1 text-xs">
        
        {/* Left: Main [ FILTERS ] Trigger & Quick Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Primary [ FILTERS ] Dropdown Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2 rounded-xl border font-mono text-xs uppercase tracking-wider transition-all duration-160 cursor-pointer shadow-2xs font-semibold",
              isOpen || hasFilters
                ? "bg-[var(--text-primary)] text-[var(--background)] border-[var(--text-primary)] shadow-sm"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
            )}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span>FILTERS</span>
            {activeFilterCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[var(--accent)] text-white text-[10px] font-mono font-bold">
                {activeFilterCount}
              </span>
            )}
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200 ease-out",
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
          >
            <span>FEATURED</span>
          </button>

          {/* Quick Filter: Favorites Only */}
          <button
            type="button"
            onClick={() => onFavoritesChange(!favoritesOnly)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-xl border font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer shadow-2xs",
              favoritesOnly
                ? "bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)] font-bold"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
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

      {/* Elegant Filter Dropdown Panel with Smooth CSS Animation */}
      {isOpen && (
        <>
          {/* Mobile Backdrop Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs sm:hidden transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Main Dropdown Panel Container */}
          <div
            className="fixed sm:absolute inset-x-3 bottom-3 sm:inset-auto sm:left-0 sm:top-full sm:mt-2.5 z-50 w-auto sm:w-full sm:max-w-4xl max-h-[85vh] sm:max-h-[620px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl overflow-hidden flex flex-col font-sans animate-popover-in"
            style={{
              boxShadow: "0 24px 60px -12px rgba(24, 24, 27, 0.16), 0 0 0 1px rgba(24, 24, 27, 0.05)",
            }}
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--border)] bg-[var(--surface-hover)] shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-xs bg-[var(--accent)]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  FILTERS
                </span>
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[var(--accent)] text-white text-[10px] font-mono font-bold">
                    {activeFilterCount} ACTIVE
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {hasFilters && (
                  <button
                    type="button"
                    onClick={onClear}
                    className="flex items-center gap-1 font-mono text-[11px] text-[var(--accent)] hover:underline font-semibold cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>CLEAR ALL</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-colors cursor-pointer"
                  title="Close filters panel"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Filter Contents */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
              
              {/* 01: CATEGORIES SECTION WITH CHECKBOXES */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border)]/70">
                  <div className="flex items-center gap-2">
                    <Layers className="h-3.5 w-3.5 text-[var(--accent)]" />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                      CATEGORIES ({categories.length})
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
                    {selectedCategories.length > 0 ? `${selectedCategories.length} SELECTED` : "MULTI-SELECT"}
                  </span>
                </div>

                {/* Category Multi-Column Checkbox Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {categories.map((cat) => {
                    const isSelected = selectedCategories.includes(cat.id);
                    const count = categoryCounts[cat.id] ?? 0;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={cn(
                          "flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl border text-left text-xs transition-all duration-140 cursor-pointer group select-none",
                          isSelected
                            ? "bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--text-primary)] font-semibold shadow-2xs"
                            : "border-[var(--border)]/80 bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Custom Checkbox: □ -> ☑ */}
                          <div
                            className={cn(
                              "w-4 h-4 rounded-md flex items-center justify-center shrink-0 transition-all duration-140",
                              isSelected
                                ? "bg-[var(--accent)] text-white border border-[var(--accent)]"
                                : "border border-[var(--border-strong)] bg-[var(--surface)] group-hover:border-[var(--text-secondary)]"
                            )}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>

                          {/* Category Icon */}
                          <span className="w-3.5 h-3.5 shrink-0 flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--accent)]">
                            <CategoryIcon id={cat.id} className="w-3.5 h-3.5" />
                          </span>

                          {/* Category Title */}
                          <span className="truncate">{cat.name}</span>
                        </div>

                        {/* Dynamic Count Badge */}
                        <span
                          className={cn(
                            "font-mono text-[10px] px-1.5 py-0.2 rounded shrink-0",
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

              {/* 02: PRIMARY PURPOSE SECTION WITH CHECKBOXES */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-[var(--border)]/70">
                  <div className="flex items-center gap-2">
                    <Target className="h-3.5 w-3.5 text-[var(--accent)]" />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                      PURPOSE ({CONTROLLED_PURPOSES.length})
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase">
                    {activePurposes.length > 0 ? `${activePurposes.length} SELECTED` : "MULTI-SELECT"}
                  </span>
                </div>

                {/* Purpose Checkbox Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {CONTROLLED_PURPOSES.map((purpose) => {
                    const isSelected = activePurposes.includes(purpose);
                    const count = purposeCounts[purpose] ?? 0;

                    return (
                      <button
                        key={purpose}
                        type="button"
                        onClick={() => togglePurpose(purpose)}
                        className={cn(
                          "flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl border text-left text-xs transition-all duration-140 cursor-pointer group select-none",
                          isSelected
                            ? "bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--text-primary)] font-semibold shadow-2xs"
                            : "border-[var(--border)]/80 bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Custom Checkbox: □ -> ☑ */}
                          <div
                            className={cn(
                              "w-4 h-4 rounded-md flex items-center justify-center shrink-0 transition-all duration-140",
                              isSelected
                                ? "bg-[var(--accent)] text-white border border-[var(--accent)]"
                                : "border border-[var(--border-strong)] bg-[var(--surface)] group-hover:border-[var(--text-secondary)]"
                            )}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>

                          <span className="truncate">{purpose}</span>
                        </div>

                        <span
                          className={cn(
                            "font-mono text-[10px] px-1.5 py-0.2 rounded shrink-0",
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

              {/* 03: SORT ORDER ROW */}
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
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-[var(--text-primary)] text-[var(--background)] font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-2xs"
              >
                VIEW RESULTS
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
