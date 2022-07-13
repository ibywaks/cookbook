import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

import { Recipe, Tag } from "./index";

interface RecipeTagAttribtues {
  id: number;
  RecipeId: number;
  TagId: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface RecipeTagInput extends Optional<RecipeTagAttribtues, "id"> {}

export interface RecipeTagOutput extends Required<RecipeTagInput> {}

class RecipeTag
  extends Model<RecipeTagAttribtues, RecipeTagInput>
  implements RecipeTagAttribtues
{
  public id!: number;
  public RecipeId!: number;
  public TagId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

RecipeTag.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    RecipeId: {
      type: DataTypes.INTEGER,
      references: {
        model: Recipe,
        key: "id",
      },
    },
    TagId: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: "id",
      },
    },
  },
  {
    sequelize: sequelizeConnection,
  }
);

Tag.belongsToMany(Recipe, {
  through: RecipeTag,
});
Recipe.belongsToMany(Tag, {
  through: RecipeTag,
});

export default RecipeTag;
