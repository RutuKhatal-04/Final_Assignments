import {DataTypes,Model} from "sequelize";
import sequelize from "../database/config";


class AuthBook extends Model{
    public id!:number;
    public authorid!:number;
    public bookid!:number;
}

AuthBook.init({

},{
    sequelize,tableName:"AuthBook"
})