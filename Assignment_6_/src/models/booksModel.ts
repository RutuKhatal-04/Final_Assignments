import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../database/config";

export class Basebook extends Model {
  public version!: number; 
  public active!: boolean;
  public archive!: boolean;
  public uId!: string;
}

class Book extends Basebook {
  public id!: string;
  public bookCode!: string;
  public title!: string;
  public description!: Text; 
  public publishedDate!: string;
  public price!: number;
  public authors!: Text; 
}

Book.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    bookCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    publishedDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    authors: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    archive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    uId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Book",
    timestamps: true,
  }
);

export default Book;