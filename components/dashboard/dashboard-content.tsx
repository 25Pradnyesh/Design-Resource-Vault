"use client";

import { useResources } from "@/lib/resource-context";
import { categories } from "@/data/categories";
import { getFeaturedResources, getRecentResources } from "@/lib/search";
import { PageHeader, StatCard, SectionHeader } from "@/components/layout/page-header";
import { ResourceGrid } from "@/components/resource-grid/resource-grid";
import { SearchTrigger } from "@/components/command-menu/command-menu";
import { Filters, ActiveFilterChips, useFilterState } from "@/components/filters";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function DashboardContent() {
  const { resources, favorites, getFilteredResources } = useResources();
  const filterState = useFilterState();

  const featured = getFeaturedResources(resources, 6);
  const recent = getRecentResources(resources, 8);

  const filtered = getFilteredResources({
    query: filterState.query,
    categories: filterState.selectedCategories,
    tags: filterState.selectedTags,
    purpose: filterState.selectedPurpose,
    favoritesOnly: filterState.favoritesOnly,
    sort: filterState.sort,
  });

  const hasActiveFilters =
    filterState.query ||
    filterState.selectedCategories.length > 0 ||
    filterState.selectedTags.length > 0 ||
    filterState.selectedPurpose ||
    filterState.favoritesOnly;

  return (
    <>
      <PageHeader
        title="Design & UI/UX Resource Vault"
        subtitle="Your growing library of tools, references, and inspiration."
        action={<SearchTrigger />}
      />

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total Resources" value={resources.length} />
        <StatCard label="Categories" value={categories.length} />
        <StatCard label="Favorites" value={favorites.length} />
        <StatCard label="Recently Added" value={recent.length} />
      </div>

      {!hasActiveFilters && (
        <>
          <section className="mb-10">
            <SectionHeader title="Featured Resources" count={featured.length} />
            <ResourceGrid resources={featured} />
          </section>

          <section className="mb-10">
            <SectionHeader title="Recently Added" count={recent.length} />
            <ResourceGrid resources={recent} />
          </section>
        </>
      )}

      <section>
        <SectionHeader
          title={hasActiveFilters ? "Search Results" : "All Resources"}
          count={filtered.length}
        />

        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={filterState.query}
              onChange={(e) => filterState.setQuery(e.target.value)}
              placeholder="Search resources..."
              className="pl-9"
            />
          </div>
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
          {filterState.selectedCategories.length > 0 && (
            <ActiveFilterChips
              selectedCategories={filterState.selectedCategories}
              onRemoveCategory={(catId) =>
                filterState.setSelectedCategories(
                  filterState.selectedCategories.filter((c) => c !== catId)
                )
              }
              onClearAll={filterState.clearFilters}
              totalResults={filtered.length}
            />
          )}
        </div>

        <ResourceGrid resources={filtered} />
      </section>
    </>
  );
}
