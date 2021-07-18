import {Ingredient} from '../../interfaces'
import {IngredientOuput} from '../../../db/models/Ingredient'

export const toIngredient = (ingredient: IngredientOuput): Ingredient => {
    return {
        id: ingredient.id,
        name: ingredient.name,
        slug: ingredient.slug,
        description: ingredient.description,
        foodGroup: ingredient.foodGroup,
        createdAt: ingredient.createdAt,
        updatedAt: ingredient.updatedAt,
        deletedAt: ingredient.deletedAt,
    }
}