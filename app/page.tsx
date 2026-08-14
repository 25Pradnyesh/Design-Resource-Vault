"use client";

import { useResources } from "@/lib/resource-context";
import { ArchiveHero } from "@/components/archive/archive-hero";
import { CategoryTileGrid } from "@/components/archive/category-tile-grid";
import { ArchiveFeatured } from "@/components/archive/archive-featured";
import { Filters, useFilterState } from "@/components/filters/filters";
import { ResourceGrid } from "@/components/resource-grid/resource-grid";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  const { resources, getFilteredResources } = useResources();
  const filterState = useFilterState();

  const filtered = getFilteredResources({
    query: filterState.query,
    categories: filterState.selectedCategories,
    tags: filterState.selectedTags,
    purpose: filterState.selectedPurpose,
    favoritesOnly: filterState.favoritesOnly,
    sort: filterState.sort,
  });

  const hasActiveFilters =
    Boolean(filterState.query) ||
    filterState.selectedCategories.length > 0 ||
    filterState.selectedTags.length > 0 ||
    Boolean(filterState.selectedPurpose) ||
    filterState.favoritesOnly ||
    filterState.sort !== "recent";

  return (
    <div className="w-full flex flex-col min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-sans">
      {/* 01: Compact Discovery Hero with In-Page Search */}
      <ArchiveHero query={filterState.query} onQueryChange={filterState.setQuery} />

      {/* 02: 22-Category Visual Navigation Grid (shown when not actively querying) */}
      {!hasActiveFilters && <CategoryTileGrid />}

      {/* 03: Curated Featured Section (shown when default browsing) */}
      {!hasActiveFilters && <ArchiveFeatured />}

      {/* 04: Primary Resource Library & Filter System */}
      <section className="w-full flex-1 py-10 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Filter Bar Header */}
          <div className="flex flex-col gap-4 pb-4 border-b border-[var(--border)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-xs bg-[var(--accent)]" />
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  {hasActiveFilters ? "FILTERED RESULTS" : "ALL RESOURCES"}
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
              favoritesOnly={filterState.favoritesOnly}
              sort={filterState.sort}
              onCategoriesChange={filterState.setSelectedCategories}
              onTagsChange={filterState.setSelectedTags}
              onPurposeChange={filterState.setSelectedPurpose}
              onFavoritesChange={filterState.setFavoritesOnly}
              onSortChange={filterState.setSort}
              onClear={filterState.clearFilters}
            />
          </div>

          {/* Scannable Multi-Column Resource Grid */}
          <ResourceGrid
            resources={filtered}
            emptyTitle="No matching resources"
            emptyDescription="No resources found matching your current filter criteria."
            onClearFilters={filterState.clearFilters}
          />
        </div>
      </section>

      {/* 05: Restrained Checklist-Style Footer */}
      <Footer />
    </div>
  );
}
