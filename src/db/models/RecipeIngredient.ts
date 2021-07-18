import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

import { Recipe, Ingredient } from '.'

interface RecipeIngredientAttributes {
    id: number;
    RecipeId: number;
    IngredientId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface RecipeIngredientInput extends Optional<RecipeIngredientAttributes, 'id'> {}
export interface RecipeIngredientOutput extends RecipeIngredientInput {}

class RecipeIngredient extends Model<RecipeIngredientAttributes, RecipeIngredientInput> implements RecipeIngredientAttributes {
    public id!: number;
    public RecipeId!: number;
    public IngredientId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

RecipeIngredient.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    RecipeId: {
        type: DataTypes.INTEGER,
        references: {
            model: Recipe,
            key: 'id'
        }
    },
    IngredientId: {
        type: DataTypes.INTEGER,
        references: {
            model: Ingredient,
            key: 'id'
        }
    }
}, {
  sequelize: sequelizeConnection
})

Recipe.belongsToMany(Ingredient, {
  through: RecipeIngredient
})
Ingredient.belongsToMany(Recipe, {
  through: RecipeIngredient
})

export default RecipeIngredient