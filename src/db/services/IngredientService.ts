import { kebabCase } from "lodash";

import * as ingredientDal from "../dal/ingredient";
import { GetAllIngredientsFilters } from "../dal/types";
import { IngredientInput, IngredientOuput } from "../models/Ingredient";

export const create = async (
  payload: IngredientInput
): Promise<IngredientOuput> => {
  let slug = kebabCase(payload.name);
  const slugExists = await ingredientDal.checkSlugExists(slug);

  payload.slug = slugExists
    ? `${slug}-${Math.floor(Math.random() * 1000)}`
    : slug;

  return ingredientDal.create(payload);
};

export const update = async (
  id: number,
  payload: Partial<IngredientInput>
): Promise<IngredientOuput> => {
  if (payload.name) {
    let slug = kebabCase(payload.name);
    const slugExists = await ingredientDal.checkSlugExists(slug);

    payload.slug = slugExists
      ? `${slug}-${Math.floor(Math.random() * 1000)}`
      : slug;
  }

  return ingredientDal.update(id, payload);
};

export const getById = (id: number): Promise<IngredientOuput> => {
  return ingredientDal.getById(id);
};

export const deleteById = (id: number): Promise<boolean> => {
  return ingredientDal.deleteById(id);
};

export const getAll = (
  filters: GetAllIngredientsFilters
): Promise<IngredientOuput[]> => {
  return ingredientDal.getAll(filters);
};
