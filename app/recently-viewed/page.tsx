"use client";

import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { useResources } from "@/lib/resource-context";
import { ResourceGrid } from "@/components/resource-grid/resource-grid";
import { Footer } from "@/components/layout/footer";

export default function RecentlyViewedPage() {
  const { recentlyViewed, getResourceById } = useResources();

  const resources = recentlyViewed
    .map((id) => getResourceById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getResourceById>>[];

  return (
    <div className="w-full flex flex-col min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-sans">
      {/* Header */}
      <div className="w-full border-b border-[var(--border)] bg-[var(--surface)] pt-8 pb-8 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-4 uppercase"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> BACK TO ALL RESOURCES
          </Link>

          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
            <Clock className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span>LOCAL HISTORY // RECENTLY VIEWED</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            Recently Viewed
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            {resources.length} resources viewed during your browsing sessions.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="w-full flex-1 py-10 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <ResourceGrid
            resources={resources}
            emptyTitle="No viewed resources yet"
            emptyDescription="Browse through the library and detail pages to build your browsing history."
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
