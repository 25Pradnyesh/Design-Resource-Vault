"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Star,
  Pencil,
  Trash2,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";
import { Resource } from "@/types";
import { categoryMap } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { useUI } from "@/lib/ui-context";
import { getRelatedResources } from "@/lib/related";
import { cn, getDomainFromUrl } from "@/lib/utils";
import { ResourceCard } from "@/components/resource-card/resource-card";

interface ResourceDetailProps {
  resource: Resource;
}

export function ResourceDetail({ resource }: ResourceDetailProps) {
  const {
    resources,
    isFavorite,
    toggleFavorite,
    trackView,
    deleteResource,
  } = useResources();
  const { setEditingResourceId } = useUI();
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    trackView(resource.id);
  }, [resource.id, trackView]);

  const related = getRelatedResources(resource, resources, 6);
  const favorited = isFavorite(resource.id);
  const domain = getDomainFromUrl(resource.url);

  const handleDelete = () => {
    if (window.confirm(`Delete "${resource.name}"? This cannot be undone.`)) {
      deleteResource(resource.id);
      window.history.back();
    }
  };

  const screenshotUrl = `https://api.microlink.io?url=${encodeURIComponent(resource.url)}&screenshot=true&meta=false&embed=screenshot.url`;

  const sections = [
    { label: "WHAT IT DOES", content: resource.whatItDoes },
    { label: "WHY USE IT", content: resource.whyUseIt },
    { label: "WHEN TO USE IT", content: resource.whenToUseIt },
    { label: "HOW TO USE IT", content: resource.howToUseIt },
  ];

  return (
    <div className="w-full flex-1 bg-[var(--background)] text-[var(--text-primary)] py-10 px-4 sm:px-8 lg:px-12 font-sans">
      <div className="mx-auto max-w-7xl">
        {/* Navigation back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8 uppercase"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> BACK TO ARCHIVE
        </Link>

        {/* Catalog Entry Header */}
        <div className="border-b border-[var(--border)] pb-10 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[var(--text-muted)] uppercase mb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              <span>CATALOG ENTRY // {resource.id}</span>
            </div>
            <span>ADDED {new Date(resource.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-[var(--text-primary)] uppercase leading-none">
                {resource.name}
              </h1>

              <p className="text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed">
                {resource.description}
              </p>

              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-sm text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors pt-2"
              >
                <span>{domain}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* Action Bar */}
            <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3 font-sans text-xs">
              <button
                onClick={() => toggleFavorite(resource.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors",
                  favorited
                    ? "bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)] font-bold"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                )}
              >
                <Star className={cn("h-4 w-4", favorited && "fill-[var(--accent)] text-[var(--accent)]")} />
                <span>{favorited ? "FAVORITED" : "FAVORITE"}</span>
              </button>

              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[var(--text-primary)] text-[var(--background)] px-5 py-2.5 rounded-lg font-semibold uppercase hover:opacity-90 transition-opacity"
              >
                <span>VISIT WEBSITE</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              {resource.isUserAdded && (
                <div className="flex items-center gap-2 w-full lg:w-auto pt-2">
                  <button
                    onClick={() => setEditingResourceId(resource.id)}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 border border-[var(--border)] bg-[var(--surface)] px-3 py-2 rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    EDIT
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 border border-[var(--error)]/40 bg-[var(--error)]/10 text-[var(--error)] px-3 py-2 rounded hover:bg-[var(--error)]/20"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    DELETE
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Detail Sections */}
          <div className="lg:col-span-8 space-y-8">
            {/* Visual Preview Frame */}
            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-lg">
              <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2 bg-[var(--surface-muted)] font-mono text-[11px] text-[var(--text-muted)]">
                <span>PREVIEW // {domain}</span>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-primary)] flex items-center gap-1"
                >
                  OPEN LIVE <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
              <div className="relative aspect-[16/9] w-full bg-[var(--surface-elevated)]">
                {!imgError ? (
                  <img
                    src={screenshotUrl}
                    alt={`${resource.name} screenshot`}
                    className="h-full w-full object-cover object-top"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center font-mono text-xs text-[var(--text-muted)] p-8 text-center">
                    ARCHIVE VISUAL PREVIEW GENERATED FOR {domain}
                  </div>
                )}
              </div>
            </div>

            {/* Editorial Information Sections */}
            <div className="space-y-6 font-sans">
              {sections.map(({ label, content }) => {
                if (!content) return null;
                return (
                  <div key={label} className="border-l-2 border-[var(--accent)] pl-4 py-1">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">
                      {label}
                    </h3>
                    <p className="text-base text-[var(--text-primary)] leading-relaxed font-normal">
                      {content}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Metadata Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border border-[var(--border)] bg-[var(--surface)] p-6 rounded-xl space-y-6">
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                  CATEGORIES
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resource.categories.map((catId) => {
                    const cat = categoryMap[catId];
                    if (!cat) return null;
                    return (
                      <Link key={catId} href={`/categories/${cat.slug}`}>
                        <span className="font-mono text-xs bg-[var(--surface-muted)] border border-[var(--border)] px-2.5 py-1 rounded text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors inline-flex items-center gap-1.5">
                          <span>{cat.emoji}</span>
                          <span>{cat.name}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  PURPOSE
                </h3>
                <p className="font-sans text-xs text-[var(--text-secondary)] leading-relaxed">
                  {resource.purpose}
                </p>
              </div>

              {resource.tags.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                    INDEX TAGS
                  </h3>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                    {resource.tags.map((tag) => (
                      <span key={tag} className="border border-[var(--border)] bg-[var(--surface-muted)] px-2 py-0.5 rounded text-[var(--text-muted)]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Entries */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[var(--border)] font-sans">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold tracking-tight text-[var(--text-primary)] uppercase">
                RELATED ARCHIVE ENTRIES
              </h2>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {related.length} SUGGESTED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {related.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
