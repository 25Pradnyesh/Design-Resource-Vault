"use client";

import { Resource, ScoredResource, ViewMode } from "@/types";
import { ResourceCard } from "@/components/resource-card/resource-card";
import { ResourceLedgerRow } from "@/components/resource-card/resource-ledger-row";
import { useUI } from "@/lib/ui-context";

export interface ResourceGridProps {
  resources: Resource[];
  scoredMap?: Map<string, ScoredResource>;
  activeQuery?: string;
  customViewMode?: ViewMode;
  emptyTitle?: string;
  emptyDescription?: string;
  onClearFilters?: () => void;
}

export function ResourceGrid({
  resources,
  scoredMap,
  activeQuery,
  customViewMode,
  emptyTitle,
  emptyDescription,
  onClearFilters,
}: ResourceGridProps) {
  const { viewMode: globalViewMode } = useUI();
  const activeViewMode = customViewMode || globalViewMode;

  if (resources.length === 0) {
    return (
      <div className="w-full py-16 text-center border border-dashed border-slate-300 rounded-2xl bg-slate-50/50 p-8">
        <div className="font-mono text-xs uppercase tracking-widest text-slate-400 mb-2 font-bold">
          [ 000 // ARCHIVE EMPTY ]
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">
          {emptyTitle || "No resources matched the active criteria"}
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
          {emptyDescription || "Try clearing filters, searching for alternate design keywords, or exploring adjacent categories."}
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
          >
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  // View 1: Archival Ledger Mode (Table View)
  if (activeViewMode === "ledger") {
    return (
      <div className="w-full overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-2xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 font-mono text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              <th className="py-2.5 px-3 w-12">#</th>
              <th className="py-2.5 px-3">Resource & Domain</th>
              <th className="py-2.5 px-3 hidden md:table-cell">Category</th>
              <th className="py-2.5 px-3 hidden lg:table-cell">Technologies</th>
              <th className="py-2.5 px-3 hidden xl:table-cell">Archetype</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource, index) => (
              <ResourceLedgerRow
                key={resource.id}
                resource={resource}
                index={index}
                scoredMatch={scoredMap?.get(resource.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // View 2: Compact Dense Grid (4 to 6 columns)
  if (activeViewMode === "dense") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-3.5">
        {resources.map((resource, index) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            index={index}
            scoredMatch={scoredMap?.get(resource.id)}
            activeQuery={activeQuery}
            dense={true}
          />
        ))}
      </div>
    );
  }

  // View 3: Visual Gallery Mode (Default, 1 to 3 columns on desktop)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {resources.map((resource, index) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          index={index}
          scoredMatch={scoredMap?.get(resource.id)}
          activeQuery={activeQuery}
          dense={false}
        />
      ))}
    </div>
  );
}
