"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useResources } from "@/lib/resource-context";
import { getRecentResources } from "@/lib/search";
import { ResourceGrid } from "@/components/resource-grid/resource-grid";
import { Footer } from "@/components/layout/footer";

export default function RecentlyAddedPage() {
  const { resources } = useResources();
  const recent = getRecentResources(resources, 60);

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
            <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span>LIBRARY CHRONOLOGY // NEWEST ENTRIES</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
            Recently Added
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            {recent.length} resources sorted by newest addition date.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="w-full flex-1 py-10 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <ResourceGrid resources={recent} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
