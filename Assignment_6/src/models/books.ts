import { DataTypes,Model } from "sequelize";
import sequelize from "../database/config";


class Book extends Model{
    public id!:number;
    public bookCode!:string;
    public title!:string;
    public description!:Text;
    public publishedDate!:string;
    public price!:number;
    public authors!:Text;
}


Book.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    bookCode:{
        type:DataTypes.STRING,
        allowNull:false
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    publishedDate:{
        type:DataTypes.STRING,
        allowNull:true
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    authors:{
        type:DataTypes.TEXT,
        allowNull:false
    }

},{
    sequelize,tableName:"Book",timestamps:true
});

export default Book;