import { RecipeOutput } from "../../../db/models/Recipe";
import { Recipe } from "../../interfaces";

export const toRecipe = (recipe: RecipeOutput): Recipe => ({
  id: recipe.id,
  title: recipe.title,
  slug: recipe.slug,
  instruction: recipe.instruction,
  author: recipe.author,
  meta: recipe.meta,
  createdAt: recipe.createdAt,
  updatedAt: recipe.updatedAt,
  deletedAt: recipe.deletedAt,
});
