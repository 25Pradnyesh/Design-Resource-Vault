"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { SortOption, ViewMode } from "@/types";
import { categories, CATEGORY_GROUPS } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { useUI } from "@/lib/ui-context";
import { cn } from "@/lib/utils";
import {
  SlidersHorizontal,
  ChevronDown,
  Check,
  X,
  RotateCcw,
  Sparkles,
  Star,
  LayoutGrid,
  Grid3X3,
  List,
  Layers,
  Code,
  Palette,
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

const COMMON_TECH = ["WebGL", "Three.js", "React", "Tailwind CSS", "GLSL Shaders", "Motion", "Canvas"];
const COMMON_STYLES = ["Brutalist", "Minimalist", "3D / Spatial", "Dark Mode", "Kinetic Motion", "Editorial"];

export function Filters({
  selectedCategories = [],
  selectedTags = [],
  favoritesOnly = false,
  sort = "recent",
  onCategoriesChange,
  onTagsChange,
  onFavoritesChange,
  onSortChange,
  onClear,
  className,
}: FiltersProps) {
  const { categoryCounts, resources } = useResources();
  const { viewMode, setViewMode } = useUI();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const activeCategoryCount = selectedCategories.length;
  const activeTagsCount = selectedTags.length;
  const activeFilterCount =
    activeCategoryCount +
    activeTagsCount +
    (favoritesOnly ? 1 : 0) +
    (sort !== "recent" && sort !== "relevance" ? 1 : 0);

  const hasFilters = activeFilterCount > 0;

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

  const toggleTag = useCallback(
    (tag: string) => {
      if (!onTagsChange) return;
      if (selectedTags.includes(tag)) {
        onTagsChange(selectedTags.filter((t) => t !== tag));
      } else {
        onTagsChange([...selectedTags, tag]);
      }
    },
    [selectedTags, onTagsChange]
  );

  return (
    <div ref={containerRef} className={cn("relative w-full font-sans select-none space-y-3", className)}>
      {/* Main Filter & Viewport Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-white shadow-2xs">

        {/* Left Side: Filter Trigger & Quick Mode Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Primary Filter Drawer/Popover Trigger */}
          <button
            ref={triggerRef}
            id="filters-primary-trigger"
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all cursor-pointer",
              isOpen || hasFilters
                ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
            )}
            aria-expanded={isOpen}
            aria-controls="filters-popover-panel"
            aria-label="Filter resources by taxonomy and tags"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-cyan-400" />
            <span className="uppercase">TAXONOMY FILTERS</span>
            {activeFilterCount > 0 && (
              <span className="h-4 min-w-4 px-1 rounded-full bg-blue-600 text-white text-[10px] font-mono flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
            <ChevronDown
              className={cn("h-3.5 w-3.5 transition-transform duration-200", isOpen && "rotate-180")}
            />
          </button>

          {/* Quick Filter: Favorites Only */}
          <button
            type="button"
            onClick={() => onFavoritesChange(!favoritesOnly)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-sans text-xs font-semibold transition-colors cursor-pointer",
              favoritesOnly
                ? "bg-rose-50 text-rose-700 border-rose-300"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            )}
          >
            <Star className={cn("h-3.5 w-3.5", favoritesOnly ? "fill-rose-500 text-rose-500" : "text-slate-400")} />
            <span>Starred</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            {(["recent", "featured", "most-used"] as SortOption[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onSortChange(option)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-[11px] font-mono uppercase font-bold transition-all cursor-pointer",
                  sort === option
                    ? "bg-white text-slate-900 shadow-2xs"
                    : "text-slate-500 hover:text-slate-900"
                )}
              >
                {option === "recent" ? "Latest" : option === "featured" ? "Featured" : "Popular"}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: View Mode Switcher (Gallery, Dense, Ledger) */}
        <div className="flex items-center gap-2">
          {hasFilters && (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>CLEAR</span>
            </button>
          )}

          <div className="flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-lg">
            <button
              type="button"
              onClick={() => setViewMode("gallery")}
              className={cn(
                "p-1.5 rounded-md transition-all cursor-pointer",
                viewMode === "gallery" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-500 hover:text-slate-900"
              )}
              title="Gallery View (Large visual cards)"
              aria-label="Gallery View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setViewMode("dense")}
              className={cn(
                "p-1.5 rounded-md transition-all cursor-pointer",
                viewMode === "dense" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-500 hover:text-slate-900"
              )}
              title="Dense Grid View (High scanability)"
              aria-label="Dense Grid View"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setViewMode("ledger")}
              className={cn(
                "p-1.5 rounded-md transition-all cursor-pointer",
                viewMode === "ledger" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-500 hover:text-slate-900"
              )}
              title="Archival Ledger View (Sortable data sheet)"
              aria-label="Ledger Table View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Taxonomy Panel Popover */}
      {isOpen && (
        <div
          id="filters-popover-panel"
          className="w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xl animate-popover-in space-y-6 z-30 relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="space-y-0.5">
              <div className="font-mono text-xs uppercase font-bold text-slate-900 flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-blue-600" />
                <span>ARCHIVAL TAXONOMY MATRIX</span>
              </div>
              <p className="text-xs text-slate-500">
                Filter across 22 specialized design domains, creative code technologies, and aesthetic archetypes.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Grouped Categories Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORY_GROUPS.map((group) => (
              <div key={group.id} className="space-y-2.5">
                <div className="font-mono text-[10.5px] uppercase font-black tracking-wider text-slate-900 border-b border-slate-100 pb-1">
                  {group.name}
                </div>
                <div className="flex flex-col gap-1">
                  {group.categoryIds.map((catId) => {
                    const cat = categories.find((c) => c.id === catId);
                    if (!cat) return null;
                    const isSelected = selectedCategories.includes(cat.id);
                    const count = categoryCounts[cat.id] ?? 0;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={cn(
                          "flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all text-left cursor-pointer",
                          isSelected
                            ? "bg-blue-600 text-white font-bold"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        )}
                      >
                        <span className="truncate pr-2">{cat.name}</span>
                        <span
                          className={cn(
                            "font-mono text-[10px] px-1.5 py-0.2 rounded shrink-0",
                            isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                          )}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack & Style Tags Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
            {/* Tech Stack */}
            <div className="space-y-2">
              <div className="font-mono text-[10.5px] uppercase font-bold text-slate-900 flex items-center gap-1.5">
                <Code className="h-3.5 w-3.5 text-emerald-600" />
                <span>TECHNOLOGIES & FRAMEWORKS</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_TECH.map((tech) => {
                  const isSelected = selectedTags.includes(tech);
                  return (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => toggleTag(tech)}
                      className={cn(
                        "px-2.5 py-1 rounded-md font-mono text-[10.5px] font-medium border transition-colors cursor-pointer",
                        isSelected
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      )}
                    >
                      {tech}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Visual Styles */}
            <div className="space-y-2">
              <div className="font-mono text-[10.5px] uppercase font-bold text-slate-900 flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5 text-amber-600" />
                <span>VISUAL & INTERACTION STYLES</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_STYLES.map((style) => {
                  const isSelected = selectedTags.includes(style);
                  return (
                    <button
                      key={style}
                      type="button"
                      onClick={() => toggleTag(style)}
                      className={cn(
                        "px-2.5 py-1 rounded-md font-mono text-[10.5px] font-medium border transition-colors cursor-pointer",
                        isSelected
                          ? "bg-amber-600 text-white border-amber-600"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      )}
                    >
                      {style}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClear}
              className="font-mono text-xs text-slate-500 hover:text-slate-900 uppercase font-bold"
            >
              RESET ALL FILTERS
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-sans text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
            >
              APPLY FILTERS
            </button>
          </div>
        </div>
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
