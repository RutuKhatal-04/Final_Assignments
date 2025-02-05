import {DataTypes,Model} from "sequelize";
import sequelize from "../database/config";


class Author extends Model{
    public id!:number;
    public name!:string;
    public bio!:string;
    public birthdate!:string;
    public isSystemUser!:boolean;
}

Author.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    bio:{
        type:DataTypes.STRING,
        allowNull:false
    },
    birthdate:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isSystemUser:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
},{
    sequelize,tableName:"Author",timestamps:true
})

export default Author;