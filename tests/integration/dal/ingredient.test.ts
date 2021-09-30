import {Ingredient} from '../../../src/db/models'
import * as ingredientDal from '../../../src/db/dal/ingredient'

const dbTeardown = async () => {
    await Ingredient.sequelize?.query("SET FOREIGN_KEY_CHECKS = 0")
    await Ingredient.truncate({force: true})
    await Ingredient.sequelize?.query("SET FOREIGN_KEY_CHECKS = 1")
}

describe('Ingredient DAL', () => {
    let ingredientId: number
    beforeAll(async () => {
        await dbTeardown()

        ;({id: ingredientId} = await Ingredient.create({
            name: 'Beans',
            slug: 'beans',
        }))
    })

    afterAll(async () => {
        await dbTeardown()
    })

    describe('Create method', () => {
        it('should create and return an object of ingredient details', async () => {
            const payload = {
                name: 'Pasta',
                slug: 'pasta',
                description: 'abcd make some pasta'
            }
            
            const ingredient = await ingredientDal.create(payload)

            expect(ingredient).not.toBeNull()
        })
    })

    describe('findOrCreate method', () => {
        beforeAll(async () => {
            await Ingredient.create({
                name: 'Brown Rice',
                slug: 'brown-rice'
            })
        })

        it('should create a new entry when none with matching name exists', async () => {
            const payload = {
                name: 'Rice',
                slug: 'rice',
            }

            await ingredientDal.findOrCreate(payload)

            const ingredientsFound = await Ingredient.findAll({where: {name: 'Rice'}})

            expect(ingredientsFound.length).toEqual(1)
        })

        it('should return an existing entry where one with same name exists without updating it', async () => {
            const payload = {
                name: 'Brown Rice',
                slug: 'brownrice',
                description: 'test'
            }

            await ingredientDal.findOrCreate(payload)

            const ingredientsFound = await Ingredient.findAll({where: {name: 'Brown Rice'}})
            
            expect(ingredientsFound.length).toEqual(1)
            expect(ingredientsFound[0].slug).toEqual('brown-rice')
            expect(ingredientsFound[0].description).toBeNull()
        })
    })

    describe('Update method', () => {
        it('should update a specific existing Ingredient entry', async () => {
            await ingredientDal.update(ingredientId, {
                description: 'A legume'
            })

            const ingredient = await Ingredient.findByPk(ingredientId)

            expect(ingredient?.description).toEqual('A legume')
        })
    })
})