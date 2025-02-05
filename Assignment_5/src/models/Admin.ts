import {DataTypes,Model} from "sequelize";
import sequelize from "../database/config";

class Admin extends Model{
    public id!:number;
    public email!:string;
    public password!:string;
}
Admin.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true

    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        allowNull:false,
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName:'Admin',
    timestamps:true
})

export default Admin;