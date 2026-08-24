"use client";

import { notFound } from "next/navigation";
import { use, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Search, ArrowRight } from "lucide-react";

import { getCategoryBySlug, categories } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { useFilterState, Filters } from "@/components/filters/filters";
import { ResourceGrid } from "@/components/resource-grid/resource-grid";
import { CategoryIcon } from "@/components/ui/category-icon";
import { Footer } from "@/components/layout/footer";
import { parseSearchIntent } from "@/lib/search-intent";
import { scoreResource } from "@/lib/search";
import { ScoredResource } from "@/types";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const category = getCategoryBySlug(slug);
  const { getFilteredResources, viewCounts } = useResources();
  const filterState = useFilterState();

  if (!category) {
    notFound();
  }

  const categoryResources = getFilteredResources({
    query: filterState.query,
    categories: [category.id],
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
    for (const r of categoryResources) {
      const scored = scoreResource(r, intent, viewCounts);
      if (scored) {
        map.set(r.id, scored);
      }
    }
    return map;
  }, [categoryResources, intent, viewCounts, filterState.query]);

  // Related adjacent categories
  const relatedCategories = useMemo(() => {
    return categories
      .filter((c) => c.id !== category.id)
      .slice(0, 4);
  }, [category.id]);

  return (
    <div className="w-full flex flex-col min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-sans">
      {/* Category Header (Focused Design Library Style) */}
      <div className="w-full border-b border-[var(--border)] bg-[var(--surface)] pt-8 pb-8 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-4 uppercase"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> BACK TO ALL RESOURCES
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2.5 font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
                <span className="h-4 w-4 shrink-0 flex items-center justify-center text-[var(--accent)]">
                  <CategoryIcon id={category.id} className="h-4 w-4" />
                </span>
                <span>CATEGORY // {category.slug}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
                {category.name}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                {category.description}
              </p>
            </div>

            <div className="shrink-0 flex items-center">
              <div className="border border-[var(--border)] bg-[var(--surface-hover)] px-4 py-2.5 rounded-xl font-mono text-xs space-y-0.5 shadow-2xs">
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">RESOURCES</div>
                <div className="text-xl font-bold text-[var(--text-primary)]">{categoryResources.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & In-Category Search Bar */}
      <div className="w-full border-b border-[var(--border)] bg-[var(--background)] py-4 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              value={filterState.query}
              onChange={(e) => filterState.setQuery(e.target.value)}
              placeholder={`Search within ${category.name}...`}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-2 pl-9 pr-4 text-xs sm:text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--border-strong)] transition-colors shadow-2xs font-sans"
            />
          </div>

          <Filters
            selectedCategories={[]}
            selectedTags={filterState.selectedTags}
            selectedPurpose={filterState.selectedPurpose}
            selectedPurposes={filterState.selectedPurposes}
            favoritesOnly={filterState.favoritesOnly}
            sort={filterState.sort}
            onCategoriesChange={() => {}}
            onTagsChange={filterState.setSelectedTags}
            onPurposeChange={filterState.setSelectedPurpose}
            onPurposesChange={filterState.setSelectedPurposes}
            onFavoritesChange={filterState.setFavoritesOnly}
            onSortChange={filterState.setSort}
            onClear={filterState.clearFilters}
          />
        </div>
      </div>

      {/* Resource Grid */}
      <div className="w-full flex-1 py-10 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-12">
          <ResourceGrid
            resources={categoryResources}
            emptyTitle={`No resources found in ${category.name}`}
            emptyDescription="Try clearing your search query or active filter tags."
            onClearFilters={filterState.clearFilters}
            scoredMap={scoredMap}
            activeQuery={filterState.query}
          />

          {/* Related Adjacent Categories Section */}
          <div className="pt-8 border-t border-[var(--border)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-xs bg-[var(--accent)]" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  ADJACENT CATEGORIES
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {relatedCategories.map((relCat) => (
                <Link
                  key={relCat.id}
                  href={`/categories/${relCat.slug}`}
                  className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)] transition-colors flex items-center justify-between group shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="h-5 w-5 shrink-0 flex items-center justify-center text-[var(--accent)]">
                      <CategoryIcon id={relCat.id} className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                      {relCat.name}
                    </span>
                  </div>
                  <ArrowRight className="h-3 w-3 text-[var(--text-muted)] opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
