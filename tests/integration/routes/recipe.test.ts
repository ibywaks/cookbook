import Recipe, { RecipeOutput } from "../../../src/db/models/Recipe"
import { request } from "../../helpers"

const dbTeardown = async () => {
    await Recipe.sequelize?.query("SET FOREIGN_KEY_CHECKS = 0")
    await Recipe.destroy({ cascade: true, truncate: true, force: true });
    await Recipe.sequelize?.query("SET FOREIGN_KEY_CHECKS = 1")
}

describe('Recipe routes', () => {
    let recipeId: number
    let recipe: RecipeOutput

    beforeAll(async () => {
        [recipe] = await Promise.all([
            Recipe.create({title: 'Pesto pasta', slug: 'pesto-pasta'}),
            Recipe.create({title: 'Caesar salad', slug: 'caesar-salad'}),
        ])

        ;({id: recipeId} = recipe)
    })

    afterAll(async () => {
        await dbTeardown()
    })

    describe('Get All', () => {
        it('should return an array of existing recipes', async () => {
            const {body: data} = await request.get('/api/v1/recipes').expect(200)

            expect(data?.length).toEqual(2)
        })
    })

    describe('Get single recipe', () => {
        it('should return a single recipe with specified id', async () => {
            const {body: data} = await request.get(`/api/v1/recipes/${recipeId}`).expect(200)
                
            expect(data.id).toEqual(recipeId)
            expect(data.title).toEqual(recipe.title)
        })
    })
})