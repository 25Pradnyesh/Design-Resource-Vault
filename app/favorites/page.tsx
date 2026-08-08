"use client";

import { useResources } from "@/lib/resource-context";
import { PageHeader } from "@/components/layout/page-header";
import { ResourceGrid } from "@/components/resource-grid/resource-grid";
import { EmptyState } from "@/components/ui/empty-state";
import { Star } from "lucide-react";

export default function FavoritesPage() {
  const { getFilteredResources } = useResources();
  const resources = getFilteredResources({ favoritesOnly: true, sort: "alphabetical" });

  return (
    <>
      <PageHeader
        title="Favorites"
        subtitle="Your best resources will live here."
      />
      {resources.length === 0 ? (
        <EmptyState
          icon={<Star className="h-5 w-5" />}
          title="No favorites yet"
          description="Your best resources will live here. Star any resource to add it."
        />
      ) : (
        <ResourceGrid resources={resources} />
      )}
    </>
  );
}
