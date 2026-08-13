"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useResources } from "@/lib/resource-context";
import { getRecentResources } from "@/lib/search";
import { ResourceCard } from "@/components/resource-card/resource-card";
import { Footer } from "@/components/layout/footer";

export default function RecentlyAddedPage() {
  const { resources } = useResources();
  const recent = getRecentResources(resources, 50);

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

          <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent)] uppercase tracking-wider mb-2">
            <Sparkles className="h-4 w-4" />
            <span>SYSTEM INDEX // RECENT ADDITIONS</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-[var(--text-primary)] uppercase">
            RECENTLY ADDED
          </h1>
          <p className="font-mono text-xs text-[var(--text-muted)] mt-2 uppercase tracking-wider">
            {recent.length} LATEST INDEXED RESOURCES
          </p>
        </div>
      </div>

      <div className="w-full flex-1 py-10 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {recent.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
