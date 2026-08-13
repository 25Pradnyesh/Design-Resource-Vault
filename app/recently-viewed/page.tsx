"use client";

import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { useResources } from "@/lib/resource-context";
import { ResourceCard } from "@/components/resource-card/resource-card";
import { Footer } from "@/components/layout/footer";

export default function RecentlyViewedPage() {
  const { recentlyViewed, getResourceById } = useResources();

  const resources = recentlyViewed
    .map((id) => getResourceById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getResourceById>>[];

  return (
    <div className="w-full flex flex-col min-h-screen bg-[var(--background)] text-[var(--text-primary)] font-sans">
      <div className="w-full border-b border-[var(--border)] bg-[var(--surface)] pt-12 pb-14 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-6 uppercase"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> BACK TO ARCHIVE
          </Link>

          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">
            <Clock className="h-4 w-4 text-[var(--accent)]" />
            <span>SESSION HISTORY // RECENTLY VIEWED</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-[var(--text-primary)] uppercase">
            EXPLORED ENTRIES
          </h1>
          <p className="font-mono text-xs text-[var(--text-muted)] mt-2 uppercase tracking-wider">
            {resources.length} RECENTLY VISITED ARCHIVE CARDS
          </p>
        </div>
      </div>

      <div className="w-full flex-1 py-10 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {resources.length === 0 ? (
            <div className="py-20 text-center font-mono text-xs text-[var(--text-muted)] space-y-3 border border-dashed border-[var(--border)] rounded-xl">
              <Clock className="h-8 w-8 mx-auto text-[var(--text-muted)]/40" />
              <div>NO RECENTLY VIEWED CARDS YET</div>
              <div className="text-[11px] opacity-70 max-w-xs mx-auto">
                Explore entries in the archive to build your session history log.
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
