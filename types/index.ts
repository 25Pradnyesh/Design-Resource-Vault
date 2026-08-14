export interface Category {
  id: string;
  name: string;
  emoji: string;
  slug: string;
  description: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Resource {
  id: string;
  slug: string;
  name: string;
  url: string;
  description: string;
  whatItDoes: string;
  whyUseIt: string;
  whenToUseIt: string;
  howToUseIt: string;
  categories: string[];
  tags: string[];
  purpose: string;
  featured: boolean;
  isUserAdded?: boolean;
  previewImage?: string;
  createdAt: string;
  updatedAt: string;
  viewCount?: number;
}

export type SortOption = "recent" | "featured" | "most-used";

export interface ResourceFilters {
  query?: string;
  categories?: string[];
  tags?: string[];
  purpose?: string;
  favoritesOnly?: boolean;
  sort?: SortOption;
}

export interface UserPreferences {
  favorites: string[];
  recentlyViewed: string[];
  theme: "light" | "dark" | "system";
}

export interface UrlImportDraft {
  url: string;
  status: "idle" | "fetching" | "analyzing" | "ready" | "error";
  suggestedName?: string;
  suggestedDescription?: string;
  suggestedCategories?: string[];
  suggestedTags?: string[];
  suggestedPurpose?: string;
  suggestedWhatItDoes?: string;
  suggestedWhyUseIt?: string;
  suggestedWhenToUseIt?: string;
  suggestedHowToUseIt?: string;
  relatedResources?: string[];
  error?: string;
}

export interface CreateResourceInput {
  name: string;
  url: string;
  description: string;
  whatItDoes: string;
  whyUseIt: string;
  whenToUseIt: string;
  howToUseIt: string;
  categories: string[];
  tags: string[];
  purpose: string;
  featured: boolean;
}

export interface UpdateResourceInput extends Partial<CreateResourceInput> {
  id: string;
}
