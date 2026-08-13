"use client";

import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { useResources } from "@/lib/resource-context";
import { ResourceCard } from "@/components/resource-card/resource-card";
import { Footer } from "@/components/layout/footer";

export default function FavoritesPage() {
  const { getFilteredResources } = useResources();
  const resources = getFilteredResources({ favoritesOnly: true, sort: "alphabetical" });

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
            <Star className="h-4 w-4 fill-[var(--champagne)] text-[var(--champagne)]" />
            <span>PERSONAL COLLECTION // STARRED ENTRIES</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-[var(--text-primary)] uppercase">
            STARRED RESOURCES
          </h1>
          <p className="font-mono text-xs text-[var(--text-muted)] mt-2 uppercase tracking-wider">
            {resources.length} CURATED FAVORITE ENTRIES
          </p>
        </div>
      </div>

      <div className="w-full flex-1 py-10 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {resources.length === 0 ? (
            <div className="py-20 text-center font-mono text-xs text-[var(--text-muted)] space-y-3 border border-dashed border-[var(--border)] rounded-xl">
              <Star className="h-8 w-8 mx-auto text-[var(--text-muted)]/40" />
              <div>NO FAVORITES STARRED YET</div>
              <div className="text-[11px] opacity-70 max-w-xs mx-auto">
                Star any resource card in the archive to save it directly to your personal collection.
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
