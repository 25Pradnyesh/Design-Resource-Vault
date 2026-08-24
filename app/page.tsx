"use client";

import { useMemo } from "react";
import { useResources } from "@/lib/resource-context";
import { ArchiveHero } from "@/components/archive/archive-hero";
import { CategoryTileGrid } from "@/components/archive/category-tile-grid";
import { ArchiveFeatured } from "@/components/archive/archive-featured";
import { Filters, useFilterState } from "@/components/filters/filters";
import { ResourceGrid } from "@/components/resource-grid/resource-grid";
import { Footer } from "@/components/layout/footer";
import { parseSearchIntent } from "@/lib/search-intent";
import { scoreResource } from "@/lib/search";
import { ScoredResource } from "@/types";
import { Compass, Sparkles, ArrowRight } from "lucide-react";

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
    <div className="w-full flex flex-col min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-sans">
      {/* 01: Intelligent Discovery Hero with In-Page Search */}
      <ArchiveHero query={filterState.query} onQueryChange={filterState.setQuery} />

      {/* 02: Categories Visual Navigation Grid (shown when default browsing) */}
      {!hasActiveFilters && <CategoryTileGrid />}

      {/* 03: Curated Featured Section (shown when default browsing) */}
      {!hasActiveFilters && <ArchiveFeatured />}

      {/* 04: Primary Resource Library & Filter System */}
      <section id="resources-library" className="w-full flex-1 py-10 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Active Search Intent & Adjacent Concepts Strip */}
          {filterState.query?.trim() && intent.adjacentConcepts.length > 0 && (
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>INTELLIGENCE MATCH RESULTS FOR &quot;{filterState.query}&quot;</span>
                </div>
                <span className="font-mono text-[11px] text-[var(--text-muted)]">
                  {filtered.length} MATCHED
                </span>
              </div>

              {/* Adjacent Discovery Paths */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-[var(--border)]/60 text-xs">
                <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase flex items-center gap-1">
                  <Compass className="h-3 w-3 text-[var(--accent)]" />
                  <span>ADJACENT PATHS:</span>
                </span>
                {intent.adjacentConcepts.map((concept) => (
                  <button
                    key={concept}
                    onClick={() => filterState.setQuery(concept)}
                    className="px-2 py-0.5 rounded-md border border-[var(--border)] bg-[var(--surface-muted)] text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>{concept}</span>
                    <ArrowRight className="h-2.5 w-2.5 opacity-50" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filter Bar Header */}
          <div className="flex flex-col gap-4 pb-4 border-b border-[var(--border)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-xs bg-[var(--accent)]" />
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  {hasActiveFilters ? "RANKED RESULTS" : "ALL RESOURCES"}
                </h2>
                <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--surface-muted)] px-2 py-0.5 rounded">
                  {filtered.length}
                </span>
              </div>
              <span className="text-[11px] font-mono text-[var(--text-muted)] tracking-wider uppercase hidden sm:block">
                {resources.length} TOTAL IN ARCHIVE
              </span>
            </div>

            {/* Compact Filter Row */}
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
          </div>

          {/* Scannable Multi-Column Resource Grid with Scoring */}
          <ResourceGrid
            resources={filtered}
            emptyTitle="No matching resources"
            emptyDescription="No resources found matching your current search query or active filter criteria."
            onClearFilters={filterState.clearFilters}
            scoredMap={scoredMap}
            activeQuery={filterState.query}
          />
        </div>
      </section>

      {/* 05: Restrained Footer */}
      <Footer />
    </div>
  );
}
