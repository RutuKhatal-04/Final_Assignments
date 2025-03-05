import {DataTypes,Model} from "sequelize";
import sequelize from "../database/config";


class Admin extends Model{
    public id!:number;
    public name!:string;
    public email!:string;
    public password!:string;
}



Admin.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    tableName:'Admin',
    timestamps:true
})


export default Admin;