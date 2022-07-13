import { isEmpty } from "lodash";
import { Op } from "sequelize";

import { Recipe } from "../models";
import { RecipeInput, RecipeOutput } from "../models/Recipe";
import { GetAllRecipesFilters } from "./types";

export const create = (payload: RecipeInput): Promise<RecipeOutput> => {
  return Recipe.create(payload);
};

export const update = async (
  id: number,
  payload: Partial<RecipeInput>
): Promise<RecipeOutput> => {
  const recipe = await Recipe.findByPk(id);

  if (!recipe) {
    //@todo throw custom error
    throw new Error("not found");
  }

  return recipe.update(payload);
};

export const getById = async (id: number): Promise<RecipeOutput> => {
  const recipe = await Recipe.findByPk(id);

  if (!recipe) {
    //@todo throw custom error
    throw new Error("not found");
  }

  return recipe;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const numDeletedRecipes = await Recipe.destroy({
    where: { id },
  });

  return !!numDeletedRecipes;
};

export const getAll = async (
  filters: GetAllRecipesFilters
): Promise<RecipeOutput[]> => {
  return Recipe.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true }),
  });
};

export const checkSlugExists = async (slug: string): Promise<boolean> => {
  const recipeWithSlug = await Recipe.findOne({
    where: { slug },
  });

  return !isEmpty(recipeWithSlug);
};
