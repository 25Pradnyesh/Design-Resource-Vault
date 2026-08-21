import { Resource } from "@/types";
import { categoryMap } from "@/data/categories";

function normalize(s: string): string {
  return s.toLowerCase().trim();
}

function tagOverlap(a: Resource, b: Resource): string[] {
  const setB = new Set(b.tags.map(normalize));
  return a.tags.filter((t) => setB.has(normalize(t)));
}

function categoryOverlap(a: Resource, b: Resource): string[] {
  const setB = new Set(b.categories);
  return a.categories.filter((c) => setB.has(c));
}

function techOverlap(a: Resource, b: Resource): string[] {
  const techsA = a.technologies ?? [];
  const techsB = new Set((b.technologies ?? []).map(normalize));
  return techsA.filter((t) => techsB.has(normalize(t)));
}

function styleOverlap(a: Resource, b: Resource): string[] {
  const stylesA = a.styles ?? [];
  const stylesB = new Set((b.styles ?? []).map(normalize));
  return stylesA.filter((s) => stylesB.has(normalize(s)));
}

function purposeSimilarity(a: Resource, b: Resource): number {
  const wordsA = new Set(a.purpose.toLowerCase().split(/\W+/).filter((w) => w.length > 2));
  const wordsB = b.purpose.toLowerCase().split(/\W+/).filter((w) => w.length > 2);
  return wordsB.filter((w) => wordsA.has(w)).length;
}

export interface RelatedResourceResult {
  resource: Resource;
  score: number;
  relationshipRationale: string;
  sharedTags: string[];
  sharedCategories: string[];
  sharedTechnologies: string[];
  sharedStyles: string[];
}

export function computeRelatedness(source: Resource, candidate: Resource): RelatedResourceResult | null {
  if (source.id === candidate.id) return null;

  const sharedCats = categoryOverlap(source, candidate);
  const sharedT = tagOverlap(source, candidate);
  const sharedTech = techOverlap(source, candidate);
  const sharedSt = styleOverlap(source, candidate);
  const purposeScore = purposeSimilarity(source, candidate);

  // Primary category exact match bonus
  const primaryCatMatch =
    source.categories[0] && candidate.categories.includes(source.categories[0]) ? 15 : 0;

  const catScore = sharedCats.length * 12;
  const techScore = sharedTech.length * 14;
  const styleScore = sharedSt.length * 10;
  const tagScore = sharedT.length * 6;
  const purpScore = purposeScore * 4;
  const featuredBonus = candidate.featured ? 2 : 0;

  const score = primaryCatMatch + catScore + techScore + styleScore + tagScore + purpScore + featuredBonus;

  if (score <= 0) return null;

  // Build human-readable relationship rationale
  const rationaleParts: string[] = [];
  if (sharedTech.length > 0) {
    rationaleParts.push(`Tech: ${sharedTech.slice(0, 2).join(", ")}`);
  }
  if (sharedCats.length > 0) {
    const catName = categoryMap[sharedCats[0]]?.name ?? sharedCats[0];
    rationaleParts.push(catName);
  }
  if (sharedSt.length > 0 && rationaleParts.length < 2) {
    rationaleParts.push(`${sharedSt[0]} aesthetic`);
  }
  if (sharedT.length > 0 && rationaleParts.length < 2) {
    rationaleParts.push(`#${sharedT[0]}`);
  }

  const relationshipRationale =
    rationaleParts.length > 0
      ? `Related via ${rationaleParts.join(" · ")}`
      : "Related reference in catalog";

  return {
    resource: candidate,
    score,
    relationshipRationale,
    sharedTags: sharedT,
    sharedCategories: sharedCats,
    sharedTechnologies: sharedTech,
    sharedStyles: sharedSt,
  };
}

export function getRelatedResourcesWithRationale(
  source: Resource,
  allResources: Resource[],
  limit = 6
): RelatedResourceResult[] {
  const scored = allResources
    .filter((r) => r.id !== source.id)
    .map((r) => computeRelatedness(source, r))
    .filter((res): res is RelatedResourceResult => res !== null)
    .sort((a, b) => b.score - a.score);

  const results = scored.slice(0, limit);

  if (results.length >= 3) return results;

  // Add fallbacks from same primary category or general catalog if sparse
  const existingIds = new Set([source.id, ...results.map((r) => r.resource.id)]);
  const fallback = allResources
    .filter((r) => !existingIds.has(r.id))
    .slice(0, limit - results.length)
    .map((r) => ({
      resource: r,
      score: 1,
      relationshipRationale: "Curated reference from vault",
      sharedTags: [],
      sharedCategories: [],
      sharedTechnologies: [],
      sharedStyles: [],
    }));

  return [...results, ...fallback];
}

export function getRelatedResources(
  source: Resource,
  allResources: Resource[],
  limit = 6
): Resource[] {
  return getRelatedResourcesWithRationale(source, allResources, limit).map((r) => r.resource);
}

export function suggestRelatedFromDraft(
  categories: string[],
  tags: string[],
  allResources: Resource[],
  limit = 4
): Resource[] {
  const source: Resource = {
    id: "__draft__",
    slug: "__draft__",
    name: "",
    url: "",
    description: "",
    whatItDoes: "",
    whyUseIt: "",
    whenToUseIt: "",
    howToUseIt: "",
    categories,
    tags,
    purpose: tags.join(" "),
    featured: false,
    createdAt: "",
    updatedAt: "",
  };

  return getRelatedResources(source, allResources, limit);
}
