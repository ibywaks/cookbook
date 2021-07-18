import { Recipe } from '../../interfaces'
import * as mapper from './mapper'
import * as service from '../../../db/services/RecipeService'
import { CreateRecipeDTO, UpdateRecipeDTO } from '../../dto/recipe.dto'
import { GetAllRecipesFilters } from '../../../db/dal/types'

export const create = async (payload: CreateRecipeDTO): Promise<Recipe> => {
    return mapper.toRecipe(await service.create(payload))
}

export const update = async (id: number, payload: UpdateRecipeDTO): Promise<Recipe> => {
    return mapper.toRecipe(await service.update(id, payload))
}

export const getById = async (id: number): Promise<Recipe> => {
    return mapper.toRecipe(await service.getById(id))
}

export const deleteById = (id: number): Promise<boolean> => {
    return service.deleteById(id)
}

export const getAll = async (filters: GetAllRecipesFilters): Promise<Recipe[]> => {
    return (await service.getAll(filters)).map(mapper.toRecipe)
}