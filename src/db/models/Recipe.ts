import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import {IngredientInput} from './Ingredient'

interface RecipeMetadata {
    cookingTime: string | null
}

interface RecipeAttributes {
    id: number;
    title: string;
    slug?: string;
    instruction?: string;
    author?: string;
    meta?: RecipeMetadata;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface RecipeInput extends Optional<RecipeAttributes, 'id' | 'slug'> {
    ingredients?: IngredientInput[]
}
export interface RecipeOutput extends Required<RecipeAttributes> {}

class Recipe extends Model<RecipeAttributes, RecipeInput> implements RecipeAttributes {
    public id!: number;
    public title!: string;
    public slug!: string;
    public instruction!: string;
    public author!: string;
    public meta!: RecipeMetadata;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Recipe.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    instruction: {
        type: DataTypes.TEXT,
    },
    meta: {
        type: DataTypes.JSON
    },
    author: {
        type: DataTypes.STRING
    }
}, {
    sequelize: sequelizeConnection,
    paranoid: true
})

export default Recipe