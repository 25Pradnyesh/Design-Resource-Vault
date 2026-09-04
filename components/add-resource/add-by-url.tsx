"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { UrlImportDraft } from "@/types";
import { categories } from "@/data/categories";
import { useResources } from "@/lib/resource-context";
import { useUI } from "@/lib/ui-context";
import { suggestRelatedFromDraft } from "@/lib/related";
import { getDomainFromUrl } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CategoryIcon } from "@/components/ui/category-icon";
import { AddResourceForm } from "./add-resource-form";

function mockAnalyzeUrl(url: string): Omit<UrlImportDraft, "url" | "status"> {
  const domain = getDomainFromUrl(url);
  const name = domain.split(".")[0].charAt(0).toUpperCase() + domain.split(".")[0].slice(1);

  return {
    suggestedName: name,
    suggestedDescription: `A design resource discovered at ${domain}. Review and enrich the suggested metadata before saving.`,
    suggestedCategories: ["ui-web-inspiration"],
    suggestedTags: ["Design", "Web", domain.split(".")[0]],
    suggestedPurpose: `Design and development resource from ${domain}.`,
    suggestedWhatItDoes: `Provides tools, inspiration, or resources related to design and development at ${domain}.`,
    suggestedWhyUseIt: "Useful for expanding your design toolkit and reference library.",
    suggestedWhenToUseIt: "When exploring new design tools or seeking inspiration for projects.",
    suggestedHowToUseIt: "Visit the website, explore features, and integrate into your workflow.",
  };
}

export function AddByUrlModal() {
  const { addByUrlOpen, setAddByUrlOpen } = useUI();
  const { resources } = useResources();
  const [url, setUrl] = useState("");
  const [draft, setDraft] = useState<UrlImportDraft>({ url: "", status: "idle" });
  const [reviewOpen, setReviewOpen] = useState(false);

  const handleAnalyze = async () => {
    if (!url.trim()) return;

    try {
      new URL(url);
    } catch {
      setDraft({ url, status: "error", error: "Enter a valid URL" });
      return;
    }

    setDraft({ url, status: "fetching" });

    await new Promise((r) => setTimeout(r, 600));
    setDraft({ url, status: "analyzing" });

    await new Promise((r) => setTimeout(r, 900));

    const suggestions = mockAnalyzeUrl(url);
    const related = suggestRelatedFromDraft(
      suggestions.suggestedCategories ?? [],
      suggestions.suggestedTags ?? [],
      resources
    );

    setDraft({
      url,
      status: "ready",
      ...suggestions,
      relatedResources: related.map((r) => r.id),
    });
  };

  const handleClose = () => {
    setAddByUrlOpen(false);
    setUrl("");
    setDraft({ url: "", status: "idle" });
    setReviewOpen(false);
  };

  const handleReview = () => {
    setReviewOpen(true);
    setAddByUrlOpen(false);
  };

  return (
    <>
      <Modal
        open={addByUrlOpen}
        onClose={handleClose}
        title="Import by URL"
        description="Enter a website URL to extract metadata and import into the vault."
        size="lg"
      >
        <div className="space-y-4 font-sans text-xs">
          <div className="flex gap-2">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            />
            <Button onClick={handleAnalyze} size="sm" disabled={draft.status === "fetching" || draft.status === "analyzing"}>
              {(draft.status === "fetching" || draft.status === "analyzing") ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5" />
              )}
              <span>Analyze</span>
            </Button>
          </div>

          {draft.status === "error" && (
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--error)]">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{draft.error}</span>
            </div>
          )}

          {(draft.status === "fetching" || draft.status === "analyzing") && (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] p-6 text-center">
              <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2.5 text-[var(--accent)]" />
              <p className="text-xs font-mono text-[var(--text-muted)]">
                {draft.status === "fetching"
                  ? "FETCHING WEBSITE METADATA..."
                  : "ANALYZING DESIGN ATTRIBUTES..."}
              </p>
            </div>
          )}

          {draft.status === "ready" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--success)] font-mono">
                <CheckCircle2 className="h-4 w-4" />
                <span>ANALYSIS COMPLETE · REVIEW DETAILS</span>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-3 shadow-2xs">
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    NAME
                  </div>
                  <div className="text-sm font-bold text-[var(--text-primary)] mt-0.5">{draft.suggestedName}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    DESCRIPTION
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] mt-0.5">{draft.suggestedDescription}</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                    CATEGORIES
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {draft.suggestedCategories?.map((catId) => {
                      const cat = categories.find((c) => c.id === catId);
                      return cat ? (
                        <span key={catId} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--text-primary)]">
                          <span className="h-3 w-3 flex items-center justify-center">
                            <CategoryIcon id={cat.id} className="h-3 w-3" />
                          </span>
                          <span>{cat.name}</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                    TAGS
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-mono">
                    {draft.suggestedTags?.map((tag) => (
                      <Badge key={tag} variant="outline">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <Button variant="ghost" size="sm" onClick={handleClose}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleReview}>
                  Review & Save to Vault
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </Modal>

      <AddResourceForm
        open={reviewOpen}
        onClose={() => {
          setReviewOpen(false);
          handleClose();
        }}
        initialData={
          draft.status === "ready"
            ? {
              name: draft.suggestedName ?? "",
              url: draft.url,
              description: draft.suggestedDescription ?? "",
              whatItDoes: draft.suggestedWhatItDoes ?? "",
              whyUseIt: draft.suggestedWhyUseIt ?? "",
              whenToUseIt: draft.suggestedWhenToUseIt ?? "",
              howToUseIt: draft.suggestedHowToUseIt ?? "",
              categories: draft.suggestedCategories ?? [],
              tags: draft.suggestedTags ?? [],
              purpose: draft.suggestedPurpose ?? "",
              featured: false,
            }
            : undefined
        }
      />
    </>
  );
}
