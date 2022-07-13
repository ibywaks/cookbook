import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import Recipe from "./Recipe";

interface ReviewAttributes {
  id: number;
  author: string;
  description: string;
  title: string;
  isPublished: boolean;
  publishedOn: Date | null;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ReviewInput extends Optional<ReviewAttributes, "id"> {}

export interface ReviewOuput extends Required<ReviewAttributes> {}

class Review
  extends Model<ReviewAttributes, ReviewInput>
  implements ReviewAttributes
{
  public id!: number;
  public author!: string;
  public description!: string;
  public title!: string;
  public isPublished!: false;
  public publishedOn!: Date;
  public rating!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    publishedOn: {
      type: DataTypes.DATE,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    timestamps: true,
    sequelize: sequelizeConnection,
  }
);

Review.belongsTo(Recipe, {
  foreignKey: {
    allowNull: false,
  },
});

export default Review;
