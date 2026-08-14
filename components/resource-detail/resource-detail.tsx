"use client";

import { useEffect } from "react";
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
import { ResourcePreview } from "@/components/resource-card/resource-preview";
import { CategoryIcon } from "@/components/ui/category-icon";
import { Footer } from "@/components/layout/footer";

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

  useEffect(() => {
    trackView(resource.id);
  }, [resource.id, trackView]);

  const related = getRelatedResources(resource, resources, 5);
  const favorited = isFavorite(resource.id);
  const domain = getDomainFromUrl(resource.url);

  const handleDelete = () => {
    if (window.confirm(`Delete "${resource.name}"? This cannot be undone.`)) {
      deleteResource(resource.id);
      window.history.back();
    }
  };

  const sections = [
    { label: "WHAT IT DOES", content: resource.whatItDoes },
    { label: "WHY USE IT", content: resource.whyUseIt },
    { label: "WHEN TO USE IT", content: resource.whenToUseIt },
    { label: "HOW TO USE IT", content: resource.howToUseIt },
  ];

  return (
    <div className="w-full flex-1 bg-[var(--background)] text-[var(--text-primary)] font-sans">
      <div className="mx-auto max-w-7xl py-8 px-4 sm:px-8 lg:px-12">
        {/* Navigation back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-6 uppercase"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> BACK TO ALL RESOURCES
        </Link>

        {/* Documentation Header */}
        <div className="border-b border-[var(--border)] pb-8 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[var(--text-muted)] uppercase mb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-xs bg-[var(--accent)]" />
              <span>REFERENCE ENTRY // {resource.id}</span>
            </div>
            <span>INDEXED {new Date(resource.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-3">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
                {resource.name}
              </h1>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-3xl leading-relaxed">
                {resource.description}
              </p>

              <div className="pt-1">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent)] hover:underline"
                >
                  <span>{domain}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Action Bar */}
            <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-2.5 font-sans text-xs">
              <button
                onClick={() => toggleFavorite(resource.id)}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-2 rounded-lg border transition-colors cursor-pointer shadow-2xs",
                  favorited
                    ? "bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)] font-bold"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]"
                )}
              >
                <Star className={cn("h-3.5 w-3.5", favorited && "fill-[var(--accent)] text-[var(--accent)]")} />
                <span>{favorited ? "SAVED" : "FAVORITE"}</span>
              </button>

              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-[var(--text-primary)] text-[var(--background)] px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-2xs"
              >
                <span>OPEN WEBSITE</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              {resource.isUserAdded && (
                <div className="flex items-center gap-2 w-full lg:w-auto pt-1">
                  <button
                    onClick={() => setEditingResourceId(resource.id)}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    EDIT
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 border border-[var(--error)]/30 bg-[var(--error)]/10 text-[var(--error)] px-3 py-1.5 rounded-lg hover:bg-[var(--error)]/20"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    DELETE
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Reference Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Visual Preview + Structured Guidelines */}
          <div className="lg:col-span-8 space-y-8">
            {/* Visual Preview Frame */}
            <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-xs">
              <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5 bg-[var(--surface-hover)] font-mono text-[11px] text-[var(--text-muted)]">
                <span>PREVIEW // {domain}</span>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--text-primary)] flex items-center gap-1 font-semibold"
                >
                  VISIT <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
              <div className="w-full">
                <ResourcePreview resource={resource} className="aspect-[16/9] w-full rounded-none border-0" />
              </div>
            </div>

            {/* Systematic Documentation Sections */}
            <div className="space-y-4">
              {sections.map(({ label, content }) => {
                if (!content) return null;
                return (
                  <div key={label} className="border border-[var(--border)] bg-[var(--surface)] p-4 rounded-xl space-y-1.5 shadow-2xs">
                    <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
                      {label}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                      {content}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Metadata Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="border border-[var(--border)] bg-[var(--surface)] p-5 rounded-xl space-y-5 shadow-2xs">
              {/* Categories */}
              <div>
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
                  CATEGORIES
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {resource.categories.map((catId) => {
                    const cat = categoryMap[catId];
                    if (!cat) return null;
                    return (
                      <Link key={catId} href={`/categories/${cat.slug}`}>
                        <span className="text-xs bg-[var(--surface-muted)] border border-[var(--border)] px-2.5 py-1 rounded-lg text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors inline-flex items-center gap-1.5 font-medium">
                          <span className="h-3.5 w-3.5 shrink-0 flex items-center justify-center text-[var(--accent)]">
                            <CategoryIcon id={cat.id} className="h-3.5 w-3.5" />
                          </span>
                          <span>{cat.name}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Purpose */}
              {resource.purpose && (
                <div>
                  <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                    PURPOSE
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {resource.purpose}
                  </p>
                </div>
              )}

              {/* Tags */}
              {resource.tags.length > 0 && (
                <div>
                  <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                    TAGS
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

        {/* Related Resources Grid */}
        {related.length > 0 && (
          <div className="mt-14 pt-8 border-t border-[var(--border)]">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-xs bg-[var(--accent)]" />
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  RELATED REFERENCES
                </h2>
              </div>
              <span className="font-mono text-[11px] text-[var(--text-muted)]">
                {related.length} SUGGESTIONS
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5">
              {related.map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
