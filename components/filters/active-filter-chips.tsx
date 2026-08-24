"use client";

import React from "react";
import { X, RotateCcw, Filter } from "lucide-react";
import { categoryMap } from "@/data/categories";
import { CategoryIcon } from "@/components/ui/category-icon";
import { cn } from "@/lib/utils";

interface ActiveFilterChipsProps {
  selectedCategories: string[];
  onRemoveCategory: (categoryId: string) => void;
  onClearAll: () => void;
  totalResults?: number;
  className?: string;
}

export function ActiveFilterChips({
  selectedCategories,
  onRemoveCategory,
  onClearAll,
  totalResults,
  className,
}: ActiveFilterChipsProps) {
  if (!selectedCategories || selectedCategories.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "w-full flex flex-wrap items-center gap-2 py-2 text-xs font-sans animate-fadeIn",
        className
      )}
      aria-label="Active category filters"
    >
      {/* Editorial Filter Context Label */}
      <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider shrink-0 mr-1">
        <Filter className="w-3 h-3 text-[var(--accent)]" />
        <span>ACTIVE CATEGORIES ({selectedCategories.length}):</span>
      </div>

      {/* Removable Category Chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        {selectedCategories.map((catId) => {
          const category = categoryMap[catId];
          const displayName = category ? category.name : catId;

          return (
            <div
              key={catId}
              className="inline-flex items-center gap-1.5 pl-2 pr-1.5 py-1 rounded-lg border border-[var(--accent-muted)] bg-[var(--accent-soft)] text-[var(--text-primary)] text-xs font-medium shadow-2xs group transition-colors hover:border-[var(--accent)]"
            >
              {/* Category Icon */}
              <span className="w-3.5 h-3.5 shrink-0 flex items-center justify-center text-[var(--accent)]">
                <CategoryIcon id={catId} className="w-3.5 h-3.5" />
              </span>

              {/* Category Name */}
              <span className="font-sans text-[12px] truncate max-w-[200px] sm:max-w-none">
                {displayName}
              </span>

              {/* Remove Chip Button */}
              <button
                type="button"
                onClick={() => onRemoveCategory(catId)}
                className="w-4 h-4 rounded-md flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-muted)] transition-colors cursor-pointer ml-0.5"
                title={`Remove ${displayName} filter`}
                aria-label={`Remove ${displayName} filter`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Clear All Action */}
      <button
        type="button"
        onClick={onClearAll}
        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg font-mono text-[11px] font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] hover:bg-[var(--accent-soft)] transition-colors cursor-pointer ml-auto sm:ml-1"
        title="Clear all selected filters"
      >
        <RotateCcw className="w-3 h-3" />
        <span>CLEAR ALL</span>
      </button>

      {/* Total Matching Results Counter */}
      {typeof totalResults === "number" && (
        <span className="hidden sm:inline font-mono text-[11px] text-[var(--text-muted)] ml-auto">
          {totalResults} {totalResults === 1 ? "RESOURCE" : "RESOURCES"} FOUND
        </span>
      )}
    </div>
  );
}
