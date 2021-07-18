import { Optional } from 'sequelize/types'
import {CreateIngredientDTO} from './ingredient.dto'

export type CreateRecipeDTO = {
  title: string;
  slug?: string;
  instruction?: string;
  author?: string;
  meta?: RecipeMetadata
  ingredients?: CreateIngredientDTO[]
}

export type UpdateRecipeDTO = Optional<CreateRecipeDTO, 'title'>

interface RecipeMetadata {
  cookingTime: string | null
}