import { Op } from "sequelize";
import { isEmpty } from "lodash";

import { Ingredient } from "../models";
import { GetAllIngredientsFilters } from "./types";
import { IngredientInput, IngredientOuput } from "../models/Ingredient";

export const create = async (
  payload: IngredientInput
): Promise<IngredientOuput> => {
  const ingredient = await Ingredient.create(payload);

  return ingredient;
};

export const findOrCreate = async (
  payload: IngredientInput
): Promise<IngredientOuput> => {
  const [ingredient] = await Ingredient.findOrCreate({
    where: {
      name: payload.name,
    },
    defaults: payload,
  });

  return ingredient;
};

export const update = async (
  id: number,
  payload: Partial<IngredientInput>
): Promise<IngredientOuput> => {
  const ingredient = await Ingredient.findByPk(id);

  if (!ingredient) {
    // @todo throw custom error
    throw new Error("not found");
  }

  const updatedIngredient = await ingredient.update(payload);
  return updatedIngredient;
};

export const getById = async (id: number): Promise<IngredientOuput> => {
  const ingredient = await Ingredient.findByPk(id);

  if (!ingredient) {
    // @todo throw custom error
    throw new Error("not found");
  }

  return ingredient;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedIngredientCount = await Ingredient.destroy({
    where: { id },
  });

  return !!deletedIngredientCount;
};

export const getAll = async (
  filters?: GetAllIngredientsFilters
): Promise<IngredientOuput[]> => {
  return Ingredient.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true }),
  });
};

export const checkSlugExists = async (slug: string): Promise<boolean> => {
  const ingredientWithSlug = await Ingredient.findOne({
    where: {
      slug,
    },
  });

  return !isEmpty(ingredientWithSlug);
};
