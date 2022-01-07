import { Router, Request, Response } from 'express'
import { GetAllRecipesFilters } from '../../db/dal/types'

import * as controller from '../controllers/recipes'
import { CreateRecipeDTO, UpdateRecipeDTO } from '../dto/recipe.dto'
import {checkCache} from '../../lib/check-cache'

const recipesRouter = Router()

recipesRouter.get('/', checkCache, async (req: Request, res: Response) => {
    const filters: GetAllRecipesFilters = req.query
    
    const results = await controller.getAll(filters)
    
    return res.status(200).send(results)
})

recipesRouter.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    
    const result = await controller.getById(id)
    
    return res.status(200).send(result)
})

recipesRouter.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const payload: UpdateRecipeDTO = req.body

    const result = await controller.update(id, payload)

    return res.status(200).send(result)
})

recipesRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const result = await controller.deleteById(id)

    return res.status(200).send({
        success: result
    })
})

recipesRouter.post('/', async (req: Request, res: Response) => {
    const payload: CreateRecipeDTO = req.body

    const result = await controller.create(payload)

    return res.status(200).send(result)
})

// recipesRouter.post('/:id/tags', async (req: Request, res: Response) => {
//   // append a tag to recipe
// })

// recipesRouter.delete('/:id/tags', async (req: Request, res: Response) => {
//   // remove a tag from recipe
// })

// recipesRouter.post('/:id/ingredients', async (req: Request, res: Response) => {
//   // add ingredient
// })

// recipesRouter.delete('/:id/ingredients', async (req: Request, res: Response) => {
//   // delete ingredient
// })

export default recipesRouter