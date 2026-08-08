"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link2, Sparkles, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
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
import { AddResourceForm } from "./add-resource-form";

function mockAnalyzeUrl(url: string): Omit<UrlImportDraft, "url" | "status"> {
  const domain = getDomainFromUrl(url);
  const name = domain.split(".")[0].charAt(0).toUpperCase() + domain.split(".")[0].slice(1);

  return {
    suggestedName: name,
    suggestedDescription: `A design resource discovered at ${domain}. Review and enrich the AI-generated metadata before saving.`,
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

    await new Promise((r) => setTimeout(r, 800));
    setDraft({ url, status: "analyzing" });

    await new Promise((r) => setTimeout(r, 1200));

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
        title="Add by URL"
        description="Paste a URL — AI will analyze and suggest metadata. (Preview mode)"
        size="lg"
      >
        <div className="space-y-5">
          <div className="flex gap-2">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            />
            <Button onClick={handleAnalyze} disabled={draft.status === "fetching" || draft.status === "analyzing"}>
              {(draft.status === "fetching" || draft.status === "analyzing") ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Analyze
            </Button>
          </div>

          {draft.status === "error" && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {draft.error}
            </div>
          )}

          {(draft.status === "fetching" || draft.status === "analyzing") && (
            <div className="rounded-lg border border-border bg-muted/30 p-6 text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {draft.status === "fetching"
                  ? "Fetching metadata..."
                  : "AI analyzing resource..."}
              </p>
              <div className="mt-4 space-y-2 text-left max-w-xs mx-auto">
                {["Extract URL metadata", "Analyze content", "Suggest categories", "Generate tags"].map(
                  (step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: draft.status === "analyzing" || i === 0 ? 1 : 0.3 }}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                      {step}
                    </motion.div>
                  )
                )}
              </div>
            </div>
          )}

          {draft.status === "ready" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-sm text-emerald-500">
                <CheckCircle2 className="h-4 w-4" />
                Analysis complete — review before saving
              </div>

              <div className="rounded-lg border border-border p-4 space-y-3">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Suggested Name
                  </div>
                  <div className="text-sm font-medium mt-0.5">{draft.suggestedName}</div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Description
                  </div>
                  <div className="text-sm text-muted-foreground mt-0.5">{draft.suggestedDescription}</div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Categories
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {draft.suggestedCategories?.map((catId) => {
                      const cat = categories.find((c) => c.id === catId);
                      return cat ? (
                        <Badge key={catId} variant="secondary">
                          {cat.emoji} {cat.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Tags
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {draft.suggestedTags?.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                {draft.relatedResources && draft.relatedResources.length > 0 && (
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Related Resources
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {draft.relatedResources.map((id) => {
                        const r = resources.find((res) => res.id === id);
                        return r ? (
                          <Badge key={id} variant="outline">
                            {r.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                <Link2 className="h-3.5 w-3.5 shrink-0" />
                Future: Connect AI API for real metadata extraction and categorization
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={handleClose}>
                  Cancel
                </Button>
                <Button onClick={handleReview}>
                  Review & Save
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
