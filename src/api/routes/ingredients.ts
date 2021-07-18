import { Router, Request, Response} from 'express'

import * as ingredientController from '../controllers/ingredient'
import {CreateIngredientDTO, FilterIngredientsDTO, UpdateIngredientDTO} from '../dto/ingredient.dto'

const ingredientsRouter = Router()

ingredientsRouter.get(':/id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const result = await ingredientController.getById(id)
    return res.status(200).send(result)
})

ingredientsRouter.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const payload:UpdateIngredientDTO = req.body
    
    const result = await ingredientController.update(id, payload)
    return res.status(201).send(result)
})

ingredientsRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    
    const result = await ingredientController.deleteById(id)
    return res.status(204).send({
        success: result
    })
})

ingredientsRouter.post('/', async (req: Request, res: Response) => {
    const payload:CreateIngredientDTO = req.body

    const result = await ingredientController.create(payload)
    return res.status(200).send(result)
})

ingredientsRouter.get('/', async (req: Request, res: Response) => {
    const filters:FilterIngredientsDTO = req.query

    const results = await ingredientController.getAll(filters)
    return res.status(200).send(results)
})

export default ingredientsRouter