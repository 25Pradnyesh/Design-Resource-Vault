"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { getCategoryBySlug } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { PageHeader, SectionHeader } from "@/components/layout/page-header";
import { ResourceGrid } from "@/components/resource-grid/resource-grid";
import { Filters, useFilterState } from "@/components/filters/filters";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const category = getCategoryBySlug(slug);
  const { getFilteredResources } = useResources();
  const filterState = useFilterState();

  if (!category) {
    notFound();
  }

  const categoryResources = getFilteredResources({
    query: filterState.query,
    categories: [category.id],
    tags: filterState.selectedTags,
    purpose: filterState.selectedPurpose,
    favoritesOnly: filterState.favoritesOnly,
    sort: filterState.sort,
  });

  return (
    <>
      <PageHeader
        title={`${category.emoji} ${category.name}`}
        subtitle={category.description}
      />

      <section>
        <SectionHeader
          title={`Resources in ${category.name}`}
          count={categoryResources.length}
        />

        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={filterState.query}
              onChange={(e) => filterState.setQuery(e.target.value)}
              placeholder={`Search within ${category.name}...`}
              className="pl-9"
            />
          </div>

          <Filters
            selectedCategories={[]} // locked to current category
            selectedTags={filterState.selectedTags}
            selectedPurpose={filterState.selectedPurpose}
            favoritesOnly={filterState.favoritesOnly}
            sort={filterState.sort}
            onCategoriesChange={() => {}}
            onTagsChange={filterState.setSelectedTags}
            onPurposeChange={filterState.setSelectedPurpose}
            onFavoritesChange={filterState.setFavoritesOnly}
            onSortChange={filterState.setSort}
            onClear={filterState.clearFilters}
          />
        </div>

        <ResourceGrid
          resources={categoryResources}
          emptyTitle={`No resources found in ${category.name}`}
          emptyDescription="Try clearing your search query or tag filters."
        />
      </section>
    </>
  );
}
