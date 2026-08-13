"use client";

import { useState } from "react";
import { SortOption } from "@/types";
import { getAllTags, getAllPurposes } from "@/data/resources";
import { categories } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { cn } from "@/lib/utils";
import { SlidersHorizontal, X } from "lucide-react";
import { CategoryIcon } from "@/components/ui/category-icon";


interface FiltersProps {
  selectedCategories: string[];
  selectedTags: string[];
  selectedPurpose: string;
  favoritesOnly: boolean;
  sort: SortOption;
  onCategoriesChange: (cats: string[]) => void;
  onTagsChange: (tags: string[]) => void;
  onPurposeChange: (purpose: string) => void;
  onFavoritesChange: (val: boolean) => void;
  onSortChange: (sort: SortOption) => void;
  onClear: () => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "recent", label: "Recently Added" },
  { value: "alphabetical", label: "Alphabetical" },
  { value: "featured", label: "Featured" },
  { value: "most-used", label: "Most Used" },
];

export function Filters({
  selectedCategories,
  selectedTags,
  selectedPurpose,
  favoritesOnly,
  sort,
  onCategoriesChange,
  onTagsChange,
  onPurposeChange,
  onFavoritesChange,
  onSortChange,
  onClear,
}: FiltersProps) {
  const { resources } = useResources();
  const allTags = getAllTags(resources);
  const allPurposes = getAllPurposes(resources);

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedTags.length > 0 ||
    selectedPurpose ||
    favoritesOnly;

  const toggleCategory = (id: string) => {
    onCategoriesChange(
      selectedCategories.includes(id)
        ? selectedCategories.filter((c) => c !== id)
        : [...selectedCategories, id]
    );
  };

  const toggleTag = (tag: string) => {
    onTagsChange(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
    );
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mr-1 font-mono">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          FILTERS
        </div>

        {sortOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSortChange(opt.value)}
            className={cn(
              "px-3 py-1 rounded text-xs transition-colors font-mono",
              sort === opt.value
                ? "bg-[var(--text-primary)] text-[var(--background)] font-bold"
                : "border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
          >
            {opt.label}
          </button>
        ))}

        <div className="w-px h-5 bg-[var(--border)] mx-1" />

        <button
          onClick={() => onFavoritesChange(!favoritesOnly)}
          className={cn(
            "px-3 py-1 rounded text-xs transition-colors font-mono",
            favoritesOnly
              ? "bg-[var(--champagne)] text-[var(--midnight-navy)] font-bold"
              : "border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          )}
        >
          Favorites Only
        </button>

        {hasFilters && (
          <button onClick={onClear} className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] font-mono ml-1">
            <X className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      <div>
        <div className="mb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
          CATEGORIES
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <span
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={cn(
                "cursor-pointer text-[11px] px-2.5 py-1 rounded border transition-colors inline-flex items-center gap-1 select-none",
                selectedCategories.includes(cat.id)
                  ? "bg-[var(--text-primary)] text-[var(--background)] border-[var(--text-primary)] font-semibold"
                  : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
              )}
            >
              <CategoryIcon id={cat.id} className="h-3 w-3" /> {cat.name}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
          TAGS
        </div>
        <div className="flex flex-wrap gap-1.5">
          {allTags.slice(0, 20).map((tag) => (
            <span
              key={tag}
              onClick={() => toggleTag(tag)}
              className={cn(
                "cursor-pointer text-[11px] px-2 py-0.5 rounded border transition-colors font-mono select-none",
                selectedTags.includes(tag)
                  ? "bg-[var(--accent)] text-[var(--background)] border-[var(--accent)] font-semibold"
                  : "bg-[var(--surface-muted)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              )}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {allPurposes.length > 0 && (
        <div>
          <div className="mb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
            PURPOSE
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allPurposes.slice(0, 8).map((purpose) => (
              <span
                key={purpose}
                onClick={() =>
                  onPurposeChange(selectedPurpose === purpose ? "" : purpose)
                }
                className={cn(
                  "cursor-pointer text-[11px] px-2 py-0.5 rounded border transition-colors font-sans max-w-xs truncate select-none",
                  selectedPurpose === purpose
                    ? "bg-[var(--accent)] text-[var(--background)] border-[var(--accent)] font-semibold"
                    : "bg-[var(--surface-muted)] border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                )}
              >
                {purpose.length > 40 ? `${purpose.slice(0, 40)}…` : purpose}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function useFilterState() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("recent");
  const [query, setQuery] = useState("");

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedPurpose("");
    setFavoritesOnly(false);
    setQuery("");
  };

  return {
    selectedCategories,
    setSelectedCategories,
    selectedTags,
    setSelectedTags,
    selectedPurpose,
    setSelectedPurpose,
    favoritesOnly,
    setFavoritesOnly,
    sort,
    setSort,
    query,
    setQuery,
    clearFilters,
  };
}
