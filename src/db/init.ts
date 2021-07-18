require('dotenv').config()

import { Recipe, RecipeTag, Tag, Review, Ingredient, RecipeIngredient } from './models'

const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  Tag.sync({ alter: isDev })
  Ingredient.sync({ alter: isDev })
  Recipe.sync({ alter: isDev })
  Review.sync({ alter: isDev })
  RecipeTag.sync({ alter: isDev })
  RecipeIngredient.sync({ alter: isDev })
}

export default dbInit 
