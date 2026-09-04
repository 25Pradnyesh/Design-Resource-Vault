"use client";

import { useMemo } from "react";
import { useResources } from "@/lib/resource-context";
import { ArchiveHero } from "@/components/archive/archive-hero";
import { CategoryTileGrid } from "@/components/archive/category-tile-grid";
import { ArchiveFeatured } from "@/components/archive/archive-featured";
import { Filters, ActiveFilterChips, useFilterState } from "@/components/filters";
import { ResourceGrid } from "@/components/resource-grid/resource-grid";
import { Footer } from "@/components/layout/footer";
import { parseSearchIntent } from "@/lib/search-intent";
import { scoreResource } from "@/lib/search";
import { ScoredResource } from "@/types";
import { Compass, Sparkles, ArrowRight, Layers } from "lucide-react";

export default function HomePage() {
  const { resources, getFilteredResources, viewCounts } = useResources();
  const filterState = useFilterState();

  const filtered = getFilteredResources({
    query: filterState.query,
    categories: filterState.selectedCategories,
    tags: filterState.selectedTags,
    purposes: filterState.selectedPurposes,
    purpose: filterState.selectedPurpose,
    favoritesOnly: filterState.favoritesOnly,
    sort: filterState.sort,
  });

  const intent = useMemo(
    () => parseSearchIntent(filterState.query || ""),
    [filterState.query]
  );

  const scoredMap = useMemo(() => {
    if (!filterState.query?.trim()) return undefined;
    const map = new Map<string, ScoredResource>();
    for (const r of resources) {
      const scored = scoreResource(r, intent, viewCounts);
      if (scored) {
        map.set(r.id, scored);
      }
    }
    return map;
  }, [resources, intent, viewCounts, filterState.query]);

  const hasActiveFilters =
    Boolean(filterState.query) ||
    filterState.selectedCategories.length > 0 ||
    filterState.selectedTags.length > 0 ||
    filterState.selectedPurposes.length > 0 ||
    Boolean(filterState.selectedPurpose) ||
    filterState.favoritesOnly ||
    (filterState.sort !== "recent" && filterState.sort !== "relevance");

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#FFFFFF] text-[var(--text-primary)] font-sans">
      {/* 01: Intelligent Curatorial Workbench Hero */}
      <ArchiveHero
        activeQuery={filterState.query}
        onSearchChange={filterState.setQuery}
        selectedCategory={filterState.selectedCategories[0]}
        onCategorySelect={(catId) =>
          filterState.setSelectedCategories(catId ? [catId] : [])
        }
      />

      {/* 02: Categories Visual Navigation Grid (shown when default browsing) */}
      {!hasActiveFilters && <CategoryTileGrid />}

      {/* 03: Curated Featured Section (shown when default browsing) */}
      {!hasActiveFilters && <ArchiveFeatured />}

      {/* 04: Primary Resource Library & Filter System */}
      <section id="resources-library" className="w-full flex-1 py-10 px-4 sm:px-8 lg:px-12 scroll-mt-20">
        <div className="mx-auto max-w-7xl space-y-6">

          {/* Active Search Intent & Adjacent Concepts Strip */}
          {filterState.query?.trim() && intent.adjacentConcepts.length > 0 && (
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-blue-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>NATURAL INTENT MATCH FOR &quot;{filterState.query}&quot;</span>
                </div>
                <span className="font-mono text-[11px] text-blue-600 font-bold">
                  {filtered.length} SPECIMENS
                </span>
              </div>

              {/* Adjacent Discovery Paths */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-blue-200/60 text-xs">
                <span className="font-mono text-[10px] text-slate-500 uppercase flex items-center gap-1">
                  <Compass className="h-3 w-3 text-blue-600" />
                  <span>ADJACENT PATHS:</span>
                </span>
                {intent.adjacentConcepts.map((concept) => (
                  <button
                    key={concept}
                    type="button"
                    onClick={() => filterState.setQuery(concept)}
                    className="px-2.5 py-0.5 rounded-md border border-slate-300 bg-white text-[11px] font-medium text-slate-700 hover:text-blue-600 hover:border-blue-400 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <span>{concept}</span>
                    <ArrowRight className="h-2.5 w-2.5 opacity-50" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Workbench Filter Toolbar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-blue-600 inline-block" />
                <h2 className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
                  {hasActiveFilters ? "RANKED SPECIMEN RESULTS" : "ALL VERIFIED SPECIMENS"}
                </h2>
                <span className="text-[11px] font-mono text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded font-bold">
                  {filtered.length}
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 tracking-wider uppercase hidden sm:block">
                {resources.length} TOTAL IN ARCHIVE
              </span>
            </div>

            {/* Filter Bar */}
            <Filters
              selectedCategories={filterState.selectedCategories}
              selectedTags={filterState.selectedTags}
              selectedPurpose={filterState.selectedPurpose}
              selectedPurposes={filterState.selectedPurposes}
              favoritesOnly={filterState.favoritesOnly}
              sort={filterState.sort}
              onCategoriesChange={filterState.setSelectedCategories}
              onTagsChange={filterState.setSelectedTags}
              onPurposeChange={filterState.setSelectedPurpose}
              onPurposesChange={filterState.setSelectedPurposes}
              onFavoritesChange={filterState.setFavoritesOnly}
              onSortChange={filterState.setSort}
              onClear={filterState.clearFilters}
            />

            {/* Removable Active Filter Chips */}
            {(filterState.selectedCategories.length > 0 || Boolean(filterState.query?.trim()) || filterState.selectedTags.length > 0) && (
              <ActiveFilterChips
                selectedCategories={filterState.selectedCategories}
                onRemoveCategory={(catId) =>
                  filterState.setSelectedCategories(
                    filterState.selectedCategories.filter((c) => c !== catId)
                  )
                }
                activeQuery={filterState.query}
                onClearQuery={() => filterState.setQuery("")}
                onClearAll={filterState.clearAll}
                totalResults={filtered.length}
              />
            )}
          </div>

          {/* Multi-View Resource Grid */}
          <ResourceGrid
            resources={filtered}
            scoredMap={scoredMap}
            activeQuery={filterState.query}
          />
        </div>
      </section>

      {/* 05: Modernist Footer */}
      <Footer />
    </div>
  );
}
