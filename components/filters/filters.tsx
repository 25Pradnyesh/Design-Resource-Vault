"use client";

import { useState } from "react";
import { SortOption } from "@/types";
import { getAllTags, getAllPurposes } from "@/data/resources";
import { categories } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";

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
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </div>

        {sortOptions.map((opt) => (
          <Button
            key={opt.value}
            variant={sort === opt.value ? "default" : "outline"}
            size="sm"
            onClick={() => onSortChange(opt.value)}
            className="text-xs"
          >
            {opt.label}
          </Button>
        ))}

        <div className="w-px h-5 bg-border mx-1" />

        <Button
          variant={favoritesOnly ? "default" : "outline"}
          size="sm"
          onClick={() => onFavoritesChange(!favoritesOnly)}
          className="text-xs"
        >
          Favorites
        </Button>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onClear} className="text-xs text-muted-foreground">
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Categories
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant={selectedCategories.includes(cat.id) ? "default" : "outline"}
              onClick={() => toggleCategory(cat.id)}
              className={cn(
                "cursor-pointer text-[11px]",
                selectedCategories.includes(cat.id) && "bg-primary text-primary-foreground"
              )}
            >
              {cat.emoji} {cat.name}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Tags
        </div>
        <div className="flex flex-wrap gap-1.5">
          {allTags.slice(0, 20).map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              onClick={() => toggleTag(tag)}
              className="cursor-pointer text-[11px]"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {allPurposes.length > 0 && (
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Purpose
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allPurposes.slice(0, 8).map((purpose) => (
              <Badge
                key={purpose}
                variant={selectedPurpose === purpose ? "default" : "outline"}
                onClick={() =>
                  onPurposeChange(selectedPurpose === purpose ? "" : purpose)
                }
                className="cursor-pointer text-[11px] max-w-xs truncate"
              >
                {purpose.length > 40 ? `${purpose.slice(0, 40)}…` : purpose}
              </Badge>
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
