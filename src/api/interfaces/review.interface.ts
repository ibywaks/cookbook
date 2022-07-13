import { Recipe } from "./recipe.interface";

export interface Review {
  id: number;
  title: string;
  description: string;
  author: string;
  rating: number;
  recipe: Recipe | null;
  isPublished: boolean;
  publishedOn: Date;
  createdAt: Date;
  updatedAt: Date;
}
