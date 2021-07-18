import { Optional } from "sequelize/types"

export type CreateIngredientDTO = {
    name: string;
    slug?: string;
    description?: string;
    foodGroup?: string;
}

export type UpdateIngredientDTO = Optional<CreateIngredientDTO, 'name'>

export type FilterIngredientsDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}