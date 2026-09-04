"use client";

import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { useResources } from "@/lib/resource-context";
import { useFilterState, Filters, ActiveFilterChips } from "@/components/filters";
import { ResourceGrid } from "@/components/resource-grid/resource-grid";
import { Footer } from "@/components/layout/footer";

export default function FavoritesPage() {
  const { getFilteredResources } = useResources();
  const filterState = useFilterState();

  const resources = getFilteredResources({
    query: filterState.query,
    categories: filterState.selectedCategories,
    tags: filterState.selectedTags,
    purposes: filterState.selectedPurposes,
    purpose: filterState.selectedPurpose,
    favoritesOnly: true,
    sort: filterState.sort,
  });

  return (
    <div className="w-full flex flex-col min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-sans">
      {/* Header */}
      <div className="w-full border-b border-[var(--border)] bg-[var(--surface)] pt-8 pb-8 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-4 uppercase"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> BACK TO ALL RESOURCES
          </Link>

          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
            <Star className="h-3.5 w-3.5 fill-[var(--accent)] text-[var(--accent)]" />
            <span>SAVED COLLECTION // STARRED ENTRIES</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            Favorites
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            {resources.length} resources saved to your personal reference library.
          </p>
        </div>
      </div>

      {/* Filters (if items exist) */}
      {resources.length > 0 && (
        <div className="w-full border-b border-[var(--border)] bg-[var(--background)] py-3 px-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl space-y-2">
            <Filters
              selectedCategories={filterState.selectedCategories}
              selectedTags={filterState.selectedTags}
              selectedPurpose={filterState.selectedPurpose}
              selectedPurposes={filterState.selectedPurposes}
              favoritesOnly={true}
              sort={filterState.sort}
              onCategoriesChange={filterState.setSelectedCategories}
              onTagsChange={filterState.setSelectedTags}
              onPurposeChange={filterState.setSelectedPurpose}
              onPurposesChange={filterState.setSelectedPurposes}
              onFavoritesChange={() => { }}
              onSortChange={filterState.setSort}
              onClear={filterState.clearFilters}
            />

            {filterState.selectedCategories.length > 0 && (
              <ActiveFilterChips
                selectedCategories={filterState.selectedCategories}
                onRemoveCategory={(catId) =>
                  filterState.setSelectedCategories(
                    filterState.selectedCategories.filter((c) => c !== catId)
                  )
                }
                onClearAll={filterState.clearFilters}
                totalResults={resources.length}
              />
            )}
          </div>
        </div>
      )}

      {/* Resource Grid */}
      <div className="w-full flex-1 py-10 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <ResourceGrid
            resources={resources}
            emptyTitle="No favorite resources yet"
            emptyDescription="Click the star icon on any card in the reference library to save it here for fast daily access."
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
