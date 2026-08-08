import { Resource } from "@/types";

function tagOverlap(a: Resource, b: Resource): number {
  const setB = new Set(b.tags.map((t) => t.toLowerCase()));
  return a.tags.filter((t) => setB.has(t.toLowerCase())).length;
}

function categoryOverlap(a: Resource, b: Resource): number {
  const setB = new Set(b.categories);
  return a.categories.filter((c) => setB.has(c)).length;
}

function purposeSimilarity(a: Resource, b: Resource): number {
  const wordsA = new Set(a.purpose.toLowerCase().split(/\W+/).filter(Boolean));
  const wordsB = b.purpose.toLowerCase().split(/\W+/).filter(Boolean);
  return wordsB.filter((w) => wordsA.has(w)).length;
}

function computeRelatednessScore(source: Resource, candidate: Resource): number {
  if (source.id === candidate.id) return -1;

  // Primary category exact match bonus
  const primaryCatMatch = source.categories[0] && candidate.categories.includes(source.categories[0]) ? 15 : 0;
  const catScore = categoryOverlap(source, candidate) * 10;
  const tagScore = tagOverlap(source, candidate) * 6;
  const purposeScore = purposeSimilarity(source, candidate) * 4;
  const featuredBonus = candidate.featured ? 2 : 0;

  return primaryCatMatch + catScore + tagScore + purposeScore + featuredBonus;
}

export function getRelatedResources(
  source: Resource,
  allResources: Resource[],
  limit = 6
): Resource[] {
  const scored = allResources
    .filter((r) => r.id !== source.id)
    .map((r) => ({ resource: r, score: computeRelatednessScore(source, r) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  const results = scored.slice(0, limit).map(({ resource }) => resource);

  if (results.length >= 3) return results;

  const fallback = allResources
    .filter((r) => r.id !== source.id && !results.some((res) => res.id === r.id))
    .slice(0, limit - results.length);

  return [...results, ...fallback];
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
    categories: categories,
    tags: tags,
    purpose: tags.join(" "),
    featured: false,
    createdAt: "",
    updatedAt: "",
  };

  return allResources
    .map((r) => ({
      resource: r,
      score: computeRelatednessScore(source, r),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ resource }) => resource);
}
