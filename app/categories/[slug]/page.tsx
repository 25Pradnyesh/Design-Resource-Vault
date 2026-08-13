"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

import { getCategoryBySlug } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { useFilterState, Filters } from "@/components/filters/filters";
import { ResourceCard } from "@/components/resource-card/resource-card";
import { Footer } from "@/components/layout/footer";

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
    <div className="w-full flex flex-col min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-sans">
      {/* Archive Room Header */}
      <div className="w-full border-b border-[var(--border)] bg-[var(--surface)] pt-12 pb-14 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-6 uppercase"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> BACK TO ARCHIVE
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
                <span className="text-xl">{category.emoji}</span>
                <span>ROOM // {category.slug}</span>
              </div>
              <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-[var(--text-primary)] uppercase leading-tight">
                {category.name}
              </h1>
              <p className="font-sans text-base text-[var(--text-secondary)] max-w-2xl">
                {category.description}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col lg:items-end justify-end">
              <div className="border border-[var(--border)] bg-[var(--surface-elevated)] p-4 rounded-xl font-mono text-xs text-right space-y-0.5">
                <div className="text-[var(--text-muted)] text-[10px] tracking-wider uppercase">INDEXED COUNT</div>
                <div className="text-3xl font-bold font-display text-[var(--accent)]">{categoryResources.length}</div>
                <div className="text-[10px] text-[var(--text-muted)]">RESOURCES AVAILABLE</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="w-full border-b border-[var(--border)] bg-[var(--background)] py-5 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full font-sans text-xs">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                value={filterState.query}
                onChange={(e) => filterState.setQuery(e.target.value)}
                placeholder={`Search within ${category.name}...`}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] py-2.5 pl-10 pr-4 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--border-strong)] transition-colors"
              />
            </div>
          </div>

          <Filters
            selectedCategories={[]}
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
      </div>

      {/* Resource Grid Room */}
      <div className="w-full flex-1 py-10 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {categoryResources.length === 0 ? (
            <div className="py-20 text-center font-mono text-xs text-[var(--text-muted)] space-y-2 border border-dashed border-[var(--border)] rounded-xl">
              <div>NO RESOURCES FOUND IN THIS ROOM</div>
              <div className="text-[11px] opacity-70">Try clearing active search queries or tags.</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {categoryResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
