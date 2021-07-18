import * as service from '../../../db/services/IngredientService'
import {CreateIngredientDTO, UpdateIngredientDTO, FilterIngredientsDTO} from '../../dto/ingredient.dto'
import {Ingredient} from '../../interfaces'
import * as mapper from './mapper'

export const create = async(payload: CreateIngredientDTO): Promise<Ingredient> => {
    return mapper.toIngredient(await service.create(payload))
}

export const update = async (id: number, payload: UpdateIngredientDTO): Promise<Ingredient> => {
    return mapper.toIngredient(await service.update(id, payload))
}

export const getById = async (id: number): Promise<Ingredient> => {
    return mapper.toIngredient(await service.getById(id))
}

export const deleteById = async(id: number): Promise<Boolean> => {
    const isDeleted = await service.deleteById(id)

    return isDeleted
}

export const getAll = async(filters: FilterIngredientsDTO): Promise<Ingredient[]> => {
    return (await service.getAll(filters)).map(mapper.toIngredient)
}