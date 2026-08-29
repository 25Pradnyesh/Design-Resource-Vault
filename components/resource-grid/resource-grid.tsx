"use client";

import { Resource, ScoredResource } from "@/types";
import { ResourceCard } from "@/components/resource-card/resource-card";
import { EmptyState } from "@/components/ui/empty-state";

interface ResourceGridProps {
  resources: Resource[];
  emptyTitle?: string;
  emptyDescription?: string;
  onClearFilters?: () => void;
  scoredMap?: Map<string, ScoredResource>;
  activeQuery?: string;
}

export function ResourceGrid({
  resources,
  emptyTitle = "No resources found",
  emptyDescription = "Try adjusting your search query, clearing filters, or browsing other categories.",
  onClearFilters,
  scoredMap,
  activeQuery,
}: ResourceGridProps) {
  if (resources.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        action={
          onClearFilters
            ? {
              label: "Clear All Filters",
              onClick: onClearFilters,
            }
            : undefined
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-3.5">
      {resources.map((resource, index) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          index={index}
          scoredMatch={scoredMap?.get(resource.id)}
          activeQuery={activeQuery}
        />
      ))}
    </div>
  );
}
