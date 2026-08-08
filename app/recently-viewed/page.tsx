"use client";

import { useResources } from "@/lib/resource-context";
import { PageHeader } from "@/components/layout/page-header";
import { ResourceGrid } from "@/components/resource-grid/resource-grid";
import { EmptyState } from "@/components/ui/empty-state";
import { Clock } from "lucide-react";

export default function RecentlyViewedPage() {
  const { recentlyViewed, getResourceById } = useResources();

  const resources = recentlyViewed
    .map((id) => getResourceById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getResourceById>>[];

  return (
    <>
      <PageHeader
        title="Recently Viewed"
        subtitle="Resources you explore will appear here."
      />
      {resources.length === 0 ? (
        <EmptyState
          icon={<Clock className="h-5 w-5" />}
          title="No recently viewed resources"
          description="Resources you explore will appear here."
        />
      ) : (
        <ResourceGrid resources={resources} />
      )}
    </>
  );
}
