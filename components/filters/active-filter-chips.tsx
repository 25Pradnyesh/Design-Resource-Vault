"use client";

import React from "react";
import { X } from "lucide-react";
import { categoryMap } from "@/data/categories";
import { cn } from "@/lib/utils";

interface ActiveFilterChipsProps {
  selectedCategories: string[];
  onRemoveCategory: (categoryId: string) => void;
  onClearAll?: () => void;
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
        "w-full flex flex-wrap items-center gap-1.5 py-1.5 text-xs font-sans animate-fadeIn",
        className
      )}
      aria-label="Active category filters"
    >
      {/* Removable Active Category Chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        {selectedCategories.map((catId) => {
          const category = categoryMap[catId];
          const displayName = category ? category.name : catId;

          return (
            <div
              key={catId}
              className="inline-flex items-center gap-1.5 pl-2.5 pr-1 py-1 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--text-primary)] text-xs font-medium shadow-2xs group transition-colors hover:border-[var(--text-secondary)]"
            >
              {/* Category Name */}
              <span className="truncate max-w-[200px] sm:max-w-none text-[12px]">
                {displayName}
              </span>

              {/* Remove Chip Action */}
              <button
                type="button"
                onClick={() => onRemoveCategory(catId)}
                className="w-4 h-4 rounded flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-muted)] transition-colors cursor-pointer"
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
      {onClearAll && selectedCategories.length > 1 && (
        <button
          type="button"
          onClick={onClearAll}
          className="font-mono text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] px-2 py-1 rounded transition-colors cursor-pointer underline-offset-2 hover:underline ml-1"
          title="Clear all active filters"
        >
          Clear all
        </button>
      )}

      {/* Total Matching Results Counter */}
      {typeof totalResults === "number" && (
        <span className="hidden sm:inline font-mono text-[11px] text-[var(--text-muted)] ml-auto">
          {totalResults} {totalResults === 1 ? "RESOURCE" : "RESOURCES"} FOUND
        </span>
      )}
    </div>
  );
}
