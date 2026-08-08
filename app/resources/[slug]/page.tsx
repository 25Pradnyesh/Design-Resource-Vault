"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { useResources } from "@/lib/resource-context";
import { ResourceDetail } from "@/components/resource-detail/resource-detail";

export default function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { getResourceBySlug } = useResources();
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  return <ResourceDetail resource={resource} />;
}
