export interface Recipe {
  id: number;
  title: string;
  slug: string;
  instruction: string;
  author: string;
  meta: RecipeMetadata | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface RecipeMetadata {
  cookingTime: string | null;
}
