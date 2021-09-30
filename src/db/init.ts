require('dotenv').config()

import { Recipe, RecipeTag, Tag, Review, Ingredient, RecipeIngredient } from './models'

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV !== 'test'

const dbInit = () => Promise.all([
    Tag.sync({ alter: isDev || isTest }),
    Ingredient.sync({ alter: isDev || isTest }),
    Recipe.sync({ alter: isDev || isTest }),
    Review.sync({ alter: isDev || isTest }),
    RecipeTag.sync({ alter: isDev || isTest }),
    RecipeIngredient.sync({ alter: isDev || isTest }),
  ])

export default dbInit 
