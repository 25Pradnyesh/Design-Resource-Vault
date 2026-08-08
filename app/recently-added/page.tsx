"use client";

import { useResources } from "@/lib/resource-context";
import { getRecentResources } from "@/lib/search";
import { PageHeader } from "@/components/layout/page-header";
import { ResourceGrid } from "@/components/resource-grid/resource-grid";

export default function RecentlyAddedPage() {
  const { resources } = useResources();
  const recent = getRecentResources(resources, 50);

  return (
    <>
      <PageHeader
        title="Recently Added"
        subtitle="Latest additions to your resource vault."
      />
      <ResourceGrid resources={recent} />
    </>
  );
}
