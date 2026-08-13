"use client";

import { Resource } from "@/types";
import { ResourceCard } from "@/components/resource-card/resource-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Search } from "lucide-react";

interface ResourceGridProps {
  resources: Resource[];
  emptyTitle?: string;
  emptyDescription?: string;
}

export function ResourceGrid({
  resources,
  emptyTitle = "No resources found.",
  emptyDescription = "Try another search, category, or tag.",
}: ResourceGridProps) {
  if (resources.length === 0) {
    return (
      <EmptyState
        icon={<Search className="h-5 w-5" />}
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {resources.map((resource, index) => (
        <ResourceCard key={resource.id} resource={resource} index={index} />
      ))}
    </div>
  );
}
