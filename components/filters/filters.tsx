"use client";

import { useState, useRef, useEffect } from "react";
import { SortOption } from "@/types";
import { getAllTags, getAllPurposes } from "@/data/resources";
import { categories } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { cn } from "@/lib/utils";
import { SlidersHorizontal, ChevronDown, Check, X, Sparkles, Star, Search } from "lucide-react";
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
  const { resources, categoryCounts } = useResources();
  const allTags = getAllTags(resources);
  const allPurposes = getAllPurposes(resources);

  const [activePopover, setActivePopover] = useState<"categories" | "tags" | "purpose" | null>(null);
  const [catSearch, setCatSearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedTags.length > 0 ||
    selectedPurpose !== "" ||
    favoritesOnly ||
    sort !== "recent";

  // Close popover on outside click or ESC
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActivePopover(null);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActivePopover(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(catSearch.toLowerCase())
  );

  const filteredTags = allTags.filter((t) =>
    t.toLowerCase().includes(tagSearch.toLowerCase())
  );

  return (
    <div ref={containerRef} className="relative w-full font-sans select-none">
      {/* Single Horizontal Filter Control Row */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
        {/* Filter Label */}
        <div className="flex items-center gap-1.5 px-2 py-1.5 font-mono text-[11px] font-bold text-[var(--text-muted)] shrink-0 uppercase tracking-wider">
          <SlidersHorizontal className="h-3.5 w-3.5 text-[var(--accent)]" />
          <span>FILTERS</span>
        </div>

        {/* Categories Popover Trigger */}
        <div className="relative shrink-0">
          <button
            onClick={() => setActivePopover(activePopover === "categories" ? null : "categories")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer shadow-2xs",
              selectedCategories.length > 0
                ? "bg-[var(--text-primary)] text-[var(--background)] border-[var(--text-primary)] font-bold"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
            )}
            aria-expanded={activePopover === "categories"}
          >
            <span>CATEGORIES {selectedCategories.length > 0 && `(${selectedCategories.length})`}</span>
            <ChevronDown className={cn("h-3 w-3 transition-transform", activePopover === "categories" && "rotate-180")} />
          </button>

          {/* Categories Dropdown Popover */}
          {activePopover === "categories" && (
            <div className="absolute left-0 top-full mt-2 z-40 w-72 max-h-80 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2.5 shadow-xl overflow-hidden flex flex-col">
              <div className="relative mb-2 shrink-0">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={catSearch}
                  onChange={(e) => setCatSearch(e.target.value)}
                  placeholder="Search categories..."
                  className="w-full pl-8 pr-2 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none font-sans"
                  autoFocus
                />
              </div>
              <div className="overflow-y-auto space-y-0.5 pr-1 flex-1 max-h-60">
                {filteredCategories.map((cat) => {
                  const selected = selectedCategories.includes(cat.id);
                  const count = categoryCounts[cat.id] ?? 0;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={cn(
                        "w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors cursor-pointer",
                        selected
                          ? "bg-[var(--accent-soft)] text-[var(--accent)] font-semibold border border-[var(--accent)]/20"
                          : "hover:bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      )}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="h-3.5 w-3.5 shrink-0 flex items-center justify-center">
                          <CategoryIcon id={cat.id} className="h-3.5 w-3.5" />
                        </span>
                        <span className="truncate">{cat.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {count > 0 && <span className="font-mono text-[10px] text-[var(--text-muted)]">{count}</span>}
                        {selected && <Check className="h-3.5 w-3.5 text-[var(--accent)] shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Tags Popover Trigger */}
        <div className="relative shrink-0">
          <button
            onClick={() => setActivePopover(activePopover === "tags" ? null : "tags")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer shadow-2xs",
              selectedTags.length > 0
                ? "bg-[var(--text-primary)] text-[var(--background)] border-[var(--text-primary)] font-bold"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
            )}
            aria-expanded={activePopover === "tags"}
          >
            <span>TAGS {selectedTags.length > 0 && `(${selectedTags.length})`}</span>
            <ChevronDown className={cn("h-3 w-3 transition-transform", activePopover === "tags" && "rotate-180")} />
          </button>

          {/* Tags Dropdown Popover */}
          {activePopover === "tags" && (
            <div className="absolute left-0 top-full mt-2 z-40 w-80 max-h-80 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-xl overflow-hidden flex flex-col">
              <div className="relative mb-2 shrink-0">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={tagSearch}
                  onChange={(e) => setTagSearch(e.target.value)}
                  placeholder="Filter tags..."
                  className="w-full pl-8 pr-2 py-1 text-xs rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none font-sans"
                  autoFocus
                />
              </div>
              <div className="overflow-y-auto max-h-60 flex flex-wrap gap-1.5 pr-1">
                {filteredTags.map((tag) => {
                  const selected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        "px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer",
                        selected
                          ? "bg-[var(--accent)] text-white font-semibold shadow-2xs"
                          : "bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      )}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Purpose Popover Trigger */}
        {allPurposes.length > 0 && (
          <div className="relative shrink-0">
            <button
              onClick={() => setActivePopover(activePopover === "purpose" ? null : "purpose")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-[11px] uppercase tracking-wider transition-colors cursor-pointer shadow-2xs",
                selectedPurpose !== ""
                  ? "bg-[var(--text-primary)] text-[var(--background)] border-[var(--text-primary)] font-bold"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              )}
              aria-expanded={activePopover === "purpose"}
            >
              <span>PURPOSE {selectedPurpose ? `(1)` : ""}</span>
              <ChevronDown className={cn("h-3 w-3 transition-transform", activePopover === "purpose" && "rotate-180")} />
            </button>

            {/* Purpose Dropdown Popover */}
            {activePopover === "purpose" && (
              <div className="absolute left-0 top-full mt-2 z-40 w-72 max-h-72 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-xl overflow-y-auto space-y-1">
                <button
                  onClick={() => {
                    onPurposeChange("");
                    setActivePopover(null);
                  }}
                  className={cn(
                    "w-full px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors cursor-pointer",
                    selectedPurpose === "" ? "font-bold text-[var(--accent)] bg-[var(--accent-soft)]" : "text-[var(--text-muted)] hover:bg-[var(--surface-muted)]"
                  )}
                >
                  All Purposes
                </button>
                {allPurposes.map((purpose) => (
                  <button
                    key={purpose}
                    onClick={() => {
                      onPurposeChange(selectedPurpose === purpose ? "" : purpose);
                      setActivePopover(null);
                    }}
                    className={cn(
                      "w-full px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors cursor-pointer truncate",
                      selectedPurpose === purpose
                        ? "bg-[var(--accent-soft)] text-[var(--accent)] font-semibold border border-[var(--accent)]/20"
                        : "hover:bg-[var(--surface-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    )}
                  >
                    {purpose}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="h-4 w-px bg-[var(--border)] mx-1 shrink-0" />

        {/* Recently Added Sort Toggle */}
        <button
          onClick={() => onSortChange("recent")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-[11px] uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-2xs",
            sort === "recent"
              ? "bg-[var(--text-primary)] text-[var(--background)] border-[var(--text-primary)] font-bold"
              : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          )}
        >
          <Sparkles className="h-3 w-3" />
          <span>RECENTLY ADDED</span>
        </button>

        {/* Featured Sort Toggle */}
        <button
          onClick={() => onSortChange("featured")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-[11px] uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-2xs",
            sort === "featured"
              ? "bg-[var(--text-primary)] text-[var(--background)] border-[var(--text-primary)] font-bold"
              : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          )}
        >
          <span>FEATURED</span>
        </button>

        {/* Favorites Only Toggle */}
        <button
          onClick={() => onFavoritesChange(!favoritesOnly)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-[11px] uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-2xs",
            favoritesOnly
              ? "bg-[var(--accent-soft)] text-[var(--accent)] border-[var(--accent)] font-bold"
              : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          )}
        >
          <Star className={cn("h-3 w-3", favoritesOnly && "fill-[var(--accent)] text-[var(--accent)]")} />
          <span>FAVORITES</span>
        </button>

        {/* Clear Filters Button */}
        {hasFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-colors shrink-0 ml-auto cursor-pointer"
            title="Reset active filters"
          >
            <X className="h-3.5 w-3.5" />
            <span>RESET</span>
          </button>
        )}
      </div>
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
    setSort("recent");
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
